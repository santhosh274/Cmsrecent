import { useState } from 'react';
import { CreditCard, Calendar, TrendingUp, DollarSign, Search } from 'lucide-react';

export default function PaymentTracking() {
  const [dateFilter, setDateFilter] = useState('today');
  const [searchTerm, setSearchTerm] = useState('');

  // Hardcoded payment data
  const payments = [
    {
      id: 'PAY-001',
      invoiceId: 'INV-2026-001',
      patientId: 'PT-001',
      patientName: 'Rajesh Kumar',
      amount: 5500,
      method: 'UPI',
      transactionId: 'UPI20260129001',
      timestamp: '2026-01-29 10:30 AM',
      status: 'Success',
    },
    {
      id: 'PAY-002',
      invoiceId: 'INV-2026-002',
      patientId: 'PT-002',
      patientName: 'Priya Sharma',
      amount: 50000,
      method: 'Cash',
      transactionId: 'CASH20260129001',
      timestamp: '2026-01-29 11:15 AM',
      status: 'Success',
    },
    {
      id: 'PAY-003',
      invoiceId: 'INV-2026-005',
      patientId: 'PT-005',
      patientName: 'Vikram Singh',
      amount: 15000,
      method: 'Card',
      transactionId: 'CARD20260129001',
      timestamp: '2026-01-29 02:45 PM',
      status: 'Success',
    },
    {
      id: 'PAY-004',
      invoiceId: 'INV-2026-007',
      patientId: 'PT-007',
      patientName: 'Anita Desai',
      amount: 7500,
      method: 'UPI',
      transactionId: 'UPI20260129002',
      timestamp: '2026-01-29 03:20 PM',
      status: 'Pending',
    },
    {
      id: 'PAY-005',
      invoiceId: 'INV-2026-008',
      patientId: 'PT-008',
      patientName: 'Suresh Nair',
      amount: 3200,
      method: 'Card',
      transactionId: 'CARD20260129002',
      timestamp: '2026-01-29 04:10 PM',
      status: 'Failed',
    },
    {
      id: 'PAY-006',
      invoiceId: 'INV-2026-003',
      patientId: 'PT-003',
      patientName: 'Amit Patel',
      amount: 8200,
      method: 'Net Banking',
      transactionId: 'NB20260128001',
      timestamp: '2026-01-28 09:30 AM',
      status: 'Success',
    },
    {
      id: 'PAY-007',
      invoiceId: 'INV-2026-009',
      patientId: 'PT-009',
      patientName: 'Deepa Iyer',
      amount: 12000,
      method: 'UPI',
      transactionId: 'UPI20260128002',
      timestamp: '2026-01-28 11:45 AM',
      status: 'Success',
    },
  ];

  // Payment method statistics
  const paymentMethodStats = {
    UPI: { count: 3, amount: 26700 },
    Cash: { count: 1, amount: 50000 },
    Card: { count: 2, amount: 18200 },
    'Net Banking': { count: 1, amount: 8200 },
  };

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.invoiceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const todayPayments = payments.filter((p) => p.timestamp.includes('2026-01-29'));
  const todayTotal = todayPayments.reduce((sum, p) => (p.status === 'Success' ? sum + p.amount : sum), 0);
  const successfulPayments = payments.filter((p) => p.status === 'Success');
  const successRate = ((successfulPayments.length / payments.length) * 100).toFixed(1);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Success':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodIcon = (method: string) => {
    return <CreditCard className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Payment Tracking</h1>
        <p className="text-gray-600 mt-1">Monitor all payment transactions</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Today's Collections</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                ₹{todayTotal.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">{todayPayments.length} transactions</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Payments</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{payments.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <CreditCard className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">All time</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{successRate}%</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {successfulPayments.length}/{payments.length} successful
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Amount</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                ₹{payments.filter(p => p.status === 'Pending').reduce((sum, p) => sum + p.amount, 0).toLocaleString('en-IN')}
              </p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Awaiting confirmation</p>
        </div>
      </div>

      {/* Payment Methods Breakdown */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Object.entries(paymentMethodStats).map(([method, stats]) => (
            <div key={method} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{method}</span>
                {getMethodIcon(method)}
              </div>
              <p className="text-xl font-bold text-gray-900">
                ₹{stats.amount.toLocaleString('en-IN')}
              </p>
              <p className="text-sm text-gray-600 mt-1">{stats.count} transactions</p>
            </div>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by patient, invoice ID, or transaction ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {payment.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {payment.patientName}
                      </div>
                      <div className="text-sm text-gray-500">{payment.patientId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.invoiceId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    ₹{payment.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getMethodIcon(payment.method)}
                      <span className="ml-2 text-sm text-gray-900">{payment.method}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                    {payment.transactionId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {payment.timestamp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        payment.status
                      )}`}
                    >
                      {payment.status}
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
