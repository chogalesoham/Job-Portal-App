import { getCompanies } from "@/api/apiCompanies";
import { getJobs } from "@/api/apiJobs";
import JobCard from "@/components/job-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/hooks/use-fetch";
import { useSession, useUser } from "@clerk/clerk-react";
import { State } from "country-state-city";
import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");
  const { isLoaded } = useUser();
  const {
    fn: fnJobs,
    data: dataJobs,
    loading: loadingJobs,
  } = useFetch(getJobs, { searchQuery, location, company_id });

  const { fn: fnCompanies, data: dataCompanies } = useFetch(getCompanies);

  console.log("companies Data", dataCompanies?.length);

  console.log("Data jobs", dataJobs);

  useEffect(() => {
    if (isLoaded) {
      fnCompanies();
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      fnJobs();
    }
  }, [isLoaded, searchQuery, location, company_id]);

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    const query = formData.get("serach-query");
    setSearchQuery(query);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setCompany_id("");
    setLocation("");
  };

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div>
      <h1 className=" gredient-tital font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Latest Jobs
      </h1>

      {/* Add filters here */}
      <form
        onSubmit={handleSearch}
        className=" h-12 flex gap-2 w-full items-center mb-3"
      >
        <Input
          autoComplete="off"
          type="text"
          placeholder="Search Jobs by Title..."
          name="serach-query"
          className=" h-full flex-1 px-4 text-md"
        />
        <Button type="submit" variant="blue" className="h-full sm:w28">
          Search
        </Button>
      </form>

      <div className=" flex flex-col sm:flex-row gap-2">
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent>
            {State.getStatesOfCountry("IN").map(({ name }) => (
              <SelectItem key={name} value={name}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={company_id}
          onValueChange={(value) => setCompany_id(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filter by Company Name" />
          </SelectTrigger>
          <SelectContent>
            {dataCompanies &&
              dataCompanies.map(({ name, id }) => {
                return (
                  <SelectItem key={id} value={id}>
                    {name}
                  </SelectItem>
                );
              })}
          </SelectContent>
        </Select>

        <Button
          onClick={clearFilters}
          variant="destructive"
          className=" sm:w-1/2"
        >
          Clear Filter
        </Button>
      </div>

      {loadingJobs && (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      )}

      {loadingJobs === false && (
        <div className=" mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dataJobs?.length ? (
            dataJobs?.map((job, index) => (
              <JobCard
                savedInit={job?.saved?.length > 0}
                key={index}
                job={job}
              />
            ))
          ) : (
            <div>No Jobs Found ❗</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Jobs;
