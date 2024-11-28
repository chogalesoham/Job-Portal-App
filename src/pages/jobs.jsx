import { getJobs } from "@/api/apiJobs";
import JobCard from "@/components/job-card";
import useFetch from "@/hooks/use-fetch";
import { useSession, useUser } from "@clerk/clerk-react";
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

  console.log("Data jobs", dataJobs);

  useEffect(() => {
    if (isLoaded) {
      fnJobs();
    }
  }, [isLoaded, searchQuery, location, company_id]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div>
      <h1 className=" gredient-tital font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Latest Jobs
      </h1>

      {/* Add filters here */}

      {loadingJobs && (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      )}

      {loadingJobs === false && (
        <div className=" mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dataJobs?.length ? (
            dataJobs?.map((job, index) => <JobCard key={index} job={job} />)
          ) : (
            <div>No Jobs Found ❗</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Jobs;
