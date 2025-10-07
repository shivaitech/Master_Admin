import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const MetricCard = ({ metric, index }) => {
  const { currentTheme } = useTheme();

  return (
    <div className="relative group">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/20 to-cyan-400/20 blur-xl group-hover:blur-2xl transition-all duration-300"></div>
      <div className={`relative ${currentTheme.cardBg} backdrop-blur-lg rounded-2xl border ${currentTheme.border} p-6 hover:border-opacity-40 transition-all duration-300`}>
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl ${metric.iconBg} flex items-center justify-center`}>
            <metric.icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex items-center gap-1">
            <span className={`${metric.changeColor} text-sm font-medium`}>
              {metric.change}
            </span>
          </div>
        </div>
        <h3 className={`text-2xl font-bold ${currentTheme.text} mb-1`}>{metric.value}</h3>
        <p className={`${currentTheme.textSecondary} text-sm`}>{metric.label}</p>
      </div>
    </div>
  );
};

export default MetricCard;