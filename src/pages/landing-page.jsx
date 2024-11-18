import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <main className=" flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
      <section className=" text-center">
        <h1 className=" flex flex-col items-center justify-center gradient-tital text-4xl font-extrabold sm:text-6xl lg:text-8xl tracking-tighter py-4">
          Find Your Dream Job{" "}
          <span className=" flex items-center justify-center gap-2 lg:gap-4">
            and get{" "}
            <img src="/logo.png" alt="logo" className=" h-14 sm:h-24 lg:h-32" />
          </span>
        </h1>
        <p className=" text-gray-300 sm:my-4 text-xl sm:text-xl">
          Explore thousands of job listings or find the perfect candidate
        </p>
      </section>
      <div className=" flex justify-center gap-4">
        {/* buttons */}
        <Link to="/jobs">
          <Button variant="blue" size="xl">
            {" "}
            Find Jobs
          </Button>
        </Link>
        <Link to="/post-job">
          <Button variant="destructive" size="xl">
            {" "}
            Post a Jobs
          </Button>
        </Link>
      </div>
      {/* carousal */}

      {/* banner */}

      <section>{/* cards */}</section>

      {/* Accordion */}
    </main>
  );
};

export default LandingPage;
