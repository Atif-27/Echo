"use client";
import React from "react";
import LoginButon from "./LoginButon";
import { useCurrentUser } from "@/hooks/user";
import Image from "next/image";
import { useRouter } from "next/navigation";
import FollowButton from "./FollowButton";

export default function OptionalBar() {
  const { user } = useCurrentUser();
  const router = useRouter();
  return (
    <>
      <>{!user && <LoginButon />}</>
      <>
        <div className=" flex flex-col gap-2 bg-slate-800 p-3 m-4 rounded-xl max-w-fit">
          <h2 className=" text-xl font-semibold gap-2 ">Recommended Users</h2>
          {user ? (
            <div className="mt-4">
              {user?.recommendedUser && user.recommendedUser.length > 0 ? (
                user?.recommendedUser?.map((user) => (
                  <div
                    key={user?.id}
                    className=" flex  gap-4 p-3 bg-slate-700 cursor-pointer "
                  >
                    <Image
                      src={user!.profileImage}
                      alt="pfp"
                      width={30}
                      height={15}
                      className="rounded-full w-fit h-fit"
                    />
                    <div className=" flex flex-col gap-2">
                      <p>{user?.firstName + " " + user?.lastName}</p>

                      <button
                        onClick={() => {
                          router.push("/profile/" + user?.id);
                        }}
                        className="text-sm bg-white text-black rounded-full px-4 py-1"
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm -mt-4">Follow others to view</p>
              )}
            </div>
          ) : (
            <p className="text-sm">Login to View</p>
          )}
        </div>
      </>
    </>
  );
}
