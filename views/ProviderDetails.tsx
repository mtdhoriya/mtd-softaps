import React, { useState } from 'react';
import { Provider } from '../types';
import { GetIcon } from '../components/ui/Icons';

interface ProviderDetailsProps {
  provider: Provider;
  onBack: () => void;
}

const ProviderDetails: React.FC<ProviderDetailsProps> = ({ provider, onBack }) => {
  const [activeTab, setActiveTab] = useState<'about' | 'reviews' | 'portfolio'>('about');

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Header Image */}
      <div className="relative h-64 bg-gray-200">
        <img src={provider.image} alt="Cover" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <button 
          onClick={onBack}
          className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        >
          <GetIcon name="ArrowLeft" size={20} />
        </button>
        <div className="absolute bottom-4 left-4 text-white">
          <h1 className="text-2xl font-bold">{provider.businessName}</h1>
          <div className="flex items-center gap-2 text-sm text-gray-200 mt-1">
             <span className="bg-white/20 px-2 py-0.5 rounded backdrop-blur-sm">{provider.category}</span>
             <span>•</span>
             <div className="flex items-center gap-1">
               <GetIcon name="Star" size={14} className="fill-yellow-400 text-yellow-400" />
               {provider.rating} ({provider.reviewCount} Reviews)
             </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Tabs */}
        <div className="flex border-b border-gray-100 mb-6">
          {['about', 'reviews', 'portfolio'].map((tab) => (
             <button
               key={tab}
               onClick={() => setActiveTab(tab as any)}
               className={`flex-1 pb-3 text-sm font-semibold capitalize transition-colors relative ${activeTab === tab ? 'text-primary-600' : 'text-gray-400'}`}
             >
               {tab}
               {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600 rounded-t-full" />}
             </button>
          ))}
        </div>

        {activeTab === 'about' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="font-bold text-gray-900 mb-2">About</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{provider.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-xl">
                 <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-2">
                   <GetIcon name="Clock" size={16} />
                 </div>
                 <p className="text-xs text-gray-500">Availability</p>
                 <p className="font-semibold text-gray-900 text-sm">Mon - Sat</p>
                 <p className="text-xs text-gray-400">09:00 AM - 07:00 PM</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                 <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2">
                   <GetIcon name="MapPin" size={16} />
                 </div>
                 <p className="text-xs text-gray-500">Location</p>
                 <p className="font-semibold text-gray-900 text-sm truncate">{provider.location.address}</p>
                 <p className="text-xs text-gray-400">~2.5 km away</p>
              </div>
            </div>

             <div>
              <h3 className="font-bold text-gray-900 mb-2">Pricing</h3>
              <div className="flex justify-between items-center p-4 border border-gray-100 rounded-xl">
                <div>
                   <p className="font-semibold text-gray-900">Standard Visit Charge</p>
                   <p className="text-xs text-gray-400">Consultation & Assessment</p>
                </div>
                <p className="font-bold text-lg text-primary-600">${provider.priceStart}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
           <div className="space-y-4 animate-fade-in">
             {provider.reviews.length > 0 ? provider.reviews.map(r => (
               <div key={r.id} className="border-b border-gray-50 pb-4 last:border-0">
                 <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-sm">{r.userName}</span>
                    <span className="text-xs text-gray-400">{r.date}</span>
                 </div>
                 <div className="flex items-center gap-1 mb-2">
                    {[1,2,3,4,5].map(star => (
                      <GetIcon key={star} name="Star" size={12} className={star <= r.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"} />
                    ))}
                 </div>
                 <p className="text-sm text-gray-600">{r.comment}</p>
               </div>
             )) : (
               <p className="text-gray-400 text-center py-8">No reviews yet.</p>
             )}
           </div>
        )}

        {activeTab === 'portfolio' && (
           <div className="grid grid-cols-2 gap-2 animate-fade-in">
             <img src={`https://picsum.photos/300/300?r=${provider.id}1`} className="rounded-xl w-full h-32 object-cover" alt="Work 1" />
             <img src={`https://picsum.photos/300/300?r=${provider.id}2`} className="rounded-xl w-full h-32 object-cover" alt="Work 2" />
             <img src={`https://picsum.photos/300/300?r=${provider.id}3`} className="rounded-xl w-full h-32 object-cover" alt="Work 3" />
             <div className="bg-gray-100 rounded-xl w-full h-32 flex items-center justify-center text-gray-400 text-xs">
                +5 More
             </div>
           </div>
        )}
      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-0 left-0 w-full flex justify-center pb-6 px-4 z-40 pointer-events-none">
          <div className="w-full max-w-md bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex gap-3 pointer-events-auto">
             <button className="bg-primary-50 text-primary-600 p-3 rounded-xl hover:bg-primary-100 transition-colors">
               <GetIcon name="MessageCircle" size={24} />
             </button>
             <button className="flex-1 bg-primary-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-primary-200 hover:bg-primary-700 transition-all flex items-center justify-center gap-2">
               Book Service
             </button>
          </div>
      </div>
    </div>
  );
};

export default ProviderDetails;