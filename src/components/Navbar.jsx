import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  // console.log(user.email)

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex items-center justify-between p-4 z-[100] w-full absolute'>
      <Link to='/'>
        <h1 className='text-blue-700 text-4xl font-bold cursor-pointer hover:text-pink-300 transition-all duration-500'>
          NOTFLIX
        </h1>
      </Link>
      {user?.email ? (
        <div>
          <Link to='/account'>
            <button className='text-white pr-4  hover:text-blue-400  transition-all duration-300'>Account</button>
          </Link>
          <button
            onClick={handleLogout}
            className='bg-blue-700 px-6 py-2 rounded-full  hover:bg-blue-800 cursor-pointer text-white transition-all duration-500'
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <Link to='/login'>
            <button className='text-white hover:text-blue-400 pr-4 transition-all duration-500'>Sign In</button>
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
