// filepath: e:\Git\LMS website\Edemy\client\src\context\AppContext.jsx
import React, { createContext, useEffect, useState } from 'react'; 
import { dummyCourses } from '../assets/assets.js';
import { useNavigate } from 'react-router-dom';
import humanizeDuration from 'humanize-duration';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  const [state, setState] = useState(null);
  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);

  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses);
  };

  const calculateRating = (course) => {
    if (!course.courseRatings || course.courseRatings.length === 0) return 0;
    let totalRating = 0;
    course.courseRatings.forEach((rating) => {
      totalRating += rating.rating;
    });
    return totalRating / course.courseRatings.length;
  }

  const calculateChapterDuration = (chapter) => {
    const totalMinutes = chapter.chapterContent.reduce((sum, lecture) => {
      return sum + (lecture.lectureDuration || 0);
    }, 0);
    if (totalMinutes === 0) return "0m";
    return humanizeDuration(totalMinutes * 60 * 1000, { 
      units: ["h", "m"],
      round: true
    });
  };

  const calculateCourseDuration = (course) => {
    let time = 0;
    course.courseContent.map((chapter) => chapter.chapterContent.map(
      (lecture) => time += lecture.lectureDuration
    ));
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  }

  const calculateNoOfLectures = (course) => {
    let totalLectures = 0;
    course.courseContent.forEach(chapter => {
      if(Array.isArray(chapter.chapterContent)){
        totalLectures += chapter.chapterContent.length;
      }
    });
    return totalLectures;
  }

  useEffect(() => {
    fetchAllCourses()
  }, []);  

  return (
    <AppContext.Provider value={{ 
      state, 
      setState, 
      currency, 
      allCourses, 
      navigate,
      calculateRating, 
      isEducator, 
      setIsEducator,
      calculateChapterDuration,
      calculateCourseDuration,
      calculateNoOfLectures,
    }}>
      {children}
    </AppContext.Provider>
  );
};