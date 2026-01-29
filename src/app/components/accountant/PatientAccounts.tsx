import { useState } from 'react';
import { Search, User, DollarSign, FileText, Clock, TrendingUp } from 'lucide-react';

export default function PatientAccounts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Hardcoded patient account data
  const patientAccounts = [
    {
      patientId: 'PT-001',
      name: 'Rajesh Kumar',
      contact: '+91 98765 43210',
      email: 'rajesh.kumar@email.com',
      totalBilled: 45000,
      totalPaid: 45000,
      outstanding: 0,
      lastVisit: '2026-01-29',
      status: 'Clear',
      insuranceProvider: 'Star Health',
      insuranceId: 'SH2026001234',
    },
    {
      patientId: 'PT-002',
      name: 'Priya Sharma',
      contact: '+91 98765 43211',
      email: 'priya.sharma@email.com',
      totalBilled: 250000,
      totalPaid: 150000,
      outstanding: 100000,
      lastVisit: '2026-01-28',
      status: 'Partial',
      insuranceProvider: 'HDFC Ergo',
      insuranceId: 'HE2026005678',
    },
    {
      patientId: 'PT-003',
      name: 'Amit Patel',
      contact: '+91 98765 43212',
      email: 'amit.patel@email.com',
      totalBilled: 32000,
      totalPaid: 15000,
      outstanding: 17000,
      lastVisit: '2026-01-27',
      status: 'Overdue',
      insuranceProvider: 'None',
      insuranceId: '-',
    },
    {
      patientId: 'PT-004',
      name: 'Sneha Reddy',
      contact: '+91 98765 43213',
      email: 'sneha.reddy@email.com',
      totalBilled: 18500,
      totalPaid: 10000,
      outstanding: 8500,
      lastVisit: '2026-01-26',
      status: 'Overdue',
      insuranceProvider: 'Bajaj Allianz',
      insuranceId: 'BA2026009012',
    },
    {
      patientId: 'PT-005',
      name: 'Vikram Singh',
      contact: '+91 98765 43214',
      email: 'vikram.singh@email.com',
      totalBilled: 125000,
      totalPaid: 125000,
      outstanding: 0,
      lastVisit: '2026-01-25',
      status: 'Clear',
      insuranceProvider: 'Max Bupa',
      insuranceId: 'MB2026003456',
    },
    {
      patientId: 'PT-006',
      name: 'Kavita Joshi',
      contact: '+91 98765 43215',
      email: 'kavita.joshi@email.com',
      totalBilled: 22000,
      totalPaid: 22000,
      outstanding: 0,
      lastVisit: '2026-01-24',
      status: 'Clear',
      insuranceProvider: 'None',
      insuranceId: '-',
    },
    {
      patientId: 'PT-007',
      name: 'Anita Desai',
      contact: '+91 98765 43216',
      email: 'anita.desai@email.com',
      totalBilled: 67000,
      totalPaid: 30000,
      outstanding: 37000,
      lastVisit: '2026-01-23',
      status: 'Partial',
      insuranceProvider: 'Care Health',
      insuranceId: 'CH2026007890',
    },
  ];

  const filteredAccounts = patientAccounts.filter((account) => {
    const matchesSearch =
      account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.contact.includes(searchTerm);

    const matchesFilter =
      filterType === 'all' ||
      (filterType === 'clear' && account.status === 'Clear') ||
      (filterType === 'partial' && account.status === 'Partial') ||
      (filterType === 'overdue' && account.status === 'Overdue');

    return matchesSearch && matchesFilter;
  });

  // Calculate statistics
  const totalOutstanding = patientAccounts.reduce((sum, acc) => sum + acc.outstanding, 0);
  const accountsWithOutstanding = patientAccounts.filter((acc) => acc.outstanding > 0).length;
  const clearAccounts = patientAccounts.filter((acc) => acc.status === 'Clear').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Clear':
        return 'bg-green-100 text-green-800';
      case 'Partial':
        return 'bg-yellow-100 text-yellow-800';
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Patient Accounts</h1>
        <p className="text-gray-600 mt-1">Manage individual patient financial accounts</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Patients</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {patientAccounts.length}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <User className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Active accounts</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Outstanding</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                ₹{(totalOutstanding / 100000).toFixed(1)}L
              </p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">{accountsWithOutstanding} accounts</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Clear Accounts</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{clearAccounts}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">No pending dues</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Collection Rate</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {(
                  (patientAccounts.reduce((sum, acc) => sum + acc.totalPaid, 0) /
                    patientAccounts.reduce((sum, acc) => sum + acc.totalBilled, 0)) *
                  100
                ).toFixed(1)}
                %
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Overall performance</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, patient ID, or contact..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Accounts</option>
            <option value="clear">Clear</option>
            <option value="partial">Partial Payment</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
      </div>

      {/* Accounts Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Billed
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paid
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Outstanding
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Insurance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Visit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAccounts.map((account) => (
                <tr key={account.patientId} className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{account.name}</div>
                      <div className="text-sm text-gray-500">{account.patientId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{account.contact}</div>
                    <div className="text-sm text-gray-500">{account.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    ₹{account.totalBilled.toLocaleString('en-IN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">
                    ₹{account.totalPaid.toLocaleString('en-IN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                    <span className={account.outstanding > 0 ? 'text-red-600' : 'text-gray-900'}>
                      ₹{account.outstanding.toLocaleString('en-IN')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{account.insuranceProvider}</div>
                    <div className="text-sm text-gray-500">{account.insuranceId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {account.lastVisit}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        account.status
                      )}`}
                    >
                      {account.status}
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
