import React from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/app-layout";
import LandingPage from "./pages/landing-page";
import JobListing from "./pages/job-listing";
import Job from "./pages/job";
import MyJob from "./pages/my-job";
import OnBoarding from "./pages/onboarding";
import PostJob from "./pages/post-job";
import SevedJob from "./pages/seved-job";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/job-listing",
        element: <JobListing />,
      },
      {
        path: "/job/:id",
        element: <Job />,
      },
      {
        path: "/my-job",
        element: <MyJob />,
      },
      {
        path: "/    ",
        element: <OnBoarding />,
      },
      {
        path: "/post-job",
        element: <PostJob />,
      },
      {
        path: "/seved-job",
        element: <SevedJob />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
