

import React, { useState, useEffect } from 'react';
import { 
  Cake, Gift, Bell, 
  Calendar, Star, Award, Sparkles,
  Users
} from 'lucide-react';

const CombinedEventsCard = ({ 
  birthdays = [], 
  anniversaries = [], 
  announcements = [],
  darkMode = false,
  autoRotateInterval = 2000 
}) => {
  const [activeTab, setActiveTab] = useState('birthdays');
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [filteredBirthdays, setFilteredBirthdays] = useState([]);
  const [filteredAnniversaries, setFilteredAnniversaries] = useState([]);

  // Filter out past events and process dates
  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Process birthdays
    const processedBirthdays = birthdays
      .map(bday => {
        const bdayDate = new Date(bday.date);
        const bdayThisYear = new Date(
          today.getFullYear(),
          bdayDate.getMonth(),
          bdayDate.getDate()
        );
        
        // If birthday already passed this year, use next year's date
        if (bdayThisYear < today) {
          bdayThisYear.setFullYear(today.getFullYear() + 1);
        }
        
        return {
          ...bday,
          eventDate: bdayThisYear,
          isToday: bdayThisYear.toDateString() === today.toDateString(),
          fullDate: bdayThisYear.toLocaleDateString('en-US', { 
            weekday: 'short', 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          }),
          daysUntil: Math.ceil((bdayThisYear - today) / (1000 * 60 * 60 * 24))
        };
      })
      .sort((a, b) => a.daysUntil - b.daysUntil); // Sort by nearest first
    
    setFilteredBirthdays(processedBirthdays);
    
    // Process anniversaries
    const processedAnniversaries = anniversaries
      .map(anni => {
        const anniDate = new Date(anni.date);
        const anniThisYear = new Date(
          today.getFullYear(),
          anniDate.getMonth(),
          anniDate.getDate()
        );
        
        // If anniversary already passed this year, use next year's date
        if (anniThisYear < today) {
          anniThisYear.setFullYear(today.getFullYear() + 1);
        }
        
        return {
          ...anni,
          eventDate: anniThisYear,
          isToday: anniThisYear.toDateString() === today.toDateString(),
          fullDate: anniThisYear.toLocaleDateString('en-US', { 
            weekday: 'short', 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          }),
          daysUntil: Math.ceil((anniThisYear - today) / (1000 * 60 * 60 * 24))
        };
      })
      .sort((a, b) => a.daysUntil - b.daysUntil); // Sort by nearest first
    
    setFilteredAnniversaries(processedAnniversaries);
  }, [birthdays, anniversaries]);

  // Tabs configuration with dark mode colors
  const tabs = [
    { id: 'birthdays', label: 'Birthdays', icon: Cake, color: 'pink', count: filteredBirthdays.length },
    { id: 'anniversaries', label: 'Anniversaries', icon: Gift, color: 'purple', count: filteredAnniversaries.length },
    { id: 'announcements', label: 'Announcements', icon: Bell, color: 'blue', count: announcements.length }
  ];

  // Auto-rotation logic
  useEffect(() => {
    let interval;
    if (isAutoRotating && !hovered) {
      interval = setInterval(() => {
        setActiveTab(current => {
          const currentIndex = tabs.findIndex(tab => tab.id === current);
          const nextIndex = (currentIndex + 1) % tabs.length;
          return tabs[nextIndex].id;
        });
      }, autoRotateInterval);
    }
    return () => clearInterval(interval);
  }, [isAutoRotating, hovered, autoRotateInterval, tabs]);

  const handleTabClick = (tabId) => {
    setIsAutoRotating(false); 
    setActiveTab(tabId);
  };

  const getMilestoneColor = (years) => {
    if (years >= 10) return darkMode ? 'bg-yellow-600 text-yellow-100' : 'bg-yellow-100 text-yellow-700';
    if (years >= 5) return darkMode ? 'bg-blue-600 text-blue-100' : 'bg-blue-100 text-blue-700';
    return darkMode ? 'bg-purple-600 text-purple-100' : 'bg-purple-100 text-purple-700';
  };

  const getPriorityColor = (priority) => {
    switch(priority?.toLowerCase()) {
      case 'high': return darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-700';
      case 'medium': return darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-700';
      case 'low': return darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700';
      default: return darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700';
    }
  };

  const getTabActiveColor = (tabId) => {
    if (!darkMode) {
      switch(tabId) {
        case 'birthdays': return 'text-pink-600 border-pink-600';
        case 'anniversaries': return 'text-purple-600 border-purple-600';
        case 'announcements': return 'text-blue-600 border-blue-600';
        default: return 'text-blue-600 border-blue-600';
      }
    } else {
      switch(tabId) {
        case 'birthdays': return 'text-pink-400 border-pink-400';
        case 'anniversaries': return 'text-purple-400 border-purple-400';
        case 'announcements': return 'text-blue-400 border-blue-400';
        default: return 'text-blue-400 border-blue-400';
      }
    }
  };

  const getDaysRemaining = (eventDate) => {
    if (!eventDate) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffTime = eventDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Blink animation CSS
  const blinkAnimation = `
    @keyframes blink {
      0% { opacity: 1; }
      50% { opacity: 0.5; }
      100% { opacity: 1; }
    }
    .animate-blink {
      animation: blink 1.5s infinite;
    }
  `;

  // Content height adjustment
  const scrollContainerClass = `space-y-3 max-h-[450px] sm:max-h-[500px] overflow-y-auto pr-2 custom-scrollbar transition-all duration-300`;

  const renderBirthdays = () => (
    <div className={scrollContainerClass}>
      {filteredBirthdays.length > 0 ? (
        filteredBirthdays.map((bday, index) => {
          const isToday = bday.isToday;
          const daysUntil = bday.daysUntil;
          
          return (
            <div 
              key={index} 
              className={`p-3 rounded-lg transition-all ${
                isToday
                  ? darkMode 
                    ? 'bg-green-900/50 border-2 border-green-500 animate-blink' 
                    : 'bg-green-100 border-2 border-green-500 animate-blink'
                  : darkMode 
                    ? 'bg-gray-700/50 hover:bg-gray-700 border border-gray-600' 
                    : 'bg-pink-50 hover:bg-pink-100 border border-pink-100'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className={`text-sm font-medium truncate flex items-center gap-2 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {bday.name}
                    {isToday && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                        darkMode ? 'bg-green-800 text-green-200' : 'bg-green-200 text-green-800'
                      }`}>
                        Today! 🎉
                      </span>
                    )}
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} truncate`}>
                    {bday.empCode} • {bday.department}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <span className={`text-xs px-2 py-1 rounded inline-block w-fit ${
                    isToday
                      ? darkMode 
                        ? 'bg-green-800 text-green-200' 
                        : 'bg-green-200 text-green-800'
                      : darkMode 
                        ? 'bg-pink-900/50 text-pink-300 border border-pink-800' 
                        : 'bg-pink-200 text-pink-700'
                  }`}>
                    {bday.fullDate}
                  </span>
                  {!isToday && daysUntil > 0 && (
                    <span className={`text-[10px] mt-1 ${
                      darkMode ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      {daysUntil === 1 ? 'Tomorrow' : `${daysUntil} days left`}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <EmptyState icon={Cake} text="No upcoming birthdays" darkMode={darkMode} />
      )}
    </div>
  );

  const renderAnniversaries = () => (
    <div className={scrollContainerClass}>
      {filteredAnniversaries.length > 0 ? (
        filteredAnniversaries.map((anni, index) => {
          const isToday = anni.isToday;
          const daysUntil = anni.daysUntil;
          
          return (
            <div 
              key={index} 
              className={`p-3 rounded-lg transition-all ${
                isToday
                  ? darkMode 
                    ? 'bg-green-900/50 border-2 border-green-500 animate-blink' 
                    : 'bg-green-100 border-2 border-green-500 animate-blink'
                  : darkMode 
                    ? 'bg-gray-700/50 hover:bg-gray-700 border border-gray-600' 
                    : 'bg-purple-50 hover:bg-purple-100 border border-purple-100'
              } ${anni.years >= 10 && !isToday ? 'ring-2 ring-yellow-400/50' : ''}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className={`text-sm font-medium truncate flex items-center gap-2 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {anni.name}
                    {isToday && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                        darkMode ? 'bg-green-800 text-green-200' : 'bg-green-200 text-green-800'
                      }`}>
                        Today! 🎉
                      </span>
                    )}
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                    {anni.empCode} • {anni.department}
                  </p>
                  {daysUntil <= 7 && !isToday && (
                    <div className="flex items-center space-x-1 mt-2">
                      <Calendar className={`w-3 h-3 ${darkMode ? 'text-orange-400' : 'text-orange-500'}`} />
                      <span className={`text-[10px] sm:text-xs font-medium ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                        {daysUntil === 0 ? 'Today!' : `${daysUntil} days left`}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium w-fit ${getMilestoneColor(anni.years)}`}>
                    {anni.years >= 10 ? (
                      <Award className="w-3 h-3 mr-1" />
                    ) : anni.years >= 5 ? (
                      <Star className="w-3 h-3 mr-1" />
                    ) : (
                      <Sparkles className="w-3 h-3 mr-1" />
                    )}
                    {anni.years} {anni.years > 1 ? 'Years' : 'Year'}
                  </div>
                  <span className={`text-xs px-2 py-1 rounded inline-block w-fit ${
                    isToday
                      ? darkMode 
                        ? 'bg-green-800 text-green-200' 
                        : 'bg-green-200 text-green-800'
                      : darkMode 
                        ? 'bg-purple-900/50 text-purple-300 border border-purple-800' 
                        : 'bg-purple-200 text-purple-700'
                  }`}>
                    {anni.fullDate}
                  </span>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <EmptyState icon={Gift} text="No upcoming anniversaries" darkMode={darkMode} />
      )}
    </div>
  );

  const renderAnnouncements = () => (
    <div className={scrollContainerClass}>
      {announcements.length > 0 ? (
        announcements.map((ann, index) => (
          <div 
            key={index} 
            className={`p-3 rounded-lg transition-all ${
              darkMode 
                ? 'bg-gray-700/50 hover:bg-gray-700 border border-gray-600' 
                : 'bg-blue-50 hover:bg-blue-100 border border-blue-100'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${
                ann.priority === 'high' ? 'bg-red-500' : 
                ann.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
              }`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className={`text-sm font-medium truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {ann.title}
                  </p>
                  <span className={`text-[10px] px-2 py-0.5 rounded ${getPriorityColor(ann.priority)}`}>
                    {ann.priority || 'Normal'}
                  </span>
                </div>
                {ann.description && (
                  <p className={`text-xs mt-1 line-clamp-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {ann.description}
                  </p>
                )}
                <div className={`flex items-center space-x-2 mt-2 ${darkMode ? 'opacity-70' : 'opacity-60'}`}>
                  <Calendar className={`w-3 h-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span className={`text-[10px] ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {ann.date}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <EmptyState icon={Bell} text="No announcements" darkMode={darkMode} />
      )}
    </div>
  );

  const totalEvents = filteredBirthdays.length + filteredAnniversaries.length + announcements.length;

  return (
    <div 
      className={`rounded-xl shadow-lg border transition-all duration-300 flex flex-col h-full ${
        darkMode 
          ? 'bg-gray-800 border-gray-700 hover:shadow-gray-900/50' 
          : 'bg-white border-gray-200 hover:shadow-xl'
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Inject blink animation */}
      <style>{blinkAnimation}</style>
      
      {/* Header */}
      <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
            <h2 className={`text-base sm:text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Events & Updates
            </h2>
          </div>
          {totalEvents > 0 && (
            <span className={`text-[10px] sm:text-xs font-semibold px-2 py-1 rounded-full ${
              darkMode 
                ? 'bg-gray-700 text-gray-300 border border-gray-600' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              {totalEvents} upcoming
            </span>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className={`flex border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'} ${
        darkMode ? 'bg-gray-900/20' : 'bg-gray-50/30'
      }`}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const activeColors = getTabActiveColor(tab.id);
          
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`
                flex-1 flex items-center justify-center space-x-2 py-3 px-1 
                text-xs sm:text-sm font-medium transition-all relative
                ${isActive 
                  ? activeColors
                  : darkMode
                    ? 'text-gray-500 hover:text-gray-300'
                    : 'text-gray-400 hover:text-gray-600'
                }
              `}
            >
              <Icon className={`w-4 h-4 ${isActive ? '' : darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
              <span className="hidden xs:inline">{tab.label}</span>
              {tab.count > 0 && (
                <span className={`text-[10px] ml-1 ${
                  isActive 
                    ? darkMode ? 'text-gray-300' : 'text-gray-600'
                    : darkMode ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  ({tab.count})
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="p-4 flex-1">
        {activeTab === 'birthdays' && renderBirthdays()}
        {activeTab === 'anniversaries' && renderAnniversaries()}
        {activeTab === 'announcements' && renderAnnouncements()}
      </div>

      {/* Custom Scrollbar CSS */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: ${darkMode ? '#1f2937' : 'transparent'};
        }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: ${darkMode ? '#4b5563' : '#e2e8f0'}; 
          border-radius: 10px; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { 
          background: ${darkMode ? '#6b7280' : '#cbd5e1'}; 
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

const EmptyState = ({ icon: Icon, text, darkMode }) => (
  <div className={`flex flex-col items-center justify-center py-20 ${
    darkMode ? 'opacity-60' : 'opacity-40'
  }`}>
    <Icon className={`w-12 h-12 mb-3 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
    <p className={`text-sm font-medium ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
      {text}
    </p>
  </div>
);

export default CombinedEventsCard;