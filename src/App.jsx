import { Route, Routes } from 'react-router-dom';
import { CartProvider } from './lib/CartContext';
import AnnouncementBar from './components/AnnouncementBar';
import Nav from './components/Nav';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import StripeReturn from './components/StripeReturn';
import ScrollToHash from './components/ScrollToHash';
import Landing from './pages/Landing';
import ProductPage from './pages/ProductPage';
import CustomPage from './pages/CustomPage';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <CartProvider>
      <ScrollToHash />
      <StripeReturn />
      <AnnouncementBar />
      <Nav />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/sacks/:id" element={<ProductPage />} />
        <Route path="/custom" element={<CustomPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
      <CartDrawer />
    </CartProvider>
  );
}
