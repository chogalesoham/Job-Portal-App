import React from "react";
import { Outlet } from "react-router-dom";
import "../App.css";
import Header from "@/components/header";

const AppLayout = () => {
  return (
    <div>
      <div className="grid-background"></div>
      <main className=" min-h-screen container mx-auto px-6">
        <Header />
        <Outlet />
      </main>
      <footer className=" p-10 text-center bg-gray-800 mt-10">
        Made With 💗 By Soham Chogale
      </footer>
    </div>
  );
};

export default AppLayout;
