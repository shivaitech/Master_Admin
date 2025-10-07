import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import authService from "../../Redux-config/apisModel/authService";
import {
  Eye,
  EyeOff,
  Loader2,
  Mic,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  Mail,
  Lock,
} from "lucide-react";
const Authentication = () => {
  const [authMode, setAuthMode] = useState("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
  });

  // Check if user is already authenticated
  useEffect(() => {
    const checkAuth = () => {
      const token =
        localStorage.getItem("Authorization")
      // const isAuth =
      //   localStorage.getItem("isAuthenticated") ||
      //   sessionStorage.getItem("isAuthenticated");

      if (token) {
        navigate("/dashboard", { replace: true });
      }
    };

    checkAuth();
  }, [navigate]);

  // Validation rules
  const emailRules = {
    required: "Email is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address",
    },
  };

  const passwordRules = {
    required: "Password is required",
    minLength: {
      value: 4,
      message: "Password must be at least 4 characters",
    },
  };

  // Mode switching
  const switchMode = (mode) => {
    setAuthMode(mode);
    setAuthError("");
    setSuccessMessage("");
    reset();
  };

  // Form submission
  const onSubmit = async (data) => {
    setIsLoading(true);
    setAuthError("");
    setSuccessMessage("");

    try {
      if (authMode === "signin") {
        await handleSignIn(data);
      } else {
        await handleForgotPassword(data);
      }
    } catch (error) {
      setAuthError(error.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (data) => {
    try {
      // Call the API login service
      const response = await authService.login({
        email: data.email,
        password: data.password,
      });

      console.log("Login response:", response);

      // Check if login was successful
      if (
        response.data?.status_code === 200 ||
        response.data?.data?.tokens?.accessToken
      ) {
        const token =
          response.data?.data?.tokens?.accessToken || response.token;
        const userData = response.data?.data?.user;

        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem("Authorization", token);
        storage.setItem("isAuthenticated", "true");
        storage.setItem("user", JSON.stringify(userData));

        // Always store token in localStorage for API calls
        localStorage.setItem("Authorization", token);

        navigate("/dashboard");
      } else {
        throw new Error(
          response.message || "Login failed. Please check your credentials."
        );
      }
    } catch (error) {
      console.error("Login error:", error);

      // Handle different error scenarios
      if (
        error.response?.status === 401 ||
        error.message?.includes("401") ||
        error.message?.includes("Unauthorized")
      ) {
        throw new Error(
          "Invalid email or password. Please check your credentials and try again."
        );
      } else if (error.response?.status === 403) {
        throw new Error("Access forbidden. Please contact your administrator.");
      } else if (error.response?.status >= 500) {
        throw new Error(
          "Server error. Please try again later or contact support."
        );
      } else if (
        error.code === "NETWORK_ERROR" ||
        error.message?.includes("Network") ||
        !navigator.onLine
      ) {
        throw new Error(
          "Network error. Please check your internet connection and try again."
        );
      } else if (
        error.code === "TIMEOUT" ||
        error.message?.includes("timeout")
      ) {
        throw new Error("Request timeout. Please try again.");
      } else {
        throw new Error(
          error.response?.data?.message ||
            error.message ||
            "Login failed. Please try again."
        );
      }
    }
  };

  const handleForgotPassword = async (data) => {
    try {
      // Call the forgot password API
      const response = await authService.forgotPass({
        email: data.email,
      });

      console.log("Forgot password response:", response);

      // Check if request was successful
      if (response.success) {
        setSuccessMessage(
          response.message ||
            "Password reset instructions have been sent to your email"
        );
      } else {
        throw new Error(response.message || "Failed to send reset email");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      throw new Error(
        error.message ||
          "Failed to send password reset email. Please try again."
      );
    }
  };

  // Handle social authentication (placeholder for future implementation)
  const handleSocialAuth = async (provider) => {
    setIsLoading(true);
    setAuthError("");
    try {
      // TODO: Implement actual social auth API integration
      // This is a placeholder for future social auth implementation
      setAuthError(
        `${provider} authentication is not yet implemented. Please use email/password login.`
      );
    } catch (error) {
      setAuthError(`${provider} authentication failed. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    authService.logout();
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    localStorage.removeItem("Authorization");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Minimalistic Gray Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-50 to-white">
          {/* Neural Network Pattern */}
          <div className="absolute inset-0 opacity-20">
            <svg
              className="w-full h-full"
              viewBox="0 0 800 600"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient
                  id="aiGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#6B7280" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#9CA3AF" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#4B5563" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              {/* Neural Network Nodes */}
              <g fill="url(#aiGradient)">
                <circle cx="100" cy="100" r="4">
                  <animate
                    attributeName="opacity"
                    values="0.3;1;0.3"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="200" cy="80" r="3">
                  <animate
                    attributeName="opacity"
                    values="0.5;1;0.5"
                    dur="2.5s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="300" cy="120" r="5">
                  <animate
                    attributeName="opacity"
                    values="0.2;0.8;0.2"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="150" cy="200" r="3">
                  <animate
                    attributeName="opacity"
                    values="0.4;1;0.4"
                    dur="3.5s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="250" cy="180" r="4">
                  <animate
                    attributeName="opacity"
                    values="0.3;0.9;0.3"
                    dur="2.8s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="350" cy="220" r="3">
                  <animate
                    attributeName="opacity"
                    values="0.6;1;0.6"
                    dur="3.2s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="180" cy="300" r="4">
                  <animate
                    attributeName="opacity"
                    values="0.2;0.7;0.2"
                    dur="4.5s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="280" cy="280" r="5">
                  <animate
                    attributeName="opacity"
                    values="0.4;1;0.4"
                    dur="2.2s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="380" cy="320" r="3">
                  <animate
                    attributeName="opacity"
                    values="0.5;0.8;0.5"
                    dur="3.8s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>

              {/* Connecting Lines */}
              <g
                stroke="url(#aiGradient)"
                strokeWidth="1"
                fill="none"
                opacity="0.4"
              >
                <line x1="100" y1="100" x2="200" y2="80">
                  <animate
                    attributeName="stroke-opacity"
                    values="0.2;0.6;0.2"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </line>
                <line x1="200" y1="80" x2="300" y2="120">
                  <animate
                    attributeName="stroke-opacity"
                    values="0.1;0.5;0.1"
                    dur="2.5s"
                    repeatCount="indefinite"
                  />
                </line>
                <line x1="100" y1="100" x2="150" y2="200">
                  <animate
                    attributeName="stroke-opacity"
                    values="0.3;0.7;0.3"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </line>
                <line x1="200" y1="80" x2="250" y2="180">
                  <animate
                    attributeName="stroke-opacity"
                    values="0.2;0.6;0.2"
                    dur="3.5s"
                    repeatCount="indefinite"
                  />
                </line>
                <line x1="300" y1="120" x2="350" y2="220">
                  <animate
                    attributeName="stroke-opacity"
                    values="0.4;0.8;0.4"
                    dur="2.8s"
                    repeatCount="indefinite"
                  />
                </line>
                <line x1="150" y1="200" x2="280" y2="280">
                  <animate
                    attributeName="stroke-opacity"
                    values="0.2;0.5;0.2"
                    dur="3.2s"
                    repeatCount="indefinite"
                  />
                </line>
                <line x1="250" y1="180" x2="380" y2="320">
                  <animate
                    attributeName="stroke-opacity"
                    values="0.3;0.6;0.3"
                    dur="4.5s"
                    repeatCount="indefinite"
                  />
                </line>
              </g>
            </svg>
          </div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <pattern
                  id="grid"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 20 0 L 0 0 0 20"
                    fill="none"
                    stroke="#9CA3AF"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Floating AI Elements */}
          <div className="absolute top-20 right-20 w-16 h-16 opacity-30">
            <div className="w-full h-full border-2 border-gray-400 rounded-lg transform rotate-45">
              <div className="w-2 h-2 bg-gray-400 rounded-full absolute top-1 left-1"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full absolute bottom-1 right-1"></div>
            </div>
          </div>

          <div className="absolute bottom-32 left-16 w-12 h-12 opacity-25">
            <div className="w-full h-full border border-gray-500 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-gray-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Binary Code Pattern */}
          <div className="absolute top-40 left-10 opacity-20 text-gray-500 text-xs font-mono">
            <div className="animate-pulse">1010</div>
            <div className="animate-pulse" style={{ animationDelay: "0.5s" }}>
              0110
            </div>
            <div className="animate-pulse" style={{ animationDelay: "1s" }}>
              1101
            </div>
          </div>

          <div className="absolute bottom-20 right-32 opacity-15 text-gray-400 text-xs font-mono">
            <div className="animate-pulse" style={{ animationDelay: "1.5s" }}>
              AI
            </div>
            <div className="animate-pulse" style={{ animationDelay: "2s" }}>
              ML
            </div>
            <div className="animate-pulse" style={{ animationDelay: "2.5s" }}>
              NLP
            </div>
          </div>
        </div>

        {/* Left Side - Branding & Marketing Content */}
        <div className="relative z-10 flex flex-col justify-center p-12 text-gray-800 h-full w-full">
          {/* Logo and Tagline */}
          <div className="flex items-center mb-8">
            <img
              src="/assets/ShivaiLogo2.svg"
              alt="ShivAI Logo"
              className="h-10 mr-3"
            />
          </div>
          {/* Slogan */}
          <div className="mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
              Transform <br />
              Business With <br />
              <span className="text-gray-700">ShivAi</span>
            </h1>
          </div>
          {/* Description */}
          <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-md">
            Empower your business with advanced AI voice agents that understand,
            respond, and deliver results{" "}
            <span className="font-semibold">24/7</span>.
          </p>
          {/* Features List */}
          <ul className="space-y-3 mb-8">
            <li className="flex items-center">
              <Mic className="w-5 h-5 mr-3 text-gray-600" />
              <span className="text-gray-700">
                Conversational AI for customer support
              </span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-3 text-gray-600" />
              <span className="text-gray-700">
                Automate repetitive tasks and boost productivity
              </span>
            </li>
            <li className="flex items-center">
              <AlertCircle className="w-5 h-5 mr-3 text-gray-600" />
              <span className="text-gray-700">
                Real-time analytics & actionable insights
              </span>
            </li>
          </ul>
          {/* Call to Action */}
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 bg-[#F9FAFB]">
        <div className="w-full max-w-md">
          {/* Brand Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-900 rounded-xl mb-4 shadow-sm">
              <Mic className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {authMode === "signin" ? "Welcome Back" : "Reset Password"}
            </h2>
            <p className="text-gray-600 text-sm">
              {authMode === "signin"
                ? "Sign in to access your dashboard"
                : "Enter your email to receive password reset instructions"}
            </p>
          </div>

          {/* Main Form Container */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 relative shadow-lg">
            {/* Loading Overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-white bg-opacity-80 backdrop-blur-sm rounded-xl flex items-center justify-center z-50">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                  <p className="text-sm text-gray-600 font-medium">
                    {authMode === "signin"
                      ? "Signing you in..."
                      : "Sending reset email..."}
                  </p>
                </div>
              </div>
            )}

            {/* Minimal top accent */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            {/* Navigation */}
            {authMode === "forgot-password" && (
              <button
                onClick={() => switchMode("signin")}
                className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors gap-2 p-2 -ml-2 rounded-lg hover:bg-gray-50"
              >
                <ArrowLeft className="w-4 h-4 flex-shrink-0" />
                <span>Back to Sign In</span>
              </button>
            )}

            {/* Error Message */}
            {authError && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-red-700 text-sm leading-relaxed">
                    {authError}
                  </p>
                </div>
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-green-700 text-sm leading-relaxed">
                    {successMessage}
                  </p>
                </div>
              </div>
            )}

            {/* Demo Credentials Info */}
            {/* {authMode === "signin" && !authError && !successMessage && (
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-white rounded-full mx-auto mt-1"></div>
                  </div>
                  <div>
                    <p className="text-blue-700 text-sm font-medium mb-1">Demo Access</p>
                    <p className="text-blue-600 text-xs leading-relaxed">
                      Use your registered credentials to access the dashboard. If you don't have an account, please contact your administrator.
                    </p>
                  </div>
                </div>
              </div>
            )} */}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-900">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute  inset-y-0 left-0 hidden lg:flex items-center pl-3 pointer-events-none z-10">
                    <Mail className="w-4 h-4 text-gray-400" />
                  </div>
                  <input
                    {...register("email", emailRules)}
                    type="email"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm bg-white hover:bg-gray-50 ${
                      errors.email
                        ? "border-red-400 bg-red-50 focus:ring-red-200 focus:border-red-500"
                        : "border-gray-300 focus:bg-white"
                    } min-h-[48px]`}
                    placeholder="Enter your email address"
                    disabled={isLoading}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600 flex items-start font-medium mt-1">
                    <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="break-words leading-tight">
                      {errors.email.message}
                    </span>
                  </p>
                )}
              </div>

              {authMode === "signin" && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-900">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 hidden lg:flex items-center pl-3 pointer-events-none z-10">
                      <Lock className="w-4 h-4 text-gray-400" />
                    </div>
                    <input
                      {...register("password", passwordRules)}
                      type={showPassword ? "text" : "password"}
                      className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm bg-white hover:bg-gray-50 ${
                        errors.password
                          ? "border-red-400 bg-red-50 focus:ring-red-200 focus:border-red-500"
                          : "border-gray-300 focus:bg-white"
                      } min-h-[48px]`}
                      placeholder="Enter your password"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-0 top-0 h-full w-12 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors z-10"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-600 flex items-start font-medium mt-1">
                      <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="break-words leading-tight">
                        {errors.password.message}
                      </span>
                    </p>
                  )}
                </div>
              )}

              {authMode === "signin" && (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 space-y-3 sm:space-y-0">
                  <label className="flex items-center group cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 flex-shrink-0"
                      disabled={isLoading}
                    />
                    <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 transition-colors font-medium">
                      Remember me for 30 days
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={() => switchMode("forgot-password")}
                    className="text-sm text-gray-600 hover:text-gray-900 font-semibold transition-colors underline-offset-4 hover:underline text-left sm:text-right"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !isValid}
                className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 focus:ring-offset-1 transition-all disabled:opacity-60 disabled:cursor-not-allowed text-sm shadow-lg hover:shadow-xl min-h-[48px] gap-2 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />
                    <span>
                      {authMode === "signin"
                        ? "Signing In..."
                        : "Sending Email..."}
                    </span>
                  </>
                ) : authMode === "signin" ? (
                  <>
                    <Lock className="w-4 h-4 flex-shrink-0" />
                    <span>Sign In to Dashboard</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <span>Send Reset Instructions</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
