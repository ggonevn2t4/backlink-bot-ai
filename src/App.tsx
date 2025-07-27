import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { DashboardLayout } from "@/components/dashboard-layout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Campaigns from "./pages/Campaigns";
import Backlinks from "./pages/Backlinks";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="backlink-pro-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            } />
            <Route path="/dashboard/campaigns" element={
              <DashboardLayout>
                <Campaigns />
              </DashboardLayout>
            } />
            <Route path="/dashboard/campaigns/:id" element={
              <DashboardLayout>
                <div className="text-center p-8">Campaign details coming soon</div>
              </DashboardLayout>
            } />
            <Route path="/dashboard/backlinks" element={
              <DashboardLayout>
                <Backlinks />
              </DashboardLayout>
            } />
            <Route path="/dashboard/websites" element={
              <DashboardLayout>
                <div className="text-center p-8">Websites page coming soon</div>
              </DashboardLayout>
            } />
            <Route path="/dashboard/analytics" element={
              <DashboardLayout>
                <div className="text-center p-8">Analytics page coming soon</div>
              </DashboardLayout>
            } />
            <Route path="/dashboard/settings" element={
              <DashboardLayout>
                <div className="text-center p-8">Settings page coming soon</div>
              </DashboardLayout>
            } />
            <Route path="/dashboard/billing" element={
              <DashboardLayout>
                <div className="text-center p-8">Billing page coming soon</div>
              </DashboardLayout>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
