import React from "react";

const ClientDetailsTab = ({ client, currentTheme }) => {
  // Handle different data structures - client data can be nested in userData or directly on client
  const userData = client?.userData || client || {};
  const companyBasics =
    client?.company_basics ||
    client?.userData?.onboarding?.company_basics ||
    {};

  // Helper function for status text
  const getStatusText = () => {
    if (client?.isApproved || userData?.isApproved) return "Approved";
    if (client?.isRejected || userData?.isRejected) return "Rejected";
    if (userData?.isActive) return "Active";
    return "Pending";
  };

  return (
    <div className="space-y-6">
      {/* Main Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        <div className="py-2 border-b border-gray-100">
          <p className={`text-[11px] uppercase tracking-wide ${currentTheme.textSecondary} mb-1`}>
            Full Name
          </p>
          <p className={`text-sm ${currentTheme.text}`}>
            {userData.fullName || userData.name || companyBasics.name || "—"}
          </p>
        </div>
        <div className="py-2 border-b border-gray-100">
          <p className={`text-[11px] uppercase tracking-wide ${currentTheme.textSecondary} mb-1`}>
            Email
          </p>
          <p className={`text-sm ${currentTheme.text}`}>
            {userData.email || companyBasics.company_email || "—"}
          </p>
        </div>
        <div className="py-2 border-b border-gray-100">
          <p className={`text-[11px] uppercase tracking-wide ${currentTheme.textSecondary} mb-1`}>
            Phone
          </p>
          <p className={`text-sm ${currentTheme.text}`}>
            {userData.phone || companyBasics.company_phone || "—"}
          </p>
        </div>
        <div className="py-2 border-b border-gray-100">
          <p className={`text-[11px] uppercase tracking-wide ${currentTheme.textSecondary} mb-1`}>
            Website
          </p>
          <p className={`text-sm ${currentTheme.text}`}>
            {userData.website || companyBasics.company_website || "—"}
          </p>
        </div>
        <div className="py-2 border-b border-gray-100">
          <p className={`text-[11px] uppercase tracking-wide ${currentTheme.textSecondary} mb-1`}>
            Company Size
          </p>
          <p className={`text-sm ${currentTheme.text}`}>
            {userData.companySize || companyBasics.company_size || "—"}
          </p>
        </div>
        <div className="py-2 border-b border-gray-100">
          <p className={`text-[11px] uppercase tracking-wide ${currentTheme.textSecondary} mb-1`}>
            Status
          </p>
          <p className={`text-sm ${currentTheme.text}`}>
            {getStatusText()}
          </p>
        </div>
        <div className="py-2 border-b border-gray-100">
          <p className={`text-[11px] uppercase tracking-wide ${currentTheme.textSecondary} mb-1`}>
            Email Verified
          </p>
          <p className={`text-sm ${currentTheme.text}`}>
            {userData?.emailVerified ? "Yes" : "No"}
          </p>
        </div>
        <div className="py-2 border-b border-gray-100">
          <p className={`text-[11px] uppercase tracking-wide ${currentTheme.textSecondary} mb-1`}>
            Onboarded
          </p>
          <p className={`text-sm ${currentTheme.text}`}>
            {userData?.isOnboarded ? "Yes" : "No"}
          </p>
        </div>
        <div className="py-2 border-b border-gray-100">
          <p className={`text-[11px] uppercase tracking-wide ${currentTheme.textSecondary} mb-1`}>
            Created
          </p>
          <p className={`text-sm ${currentTheme.text}`}>
            {userData?.createdAt
              ? new Date(userData.createdAt).toLocaleDateString()
              : "—"}
          </p>
        </div>
        <div className="py-2 border-b border-gray-100">
          <p className={`text-[11px] uppercase tracking-wide ${currentTheme.textSecondary} mb-1`}>
            Last Login
          </p>
          <p className={`text-sm ${currentTheme.text}`}>
            {userData?.lastLoginAt
              ? new Date(userData.lastLoginAt).toLocaleDateString()
              : "—"}
          </p>
        </div>
      </div>

      {/* Company Address */}
      {(userData?.address || companyBasics?.company_address) && (
        <div className="py-2">
          <p className={`text-[11px] uppercase tracking-wide ${currentTheme.textSecondary} mb-1`}>
            Company Address
          </p>
          <p className={`text-sm ${currentTheme.text}`}>
            {userData?.address || companyBasics?.company_address}
          </p>
        </div>
      )}
    </div>
  );
};

export default ClientDetailsTab;