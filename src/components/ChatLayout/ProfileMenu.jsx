import React, { useState, useRef, useEffect } from 'react';
import { FiLogOut, FiHelpCircle, FiArrowUpCircle, FiFileText } from 'react-icons/fi';
import Card from '../ui/Card';

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const user = JSON.parse(localStorage.getItem('user'))
  const user_first_name = user.first_name


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/signin';
  };

  const handleFAQRedirect = () => {
    window.location.href = '/faq';
  };

  const handleTermsRedirect = () => {
    window.location.href = '/terms';
  };

  const handleUpgradeRedirect = () => {
    window.location.href = '/upgrade';
  };

  return (
    <div className="relative p-1" ref={menuRef}>
      {/* Profile Icon (Trigger) */}
      <div
        className="w-8 h-8 rounded-full gray-bg flex items-center justify-center text-gray-300 bg-main cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {user_first_name[0]}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 z-10">
          <Card fill>
            <span className='flex justify-end mb-2 text-main font-main'>
              {user_first_name}
            </span>
            <ul className="space-y-1">
              <li
                className="flex items-center p-2 rounded-lg hover:bg-main cursor-pointer"
                onClick={handleFAQRedirect}
              >
                <FiHelpCircle className="mr-2" size={17} />
                <span>Help & FAQ</span>
              </li>
              <li
                className="flex items-center p-2 rounded-lg hover:bg-main cursor-pointer"
                onClick={handleTermsRedirect}
              >
                <FiFileText className="mr-2" size={17} />
                <span>Terms & Policies</span>
              </li>
              <li
                className="flex items-center p-2 rounded-lg hover:bg-main cursor-pointer"
                onClick={handleUpgradeRedirect}
              >
                <FiArrowUpCircle className="mr-2" size={17} />
                <span>Upgrade Plan</span>
              </li>

              <hr className="my-1 border-gray-600" />

              <li
                className="flex items-center p-2 rounded-lg hover:bg-main cursor-pointer"
                onClick={handleLogout}
              >
                <FiLogOut className="mr-2" size={17} />
                <span>Logout</span>
              </li>
            </ul>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
