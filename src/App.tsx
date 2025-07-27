import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/hooks/useAuth";
import { DashboardLayout } from "@/components/dashboard-layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Campaigns from "./pages/Campaigns";
import Backlinks from "./pages/Backlinks";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="backlink-pro-theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Dashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              <Route path="/dashboard/campaigns" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Campaigns />
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              <Route path="/dashboard/campaigns/:id" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <div className="text-center p-8">Campaign details coming soon</div>
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              <Route path="/dashboard/backlinks" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Backlinks />
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              <Route path="/dashboard/websites" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <div className="text-center p-8">Websites page coming soon</div>
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              <Route path="/dashboard/analytics" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Analytics />
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              <Route path="/dashboard/settings" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <div className="text-center p-8">Settings page coming soon</div>
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              <Route path="/dashboard/billing" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <div className="text-center p-8">Billing page coming soon</div>
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
