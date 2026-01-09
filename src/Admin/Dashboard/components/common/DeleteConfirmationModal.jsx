import React, { useState, useEffect } from "react";
import { RiDeleteBinLine, RiCloseLine, RiErrorWarningLine } from "react-icons/ri";
import { Loader2 } from "lucide-react";

/**
 * Reusable Delete Confirmation Modal Component
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Function to close the modal
 * @param {Function} props.onConfirm - Function to call when delete is confirmed
 * @param {string} props.title - Modal title (default: "Delete Confirmation")
 * @param {string} props.itemName - Name of the item being deleted
 * @param {string} props.itemType - Type of item being deleted (e.g., "client", "agent")
 * @param {string} props.message - Custom message (optional)
 * @param {string} props.warningMessage - Additional warning message (optional)
 * @param {boolean} props.requireConfirmation - Whether to require typing to confirm (default: false)
 * @param {string} props.confirmText - Text user must type to confirm (default: "DELETE")
 */
const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Confirmation",
  itemName = "",
  itemType = "item",
  message = "",
  warningMessage = "",
  requireConfirmation = false,
  confirmText = "DELETE",
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmInput, setConfirmInput] = useState("");
  
  // Reset state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setConfirmInput("");
      setIsDeleting(false);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen && !isDeleting) {
        onClose();
      }
    };
    
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, isDeleting, onClose]);

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
    if (requireConfirmation && confirmInput !== confirmText) {
      return;
    }
    
    setIsDeleting(true);
    try {
      await onConfirm();
    } finally {
      setIsDeleting(false);
      onClose();
    }
  };

  const isConfirmDisabled = requireConfirmation && confirmInput !== confirmText;

  if (!isOpen) return null;

  const defaultMessage = `Are you sure you want to delete ${itemName ? `"${itemName}"` : `this ${itemType}`}?`;
  const displayMessage = message || defaultMessage;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isDeleting) {
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
          <div className="flex items-center gap-3">
            <div className="p-2 border border-gray-300 rounded-xl">
              <RiDeleteBinLine className="w-5 h-5 text-gray-700" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          >
            <RiCloseLine className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          {/* Warning Icon */}
          <div className="flex justify-center mb-4">
            <div className="p-4 border border-gray-300 rounded-full">
              <RiErrorWarningLine className="w-12 h-12 text-red-500" />
            </div>
          </div>

          {/* Message */}
          <p className="text-center text-gray-700 mb-2">
            {displayMessage}
          </p>
          
          {/* Warning */}
          {warningMessage && (
            <p className="text-center text-sm text-gray-600 mt-2 font-medium">
              {warningMessage}
            </p>
          )}
          
          <p className="text-center text-sm text-gray-500 mt-3">
            This action cannot be undone.
          </p>

          {/* Confirmation Input */}
          {requireConfirmation && (
            <div className="mt-5">
              <label className="block text-sm text-gray-600 mb-2 text-center">
                Type <span className="font-mono font-bold text-gray-900">{confirmText}</span> to confirm
              </label>
              <input
                type="text"
                value={confirmInput}
                onChange={(e) => setConfirmInput(e.target.value.toUpperCase())}
                placeholder={confirmText}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-center font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                disabled={isDeleting}
                autoFocus
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 p-5 border-t border-gray-200">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isDeleting || isConfirmDisabled}
            className="flex-1 px-4 py-2.5 text-white bg-red-600 rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <RiDeleteBinLine className="w-4 h-4" />
                Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
