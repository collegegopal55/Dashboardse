import React from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { MAIN_NAV_ITEMS } from '../../../constants/dashboardConstants';

const DesktopMainNav = ({ activeMenuItem, setActiveMenuItem, sidebarCollapsed }) => {
  const { darkMode } = useTheme();

  // Agar sidebar collapsed hai to icons ke saath vertical layout
  if (sidebarCollapsed) {
    return (
      <div className="space-y-1">
        {MAIN_NAV_ITEMS.map((item) => (
          <button
            key={item.name}
            onClick={() => setActiveMenuItem(item.name)}
            className={`
              flex items-center justify-center w-full py-3 rounded-lg
              transition-colors duration-150 relative group
              ${activeMenuItem === item.name
                ? darkMode
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-50 text-blue-600'
                : darkMode
                  ? 'text-gray-400 hover:bg-gray-700 hover:text-gray-200'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
              }
            `}
            title={item.name}
          >
            <item.icon className="w-5 h-5" />
            
            {/* Tooltip */}
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50 pointer-events-none">
              {item.name}
            </div>
          </button>
        ))}
      </div>
    );
  }

  // Normal view with icons and text
  return (
    <div className="space-y-1">
      {MAIN_NAV_ITEMS.map((item) => (
        <button
          key={item.name}
          onClick={() => setActiveMenuItem(item.name)}
          className={`
            flex items-center w-full px-4 py-2.5 rounded-lg
            transition-colors duration-150
            ${activeMenuItem === item.name
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
          {activeMenuItem === item.name && (
            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400"></span>
          )}
        </button>
      ))}
    </div>
  );
};

export default DesktopMainNav;