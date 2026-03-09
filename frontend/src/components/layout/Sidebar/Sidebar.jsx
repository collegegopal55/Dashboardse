
// import React, { useMemo } from 'react';
// import SidebarHeader from './SidebarHeader';
// import SidebarItem from './SidebarItem';
// import LogoutButton from './LogoutButton';
// import { SIDEBAR_CONTENT } from '../../../constants/dashboardConstants';
// import { useTheme } from '../../../context/ThemeContext';
// import { useSidebar } from '../../../context/SidebarContext';

// const Sidebar = ({ onOpenSettings, activeMainMenuItem }) => {
//   const { darkMode } = useTheme();
//   const { 
//     sidebarCollapsed,
//     mobileSidebarOpen, 
//     handleMouseEnter, 
//     handleMouseLeave,
//     closeMobileSidebar
//   } = useSidebar();

//   // Get sidebar content based on active main menu item
//   const sidebarItems = useMemo(() => {
//     const content = SIDEBAR_CONTENT[activeMainMenuItem] || SIDEBAR_CONTENT.Home;
    
//     return [
//       ...(content.manage ? [{
//         name: 'MANAGE',
//         icon: Settings,
//         hasDropdown: true,
//         dropdownItems: content.manage
//       }] : []),
//       ...(content.feature ? [{
//         name: 'FEATURE',
//         icon: Star,
//         hasDropdown: true,
//         dropdownItems: content.feature
//       }] : []),
//       ...(content.report ? [{
//         name: 'REPORT',
//         icon: BarChart,
//         hasDropdown: true,
//         dropdownItems: content.report
//       }] : [])
//     ];
//   }, [activeMainMenuItem]);

//   return (
//     <>
//       {/* Mobile Overlay */}
//       {mobileSidebarOpen && (
//         <div 
//           className="fixed inset-0 transparent  z-40 lg:hidden will-change-transform"
//           onClick={closeMobileSidebar}
//         />
//       )}

//       <aside 
//         className={`
//           fixed lg:static inset-y-0 left-0 z-50
//           transform transition-transform duration-200 ease-out will-change-transform
//           ${sidebarCollapsed ? 'w-20' : 'w-64'}
//           ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
//           ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
//           border-r shadow-lg flex flex-col
//           overflow-y-auto
//         `}
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//         style={{ height: '100vh' }}
//       >
//         <SidebarHeader />
        
//         <nav className="flex-1 py-4">
//           {sidebarItems.map((item) => (
//             <SidebarItem 
//               key={item.name} 
//               item={item} 
//               onOpenSettings={onOpenSettings}
//             />
//           ))}
//         </nav>

//         <LogoutButton />
//       </aside>
//     </>
//   );
// };

// // Add missing icon imports
// import { Settings, Star, BarChart } from 'lucide-react';

// export default Sidebar;

import React, { useMemo } from 'react';
import SidebarHeader from './SidebarHeader';
import SidebarItem from './SidebarItem';
import LogoutButton from './LogoutButton';
import MobileNavigation from './MobileNavigation';
import { SIDEBAR_CONTENT, MAIN_NAV_ITEMS } from '../../../constants/dashboardConstants';
import { useTheme } from '../../../context/ThemeContext';
import { useSidebar } from '../../../context/SidebarContext';

const Sidebar = ({ onOpenSettings }) => {
  const { darkMode } = useTheme();
  const { 
    sidebarCollapsed,
    mobileSidebarOpen, 
    handleMouseEnter, 
    handleMouseLeave,
    closeMobileSidebar,
    activeMainMenuItem,
    setActiveMainMenuItem
  } = useSidebar();

  // Get sidebar content based on active main menu item
  const sidebarItems = useMemo(() => {
    const content = SIDEBAR_CONTENT[activeMainMenuItem] || SIDEBAR_CONTENT.Home;
    
    return [
      ...(content.manage ? [{
        name: 'MANAGE',
        icon: Settings,
        hasDropdown: true,
        dropdownItems: content.manage
      }] : []),
      ...(content.feature ? [{
        name: 'FEATURE',
        icon: Star,
        hasDropdown: true,
        dropdownItems: content.feature
      }] : []),
      ...(content.report ? [{
        name: 'REPORT',
        icon: BarChart,
        hasDropdown: true,
        dropdownItems: content.report
      }] : [])
    ];
  }, [activeMainMenuItem]);

  return (
    <>
      {/* Mobile Overlay */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 transparent  z-40 lg:hidden will-change-transform"
          onClick={closeMobileSidebar}
        />
      )}

      <aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          transform transition-transform duration-200 ease-out will-change-transform
          ${sidebarCollapsed ? 'w-20' : 'w-64'}
          ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
          border-r shadow-lg
          flex flex-col h-screen
        `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Fixed Header */}
        <div className="flex-shrink-0">
          <SidebarHeader />
        </div>
        
        {/* Scrollable Content - Yeh area scroll hoga */}
        <div className="flex-1 overflow-y-auto min-h-0 py-4">
          {/* Mobile Main Navigation */}
          <MobileNavigation 
            mainNavItems={MAIN_NAV_ITEMS}
            activeMainMenuItem={activeMainMenuItem}
            setActiveMainMenuItem={setActiveMainMenuItem}
          />
          
          {/* Separator for mobile */}
          <div className="lg:hidden my-2 border-t border-gray-200 dark:border-gray-700"></div>
          
          {/* Sidebar Items (Manage, Feature, Report) */}
          {sidebarItems.map((item) => (
            <SidebarItem 
              key={item.name} 
              item={item} 
              onOpenSettings={onOpenSettings}
            />
          ))}
          
          {/* Extra padding for bottom */}
          <div className="h-4"></div>
        </div>

        {/* Fixed Logout Button */}
        <div className="flex-shrink-0">
          <LogoutButton />
        </div>
      </aside>
    </>
  );
};

// Add missing icon imports
import { Settings, Star, BarChart } from 'lucide-react';

export default Sidebar;