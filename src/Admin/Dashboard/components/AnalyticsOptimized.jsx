import React from 'react';
import { 
  BarChart3, 
  Clock, 
  DollarSign, 
  Star,
  Users,
  TrendingUp,
  Activity
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const AnalyticsOptimized = () => {
  const { currentTheme } = useTheme();

  const metrics = [
    {
      label: 'Active Clients',
      value: '2,847',
      subtitle: 'Paying subscriber',
      change: '+12.5%',
      icon: Users
    },
    {
      label: 'Monthly Revenue',
      value: '$45.2K',
      subtitle: 'Subscription revenue',
      change: '+18.2%',
      icon: DollarSign
    },
    {
      label: 'AI Employees',
      value: '8,451',
      subtitle: 'Serving customers',
      change: '+7%',
      icon: Activity
    },
    {
      label: 'Satisfaction',
      value: '4.8/5',
      subtitle: 'Average rating',
      change: '+0.2',
      icon: Star
    }
  ];

  const recentActivities = [
    {
      company: 'TechCorp Solutions',
      action: 'Upgraded to Premium',
      employees: '12 AI Employees',
      amount: '$2,400/mo',
      time: '2 hours ago',
      icon: TrendingUp
    },
    {
      company: 'Marketing Masters',
      action: 'Added 3 new AI Employees',
      employees: '8 AI Employees',
      amount: '$1,200/mo',
      time: '5 hours ago',
      icon: Users
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className={`${currentTheme?.cardBg || 'bg-white'} border ${currentTheme?.border || 'border-gray-200'} rounded-lg p-4`}>
            <div className="flex items-center justify-between mb-3">
              <metric.icon className={`w-5 h-5 ${currentTheme?.textSecondary || 'text-gray-400'}`} />
              <span className="text-xs font-medium text-green-600">
                {metric.change}
              </span>
            </div>
            <div>
              <p className={`text-2xl font-bold ${currentTheme?.text || 'text-gray-900'} mb-1`}>
                {metric.value}
              </p>
              <p className={`text-sm font-medium ${currentTheme?.text || 'text-gray-900'} mb-0.5`}>
                {metric.label}
              </p>
              <p className={`text-xs ${currentTheme?.textSecondary || 'text-gray-500'}`}>
                {metric.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Client Activity */}
      <div className={`${currentTheme?.cardBg || 'bg-white'} border ${currentTheme?.border || 'border-gray-200'} rounded-lg p-6`}>
        <div className="flex items-center mb-4">
          <Users className={`w-5 h-5 ${currentTheme?.text || 'text-gray-900'} mr-2`} />
          <h2 className={`text-lg font-semibold ${currentTheme?.text || 'text-gray-900'}`}>Recent Client Activity</h2>
        </div>
        
        <p className={`text-sm ${currentTheme?.textSecondary || 'text-gray-600'} mb-6`}>
          Recent Client Activities
        </p>

        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-start justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-start space-x-3">
                <div className={`p-2 ${currentTheme?.searchBg || 'bg-gray-50'} rounded-lg`}>
                  <activity.icon className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <h4 className={`font-medium ${currentTheme?.text || 'text-gray-900'}`}>
                    {activity.company}
                  </h4>
                  <p className={`text-sm ${currentTheme?.textSecondary || 'text-gray-600'}`}>
                    {activity.action}
                  </p>
                  <p className={`text-sm ${currentTheme?.textSecondary || 'text-gray-600'}`}>
                    {activity.employees}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium ${currentTheme?.text || 'text-gray-900'}`}>
                  {activity.amount}
                </p>
                <p className={`text-xs ${currentTheme?.textSecondary || 'text-gray-500'}`}>
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className={`${currentTheme?.cardBg || 'bg-white'} border ${currentTheme?.border || 'border-gray-200'} rounded-lg p-6`}>
        <div className="flex items-center mb-4">
          <Clock className={`w-5 h-5 ${currentTheme?.text || 'text-gray-900'} mr-2`} />
          <h2 className={`text-lg font-semibold ${currentTheme?.text || 'text-gray-900'}`}>Quick Actions</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button className="flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Users className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium text-blue-700">Add New Client</span>
          </button>

          <button className="flex items-center space-x-3 p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
            <div className="p-2 bg-purple-500 rounded-lg">
              <Star className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium text-purple-700">Create Service Plan</span>
          </button>

          <button className="flex items-center space-x-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
            <div className="p-2 bg-green-500 rounded-lg">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium text-green-700">Revenue Report</span>
          </button>

          <button className="flex items-center space-x-3 p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
            <div className="p-2 bg-orange-500 rounded-lg">
              <Clock className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium text-orange-700">Support Center</span>
          </button>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className={`${currentTheme?.cardBg || 'bg-white'} border ${currentTheme?.border || 'border-gray-200'} rounded-lg p-6`}>
        <div className="flex items-center mb-4">
          <TrendingUp className={`w-5 h-5 ${currentTheme?.text || 'text-gray-900'} mr-2`} />
          <h2 className={`text-lg font-semibold ${currentTheme?.text || 'text-gray-900'}`}>Recent Transactions</h2>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className={`font-medium ${currentTheme?.text || 'text-gray-900'}`}>
                  Payment received
                </p>
                <p className={`text-sm ${currentTheme?.textSecondary || 'text-gray-600'}`}>
                  TechCorp Solutions
                </p>
                <p className={`text-xs ${currentTheme?.textSecondary || 'text-gray-500'}`}>
                  2 minutes ago
                </p>
              </div>
            </div>
            <p className="font-semibold text-green-600">$2,400</p>
          </div>

          <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className={`font-medium ${currentTheme?.text || 'text-gray-900'}`}>
                  New client registered
                </p>
                <p className={`text-sm ${currentTheme?.textSecondary || 'text-gray-600'}`}>
                  DataFlow Industries
                </p>
                <p className={`text-xs ${currentTheme?.textSecondary || 'text-gray-500'}`}>
                  15 minutes ago
                </p>
              </div>
            </div>
            <p className={`font-semibold ${currentTheme?.text || 'text-gray-600'}`}>Enterprise</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsOptimized;