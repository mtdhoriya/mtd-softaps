import React, { useState } from 'react';
import { UserRole } from '../types';
import { GetIcon } from '../components/ui/Icons';

interface AuthScreenProps {
  onLogin: (role: UserRole) => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [step, setStep] = useState<'ROLE_SELECT' | 'LOGIN'>('ROLE_SELECT');
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.CUSTOMER);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onLogin(selectedRole);
    }, 1200);
  };

  if (step === 'ROLE_SELECT') {
    return (
      <div className="flex flex-col h-full p-8 justify-center items-center bg-gradient-to-br from-primary-600 to-purple-700 text-white min-h-screen">
        <div className="mb-10 text-center">
          <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6 backdrop-blur-md">
            <GetIcon name="Zap" size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2 tracking-tight">Urban Task</h1>
          <p className="text-primary-100 text-lg">Your local experts, on demand.</p>
        </div>

        <div className="w-full space-y-4">
          <button
            onClick={() => { setSelectedRole(UserRole.CUSTOMER); setStep('LOGIN'); }}
            className="w-full bg-white text-primary-700 py-4 px-6 rounded-xl font-bold shadow-lg hover:bg-gray-50 transition-all flex items-center justify-between group"
          >
            <span className="flex items-center gap-3">
              <GetIcon name="User" className="text-primary-500" />
              Find a Service
            </span>
            <GetIcon name="ChevronRight" className="text-gray-300 group-hover:text-primary-500" />
          </button>

          <button
            onClick={() => { setSelectedRole(UserRole.PROVIDER); setStep('LOGIN'); }}
            className="w-full bg-primary-800/50 border border-primary-400/30 text-white py-4 px-6 rounded-xl font-bold hover:bg-primary-800/70 transition-all flex items-center justify-between backdrop-blur-sm"
          >
             <span className="flex items-center gap-3">
              <GetIcon name="Briefcase" className="text-primary-200" />
              Register as Partner
            </span>
            <GetIcon name="ChevronRight" className="text-primary-300" />
          </button>
        </div>

        <p className="mt-8 text-sm text-primary-200/80">Version 1.0.0 • Secure & Trusted</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white p-6">
      <button onClick={() => setStep('ROLE_SELECT')} className="text-gray-500 mb-8 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100">
        <GetIcon name="ArrowLeft" />
      </button>

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {selectedRole === UserRole.CUSTOMER ? 'Welcome Back!' : 'Partner Login'}
        </h2>
        <p className="text-gray-500">Enter your details to continue.</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <div className="relative">
            <span className="absolute left-4 top-3.5 text-gray-400">+1</span>
            <input
              type="tel"
              placeholder="555-0123"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
              required
            />
          </div>
        </div>

        <div>
           <label className="block text-sm font-medium text-gray-700 mb-2">OTP (Simulated)</label>
           <input
              type="text"
              placeholder="1234"
              defaultValue="1234"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all tracking-widest"
              required
            />
        </div>

        <button
          disabled={loading}
          className="w-full bg-primary-600 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-primary-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            'Continue'
          )}
        </button>
      </form>

      <div className="mt-auto py-6 text-center">
        <p className="text-sm text-gray-500">
          By continuing, you agree to our <span className="text-primary-600 font-medium">Terms</span> & <span className="text-primary-600 font-medium">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};

export default AuthScreen;