import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import SettingsPopup from './SettingsPopup';
import { useTheme } from '../../context/ThemeContext';
import { useSidebar } from '../../context/SidebarContext';

const Layout = ({ children }) => {
  const { darkMode } = useTheme();
  const { sidebarCollapsed } = useSidebar();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState('visibility');
  const [activeMainMenuItem, setActiveMainMenuItem] = useState('Home');

  const handleOpenSettings = (tab = 'visibility') => {
    setSettingsTab(tab);
    setSettingsOpen(true);
  };

  const handleMainNavClick = (itemName) => {
    setActiveMainMenuItem(itemName);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Header 
        onOpenSettings={() => handleOpenSettings('visibility')}
        activeMenuItem={activeMainMenuItem}
        setActiveMenuItem={handleMainNavClick}
      />
      
      <Sidebar 
        onOpenSettings={handleOpenSettings}
        activeMainMenuItem={activeMainMenuItem}
      />
      
      <main
        className={`
          pt-16 transition-all duration-300
          ${sidebarCollapsed ? 'ml-20' : 'ml-64'}
        `}
      >
        <div className="p-6">
          {children}
        </div>
      </main>

      <SettingsPopup
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        initialTab={settingsTab}
      />
    </div>
  );
};

export default Layout;