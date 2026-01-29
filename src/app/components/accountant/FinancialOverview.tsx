import { DollarSign, TrendingUp, TrendingDown, Users, FileText, AlertCircle } from 'lucide-react';

export default function FinancialOverview() {
  // Hardcoded financial data
  const financialMetrics = {
    todayRevenue: 125000,
    monthlyRevenue: 3250000,
    pendingPayments: 450000,
    totalExpenses: 1800000,
    netProfit: 1450000,
    activePatients: 1234,
  };

  const recentTransactions = [
    { id: 'TXN-001', patientId: 'PT-001', patientName: 'Rajesh Kumar', amount: 5000, type: 'Consultation', date: '2026-01-29', status: 'Paid' },
    { id: 'TXN-002', patientId: 'PT-002', patientName: 'Priya Sharma', amount: 15000, type: 'Surgery', date: '2026-01-29', status: 'Paid' },
    { id: 'TXN-003', patientId: 'PT-003', patientName: 'Amit Patel', amount: 3000, type: 'Lab Tests', date: '2026-01-28', status: 'Pending' },
    { id: 'TXN-004', patientId: 'PT-004', patientName: 'Sneha Reddy', amount: 8000, type: 'Pharmacy', date: '2026-01-28', status: 'Paid' },
    { id: 'TXN-005', patientId: 'PT-005', patientName: 'Vikram Singh', amount: 12000, type: 'Consultation', date: '2026-01-27', status: 'Pending' },
  ];

  const monthlyTrends = [
    { month: 'Aug', revenue: 2800000, expenses: 1600000 },
    { month: 'Sep', revenue: 3100000, expenses: 1700000 },
    { month: 'Oct', revenue: 2900000, expenses: 1650000 },
    { month: 'Nov', revenue: 3300000, expenses: 1750000 },
    { month: 'Dec', revenue: 3500000, expenses: 1850000 },
    { month: 'Jan', revenue: 3250000, expenses: 1800000 },
  ];

  const pendingInvoices = [
    { invoiceId: 'INV-2026-001', patientName: 'Arun Mehta', amount: 25000, dueDate: '2026-01-30', overdue: false },
    { invoiceId: 'INV-2026-002', patientName: 'Kavita Joshi', amount: 18000, dueDate: '2026-01-25', overdue: true },
    { invoiceId: 'INV-2026-003', patientName: 'Suresh Nair', amount: 32000, dueDate: '2026-02-01', overdue: false },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Financial Overview</h1>
        <p className="text-gray-600 mt-1">Real-time financial metrics and insights</p>
      </div>

      {/* Financial Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Today's Revenue</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                ₹{financialMetrics.todayRevenue.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
            <span className="text-green-600">+12.5%</span>
            <span className="text-gray-600 ml-2">vs yesterday</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Monthly Revenue</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                ₹{(financialMetrics.monthlyRevenue / 100000).toFixed(1)}L
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <span className="text-blue-600">87%</span>
            <span className="text-gray-600 ml-2">of monthly target</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Payments</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                ₹{(financialMetrics.pendingPayments / 100000).toFixed(1)}L
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <AlertCircle className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <span className="text-orange-600">{pendingInvoices.length} invoices</span>
            <span className="text-gray-600 ml-2">need follow-up</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Expenses</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                ₹{(financialMetrics.totalExpenses / 100000).toFixed(1)}L
              </p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <TrendingDown className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <span className="text-green-600">-5%</span>
            <span className="text-gray-600 ml-2">vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Net Profit</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                ₹{(financialMetrics.netProfit / 100000).toFixed(1)}L
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <span className="text-gray-600">Profit Margin:</span>
            <span className="text-green-600 ml-2 font-semibold">44.6%</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Patients</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {financialMetrics.activePatients}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="h-4 w-4 text-purple-600 mr-1" />
            <span className="text-purple-600">+8.2%</span>
            <span className="text-gray-600 ml-2">this month</span>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentTransactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {txn.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{txn.patientName}</div>
                      <div className="text-sm text-gray-500">{txn.patientId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {txn.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    ₹{txn.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {txn.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        txn.status === 'Paid'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {txn.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pending Invoices Alert */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <AlertCircle className="h-5 w-5 text-orange-600 mr-2" />
            Pending Invoices
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {pendingInvoices.map((invoice) => (
              <div
                key={invoice.invoiceId}
                className={`p-4 rounded-lg border-l-4 ${
                  invoice.overdue
                    ? 'bg-red-50 border-red-500'
                    : 'bg-yellow-50 border-yellow-500'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-900">{invoice.invoiceId}</p>
                    <p className="text-sm text-gray-600 mt-1">{invoice.patientName}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Due: {invoice.dueDate}
                      {invoice.overdue && (
                        <span className="text-red-600 font-semibold ml-2">(Overdue)</span>
                      )}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      ₹{invoice.amount.toLocaleString('en-IN')}
                    </p>
                    <button className="mt-2 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                      Follow Up
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
