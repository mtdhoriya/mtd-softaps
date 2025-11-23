import React, { useState, useEffect } from 'react';
import { CATEGORIES, MOCK_PROVIDERS } from '../constants';
import { Provider, Category } from '../types';
import { GetIcon } from '../components/ui/Icons';
import { getSmartServiceRecommendation } from '../services/geminiService';

interface CustomerHomeProps {
  onProviderSelect: (provider: Provider) => void;
}

const CustomerHome: React.FC<CustomerHomeProps> = ({ onProviderSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [providers, setProviders] = useState<Provider[]>(MOCK_PROVIDERS);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiReasoning, setAiReasoning] = useState<string | null>(null);

  // Filter providers
  useEffect(() => {
    let filtered = MOCK_PROVIDERS;
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.businessName.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }
    setProviders(filtered);
  }, [selectedCategory, searchQuery]);

  const handleAiSearch = async () => {
    if (!searchQuery) return;
    setAiLoading(true);
    setAiReasoning(null);
    
    // Simulate AI thinking delay for UX
    const result = await getSmartServiceRecommendation(searchQuery);
    
    if (result) {
      setSelectedCategory(result.category);
      setAiReasoning(result.reasoning);
    } else {
       setAiReasoning("Sorry, I couldn't find a matching category, but here are the results for your query.");
    }
    setAiLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white p-5 pb-4 sticky top-0 z-10 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Current Location</p>
            <div className="flex items-center gap-1 text-primary-700 font-bold cursor-pointer">
              <GetIcon name="MapPin" size={16} />
              <span>New York, USA</span>
              <GetIcon name="ChevronRight" size={14} className="mt-0.5" />
            </div>
          </div>
          <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center relative">
            <GetIcon name="MessageCircle" className="text-gray-600" size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search 'leaky tap' or 'painter'..."
            className="w-full pl-11 pr-12 py-3 bg-gray-100 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-primary-500 border-none outline-none transition-all shadow-inner"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAiSearch()}
          />
          <div className="absolute left-4 top-3 text-gray-400">
            <GetIcon name="Search" size={18} />
          </div>
          <button 
            onClick={handleAiSearch}
            className="absolute right-2 top-1.5 p-1.5 bg-primary-600 rounded-lg text-white hover:bg-primary-700 transition-colors"
          >
            {aiLoading ? (
               <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <GetIcon name="Sparkles" size={16} />
            )}
          </button>
        </div>
        
        {aiReasoning && (
           <div className="mt-3 bg-primary-50 border border-primary-100 p-3 rounded-lg flex gap-3 items-start animate-fade-in">
             <GetIcon name="Sparkles" className="text-primary-600 shrink-0 mt-0.5" size={16} />
             <p className="text-xs text-primary-800 leading-relaxed">{aiReasoning}</p>
             <button onClick={() => setAiReasoning(null)} className="ml-auto text-primary-400"><GetIcon name="X" size={14}/></button>
           </div>
        )}
      </header>

      <div className="p-5 space-y-6 overflow-y-auto no-scrollbar pb-24">
        
        {/* Categories */}
        <section>
          <div className="flex justify-between items-center mb-3">
             <h3 className="font-bold text-gray-900">Categories</h3>
             <button 
                onClick={() => setSelectedCategory('All')} 
                className="text-xs font-semibold text-primary-600"
             >
                See All
             </button>
          </div>
          <div className="flex overflow-x-auto gap-4 pb-2 no-scrollbar -mx-5 px-5">
            <button
               onClick={() => setSelectedCategory('All')}
               className={`flex flex-col items-center gap-2 min-w-[70px] ${selectedCategory === 'All' ? 'opacity-100' : 'opacity-70'}`}
            >
               <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm transition-all ${selectedCategory === 'All' ? 'bg-primary-600 text-white shadow-primary-200' : 'bg-white text-gray-500'}`}>
                 <GetIcon name="Menu" size={24} />
               </div>
               <span className="text-[11px] font-medium text-gray-700">All</span>
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex flex-col items-center gap-2 min-w-[70px] group`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm transition-all ${selectedCategory === cat.name ? 'bg-primary-600 text-white' : 'bg-white text-gray-500 group-hover:bg-primary-50 group-hover:text-primary-600'}`}>
                  <GetIcon name={cat.icon} size={24} />
                </div>
                <span className={`text-[11px] font-medium ${selectedCategory === cat.name ? 'text-primary-700' : 'text-gray-700'}`}>{cat.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Featured Providers */}
        <section>
           <h3 className="font-bold text-gray-900 mb-3">
             {selectedCategory === 'All' ? 'Top Rated Providers' : `${selectedCategory} Near You`}
           </h3>
           <div className="space-y-4">
             {providers.length === 0 ? (
               <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-gray-200">
                 <GetIcon name="Search" className="mx-auto text-gray-300 mb-2" size={32} />
                 <p className="text-gray-500 text-sm">No providers found in this area.</p>
               </div>
             ) : (
               providers.map((provider) => (
                 <div 
                   key={provider.id} 
                   onClick={() => onProviderSelect(provider)}
                   className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 cursor-pointer hover:shadow-md transition-shadow"
                 >
                   <div className="relative shrink-0">
                    <img 
                      src={provider.image} 
                      alt={provider.name} 
                      className="w-20 h-20 rounded-xl object-cover" 
                    />
                    {provider.isVerified && (
                      <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-0.5">
                        <GetIcon name="CheckCircle" className="fill-blue-500 text-white" size={20} />
                      </div>
                    )}
                   </div>
                   <div className="flex-1 min-w-0">
                     <div className="flex justify-between items-start">
                       <h4 className="font-bold text-gray-900 truncate pr-2">{provider.businessName}</h4>
                       <div className="flex items-center gap-1 bg-yellow-50 px-1.5 py-0.5 rounded text-xs font-bold text-yellow-700">
                         <GetIcon name="Star" size={10} className="fill-yellow-500 text-yellow-500" />
                         {provider.rating}
                       </div>
                     </div>
                     <p className="text-xs text-gray-500 mb-2 truncate">{provider.category} • {provider.name}</p>
                     
                     <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
                       <GetIcon name="MapPin" size={12} />
                       <span className="truncate">{provider.location.address}</span>
                     </div>

                     <div className="flex items-center justify-between border-t border-gray-50 pt-2">
                       <p className="font-bold text-primary-700 text-sm">
                         ${provider.priceStart} <span className="text-gray-400 font-normal text-xs">/ {provider.priceType}</span>
                       </p>
                       <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-2 py-1 rounded-md">Book Now</span>
                     </div>
                   </div>
                 </div>
               ))
             )}
           </div>
        </section>
      </div>
    </div>
  );
};

export default CustomerHome;