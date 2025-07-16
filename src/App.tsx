import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Weather from "./pages/Weather";
import SoilMonitor from "./pages/SoilMonitor";
import CropHealth from "./pages/CropHealth";
import History from "./pages/History";
import Predictions from "./pages/Predictions";
import Diseases from "./pages/Diseases";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/soil" element={<SoilMonitor />} />
            <Route path="/health" element={<CropHealth />} />
            <Route path="/history" element={<History />} />
            <Route path="/predictions" element={<Predictions />} />
            <Route path="/diseases" element={<Diseases />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
