import { getJobs } from "@/api/apiJobs";
import { useSession } from "@clerk/clerk-react";
import React, { useEffect } from "react";

const Jobs = () => {
  const { session } = useSession();

  const fetchJobs = async () => {
    try {
      const supabaseAccessToken = await session.getToken({
        template: "supabase",
      });

      const data = await getJobs(supabaseAccessToken);
      console.log("Jobs Data:", data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  useEffect(() => {
    if (session) {
      fetchJobs();
    }
  }, [session]);

  return (
    <div>
      <h1>Jobs</h1>
    </div>
  );
};

export default Jobs;
