// filepath: e:\Git\LMS website\Edemy\client\src\context\AppContext.jsx
import React, { createContext, useEffect, useState } from 'react'; 
import { dummyCourses } from '../assets/assets.js'; // Use named import
import { useNavigate } from 'react-router-dom';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate;

  const [state, setState] = useState(null);

  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);

  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses);
  };

  const calculateRating = (course)=> {
    if (!course.courseRatings || course.courseRatings.length === 0) return 0;
    let totalRating = 0;
    course.courseRatings.forEach((rating) => {
      totalRating += rating.rating;
    });
    return totalRating / course.courseRatings.length;
  }

  useEffect(() => {
    fetchAllCourses()
  },[]);  

  return (
    <AppContext.Provider value={{ state, setState, currency, allCourses, navigate, calculateRating, 
    isEducator, setIsEducator }}>
      {children}
    </AppContext.Provider>
  );
};