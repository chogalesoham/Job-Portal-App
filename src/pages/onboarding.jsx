import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Navigate, useNavigate } from "react-router-dom";

const OnBoarding = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const handleRoleSelection = async (role) => {
    await user
      .update({ unsafeMetadata: { role } })
      .then(() => {
        navigate(role === "recruiter" ? "/post-jobs" : "/jobs");
      })
      .catch((err) => {
        console.log("Error updating role:", err);
      });
  };

  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      navigate(
        user?.unsafeMetadata?.role === "recruiter" ? "/post-jobs" : "/jobs"
      );
    }
  }, [user]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className=" flex flex-col items-center justify-center mt-40">
      <h2 className=" gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter">
        I am a...
      </h2>
      <div className=" mt-16 grid grid-cols-2 gap-4 w-full md:px-40">
        <Button
          onClick={() => handleRoleSelection("candidate")}
          variant="blue"
          className=" h-36 text-2xl"
        >
          Candidate
        </Button>
        <Button
          onClick={() => handleRoleSelection("recruiter")}
          variant="destructive"
          className=" h-36 text-2xl"
        >
          Recruiter
        </Button>
      </div>
    </div>
  );
};

export default OnBoarding;
