import { useEffect, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { CartProvider } from './lib/CartContext';
import { useReveal } from './lib/useReveal';
import { trackPageView } from './lib/pixel';
import Nav from './components/Nav';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import StripeReturn from './components/StripeReturn';
import ScrollToHash from './components/ScrollToHash';
import Landing from './pages/Landing';
import ShopPage from './pages/ShopPage';
import AboutPage from './pages/AboutPage';
import ProductPage from './pages/ProductPage';
import CustomPage from './pages/CustomPage';
import TournamentPage from './pages/TournamentPage';
import NotFound from './pages/NotFound';

export default function App() {
  const { pathname } = useLocation();
  const isLanding = pathname === '/';
  /* Re-scan for `.reveal` elements whenever the route swaps in new sections. */
  useReveal([pathname]);

  /* Meta only sees the first load from the script tag in index.html. Every
     route change after that is a page view it would otherwise miss, which is
     why the pixel reports one sack page for a whole session of browsing.
     Skipping the first run keeps the landing page from counting twice. */
  const isFirstRoute = useRef(true);
  useEffect(() => {
    if (isFirstRoute.current) {
      isFirstRoute.current = false;
      return;
    }
    trackPageView();
  }, [pathname]);

  return (
    <CartProvider>
      <ScrollToHash />
      <StripeReturn />
      {/* Nav floats over the hero art on the landing page, so the poster runs to
          the very top of the page rather than sitting under a stack of bars. */}
      <Nav overlay={isLanding} />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/sacks/:id" element={<ProductPage />} />
        <Route path="/custom" element={<CustomPage />} />
        <Route path="/tournament" element={<TournamentPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
      <CartDrawer />
    </CartProvider>
  );
}
