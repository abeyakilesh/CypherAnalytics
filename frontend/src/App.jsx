import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSocket } from './hooks/useSocket';
import { CurrencyProvider } from './context/CurrencyContext';

import Layout from './layout/Layout';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import LiveTransactions from './pages/LiveTransactions';
import FraudAlerts from './pages/FraudAlerts';
import Analytics from './pages/Analytics';
import DataExplorer from './pages/DataExplorer';
import Settings from './pages/Settings';

function AppRoutes() {
  const { isConnected, transactions, alerts, stats } = useSocket();

  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected */}
      <Route path="/dashboard" element={<Layout isConnected={isConnected} alertCount={alerts.length} alerts={alerts} />}>
        <Route index element={<Dashboard stats={stats} transactions={transactions} alerts={alerts} />} />
        <Route path="live" element={<LiveTransactions transactions={transactions} />} />
        <Route path="alerts" element={<FraudAlerts alerts={alerts} />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="explorer" element={<DataExplorer />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Demo — same layout, same data */}
      <Route path="/demo" element={<Layout isConnected={isConnected} alertCount={alerts.length} alerts={alerts} />}>
        <Route index element={<Dashboard stats={stats} transactions={transactions} alerts={alerts} />} />
        <Route path="live" element={<LiveTransactions transactions={transactions} />} />
        <Route path="alerts" element={<FraudAlerts alerts={alerts} />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="explorer" element={<DataExplorer />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <CurrencyProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </CurrencyProvider>
  );
}
