import React from 'react';
import { FiSidebar } from "react-icons/fi";
import { IoCreateOutline } from "react-icons/io5";
import ProfileMenu from './ProfileMenu';
import { Link } from 'react-router-dom';

const Header = ({
  isDrawerOpen,
  toggleDrawer
}) => {


  return (
    <div className='w-full'>
      <div className='flex rounded-lg justify-between items-center p-1 md:px-2 lg:px-5'>
        <div className='flex rounded-lg justify-between space-x-3'>
          {
            !isDrawerOpen && <FiSidebar onClick={toggleDrawer} size={22} className='rotate-180 icon cp mt-1' />
          }
          {
            !isDrawerOpen && <Link to={'/'}><IoCreateOutline size={24} className='cp icon mt-0.5' /></Link>
          }
          {/* <LLMModalChoice /> */}
        </div>
        <div className='flex items-center md:space-x-2'>
          <ProfileMenu />
        </div>
      </div>
    </div>
  )
}

export default Header