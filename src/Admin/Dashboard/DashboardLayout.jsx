import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  RiHome4Line,
  RiTeamLine,
  RiSettingsLine,
  RiCloseLine,
  RiMenuLine,
  RiSearchLine,
  RiUserLine,
  RiLogoutBoxLine,
  RiNotificationLine,
  RiSunLine,
  RiMoonLine,
  RiRobotLine,
  RiPulseLine,
  RiBankCardLine,
  RiQuestionLine,
  RiBarChartBoxLine,
  RiArrowRightSLine,
} from "react-icons/ri";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import Shivlogo from "/ShivaiLogo.svg";
// import bg from "/assets/Hero/bg.svg";
import "./AdminDashboard.css";
import lisitingService from "../../Redux-config/apisModel/lisitingService";
import toast from "react-hot-toast";

const DashboardLayoutContent = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { theme, toggleTheme, currentTheme } = useTheme();
  const navigate = useNavigate();
  const [adminInfo, setAdminInfo] = useState({ name: "", email: "" });

  const navItems = [
    {
      id: "dashboard",
      icon: RiHome4Line,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      id: "clients",
      icon: RiTeamLine,
      label: "Client Management",
      path: "/dashboard/clients",
      badge: 24,
    },
    {
      id: "ai-employees",
      icon: RiPulseLine,
      label: "AI Employee Stats",
      path: "/dashboard/ai-employees",
      badge: "NEW",
    },
    {
      id: "widgets",
      icon: RiRobotLine,
      label: "Widget Management",
      path: "/dashboard/widgets",
      badge: "NEW",
    },
    {
      id: "transactions",
      icon: RiBankCardLine,
      label: "Transactions",
      path: "/dashboard/transactions",
      badge: 12,
    },
    {
      id: "support",
      icon: RiQuestionLine,
      label: "Support Tickets",
      path: "/dashboard/support",
      badge: 5,
    },
    {
      id: "analytics",
      icon: RiBarChartBoxLine,
      label: "Analytics",
      path: "/dashboard/analytics",
    },
    {
      id: "settings",
      icon: RiSettingsLine,
      label: "Settings",
      path: "/dashboard/settings",
    },
  ];

  useEffect(() => {
    const getAdmin = async () => {
      const user = await fetchUser();
      if (user && user.name && user.email) {
        setAdminInfo({ name: user.name, email: user.email });
      }
    };
    getAdmin();
  }, []);

  // Fetch user info (admin)
  const fetchUser = async () => {
    try {
      const response = await lisitingService.getUser();
      console.log(response);

      if (response?.data?.statusCode === 200) {
        const { name, email } = response.data.data?.user;
        return {
          name: name || "Admin User",
          email: email || "admin@shivai.com",
        };
      }
      return { name: "Admin User", email: "admin@shivai.com" };
    } catch (err) {
      console.error("Error fetching admin info:", err);
      if (
        (err?.response?.data?.statusCode === 401 &&
          err.response.data.message === "Access token is required") ||
        err.response.data.message === "Token has expired" ||
        err.response.data.message === "User account not found or deactivated"
      ) {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("Authorization");
        navigate("/");
      }
      return { name: "Admin User", email: "admin@shivai.com" };
    }
  };

  const handleNavClick = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("Authorization");
    navigate("/");
  };

  // Get current active path
  const getCurrentPath = () => {
    return window.location.pathname;
  };

  // Mobile tab navigation component with theme toggle and menu tools
  const MobileTabNavigation = () => (
    <div
      className={`lg:hidden fixed top-0 left-0 mb-4 right-0 z-30 flex flex-col ${currentTheme.cardBg} backdrop-blur-md border-b ${currentTheme.border}`}
      style={{ minHeight: "px" }}
    >
      {/* Top row with theme toggle and menu tools */}
      <div className="flex items-center justify-between px-4 py-2 border-current">
        <div className="flex items-center ">
          <div
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`mr-2`}
          >
            {isMobileMenuOpen ? (
              <RiCloseLine className={`w-4 h-4 ${currentTheme.text}`} />
            ) : (
              <RiMenuLine className={`w-5 h-5 ${currentTheme.text}`} />
            )}
          </div>
          <span className={`text-sm font-medium ${currentTheme.text}`}>
            Dashboard
          </span>
        </div>

        <div className="flex items-center gap-4 justify-end">
          {/* Theme Toggle */}
          <div
            onClick={toggleTheme}
            className={` rounded-lg ${currentTheme.hover} transition-all duration-200`}
          >
            {theme === "dark" ? (
              <RiSunLine className={`w-4 h-4 ${currentTheme.textSecondary}`} />
            ) : (
              <RiMoonLine className={`w-4 h-4 ${currentTheme.textSecondary}`} />
            )}
          </div>

          {/* Notifications */}
          <div
            className={`relative  rounded-lg ${currentTheme.hover} transition-all duration-200`}
          >
            <RiNotificationLine
              className={`w-4 h-4 ${currentTheme.textSecondary}`}
            />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
          </div>

          {/* User Profile */}
          <div
            className={`p-2 rounded-lg ${currentTheme.hover} transition-all duration-200`}
          >
            <RiUserLine className={`w-4 h-4 ${currentTheme.textSecondary}`} />
          </div>

          {/* Logout */}
          <div
            onClick={handleLogout}
            className={` rounded-lg ${currentTheme.hover} transition-all duration-200`}
          >
            <RiLogoutBoxLine
              className={`w-4 h-4 ${currentTheme.textSecondary}`}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const backgroundStyle =
    theme === "dark"
      ? {
          background: "#1a1a1a",
        }
      : {
          background: "#F0F0F0",
        };

  return (
    <div
      className={`min-h-screen ${currentTheme.text} relative overflow-hidden`}
      style={backgroundStyle}
    >
      {/* Background */}
      {theme === "dark" && (
        <>
          <div className="absolute inset-0">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${currentTheme.gradient}`}
            ></div>
          </div>
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#004998] rounded-full mix-blend-multiply filter blur-3xl animate-pulse opacity-20"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
          </div>
        </>
      )}

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full no-scrollbar border-r-1 ${currentTheme.bg} ${
          currentTheme.border
        } z-50 transform transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 ${isSidebarCollapsed ? "lg:w-16" : "lg:w-64"} w-64`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className={`p-4 ${currentTheme.border} border-b`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={Shivlogo}
                  alt="ShivAi Logo"
                  className={`h-8 w-auto transition-opacity duration-300 ${
                    isSidebarCollapsed
                      ? "lg:opacity-0 lg:w-0"
                      : "lg:opacity-100"
                  }`}
                  style={
                    theme === "dark"
                      ? { filter: "brightness(0) invert(1)" }
                      : {}
                  }
                />
              </div>
              <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className={`p-2 relative -left-2 rounded-lg ${
                  currentTheme.hover
                } transition-colors ${
                  isSidebarCollapsed ? "lg:block" : "lg:hidden  hidden"
                }`}
              >
                <RiArrowRightSLine className={`w-5 h-5 ${currentTheme.text}`} />
              </button>

              <div className="flex items-end  justify-end ">
                <div
                  onClick={toggleTheme}
                  className={`p-2 rounded-lg ${currentTheme.hover} transition-colors`}
                  title={`Switch to ${
                    theme === "dark" ? "light" : "dark"
                  } mode`}
                >
                  {theme === "dark" ? (
                    <RiSunLine className={`w-5 h-5 ${currentTheme.text}`} />
                  ) : (
                    <RiMoonLine className={`w-5 h-5 ${currentTheme.text}`} />
                  )}
                </div>
                <div
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`p-2 rounded-lg ${currentTheme.hover} lg:hidden transition-colors`}
                >
                  <RiCloseLine className={`w-5 h-5 ${currentTheme.text}`} />
                </div>
                <div
                  onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                  className={`p-2 rounded-lg ${currentTheme.hover} hidden lg:flex transition-colors`}
                  title={
                    isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
                  }
                >
                  <RiArrowRightSLine
                    className={`w-5 h-5 ${
                      currentTheme.text
                    } transition-transform duration-300 ${
                      isSidebarCollapsed ? "rotate-0" : "rotate-180"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Search */}
            <div
              className={`relative transition-all duration-300 ${
                isSidebarCollapsed
                  ? "lg:opacity-0 lg:h-0 lg:overflow-hidden"
                  : "lg:opacity-100"
              }`}
            >
              <div
                className={`relative ${currentTheme.searchBg} rounded-lg ${currentTheme.border} focus-within:border-opacity-60 transition-all`}
              >
                <RiSearchLine
                  className={`absolute left-3 top-1/2 hidden lg:block transform -translate-y-1/2 w-4 h-4 ${currentTheme.textSecondary}`}
                />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full border ${currentTheme.activeBorder} pl-9 pr-3 py-1 md:py-3 bg-transparent ${currentTheme.text} placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none rounded-lg text-[9px] md:text-sm transition-all`}
                />
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto no-scrollbar">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = getCurrentPath() === item.path;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.path)}
                  className={`w-full flex items-center transition-all duration-200 group relative ${
                    isSidebarCollapsed
                      ? "justify-center px-2 py-3"
                      : "gap-3 px-4 py-3 "
                  } rounded-xl ${
                    isActive
                      ? `${currentTheme.activeBg} ${currentTheme.text} font-medium  border ${currentTheme.activeBorder} `
                      : `${currentTheme.textSecondary} ${currentTheme.hover}`
                  }`}
                  title={isSidebarCollapsed ? item.label : undefined}
                >
                  <Icon
                    className={`w-6 h-6 flex-shrink-0 transition-colors ${
                      isActive ? currentTheme.text : ""
                    }`}
                  />
                  <span
                    className={`text-sm flex-1 text-left truncate transition-all duration-300 ${
                      isSidebarCollapsed
                        ? "lg:opacity-0 lg:w-0 lg:overflow-hidden"
                        : "lg:opacity-100"
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* Tooltip for collapsed state */}
                  {isSidebarCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50 pointer-events-none">
                      {item.label}
                    </div>
                  )}
                </button>
              );
            })}
          </nav>

          {/* User Info */}
          <div className={`p-4 ${currentTheme.border} border-t`}>
            {/* User Profile */}
            <div
              className={`${
                isSidebarCollapsed
                  ? `flex items-center justify-center p-3 rounded-xl ${currentTheme.hover} transition-colors cursor-pointer mb-3 group relative`
                  : `flex items-center gap-3 p-3 rounded-xl ${currentTheme.hover} transition-colors cursor-pointer mb-3`
              }`}
            >
              <div
                className={`w-10 h-10 ${currentTheme.bg} rounded-full flex items-center justify-center flex-shrink-0`}
              >
                <RiUserLine className={`w-5 h-5 ${currentTheme.text}`} />
              </div>
              {!isSidebarCollapsed && (
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium ${currentTheme.text} truncate`}
                  >
                    {adminInfo.name || "Admin User"}
                  </p>
                  <p
                    className={`text-xs ${currentTheme.textSecondary} truncate`}
                  >
                    {adminInfo.email}
                  </p>
                </div>
              )}

              {/* Tooltip for collapsed state */}
              {isSidebarCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50 pointer-events-none">
                  {adminInfo.name || "Admin User"}
                </div>
              )}
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className={`${
                isSidebarCollapsed
                  ? "w-full flex items-center justify-center px-4 py-3 rounded-xl transition-all duration-200 group relative"
                  : "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group"
              } ${currentTheme.textSecondary} ${currentTheme.hover}`}
            >
              <RiLogoutBoxLine className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {!isSidebarCollapsed && (
                <span className="font-medium text-sm">Sign Out</span>
              )}

              {/* Tooltip for collapsed state */}
              {isSidebarCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50 pointer-events-none">
                  Sign Out
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      <MobileTabNavigation />
      {/* Main Content Area - This is where the Outlet will render */}
      <div
        className={`transition-all duration-300 ease-in-out ml-0 ${
          isSidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
        }`}
      >
        <div className={`min-h-screen ${currentTheme.bg}`}>
          {/* Top Bar - Hidden on mobile, visible on desktop */}
          <div
            className={`hidden lg:block ${currentTheme.topBarBg} border-b ${currentTheme.border} px-6 py-4`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={`text-2xl font-semibold ${theme === "light" ? "text-gray-800" : "text-green-400"} capitalize`}
                >
                  {getCurrentPath().split('/').pop() || 'Dashboard'}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  className={`p-2 ${currentTheme.hover} rounded-lg transition-colors relative`}
                >
                  <RiNotificationLine
                    className={`w-5 h-5 ${currentTheme.textSecondary}`}
                  />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>
              </div>
            </div>
          </div>

          {/* Content - This is where route components will render */}
          <div
            className={`p-2 pt-16  md:pt-16 lg:pt-6 md:p-4 lg:p-6 ${currentTheme.bg}`}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardLayout = () => {
  return (
    <ThemeProvider>
      <DashboardLayoutContent />
    </ThemeProvider>
  );
};

export default DashboardLayout;