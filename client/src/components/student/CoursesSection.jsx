import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import CourseCard from './CourseCard'

const CoursesSection = () => {

  const {allCourses} = useContext(AppContext)

  return (
    <div className='py-16 md:px-40 px-8'>
        <h2 className='text-3xl font-medium text-gray-800'>Learn from the best</h2>
        <p className='text-sm md:text-base text-gray-500 mt-4'>Discover our top-rated courses 
          across various categories.From coding and design to business and wellness, <br/>our courses 
          are crafted to deliver results.</p>

          <div className='grid [grid-template-columns:repeat(auto-fit,_minmax(200px,_1fr))] px-4 md:px-0 md:my-16 my-10 gap-4'>
            {allCourses.slice(0, 4).map((course, index) => <CourseCard key={index} course={course} />)}
          </div>

          <Link to='/course-list' className='text-gray-500 border border-gray-500/30 px-10
          py-3 rounded'>Show all Courses</Link>
    </div>
  )
}

export default CoursesSection