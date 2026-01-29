import { useState } from 'react';
import { TrendingUp, DollarSign, Calendar, Download, BarChart3, PieChart } from 'lucide-react';

export default function RevenueReports() {
  const [reportType, setReportType] = useState('monthly');
  const [selectedMonth, setSelectedMonth] = useState('January 2026');

  // Hardcoded revenue data
  const monthlyRevenue = [
    { month: 'Jul 2025', revenue: 2650000, expenses: 1550000, profit: 1100000 },
    { month: 'Aug 2025', revenue: 2800000, expenses: 1600000, profit: 1200000 },
    { month: 'Sep 2025', revenue: 3100000, expenses: 1700000, profit: 1400000 },
    { month: 'Oct 2025', revenue: 2900000, expenses: 1650000, profit: 1250000 },
    { month: 'Nov 2025', revenue: 3300000, expenses: 1750000, profit: 1550000 },
    { month: 'Dec 2025', revenue: 3500000, expenses: 1850000, profit: 1650000 },
    { month: 'Jan 2026', revenue: 3250000, expenses: 1800000, profit: 1450000 },
  ];

  // Department-wise revenue breakdown
  const departmentRevenue = [
    { department: 'General Medicine', revenue: 850000, percentage: 26.2 },
    { department: 'Surgery', revenue: 750000, percentage: 23.1 },
    { department: 'Diagnostics', revenue: 550000, percentage: 16.9 },
    { department: 'Pharmacy', revenue: 450000, percentage: 13.8 },
    { department: 'Emergency', revenue: 400000, percentage: 12.3 },
    { department: 'Others', revenue: 250000, percentage: 7.7 },
  ];

  // Payment method breakdown
  const paymentMethodBreakdown = [
    { method: 'Cash', amount: 950000, count: 234 },
    { method: 'UPI', amount: 1100000, count: 567 },
    { method: 'Card', amount: 850000, count: 189 },
    { method: 'Insurance', amount: 350000, count: 45 },
  ];

  // Top performing doctors by revenue
  const doctorPerformance = [
    { name: 'Dr. Sharma', specialty: 'Cardiology', patients: 145, revenue: 725000 },
    { name: 'Dr. Patel', specialty: 'Orthopedics', patients: 132, revenue: 660000 },
    { name: 'Dr. Kumar', specialty: 'General Surgery', patients: 98, revenue: 490000 },
    { name: 'Dr. Reddy', specialty: 'Neurology', patients: 87, revenue: 435000 },
    { name: 'Dr. Singh', specialty: 'Pediatrics', patients: 156, revenue: 390000 },
  ];

  // Key metrics
  const currentMonthData = monthlyRevenue[monthlyRevenue.length - 1];
  const previousMonthData = monthlyRevenue[monthlyRevenue.length - 2];
  const revenueGrowth = (
    ((currentMonthData.revenue - previousMonthData.revenue) / previousMonthData.revenue) *
    100
  ).toFixed(1);
  const profitMargin = ((currentMonthData.profit / currentMonthData.revenue) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Revenue Reports</h1>
          <p className="text-gray-600 mt-1">Financial analytics and performance metrics</p>
        </div>
        <div className="flex gap-2">
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="monthly">Monthly Report</option>
            <option value="quarterly">Quarterly Report</option>
            <option value="yearly">Yearly Report</option>
          </select>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download className="h-5 w-5 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Current Revenue</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                ₹{(currentMonthData.revenue / 100000).toFixed(1)}L
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
            <span className="text-green-600">{revenueGrowth}%</span>
            <span className="text-gray-600 ml-2">vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Net Profit</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                ₹{(currentMonthData.profit / 100000).toFixed(1)}L
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4">Margin: {profitMargin}%</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Expenses</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                ₹{(currentMonthData.expenses / 100000).toFixed(1)}L
              </p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <BarChart3 className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            {((currentMonthData.expenses / currentMonthData.revenue) * 100).toFixed(1)}% of
            revenue
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Revenue/Day</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                ₹{Math.round(currentMonthData.revenue / 29).toLocaleString('en-IN')}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4">January 2026</p>
        </div>
      </div>

      {/* Revenue Trend Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <BarChart3 className="h-5 w-5 mr-2" />
          Revenue Trend (Last 7 Months)
        </h2>
        <div className="space-y-3">
          {monthlyRevenue.map((data, index) => {
            const maxRevenue = Math.max(...monthlyRevenue.map((m) => m.revenue));
            const revenueWidth = (data.revenue / maxRevenue) * 100;
            const profitWidth = (data.profit / maxRevenue) * 100;
            return (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">{data.month}</span>
                  <div className="flex gap-4">
                    <span className="text-gray-600">
                      Revenue: ₹{(data.revenue / 100000).toFixed(1)}L
                    </span>
                    <span className="text-green-600">
                      Profit: ₹{(data.profit / 100000).toFixed(1)}L
                    </span>
                  </div>
                </div>
                <div className="relative h-8 bg-gray-100 rounded">
                  <div
                    className="absolute h-full bg-blue-500 rounded"
                    style={{ width: `${revenueWidth}%` }}
                  ></div>
                  <div
                    className="absolute h-full bg-green-500 rounded"
                    style={{ width: `${profitWidth}%`, opacity: 0.7 }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex gap-6 mt-4 text-sm">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
            <span className="text-gray-600">Revenue</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
            <span className="text-gray-600">Profit</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Revenue */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <PieChart className="h-5 w-5 mr-2" />
            Department-wise Revenue
          </h2>
          <div className="space-y-4">
            {departmentRevenue.map((dept, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">{dept.department}</span>
                  <span className="text-gray-900 font-semibold">
                    ₹{dept.revenue.toLocaleString('en-IN')} ({dept.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${dept.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Method Breakdown</h2>
          <div className="space-y-4">
            {paymentMethodBreakdown.map((payment, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">{payment.method}</p>
                  <p className="text-sm text-gray-600">{payment.count} transactions</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">
                    ₹{payment.amount.toLocaleString('en-IN')}
                  </p>
                  <p className="text-sm text-gray-600">
                    {((payment.amount / currentMonthData.revenue) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performing Doctors */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Top Performing Doctors</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doctor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Specialty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patients
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg. per Patient
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {doctorPerformance.map((doctor, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {doctor.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {doctor.specialty}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {doctor.patients}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    ₹{doctor.revenue.toLocaleString('en-IN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{Math.round(doctor.revenue / doctor.patients).toLocaleString('en-IN')}
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
