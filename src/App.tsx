import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Properties from './pages/Properties';
import Brokers from './pages/Brokers';
import Documents from './pages/Documents';
import Settings from './pages/Settings';
import Help from './pages/Help';
import Landlords from './pages/Landlords';
import Maps from './pages/Maps';
import Tenants from './pages/Tenants';
import Payments from './pages/Payments';
import Accounts from './pages/Accounts';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

const PublicRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : element;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<PublicRoute element={<Login />} />} />
      <Route path="/register" element={<PublicRoute element={<Register />} />} />
      <Route path="/forgot-password" element={<PublicRoute element={<ForgotPassword />} />} />

      {/* Protected Routes */}
      <Route path="/" element={<PrivateRoute element={<Layout><Dashboard /></Layout>} />} />
      <Route path="/dashboard" element={<PrivateRoute element={<Layout><Dashboard /></Layout>} />} />
      <Route path="/properties" element={<PrivateRoute element={<Layout><Properties /></Layout>} />} />
      <Route path="/brokers" element={<PrivateRoute element={<Layout><Brokers /></Layout>} />} />
      <Route path="/documents" element={<PrivateRoute element={<Layout><Documents /></Layout>} />} />
      <Route path="/settings" element={<PrivateRoute element={<Layout><Settings /></Layout>} />} />
      <Route path="/help" element={<PrivateRoute element={<Layout><Help /></Layout>} />} />
      <Route path="/landlords" element={<PrivateRoute element={<Layout><Landlords /></Layout>} />} />
      <Route path="/maps" element={<PrivateRoute element={<Layout><Maps /></Layout>} />} />
      <Route path="/tenants" element={<PrivateRoute element={<Layout><Tenants /></Layout>} />} />
      <Route path="/payments" element={<PrivateRoute element={<Layout><Payments /></Layout>} />} />
      <Route path="/accounts" element={<PrivateRoute element={<Layout><Accounts /></Layout>} />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;