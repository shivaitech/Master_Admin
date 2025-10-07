import React, { useState } from "react";
import AIEmployeeStatsMain from "./AIEmployeeStatsMain";
import AIEmployeeDetail from "./AIEmployeeDetail";

const AIEmployeeStatsContainer = () => {
  const [currentView, setCurrentView] = useState("list");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee);
    setCurrentView("detail");
  };

  const handleBackToList = () => {
    setCurrentView("list");
    setSelectedEmployee(null);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "detail":
        return (
          <AIEmployeeDetail
            employee={selectedEmployee}
            onBack={handleBackToList}
          />
        );
      default:
        return <AIEmployeeStatsMain onViewEmployee={handleViewEmployee} />;
    }
  };

  return <div className="w-full">{renderCurrentView()}</div>;
};

export default AIEmployeeStatsContainer;