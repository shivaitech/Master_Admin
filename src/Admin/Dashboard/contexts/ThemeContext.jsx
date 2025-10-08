import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); 

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const themes = {
    dark: {
      bg: 'bg-[#1a1a1a]',
      cardBg: 'bg-[#2a2a2a]',
      border: 'border-[#404040]',
      text: 'text-[#f0f0f0]',
      textSecondary: 'text-[#a0a0a0]',
      hover: 'hover:bg-[#404040]',
      sidebarBg: 'bg-[#2a2a2a]',
      topBarBg: 'bg-[#2a2a2a]',
      gradient: 'from-[#1a1a1a] to-[#2a2a2a]',
      searchBg: 'bg-[#333333]',
      activeBg: 'bg-[#404040]',
      activeBorder: 'border-[#5a5a59]',
      shadow: 'shadow-lg shadow-black/20',
      cardShadow: 'shadow-lg shadow-black/10'
    },
    light: {
      bg: 'bg-[#F0F0F0]',
      cardBg: 'bg-white',
      border: 'border-[#e0e0e0]',
      text: 'text-[#333333]',
      textSecondary: 'text-[#5A5A59]',
      hover: 'hover:bg-[#f8f8f8]',
      sidebarBg: 'bg-white',
      topBarBg: 'bg-white/95',
      gradient: 'from-[#F0F0F0] to-white',
      searchBg: 'bg-[#f8f8f8]',
      activeBg: 'bg-[#f0f0f0]',
      activeBorder: 'border-[#333333]',
      shadow: 'shadow-md shadow-gray-200/50',
      cardShadow: 'shadow-md shadow-gray-200/30'
    }
  };

  const currentTheme = themes[theme];

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};