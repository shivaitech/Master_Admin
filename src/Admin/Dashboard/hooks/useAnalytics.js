import { useState, useEffect, useCallback } from 'react';

// Custom hook for analytics data management
export const useAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sample data - replace with actual API calls
  const fetchAnalyticsData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Sample data matching your image
      const data = {
        metrics: [
          {
            title: 'Monthly Conversion',
            value: '68%',
            change: '+5% from last month',
            changeType: 'positive',
            icon: 'chart',
            color: 'blue'
          },
          {
            title: 'Avg Response Time',
            value: '2.4hrs',
            change: '-0.5hrs improvement',
            changeType: 'positive',
            icon: 'clock',
            color: 'orange'
          },
          {
            title: 'Revenue This Month',
            value: '$2.4M',
            change: '+18% from last month',
            changeType: 'positive',
            icon: 'dollar',
            color: 'green'
          },
          {
            title: 'Client Satisfaction',
            value: '4.8/5',
            change: '+0.2 improvement',
            changeType: 'positive',
            icon: 'star',
            color: 'purple'
          }
        ],
        topTemplates: [
          { name: 'Basic Proposal', value: 45 },
          { name: 'Enterprise', value: 23 },
          { name: 'Custom Dev', value: 12 }
        ]
      };

      setAnalyticsData(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch analytics data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalyticsData();
  }, [fetchAnalyticsData]);

  // Refresh data function
  const refreshData = useCallback(() => {
    fetchAnalyticsData();
  }, [fetchAnalyticsData]);

  return {
    analyticsData,
    isLoading,
    error,
    refreshData
  };
};

// Hook for real-time data updates
export const useRealTimeAnalytics = (interval = 30000) => {
  const { analyticsData, isLoading, error, refreshData } = useAnalytics();

  useEffect(() => {
    if (interval > 0) {
      const intervalId = setInterval(refreshData, interval);
      return () => clearInterval(intervalId);
    }
  }, [refreshData, interval]);

  return {
    analyticsData,
    isLoading,
    error,
    refreshData
  };
};

// Hook for filtering and searching analytics data
export const useAnalyticsFilters = (data) => {
  const [filters, setFilters] = useState({
    dateRange: '30days',
    templateType: 'all',
    sortBy: 'usage'
  });

  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const filteredData = useCallback(() => {
    if (!data) return null;

    let filtered = { ...data };

    // Apply filters here based on your requirements
    if (filters.templateType !== 'all') {
      filtered.topTemplates = filtered.topTemplates.filter(
        template => template.type === filters.templateType
      );
    }

    // Sort templates
    if (filters.sortBy === 'usage') {
      filtered.topTemplates.sort((a, b) => b.value - a.value);
    } else if (filters.sortBy === 'alphabetical') {
      filtered.topTemplates.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [data, filters]);

  return {
    filters,
    updateFilter,
    filteredData: filteredData()
  };
};