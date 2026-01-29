import { Routes, Route, Navigate } from 'react-router-dom';
import { DollarSign, FileText, TrendingUp, Users, CreditCard, Receipt } from 'lucide-react';
import DashboardLayout from '../shared/DashboardLayout';
import FinancialOverview from './FinancialOverview';
import BillingManagement from './BillingManagement';
import PaymentTracking from './PaymentTracking';
import RevenueReports from './RevenueReports';
import PatientAccounts from './PatientAccounts';
import ExpenseManagement from './ExpenseManagement';

interface AccountantDashboardProps {
  userName: string;
  onLogout: () => void;
}

export default function AccountantDashboard({
  userName,
  onLogout,
}: AccountantDashboardProps) {
  const navigation = [
    {
      label: 'Financial Overview',
      path: '/accountant',
      icon: <DollarSign className="h-5 w-5" />,
    },
    {
      label: 'Billing & Invoices',
      path: '/accountant/billing',
      icon: <FileText className="h-5 w-5" />,
    },
    {
      label: 'Payment Tracking',
      path: '/accountant/payments',
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      label: 'Patient Accounts',
      path: '/accountant/accounts',
      icon: <Users className="h-5 w-5" />,
    },
    {
      label: 'Expense Management',
      path: '/accountant/expenses',
      icon: <Receipt className="h-5 w-5" />,
    },
    {
      label: 'Revenue Reports',
      path: '/accountant/reports',
      icon: <TrendingUp className="h-5 w-5" />,
    },
  ];

  return (
    <DashboardLayout
      userName={userName}
      userRole="Accountant"
      navigation={navigation}
      onLogout={onLogout}
    >
      <Routes>
        {/* /accountant - Financial Overview Dashboard */}
        <Route index element={<FinancialOverview />} />

        {/* /accountant/billing - Manage bills and invoices */}
        <Route path="billing" element={<BillingManagement />} />

        {/* /accountant/billing/:invoiceId - View/edit specific invoice */}
        <Route path="billing/:invoiceId" element={<BillingManagement />} />

        {/* /accountant/payments - Track all payments */}
        <Route path="payments" element={<PaymentTracking />} />

        {/* /accountant/accounts - Patient account management */}
        <Route path="accounts" element={<PatientAccounts />} />

        {/* /accountant/accounts/:patientId - Specific patient account details */}
        <Route path="accounts/:patientId" element={<PatientAccounts />} />

        {/* /accountant/expenses - Manage hospital expenses */}
        <Route path="expenses" element={<ExpenseManagement />} />

        {/* /accountant/reports - Financial reports and analytics */}
        <Route path="reports" element={<RevenueReports />} />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/accountant" replace />} />
      </Routes>
    </DashboardLayout>
  );
}
