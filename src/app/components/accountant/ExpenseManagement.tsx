import { useState } from 'react';
import { Plus, Search, Filter, TrendingDown, Package, Users, Zap, Building } from 'lucide-react';

export default function ExpenseManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Hardcoded expense data
  const expenses = [
    {
      id: 'EXP-001',
      date: '2026-01-29',
      category: 'Medical Supplies',
      description: 'Surgical gloves and masks',
      vendor: 'MedEquip Pvt Ltd',
      amount: 45000,
      paymentMethod: 'Bank Transfer',
      status: 'Paid',
      invoiceNumber: 'ME-2026-001',
    },
    {
      id: 'EXP-002',
      date: '2026-01-28',
      category: 'Utilities',
      description: 'Electricity bill - January',
      vendor: 'State Electricity Board',
      amount: 125000,
      paymentMethod: 'Online',
      status: 'Paid',
      invoiceNumber: 'EB-JAN-2026',
    },
    {
      id: 'EXP-003',
      date: '2026-01-27',
      category: 'Salaries',
      description: 'Nursing staff salary - January',
      vendor: 'Hospital HR',
      amount: 850000,
      paymentMethod: 'Bank Transfer',
      status: 'Paid',
      invoiceNumber: 'HR-SAL-001',
    },
    {
      id: 'EXP-004',
      date: '2026-01-26',
      category: 'Equipment',
      description: 'ECG machine maintenance',
      vendor: 'BioMed Services',
      amount: 25000,
      paymentMethod: 'Cash',
      status: 'Paid',
      invoiceNumber: 'BMS-2026-045',
    },
    {
      id: 'EXP-005',
      date: '2026-01-25',
      category: 'Medical Supplies',
      description: 'Medicines and pharmaceuticals',
      vendor: 'Pharma Distributors',
      amount: 180000,
      paymentMethod: 'Credit',
      status: 'Pending',
      invoiceNumber: 'PD-2026-112',
    },
    {
      id: 'EXP-006',
      date: '2026-01-24',
      category: 'Maintenance',
      description: 'HVAC system servicing',
      vendor: 'Cool Tech Solutions',
      amount: 35000,
      paymentMethod: 'Bank Transfer',
      status: 'Paid',
      invoiceNumber: 'CTS-2026-033',
    },
    {
      id: 'EXP-007',
      date: '2026-01-23',
      category: 'Utilities',
      description: 'Water bill - January',
      vendor: 'Municipal Corporation',
      amount: 15000,
      paymentMethod: 'Online',
      status: 'Paid',
      invoiceNumber: 'MC-WATER-JAN',
    },
    {
      id: 'EXP-008',
      date: '2026-01-22',
      category: 'Office Supplies',
      description: 'Stationery and printing',
      vendor: 'Office Mart',
      amount: 12000,
      paymentMethod: 'Cash',
      status: 'Paid',
      invoiceNumber: 'OM-2026-089',
    },
  ];

  // Category-wise expense breakdown
  const categoryExpenses = {
    'Medical Supplies': 225000,
    Salaries: 850000,
    Utilities: 140000,
    Equipment: 25000,
    Maintenance: 35000,
    'Office Supplies': 12000,
  };

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === 'all' || expense.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const paidExpenses = expenses.filter((exp) => exp.status === 'Paid').reduce((sum, exp) => sum + exp.amount, 0);
  const pendingExpenses = expenses.filter((exp) => exp.status === 'Pending').reduce((sum, exp) => sum + exp.amount, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Medical Supplies':
        return <Package className="h-5 w-5 text-blue-600" />;
      case 'Salaries':
        return <Users className="h-5 w-5 text-purple-600" />;
      case 'Utilities':
        return <Zap className="h-5 w-5 text-yellow-600" />;
      case 'Equipment':
      case 'Maintenance':
        return <Building className="h-5 w-5 text-gray-600" />;
      default:
        return <Package className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Expense Management</h1>
          <p className="text-gray-600 mt-1">Track and manage hospital operational expenses</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="h-5 w-5 mr-2" />
          Add Expense
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Expenses</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                ₹{(totalExpenses / 100000).toFixed(1)}L
              </p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <TrendingDown className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">This month</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Paid</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                ₹{(paidExpenses / 100000).toFixed(1)}L
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Package className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {expenses.filter((e) => e.status === 'Paid').length} transactions
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">
                ₹{pendingExpenses.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <Package className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {expenses.filter((e) => e.status === 'Pending').length} transactions
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Daily</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                ₹{Math.round(totalExpenses / 29).toLocaleString('en-IN')}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <TrendingDown className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">January average</p>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Expense by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(categoryExpenses).map(([category, amount]) => (
            <div key={category} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  {getCategoryIcon(category)}
                  <span className="ml-2 text-sm font-medium text-gray-700">{category}</span>
                </div>
              </div>
              <p className="text-xl font-bold text-gray-900">
                ₹{amount.toLocaleString('en-IN')}
              </p>
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${(amount / totalExpenses) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {((amount / totalExpenses) * 100).toFixed(1)}% of total
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by description, vendor, or invoice number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="Medical Supplies">Medical Supplies</option>
              <option value="Salaries">Salaries</option>
              <option value="Utilities">Utilities</option>
              <option value="Equipment">Equipment</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Office Supplies">Office Supplies</option>
            </select>
          </div>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vendor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredExpenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {expense.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getCategoryIcon(expense.category)}
                      <span className="ml-2 text-sm text-gray-900">{expense.category}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{expense.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {expense.vendor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                    {expense.invoiceNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    ₹{expense.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {expense.paymentMethod}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        expense.status
                      )}`}
                    >
                      {expense.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
