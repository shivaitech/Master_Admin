import React from 'react';
import { 
  BarChart3, 
  Clock, 
  DollarSign, 
  Star,
  TrendingUp
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import MetricCard from './common/MetricCard';
import TemplateChart from './common/TemplateChart';

const AnalyticsOptimized = () => {
  const { currentTheme } = useTheme();

  const metrics = [
    {
      label: 'Monthly Conversion',
      value: '68%',
      change: '+5% from last month',
      changeColor: 'text-green-500',
      icon: BarChart3,
      iconBg: 'bg-gradient-to-r from-blue-500 to-blue-600'
    },
    {
      label: 'Avg Response Time',
      value: '2.4hrs',
      change: '-0.5hrs improvement',
      changeColor: 'text-green-500',
      icon: Clock,
      iconBg: 'bg-gradient-to-r from-orange-500 to-orange-600'
    },
    {
      label: 'Revenue This Month',
      value: '$2.4M',
      change: '+18% from last month',
      changeColor: 'text-green-500',
      icon: DollarSign,
      iconBg: 'bg-gradient-to-r from-green-500 to-green-600'
    },
    {
      label: 'Client Satisfaction',
      value: '4.8/5',
      change: '+0.2 improvement',
      changeColor: 'text-green-500',
      icon: Star,
      iconBg: 'bg-gradient-to-r from-purple-500 to-purple-600'
    }
  ];

  const templateData = [
    { name: 'Basic Proposal', value: 45 },
    { name: 'Enterprise', value: 23 },
    { name: 'Custom Dev', value: 12 }
  ];

  const templateData2 = [
    { name: 'Basic Proposal', value: 45 },
    { name: 'Enterprise', value: 23 },
    { name: 'Custom Dev', value: 12 }
  ];

  return (
    <div className="space-y-8">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} metric={metric} index={index} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TemplateChart data={templateData} title="Top Templates" />
        <TemplateChart data={templateData2} title="Top Templates" />
      </div>

      {/* Performance Overview */}
      <div className="relative group">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 blur-xl"></div>
        <div className={`relative ${currentTheme.cardBg} backdrop-blur-lg rounded-2xl border ${currentTheme.border} p-6`}>
          <h2 className={`text-xl font-bold ${currentTheme.text} mb-6`}>Performance Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-lg font-semibold ${currentTheme.text} mb-1`}>Revenue Growth</h3>
              <p className={`${currentTheme.textSecondary} text-sm mb-2`}>+18% this month</p>
              <div className={`w-full rounded-full h-2 ${currentTheme.theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full w-3/4"></div>
              </div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-lg font-semibold ${currentTheme.text} mb-1`}>Conversion Rate</h3>
              <p className={`${currentTheme.textSecondary} text-sm mb-2`}>68% success rate</p>
              <div className={`w-full rounded-full h-2 ${currentTheme.theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full w-4/5"></div>
              </div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-lg font-semibold ${currentTheme.text} mb-1`}>Satisfaction</h3>
              <p className={`${currentTheme.textSecondary} text-sm mb-2`}>4.8/5 average</p>
              <div className={`w-full rounded-full h-2 ${currentTheme.theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsOptimized;