import { Link, useLocation, useNavigate } from 'react-router-dom'; // ✅ Using Link component for navigation
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { AppContext } from '../../context/AppContext';
import logo from '../../assets/logo.svg';
import usericon from '../../assets/user_icon.svg';
import { useContext } from 'react';

const Navbar = () => {
  const location = useLocation();
  const { openSignIn } = useClerk();
  const navigate = useNavigate();
  const { user } = useUser();

  const { isEducator } = useContext(AppContext); // ✅ Using context to get user state

  const isCourseListPage = location.pathname.includes('/course-list');

  return (
    <div className={`flex justify-between items-center px-4 sm:px-10 md:px-14 lg:px-36 border-b
    border-gray-500 py-4 ${isCourseListPage ? 'bg-white' : 'bg-cyan-100/70'}`}>
      <Link to="/" className='w-28 lg:w-32 cursor-pointer'>
        <img src={logo} alt="Logo" />
      </Link>

      <div className='hidden md:flex items-center gap-5 text-gray-500'>
        <div className='flex items-center gap-5'>
          {user && (
            <>
              <button className='cursor-pointer' onClick={()=>{navigate('/educator')}}>{(isEducator) ? 'Educator Dashboard' : 
              'Become Educator'}</button> | 
              <Link to="/my-enrollment">My Enrollments</Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn()}
            className='bg-blue-600 text-white px-5 py-2 rounded-full cursor-pointer'
          >
            Create Account
          </button>
        )}
      </div>

      <div className='md:hidden flex items-center gap-2 sm:gap-5 text-gray-500'>
        <div className='flex items-center gap-1 sm:gap-2 max-sm:text:xs'>
          {user && (
            <>
              <button className='cursor-pointer' onClick={()=>{navigate('/educator')}}>{(isEducator) ? 'Educator Dashboard' : 
              'Become Educator'}</button> | 
              <Link to="/my-enrollment">My Enrollments</Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button onClick={() => openSignIn()}>
            <img src={usericon} alt="User Icon" className='w-8 h-8 cursor-pointer' />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
