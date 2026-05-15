import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Cart from './pages/Cart';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';

import Collections from './pages/Collections';
import CollectionDetail from './pages/CollectionDetail';
import Jastip from './pages/Jastip';
import RequestJastip from './pages/RequestJastip';
import PreOrder from './pages/PreOrder';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Profile from './pages/Account/Profile';
import Orders from './pages/Account/Orders';
import JastipRequests from './pages/Account/JastipRequests';
import Addresses from './pages/Account/Addresses';
import Notifications from './pages/Account/Notifications';
import Dashboard from './pages/Admin/Dashboard';
import ProductManagement from './pages/Admin/ProductManagement';
import OrderManagement from './pages/Admin/OrderManagement';
import RequestManagement from './pages/Admin/RequestManagement';
import NotificationAdmin from './pages/Admin/NotificationAdmin';
import AdminProfile from './pages/Admin/Profile';
import AdminLogin from './pages/Admin/Login';
import AdminRoute from './components/auth/AdminRoute';

function AppContent() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900 flex flex-col">
      {!isAdminPath && <Header />}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/:slug" element={<CollectionDetail />} />
          <Route path="/jastip" element={<Jastip />} />
          <Route path="/jastip/request" element={<ProtectedRoute><RequestJastip /></ProtectedRoute>} />
          <Route path="/pre-order/:id" element={<ProtectedRoute><PreOrder /></ProtectedRoute>} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/account/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="/account/jastip" element={<ProtectedRoute><JastipRequests /></ProtectedRoute>} />
          <Route path="/account/addresses" element={<ProtectedRoute><Addresses /></ProtectedRoute>} />
          <Route path="/account/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminRoute><Dashboard /></AdminRoute>} />
          <Route path="/admin/products" element={<AdminRoute><ProductManagement /></AdminRoute>} />
          <Route path="/admin/orders" element={<AdminRoute><OrderManagement /></AdminRoute>} />
          <Route path="/admin/requests" element={<AdminRoute><RequestManagement /></AdminRoute>} />
          <Route path="/admin/notifications" element={<AdminRoute><NotificationAdmin /></AdminRoute>} />
          <Route path="/admin/profile" element={<AdminRoute><AdminProfile /></AdminRoute>} />
        </Routes>
      </div>
      {!isAdminPath && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <CartProvider>
          <Router basename={import.meta.env.BASE_URL}>
            <AppContent />
          </Router>
        </CartProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}
