
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import { FilterProvider } from './contexts/FilterContext';
import { CartProvider } from './contexts/CartContext';
import Index from "./pages/Index";
import ProductListing from "./pages/ProductListing";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Auth from "./pages/Auth";
import Categories from "./pages/Categories";
import CategoryPage from "./pages/CategoryPage";
import Profile from "./pages/Profile";
import SearchResults from "./pages/SearchResults";
import SearchPage from "./pages/SearchPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <FilterProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/products" element={<ProductListing />} />
                <Route path="/product/:productId" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/category/:categoryId" element={<CategoryPage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/search-results" element={<SearchResults />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </FilterProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
