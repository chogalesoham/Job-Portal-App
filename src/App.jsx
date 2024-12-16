import React from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import { HashRouter as Router, Routes, Route } from "react-router-dom"; // Changed BrowserRouter to HashRouter
import AppLayout from "./layouts/app-layout";
import LandingPage from "./pages/landing-page";
import JobListing from "./pages/job-listing";
import Job from "./pages/job";
import MyJob from "./pages/my-job";
import PostJob from "./pages/post-job";
import SevedJob from "./pages/seved-job";
import { ThemeProvider } from "./components/theme-provider";
import Jobs from "./pages/jobs";
import ProtectedRoute from "./components/protected-route";
import OnBoarding from "./pages/onboarding.jsx";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        {" "}
        {/* Use HashRouter to ensure proper routing on Vercel */}
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/onboarding"
              element={
                <ProtectedRoute>
                  <OnBoarding />
                </ProtectedRoute>
              }
            />
            <Route
              path="/jobs"
              element={
                <ProtectedRoute>
                  <Jobs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/post-jobs"
              element={
                <ProtectedRoute>
                  <PostJob />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-jobs"
              element={
                <ProtectedRoute>
                  <MyJob />
                </ProtectedRoute>
              }
            />
            <Route
              path="/seved-jobs"
              element={
                <ProtectedRoute>
                  <SevedJob />
                </ProtectedRoute>
              }
            />
            <Route
              path="/job-listing"
              element={
                <ProtectedRoute>
                  <JobListing />
                </ProtectedRoute>
              }
            />
            <Route
              path="/job/:id"
              element={
                <ProtectedRoute>
                  <Job />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
