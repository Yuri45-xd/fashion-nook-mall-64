
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import CategoryPage from "./pages/CategoryPage";
import Auth from "./pages/Auth";
import EmailVerification from "./components/EmailVerification";
import LocationEnabler from "./components/LocationEnabler";
import Admin from "./pages/Admin";
import AdminAuth from "./pages/AdminAuth";
import CustomerCare from "./pages/CustomerCare";
import About from "./pages/About";
import Orders from "./pages/Orders";
import Wishlist from "./pages/Wishlist";
import NotificationPreferences from "./pages/NotificationPreferences";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import Stories from "./pages/Stories";
import Wholesale from "./pages/Wholesale";
import Payments from "./pages/Payments";
import Shipping from "./pages/Shipping";
import Cancellation from "./pages/Cancellation";
import FAQ from "./pages/FAQ";
import Report from "./pages/Report";
import ReturnPolicy from "./pages/ReturnPolicy";
import Terms from "./pages/Terms";
import Security from "./pages/Security";
import Privacy from "./pages/Privacy";
import Sitemap from "./pages/Sitemap";
import Facebook from "./pages/Facebook";
import Twitter from "./pages/Twitter";
import YouTube from "./pages/YouTube";
import Instagram from "./pages/Instagram";
import Returns from "./pages/Returns";
import Deals from "./pages/Deals";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <LocationEnabler />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/categories/:categoryName" element={<CategoryPage />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/signup" element={<Auth />} />
            <Route path="/verify" element={<EmailVerification />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/auth" element={<AdminAuth />} />
            <Route path="/customer-care" element={<CustomerCare />} />
            <Route path="/about" element={<About />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/notification-preferences" element={<NotificationPreferences />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/wholesale" element={<Wholesale />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/cancellation" element={<Cancellation />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/report" element={<Report />} />
            <Route path="/return-policy" element={<ReturnPolicy />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/security" element={<Security />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path="/facebook" element={<Facebook />} />
            <Route path="/twitter" element={<Twitter />} />
            <Route path="/youtube" element={<YouTube />} />
            <Route path="/instagram" element={<Instagram />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
