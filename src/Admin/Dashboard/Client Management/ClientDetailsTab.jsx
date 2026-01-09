import React, { useState, useEffect } from "react";
import { shivaiApiService } from "../../../Redux-config/apisModel/apiService";

const ClientDetailsTab = ({ client, currentTheme, clientId }) => {
  const [clientData, setClientData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Extract userData and companyBasics from client prop or fetched clientData
  const userData = clientData || client?.userData || client || {};
  const companyBasics =
    userData?.company_basics || client?.company_basics || {};

  // Helper function for status text
  const getStatusText = () => {
    if (client?.isApproved || userData?.isApproved) return "Approved";
    if (client?.isRejected || userData?.isRejected) return "Rejected";
    if (userData?.isActive) return "Active";
    return "Pending";
  };

  useEffect(() => {
    const fetchClientData = async () => {
      if (!clientId) return;

      try {
        setLoading(true);
        setError(null);
        const response = await shivaiApiService.getClientByUserId(clientId);
        console.log("✅ Client data fetched:", response);
        const data = response?.data?.user || response?.user || response;
        setClientData(data);
      } catch (err) {
        console.error("❌ Error fetching client data:", err);
        setError(err.message || "Failed to load client data");
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, [clientId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        <div className="py-2 border-b border-gray-100">
          <p
            className={`text-[11px] uppercase tracking-wide ${currentTheme.textSecondary} mb-1`}
          >
            Full Name
          </p>
          <p className={`text-sm ${currentTheme.text}`}>
            {userData?.fullName || userData?.name || companyBasics?.name || "—"}
          </p>
        </div>
        <div className="py-2 border-b border-gray-100">
          <p
            className={`text-[11px] uppercase tracking-wide ${currentTheme.textSecondary} mb-1`}
          >
            Email
          </p>
          <p className={`text-sm ${currentTheme.text}`}>
            {userData?.email || companyBasics?.company_email || "—"}
          </p>
        </div>

        <div className="py-2 border-b border-gray-100">
          <p
            className={`text-[11px] uppercase tracking-wide ${currentTheme.textSecondary} mb-1`}
          >
            Status
          </p>
          <p className={`text-sm ${currentTheme.text}`}>{getStatusText()}</p>
        </div>
        <div className="py-2 border-b border-gray-100">
          <p
            className={`text-[11px] uppercase tracking-wide ${currentTheme.textSecondary} mb-1`}
          >
            Email Verified
          </p>
          <p className={`text-sm ${currentTheme.text}`}>
            {userData?.emailVerified ? "Yes" : "No"}
          </p>
        </div>
        <div className="py-2 border-b border-gray-100">
          <p
            className={`text-[11px] uppercase tracking-wide ${currentTheme.textSecondary} mb-1`}
          >
            Onboarded
          </p>
          <p className={`text-sm ${currentTheme.text}`}>
            {userData?.isOnboarded ? "Yes" : "No"}
          </p>
        </div>
        <div className="py-2 border-b border-gray-100">
          <p
            className={`text-[11px] uppercase tracking-wide ${currentTheme.textSecondary} mb-1`}
          >
            Created
          </p>
          <p className={`text-sm ${currentTheme.text}`}>
            {userData?.createdAt
              ? new Date(userData.createdAt).toLocaleDateString()
              : "—"}
          </p>
        </div>
        <div className="py-2 border-b border-gray-100">
          <p
            className={`text-[11px] uppercase tracking-wide ${currentTheme.textSecondary} mb-1`}
          >
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
          <p
            className={`text-[11px] uppercase tracking-wide ${currentTheme.textSecondary} mb-1`}
          >
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
