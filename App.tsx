import React, { useState } from 'react';
import Layout from './components/Layout';
import BottomNav from './components/BottomNav';
import AuthScreen from './views/AuthScreen';
import CustomerHome from './views/CustomerHome';
import ProviderDashboard from './views/ProviderDashboard';
import ProviderDetails from './views/ProviderDetails';
import { UserRole, Provider } from './types';
import { GetIcon } from './components/ui/Icons';

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<UserRole>(UserRole.GUEST);
  const [currentTab, setCurrentTab] = useState('home');
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setCurrentTab(role === 'PROVIDER' ? 'dashboard' : 'home');
  };

  const handleTabChange = (tab: string) => {
    // Reset view stack when switching main tabs
    if(tab !== currentTab) {
        setSelectedProvider(null);
    }
    setCurrentTab(tab);
  };

  // View Routing Logic
  const renderContent = () => {
    if (userRole === UserRole.GUEST) {
      return <AuthScreen onLogin={handleLogin} />;
    }

    // Provider Flow
    if (userRole === UserRole.PROVIDER) {
      if (currentTab === 'dashboard') return <ProviderDashboard />;
      if (currentTab === 'requests') return <div className="p-8 text-center text-gray-500 mt-20"><GetIcon name="MessageCircle" className="mx-auto mb-2" />Requests functionality coming soon.</div>;
      if (currentTab === 'profile') return <div className="p-8 text-center text-gray-500 mt-20"><GetIcon name="User" className="mx-auto mb-2" />Profile settings coming soon.</div>;
    }

    // Customer Flow
    if (userRole === UserRole.CUSTOMER) {
      if (currentTab === 'home') {
        if (selectedProvider) {
          return <ProviderDetails provider={selectedProvider} onBack={() => setSelectedProvider(null)} />;
        }
        return <CustomerHome onProviderSelect={setSelectedProvider} />;
      }
      if (currentTab === 'search') return <CustomerHome onProviderSelect={setSelectedProvider} />;
      if (currentTab === 'bookings') return <div className="p-8 text-center text-gray-500 mt-20"><GetIcon name="Clock" className="mx-auto mb-2" />No active bookings.</div>;
      if (currentTab === 'profile') return <div className="p-8 text-center text-gray-500 mt-20"><GetIcon name="User" className="mx-auto mb-2" />User profile functionality coming soon.</div>;
    }

    return <div>Error</div>;
  };

  const showNav = userRole !== UserRole.GUEST && !selectedProvider;

  return (
    <Layout showNav={showNav}>
      {renderContent()}
      {showNav && (
        <BottomNav 
          currentTab={currentTab} 
          onTabChange={handleTabChange} 
          // Fix: Avoid comparing narrowed type with GUEST. Since showNav is true, userRole is CUSTOMER or PROVIDER.
          role={userRole === UserRole.PROVIDER ? 'PROVIDER' : 'CUSTOMER'}
        />
      )}
    </Layout>
  );
};

export default App;