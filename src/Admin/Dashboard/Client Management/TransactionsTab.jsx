import React from "react";
import { DollarSign } from "lucide-react";

const TransactionsTab = ({ client, currentTheme }) => {
  // Mock transaction data - replace with actual API call
  const transactions = [
    {
      id: 1,
      date: "2024-12-01",
      amount: 149.0,
      type: "subscription",
      status: "completed",
      description: "Monthly subscription",
    },
    {
      id: 2,
      date: "2024-11-01",
      amount: 149.0,
      type: "subscription",
      status: "completed",
      description: "Monthly subscription",
    },
    {
      id: 3,
      date: "2024-10-15",
      amount: 50.0,
      type: "usage",
      status: "completed",
      description: "Additional tokens",
    },
  ];

  return (
    <div className="space-y-4">
      {transactions.length === 0 ? (
        <div className={`text-center py-12 rounded-xl ${currentTheme.cardBg} border ${currentTheme.cardBorder}`}>
          <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 flex items-center justify-center">
            <DollarSign className={`w-8 h-8 ${currentTheme.textSecondary}`} />
          </div>
          <h4 className={`text-lg font-medium ${currentTheme.text} mb-2`}>
            No Transactions
          </h4>
          <p className={`${currentTheme.textSecondary} text-sm`}>
            No transaction history available for this client.
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className={`${currentTheme.cardBg} rounded-xl border ${currentTheme.cardBorder} p-4 hover:shadow-sm transition-shadow`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800/50 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-gray-900" />
                  </div>
                  <div>
                    <h4 className={`font-medium ${currentTheme.text}`}>
                      ${transaction.amount.toFixed(2)}
                    </h4>
                    <p className={`text-sm ${currentTheme.textSecondary}`}>
                      {transaction.description}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm ${currentTheme.textSecondary} mb-1`}>
                    {new Date(transaction.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: '2-digit'
                    })}
                  </p>
                  <p className={`text-xs font-medium ${
                      transaction.status === "completed"
                        ? "text-green-600 dark:text-green-400"
                        : transaction.status === "pending"
                        ? "text-yellow-600 dark:text-yellow-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {transaction.status}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionsTab;