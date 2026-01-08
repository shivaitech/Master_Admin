import React from "react";

const ClientDetailsTab = ({ client, currentTheme }) => {
  // Handle different data structures - client data can be nested in userData or directly on client
  const userData = client?.userData || client || {};
  const companyBasics =
    client?.company_basics ||
    client?.userData?.onboarding?.company_basics ||
    {};

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            className={`text-sm ${currentTheme.textSecondary} uppercase block mb-2`}
          >
            Full Name
          </label>
          <p className={`${currentTheme.text} font-medium`}>
            {userData.fullName || userData.name || companyBasics.name || "N/A"}
          </p>
        </div>
        <div>
          <label
            className={`text-sm ${currentTheme.textSecondary} uppercase block mb-2`}
          >
            Email
          </label>
          <p className={`${currentTheme.text} font-medium`}>
            {userData.email || companyBasics.company_email || "N/A"}
          </p>
        </div>
        <div>
          <label
            className={`text-sm ${currentTheme.textSecondary} uppercase block mb-2`}
          >
            Phone
          </label>
          <p className={`${currentTheme.text} font-medium`}>
            {userData.phone || companyBasics.company_phone || "N/A"}
          </p>
        </div>
        <div>
          <label
            className={`text-sm ${currentTheme.textSecondary} uppercase block mb-2`}
          >
            Website
          </label>
          <p className={`${currentTheme.text} font-medium`}>
            {userData.website || companyBasics.company_website || "N/A"}
          </p>
        </div>
        <div>
          <label
            className={`text-sm ${currentTheme.textSecondary} uppercase block mb-2`}
          >
            Company Size
          </label>
          <p className={`${currentTheme.text} font-medium`}>
            {userData.companySize || companyBasics.company_size || "N/A"}
          </p>
        </div>
        <div>
          <label
            className={`text-sm ${currentTheme.textSecondary} uppercase block mb-2`}
          >
            Status
          </label>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              client?.isApproved || userData?.isApproved
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                : client?.isRejected || userData?.isRejected
                  ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                  : userData?.isActive
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
            }`}
          >
            {client?.isApproved || userData?.isApproved
              ? "approved"
              : client?.isRejected || userData?.isRejected
                ? "rejected"
                : userData?.isActive
                  ? "Active"
                  : "Pending"}
          </span>
        </div>
        <div>
          <label
            className={`text-sm ${currentTheme.textSecondary} uppercase block mb-2`}
          >
            Email Verified
          </label>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              userData?.emailVerified
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
            }`}
          >
            {userData?.emailVerified ? "Verified" : "Not Verified"}
          </span>
        </div>
        <div>
          <label
            className={`text-sm ${currentTheme.textSecondary} uppercase block mb-2`}
          >
            Onboarded
          </label>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              userData?.isOnboarded
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
            }`}
          >
            {userData?.isOnboarded ? "Completed" : "Pending"}
          </span>
        </div>
      </div>

      {/* Additional Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            className={`text-sm ${currentTheme.textSecondary} uppercase block mb-2`}
          >
            Created At
          </label>
          <p className={`${currentTheme.text} font-medium`}>
            {userData?.createdAt
              ? new Date(userData.createdAt).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
        <div>
          <label
            className={`text-sm ${currentTheme.textSecondary} uppercase block mb-2`}
          >
            Last Login
          </label>
          <p className={`${currentTheme.text} font-medium`}>
            {userData?.lastLoginAt
              ? new Date(userData.lastLoginAt).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
      </div>

      {/* Company Address */}
      {(userData?.address || companyBasics?.company_address) && (
        <div>
          <label
            className={`text-sm ${currentTheme.textSecondary} uppercase block mb-2`}
          >
            Company Address
          </label>
          <p className={`${currentTheme.text} leading-relaxed`}>
            {userData?.address || companyBasics?.company_address}
          </p>
        </div>
      )}
    </div>
  );
};

export default ClientDetailsTab;