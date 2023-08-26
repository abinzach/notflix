import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); // State to control menu open/close
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/');
      setMenuOpen(!menuOpen)
    } catch (error) {
      console.log(error);
    }
  };

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + '...';
    } else {
      return str;
    }
  };

  return (
    <div className='flex justify-between flex-col md:flex-row md:justify-between items-center bg-gradient-to-b from-black p-4 z-[100] w-full absolute'>
      <Link to='/'>
        <h1 className='text-blue-700 text-4xl font-bold cursor-pointer hover:text-pink-300 transition-all duration-500'>
          NOTFLIX
        </h1>
      </Link>
      <div className='md:hidden fixed right-2 items-end'>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className='text-white p-2 focus:outline-none transition-all duration-300'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16m-7 6h7'
            />
          </svg>
        </button>
        {menuOpen && (
          <div className='mt-2 flex items-end '>
            {user?.email ? (
              <div className='flex-col items-end justify-end'>
                <span className='bg-blue-700/50 p-3 rounded-2xl text-md my-2 text-white block'>
                  Welcome, {truncateString(user.email, 4)}
                </span>
                <Link to='/account'>
                  <button onClick={() => setMenuOpen(!menuOpen)} className='bg-blue-700 my-2 px-6 py-2 rounded-full text-white pr-4 transition-all duration-300'>
                    Saved Shows
                  </button>
                </Link>
                <br/>
                <button
                  onClick={handleLogout}
                  className='bg-blue-700 px-6 py-2 my-2 rounded-full hover:bg-blue-800 cursor-pointer text-white transition-all duration-500'
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to='/login'>
                  <button className='bg-blue-700 px-4 py-2 rounded-lg mx-4 hover:bg-blue-800 cursor-pointer text-white transition-all duration-500'>
                    Sign In
                  </button>
                </Link>
                <Link to='/signup'>
                  <button className='bg-blue-700 px-4 py-2 rounded-lg hover:bg-blue-800 cursor-pointer text-white transition-all duration-500'>
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
      {user?.email && (
        <div className='hidden md:block flex-col'>
          <span className='bg-blue-700/50 p-3 rounded-2xl text-md text-white mr-5'>
            Welcome, {truncateString(user.email, 4)}
          </span>
          <Link to='/account'>
            <button className='text-white pr-4  hover:text-blue-400 transition-all duration-300'>
              Saved Shows
            </button>
          </Link>
          
          <button
            onClick={handleLogout}
            className='bg-blue-700 px-6 py-2 rounded-full hover:bg-blue-800 cursor-pointer text-white transition-all duration-500'
          >
            Logout
          </button>
        </div>
      )}
      {!user?.email && (
        <div className='hidden md:block'>
          <Link to='/login'>
            <button className='text-white hover:text-blue-400 pr-4 transition-all duration-500'>
              Sign In
            </button>
          </Link>
          <Link to='/signup'>
            <button className='bg-blue-700 px-4 py-2 rounded-lg hover:bg-blue-800 cursor-pointer text-white transition-all duration-500'>
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
