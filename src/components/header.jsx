import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";

const Header = () => {
  const [showSingIn, setShowSingIn] = useState(false);
  const [search, setSearch] = useSearchParams();
  const { user } = useUser();

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSingIn(true);
    }
  }, [search]);

  const handalShowOverlay = (e) => {
    if (e.target === e.currentTarget) {
      setShowSingIn(false);
      setSearch({});
    }
  };

  return (
    <>
      <nav className=" my-2 flex container justify-between items-center">
        <Link>
          <img src="/logo.png" alt="logo" className=" h-20" />
        </Link>

        <div className=" flex gap-8">
          <SignedOut>
            <Button variant="outline" onClick={() => setShowSingIn(true)}>
              Login
            </Button>
          </SignedOut>

          <SignedIn>
            {user?.unsafeMetadata?.role === "recruiter" && (
              <Link to="post-jobs">
                <Button variant="destructive" className=" rounded-full">
                  <PenBox className=" mr-2" />
                  Post a Job
                </Button>
              </Link>
            )}

            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/my-jobs"
                />
              </UserButton.MenuItems>

              <UserButton.MenuItems>
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Heart size={15} />}
                  href="/seved-jobs"
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>

      {showSingIn && (
        <div
          onClick={(e) => handalShowOverlay(e)}
          className=" flex items-center justify-center fixed inset-0 bg-black bg-opacity-50"
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </>
  );
};

export default Header;
