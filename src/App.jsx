import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { AuthProvider } from "./Admin/Auth/AuthContext";
import { ThemeProvider } from "./Admin/Dashboard/contexts/ThemeContext";
import ScriptLoader from "./components/ScriptLoader";

// Error boundary for lazy loading failures
class LazyLoadErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Lazy loading failed:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-bold text-slate-700 mb-2">Loading Error</h2>
            <p className="text-slate-600 mb-4">Failed to load component. Please refresh the page.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Lazy load components with better error handling
const createLazyComponent = (importFunc, componentName) => {
  return lazy(() => 
    importFunc().catch((error) => {
      console.error(`Failed to load ${componentName}:`, error);
      return { default: () => <div>Error loading {componentName}</div> };
    })
  );
};

const Authentication = createLazyComponent(
  () => import("./Admin/Auth/Authentication"),
  "Authentication"
);
const DashboardLayout = createLazyComponent(
  () => import("./Admin/Dashboard/DashboardLayout"),
  "DashboardLayout"
);
const DashboardHome = createLazyComponent(
  () => import("./Admin/Dashboard/DashboardOverview/DashboardHome"),
  "DashboardHome"
);
const ClientManagement = createLazyComponent(
  () => import("./Admin/Dashboard/Client Management/ClientManagement"),
  "ClientManagement"
);
const ClientDetailsPage = createLazyComponent(
  () => import("./Admin/Dashboard/Client Management/ClientDetailsPage"),
  "ClientDetailsPage"
);
const AIEmployeeStatsContainer = createLazyComponent(
  () => import("./Admin/Dashboard/AIEmployeeStats"),
  "AIEmployeeStatsContainer"
);
const WidgetManagement = createLazyComponent(
  () => import("./Admin/Dashboard/Widget/WidgetManagementPlaceholder"),
  "WidgetManagement"
);
const TransactionManagement = createLazyComponent(
  () => import("./Admin/Dashboard/components/TransactionManagement"),
  "TransactionManagement"
);
const SupportTickets = createLazyComponent(
  () => import("./Admin/Dashboard/components/SupportTickets"),
  "SupportTickets"
);
const AnalyticsOptimized = createLazyComponent(
  () => import("./Admin/Dashboard/components/AnalyticsOptimized"),
  "AnalyticsOptimized"
);
const SystemSettings = createLazyComponent(
  () => import("./Admin/Dashboard/components/SystemSettings"),
  "SystemSettings"
);

// Simple Loading component
const LoadingFallback = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
    <div className="text-center">
      <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-slate-600">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <AuthProvider>
          <LazyLoadErrorBoundary>
            <Suspense fallback={<LoadingFallback />}>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Authentication />} />
                  <Route path="/login" element={<Authentication />} />
                  <Route path="/test/script-loader" element={<ScriptLoader />} />
                  
                  {/* Dashboard Layout with Outlet */}
                  <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<DashboardHome />} />
                    <Route path="clients" element={<ClientManagement />} />
                    <Route path="clients/:clientId" element={<ClientDetailsPage />} />
                    <Route path="ai-employees" element={<AIEmployeeStatsContainer />} />
                    <Route path="widgets" element={<WidgetManagement />} />
                    <Route path="transactions" element={<TransactionManagement />} />
                    <Route path="support" element={<SupportTickets />} />
                    <Route path="analytics" element={<AnalyticsOptimized />} />
                    <Route path="settings" element={<SystemSettings />} />
                  </Route>

                  {/* Legacy routes for backward compatibility */}
                  <Route path="/client-management" element={<ClientManagement />} />

                  {/* Catch-all route */}
                  <Route
                    path="*"
                    element={
                      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
                        <div className="text-center space-y-4">
                          <h2 className="text-2xl font-bold text-gray-900">
                            Page Not Found
                          </h2>
                          <p className="text-gray-600">
                            The page you're looking for doesn't exist.
                          </p>
                          <button
                            onClick={() => (window.location.href = "/")}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Go to Login
                          </button>
                        </div>
                      </div>
                    }
                  />
                </Routes>
                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 3000,
                    style: {
                      background: "#333",
                      color: "#fff",
                    },
                  }}
                />
              </BrowserRouter>
            </Suspense>
          </LazyLoadErrorBoundary>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}export default App;
