import React from 'react';
import { GetIcon } from './ui/Icons';

interface BottomNavProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  role: 'CUSTOMER' | 'PROVIDER';
}

const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange, role }) => {
  const customerTabs = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'search', label: 'Search', icon: 'Search' },
    { id: 'bookings', label: 'Bookings', icon: 'Clock' },
    { id: 'profile', label: 'Profile', icon: 'User' },
  ];

  const providerTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: 'Briefcase' },
    { id: 'requests', label: 'Requests', icon: 'MessageCircle' },
    { id: 'profile', label: 'Profile', icon: 'User' },
  ];

  const tabs = role === 'PROVIDER' ? providerTabs : customerTabs;

  return (
    <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-100 flex justify-around items-center h-16 z-50 px-2 pb-safe">
      {tabs.map((tab) => {
        const isActive = currentTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
              isActive ? 'text-primary-600' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <GetIcon name={tab.icon} size={24} className={isActive ? 'stroke-[2.5px]' : ''} />
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;