import React from 'react';
import { GetIcon } from '../components/ui/Icons';
import { MOCK_PROVIDERS } from '../constants';

const ProviderDashboard: React.FC = () => {
  // Mock current provider logged in
  const me = MOCK_PROVIDERS[0]; 

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
       <div className="bg-primary-600 text-white p-6 pb-12 rounded-b-[2.5rem] shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
          
          <div className="flex justify-between items-center mb-6 relative z-10">
             <div>
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="text-primary-100 text-sm">Welcome back, {me.name}</p>
             </div>
             <img src={me.image} className="w-12 h-12 rounded-full border-2 border-white/50" alt="Profile" />
          </div>

          <div className="grid grid-cols-2 gap-4 relative z-10">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
               <div className="flex items-center gap-2 mb-1 text-primary-100">
                 <GetIcon name="Zap" size={16} />
                 <span className="text-xs font-medium">Earnings</span>
               </div>
               <p className="text-2xl font-bold">$1,240</p>
            </div>
             <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
               <div className="flex items-center gap-2 mb-1 text-primary-100">
                 <GetIcon name="Briefcase" size={16} />
                 <span className="text-xs font-medium">Jobs Done</span>
               </div>
               <p className="text-2xl font-bold">24</p>
            </div>
          </div>
       </div>

       <div className="flex-1 px-5 -mt-6">
          <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
             <div className="flex justify-between items-center mb-4">
               <h3 className="font-bold text-gray-800">New Requests</h3>
               <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full font-bold">2 New</span>
             </div>
             
             <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="flex gap-4 border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                     <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-bold">
                       JD
                     </div>
                     <div className="flex-1">
                        <div className="flex justify-between items-start">
                           <h4 className="font-bold text-sm">John Doe</h4>
                           <span className="text-xs text-gray-400">10 mins ago</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">Short Circuit Repair • 5km away</p>
                        <div className="flex gap-2">
                           <button className="flex-1 bg-primary-600 text-white text-xs font-bold py-2 rounded-lg">Accept</button>
                           <button className="flex-1 bg-gray-100 text-gray-600 text-xs font-bold py-2 rounded-lg">Decline</button>
                        </div>
                     </div>
                  </div>
                ))}
             </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm">
             <div className="flex justify-between items-center mb-4">
               <h3 className="font-bold text-gray-800">Quick Actions</h3>
             </div>
             <div className="grid grid-cols-3 gap-3">
                <button className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                   <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                     <GetIcon name="User" size={20} />
                   </div>
                   <span className="text-[10px] font-medium text-gray-600">Edit Profile</span>
                </button>
                 <button className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                   <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center">
                     <GetIcon name="Clock" size={20} />
                   </div>
                   <span className="text-[10px] font-medium text-gray-600">Availability</span>
                </button>
                 <button className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                   <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center">
                     <GetIcon name="ShieldCheck" size={20} />
                   </div>
                   <span className="text-[10px] font-medium text-gray-600">Verify ID</span>
                </button>
             </div>
          </div>
       </div>
    </div>
  );
};

export default ProviderDashboard;