import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "@/contexts/AuthContext";
import { SavedJobsProvider } from "@/contexts/SavedJobsContext";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import JobDetails from "./pages/JobDetails";
import Apply from "./pages/Apply";
import Profile from "./pages/Profile";
import Employers from "./pages/Employers";
import EmployerManageJobs from "./pages/EmployerManageJobs";
import EmployerApplications from "./pages/EmployerApplications";
import EmployerInterviews from "./pages/EmployerInterviews";
import About from "./pages/About";
import ProtectedRoute from "@/components/ProtectedRoute";
import SavedJobs from "./pages/SavedJobs";
import PostJob from "./pages/PostJob";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <SavedJobsProvider>
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/post-job"
              element={
                <ProtectedRoute requiredRole="employer">
                  <PostJob />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employers"
              element={
                <ProtectedRoute requiredRole="employer">
                  <Employers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employer/manage"
              element={
                <ProtectedRoute requiredRole="employer">
                  <EmployerManageJobs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employer/applications"
              element={
                <ProtectedRoute requiredRole="employer">
                  <EmployerApplications />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employer/interviews"
              element={
                <ProtectedRoute requiredRole="employer">
                  <EmployerInterviews />
                </ProtectedRoute>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/saved" element={<SavedJobs />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </BrowserRouter>
        </SavedJobsProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
