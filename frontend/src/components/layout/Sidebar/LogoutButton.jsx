// import React from 'react';
// import { LogOut } from 'lucide-react';
// import { useTheme } from '../../../context/ThemeContext';
// import { useSidebar } from '../../../context/SidebarContext';
// import { useMobile } from '../../../hooks/useMobile';

// const LogoutButton = () => {
//   const { darkMode } = useTheme();
//   const { sidebarCollapsed } = useSidebar();
//   const { isMobile } = useMobile();

//   const shouldShowFull = isMobile || !sidebarCollapsed;

//   return (
//     <div className={`p-2 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex-shrink-0`}>
//       <button
//         className={`
//           flex items-center w-full px-4 py-2 rounded-lg
//           transition-colors duration-150
//           ${!shouldShowFull ? 'justify-center' : 'justify-start'}
//           ${darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}
//         `}
//       >
//         <LogOut className={`w-5 h-5 ${!shouldShowFull ? '' : 'mr-3'}`} />
//         {shouldShowFull && <span className="text-sm font-medium">Logout</span>}
//       </button>
//     </div>
//   );
// };

// export default LogoutButton;

import React from 'react';
import { LogOut } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import { useSidebar } from '../../../context/SidebarContext';
import { useMobile } from '../../../hooks/useMobile';

const LogoutButton = () => {
  const { darkMode } = useTheme();
  const { sidebarCollapsed } = useSidebar();
  const { isMobile } = useMobile();

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logout clicked');
  };

  const shouldShowFull = isMobile || !sidebarCollapsed;

  return (
    <div className={`p-2 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} bg-inherit`}>
      <button
        onClick={handleLogout}
        className={`
          flex items-center w-full px-4 py-3 rounded-lg
          transition-colors duration-150
          ${shouldShowFull ? 'justify-start' : 'justify-center'}
          ${darkMode 
            ? 'text-gray-400 hover:bg-gray-700 hover:text-gray-200' 
            : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
          }
        `}
      >
        <LogOut className={`w-5 h-5 ${shouldShowFull ? 'mr-3' : ''}`} />
        {shouldShowFull && <span className="text-sm font-medium">Logout</span>}
      </button>
    </div>
  );
};

export default LogoutButton;