import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { AuthProvider } from "./Admin/Auth/AuthContext";

// Lazy load components
const Authentication = lazy(() => import("./Admin/Auth/Authentication"));
const AdminDashboard = lazy(() => import("./Admin/Dashboard/AdminDashboard"));

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
      <AuthProvider>
        <Suspense fallback={<LoadingFallback />}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Authentication />} />
              <Route path="/login" element={<Authentication />} />
              <Route path="/dashboard" element={<AdminDashboard />} />
              <Route path="/dashboard/*" element={<AdminDashboard />} />

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
      </AuthProvider>
    </div>
  );
}

export default App;
