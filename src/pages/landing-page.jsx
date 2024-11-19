import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";
import companiesData from "../data/companies.json";
import faqData from "../data/faq.json";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion } from "@radix-ui/react-accordion";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
        <Link to="/post-jobs">
          <Button variant="destructive" size="xl">
            {" "}
            Post a Jobs
          </Button>
        </Link>
      </div>

      {/* carousal */}
      <Carousel plugins={[Autoplay({ delay: 1500 })]} className="w-full py-10">
        <CarouselContent className=" flex gap-5 sm:gap-20 items-center">
          {companiesData.map((item, idx) => (
            <CarouselItem key={idx} className=" basis-1/3 lg:basis-1/6">
              <img
                src={item.path}
                alt={item.name}
                className=" h-9 sm:h-14 object-contain"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* banner */}

      <img src="/banner.jpeg" className=" w-full" />

      <section className=" grid  grid-cols-1 md:grid-cols-2 gap-4">
        {/* cards */}

        <Card>
          <CardHeader>
            <CardTitle>For Job Seekers</CardTitle>
          </CardHeader>
          <CardContent>
            Search and apply for jobs, track applications, and more.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
          </CardHeader>
          <CardContent>
            Post Jobs, manage applications, and find the best candidates.
          </CardContent>
        </Card>
      </section>

      {/* Accordion */}

      <Accordion type="single" collapsible>
        {faqData.map((faq, idx) => (
          <AccordionItem key={idx} value={`item-${idx + 1}`}>
            <AccordionTrigger className=" text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className=" text-left">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  );
};

export default LandingPage;
