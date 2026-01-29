import { useState } from 'react';
import { Search, Filter, Download, Eye, Plus, FileText } from 'lucide-react';

export default function BillingManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Hardcoded invoice data
  const invoices = [
    {
      invoiceId: 'INV-2026-001',
      patientId: 'PT-001',
      patientName: 'Rajesh Kumar',
      date: '2026-01-29',
      dueDate: '2026-02-05',
      services: ['Consultation', 'Blood Test', 'X-Ray'],
      amount: 5500,
      paid: 5500,
      status: 'Paid',
      paymentMethod: 'UPI',
    },
    {
      invoiceId: 'INV-2026-002',
      patientId: 'PT-002',
      patientName: 'Priya Sharma',
      date: '2026-01-28',
      dueDate: '2026-02-04',
      services: ['Surgery', 'Anesthesia', 'Post-op Care'],
      amount: 125000,
      paid: 50000,
      status: 'Partial',
      paymentMethod: 'Cash',
    },
    {
      invoiceId: 'INV-2026-003',
      patientId: 'PT-003',
      patientName: 'Amit Patel',
      date: '2026-01-27',
      dueDate: '2026-02-03',
      services: ['Lab Tests', 'ECG', 'Consultation'],
      amount: 8200,
      paid: 0,
      status: 'Pending',
      paymentMethod: '-',
    },
    {
      invoiceId: 'INV-2026-004',
      patientId: 'PT-004',
      patientName: 'Sneha Reddy',
      date: '2026-01-26',
      dueDate: '2026-01-20',
      services: ['Dental Checkup', 'Cleaning'],
      amount: 3500,
      paid: 0,
      status: 'Overdue',
      paymentMethod: '-',
    },
    {
      invoiceId: 'INV-2026-005',
      patientId: 'PT-005',
      patientName: 'Vikram Singh',
      date: '2026-01-25',
      dueDate: '2026-02-01',
      services: ['MRI Scan', 'Radiologist Consultation'],
      amount: 15000,
      paid: 15000,
      status: 'Paid',
      paymentMethod: 'Card',
    },
    {
      invoiceId: 'INV-2026-006',
      patientId: 'PT-006',
      patientName: 'Kavita Joshi',
      date: '2026-01-24',
      dueDate: '2026-01-31',
      services: ['Physiotherapy Session', 'Consultation'],
      amount: 2500,
      paid: 0,
      status: 'Pending',
      paymentMethod: '-',
    },
  ];

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.invoiceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.patientId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === 'all' || invoice.status.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Partial':
        return 'bg-blue-100 text-blue-800';
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Billing & Invoices</h1>
          <p className="text-gray-600 mt-1">Manage patient bills and invoices</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="h-5 w-5 mr-2" />
          New Invoice
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by invoice ID, patient name, or patient ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="partial">Partial</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Total Invoices</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{invoices.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Total Amount</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            ₹{invoices.reduce((sum, inv) => sum + inv.amount, 0).toLocaleString('en-IN')}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Collected</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            ₹{invoices.reduce((sum, inv) => sum + inv.paid, 0).toLocaleString('en-IN')}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Outstanding</p>
          <p className="text-2xl font-bold text-red-600 mt-1">
            ₹
            {invoices
              .reduce((sum, inv) => sum + (inv.amount - inv.paid), 0)
              .toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Services
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paid
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.invoiceId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {invoice.invoiceId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {invoice.patientName}
                      </div>
                      <div className="text-sm text-gray-500">{invoice.patientId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{invoice.date}</div>
                    <div className="text-sm text-gray-500">Due: {invoice.dueDate}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {invoice.services.slice(0, 2).join(', ')}
                      {invoice.services.length > 2 && (
                        <span className="text-gray-500">
                          {' '}
                          +{invoice.services.length - 2} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    ₹{invoice.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{invoice.paid.toLocaleString('en-IN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        invoice.status
                      )}`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900" title="View">
                        <Eye className="h-5 w-5" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900" title="Download">
                        <Download className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredInvoices.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No invoices found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
