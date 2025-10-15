import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const TemplateChart = ({ data, title }) => {
  const { currentTheme, theme } = useTheme();
  const maxValue = Math.max(...data.map(item => item.value));

  return (
    <div className={`${currentTheme.cardBg} backdrop-blur-lg rounded-2xl border ${currentTheme.border} p-6`}>
      <h3 className={`text-lg font-semibold ${currentTheme.text} mb-6`}>{title}</h3>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className={`${currentTheme.text} font-medium`}>{item.name}</span>
              <span className={`${currentTheme.textSecondary} text-sm`}>{item.value} uses</span>
            </div>
            <div className={`w-full bg-gray-200 rounded-full h-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateChart;