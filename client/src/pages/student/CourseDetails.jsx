import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/student/Loading'
import star from '../../assets/star.svg'
import star_dull from '../../assets/star_dull_icon.svg'

const CourseDetails = () => {

  const {id} = useParams();
  
  const [courseData, setCourseData] = React.useState(null);
  const { allCourses, calculateRating } = useContext(AppContext);

  useEffect(() => {
    const fetchCourseData = async () => {
      const findcourse = allCourses.find((course) => course._id === id);
      setCourseData(findcourse);
    };
    fetchCourseData();
  }, [allCourses, id])

  return courseData? (
    <>
    <div className='flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between
    md:px-36 px-8 md:pt-30 pt-20 text-left'>
        <div className='absolute top-0 left-0 w-full h-[500px] -z-10 bg-gradient-to-b
         from-cyan-100/70'></div>

        <div>
            <div className='max-w-xl z-10 text-gray-500'>
              <h1 className='md:text-[36px] text-[26px] font-semibold text-gray-800'
              >{courseData.courseTitle}</h1>
              <p className='pt-4 md:text-base text-sm'
              dangerouslySetInnerHTML={{__html: courseData.courseDescription.slice(0, 200)}}></p>

              <div className='flex items-center space-x-2 pt-3 pb-1 text-sm'>
                <p>{calculateRating(courseData)}</p>
                  <div className='flex'>
                    {[...Array(5)].map((_, i) => (<img key={i} src={i < 
                    Math.floor(calculateRating(courseData)) ? star : star_dull} alt="" 
                    className='w-3.5 h-3.5'/>))}
                  </div>
                <p className='text-blue-600'>({courseData.courseRatings.length} 
                  {courseData.courseRatings.length > 1 ? ' ratings' : ' rating'})</p> 

                <p className='text-gray-500'>{courseData.enrolledStudents.length} 
                  {courseData.enrolledStudents.length > 1 ? ' students' : ' student'}</p>
              </div>

              <p>Course by <span className='text-blue-600 underline'>Python.lk</span></p>

            </div>
        </div>
        <div></div>
    </div>
    </>
  ) : <Loading />;
}

export default CourseDetails