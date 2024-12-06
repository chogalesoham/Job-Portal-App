import { getSingleJob, updateHiringStatus } from "@/api/apiJobs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import MDEditor from "@uiw/react-md-editor";
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from "lucide-react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const Job = () => {
  const { isLoaded, user } = useUser();
  const { id } = useParams();

  const {
    loading: loadingJob,
    data: job,
    error: jobError,
    fn: fnJob,
  } = useFetch(getSingleJob, { job_id: id });

  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateHiringStatus,
    { job_id: id }
  );

  const handleStatusChange = (value) => {
    let isOpen = value === "open";
    fnHiringStatus(isOpen).then(() => fnJob());
  };

  useEffect(() => {
    if (isLoaded) {
      fnJob();
    }
  }, [isLoaded]);

  if (!isLoaded || loadingJob) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  if (jobError) {
    return (
      <div className="text-red-500">Error loading job: {jobError.message}</div>
    );
  }

  if (!job) {
    return <div>No job found.</div>;
  }

  return (
    <div className="flex flex-col gap-8 mt-5">
      {/* Job Header */}
      <div className="flex flex-col-reverse gap-6 md:flex-row justify-between items-center">
        <h1 className="gradient-title font-extrabold pb-3 text-4xl sm:text-6xl">
          {job?.title}
        </h1>
        <img
          src={job?.company?.logo_url}
          className="h-12"
          alt={job?.company?.name}
        />
      </div>

      {/* Job Info */}
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <MapPinIcon className="h-5 w-5" />
          <span>{job?.location}</span>
        </div>
        <div className="flex gap-2 items-center">
          <Briefcase className="h-5 w-5" />
          <span>{job?.applications?.length || 0} Applicants</span>
        </div>
        <div className="flex gap-2 items-center">
          {job?.isOpen ? (
            <>
              <DoorOpen className="h-5 w-5" />
              <span>Open</span>
            </>
          ) : (
            <>
              <DoorClosed className="h-5 w-5" />
              <span>Closed</span>
            </>
          )}
        </div>
      </div>

      {/* Hiring Status */}
      {loadingHiringStatus && (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      )}
      {job?.recruiter_id === user?.id && (
        <Select onValueChange={handleStatusChange}>
          <SelectTrigger
            className={`w-full ${
              job?.isOpen ? " bg-green-950" : " bg-red-950"
            }`}
          >
            <SelectValue
              placeholder={`Hiring Status ${
                job?.isOpen ? "(Open)" : "(Closed)"
              }`}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      )}

      {/* Job Description */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold">About the Job</h2>
        <p className="sm:text-lg">{job?.description}</p>
      </div>

      {/* Job Requirements */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold">
          What We Are Looking For
        </h2>
        <MDEditor.Markdown
          source={job?.requirements || "No specific requirements provided."}
          className="bg-transparent sm:text-lg prose"
        />
      </div>
    </div>
  );
};

export default Job;
