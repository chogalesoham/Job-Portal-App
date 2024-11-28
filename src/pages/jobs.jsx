import { getJobs } from "@/api/apiJobs";
import useFetch from "@/hooks/use-fetch";
import { useSession } from "@clerk/clerk-react";
import React, { useEffect } from "react";

const Jobs = () => {
  const {
    fn: fnJobs,
    data: dataJobs,
    loading: loadingJobs,
  } = useFetch(getJobs, {});

  console.log("Data jobs", dataJobs);

  useEffect(() => {
    fnJobs();
  }, []);

  return (
    <div>
      <h1>Jobs</h1>
    </div>
  );
};

export default Jobs;
