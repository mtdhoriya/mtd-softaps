import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showNav = true }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start">
      <div className="w-full max-w-md bg-white min-h-screen shadow-2xl relative flex flex-col">
        {children}
        {/* Spacer for bottom nav */}
        {showNav && <div className="h-20" />} 
      </div>
    </div>
  );
};

export default Layout;