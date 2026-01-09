import React, { useState, useEffect } from "react";
import { RiCloseLine } from "react-icons/ri";
import { Loader2 } from "lucide-react";

/**
 * Reusable Confirmation Modal Component
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Function to close the modal
 * @param {Function} props.onConfirm - Function to call when action is confirmed
 * @param {string} props.title - Modal title
 * @param {string} props.message - Main message to display
 * @param {string} props.description - Additional description (optional)
 * @param {string} props.confirmText - Text for confirm button (default: "Confirm")
 * @param {string} props.cancelText - Text for cancel button (default: "Cancel")
 * @param {string} props.confirmButtonClass - Custom class for confirm button (optional)
 * @param {React.ReactNode} props.icon - Icon to display (optional)
 * @param {string} props.iconContainerClass - Custom class for icon container (optional)
 * @param {string} props.variant - Button variant: "danger" | "success" | "warning" | "default"
 */
const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  description = "",
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmButtonClass = "",
  icon = null,
  iconContainerClass = "",
  variant = "default",
}) => {
  const [isLoading, setIsLoading] = useState(false);
  
  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setIsLoading(false);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen && !isLoading) {
        onClose();
      }
    };
    
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, isLoading, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  // Get button classes based on variant
  const getButtonClasses = () => {
    if (confirmButtonClass) return confirmButtonClass;
    
    switch (variant) {
      case "danger":
        return "bg-red-600 hover:bg-red-700 text-white";
      case "success":
        return "bg-green-600 hover:bg-green-700 text-white";
      case "warning":
        return "bg-yellow-500 hover:bg-yellow-600 text-white";
      default:
        return "bg-gray-900 hover:bg-gray-800 text-white";
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isLoading) {
          onClose();
        }
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* Modal */}
      <div 
        className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          >
            <RiCloseLine className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          {/* Icon */}
          {icon && (
            <div className="flex justify-center mb-4">
              <div className={`p-4 border border-gray-300 rounded-full ${iconContainerClass}`}>
                {icon}
              </div>
            </div>
          )}

          {/* Message */}
          <p className="text-center text-gray-700 mb-2">
            {message}
          </p>
          
          {/* Description */}
          {description && (
            <p className="text-center text-sm text-gray-500 mt-2">
              {description}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 p-5 border-t border-gray-200">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${getButtonClasses()}`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
