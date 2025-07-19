import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import LeftSidebar from '../Components/ChatLayout/sidebars/left/LeftSidebar';
import Header from '../Components/ChatLayout/Header';
import { SidebarContext } from '../contexts/SidebarContext';
import Contexts from '../contexts/Contexts';

const ChatLayout = () => {
  const { isLeftSidebarOpen, toggleLeftSidebar } = useContext(SidebarContext);

  return (
    <Contexts>
      <div className="relative w-full h-dvh flex overflow-hidden">
        {/* Sidebar is absolute/fixed */}
        <LeftSidebar isDrawerOpen={isLeftSidebarOpen} toggleDrawer={toggleLeftSidebar} />

        {/* Main Panel */}
        <div className="flex flex-col w-full h-full overflow-hidden">
          {/* Top Header */}
          <div className="flex-shrink-0 z-10">
            <Header isDrawerOpen={isLeftSidebarOpen} toggleDrawer={toggleLeftSidebar} />
          </div>

          {/* Main Chat Area */}
          <div className="flex-grow overflow-auto relative z-0">
            <Outlet />
          </div>
        </div>
      </div>
    </Contexts>
  );
};

export default ChatLayout;
