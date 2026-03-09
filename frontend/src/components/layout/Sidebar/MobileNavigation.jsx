import React from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { useMobile } from '../../../hooks/useMobile';

const MobileNavigation = ({ 
  mainNavItems, 
  activeMainMenuItem, 
  setActiveMainMenuItem 
}) => {
  const { darkMode } = useTheme();
  const { isMobile } = useMobile();

  // Only show on mobile
  if (!isMobile) return null;

  return (
    <div className="px-2 mb-4 lg:hidden">
      <h3 className="px-2 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
        Main Menu
      </h3>
      <div className="space-y-1">
        {mainNavItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActiveMainMenuItem(item.name)}
            className={`
              flex items-center w-full px-4 py-2.5 rounded-lg
              transition-colors duration-150
              ${activeMainMenuItem === item.name
                ? darkMode
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-50 text-blue-600'
                : darkMode
                  ? 'text-gray-300 hover:bg-gray-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }
            `}
          >
            <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
            <span className="text-sm font-medium truncate">{item.name}</span>
            
            {/* Active indicator */}
            {activeMainMenuItem === item.name && (
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileNavigation;