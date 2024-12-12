"use client";
import { useCurrentUser } from "@/hooks/user";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import { CgProfile } from "react-icons/cg";
import { FaTwitter } from "react-icons/fa";
import { IoHomeSharp } from "react-icons/io5";
import logo from "../../public/logo.png";
interface sidebarType {
  name: string;
  route: string;
  icon: React.ReactNode;
}

export default function Sidebar() {
  const { user } = useCurrentUser();
  const router = useRouter();
  const id = user?.id;
  const pathname = usePathname();

  const sidebarList: sidebarType[] = useMemo(
    () => [
      {
        name: "Home",
        route: "/",
        icon: <IoHomeSharp />,
      },

      {
        name: "Profile",
        route: `/profile/${id}`,
        icon: <CgProfile />,
      },
    ],
    [id]
  );
  const handleClick = useCallback(
    (item: sidebarType): void => {
      if (item.route.startsWith("/profile") && !user) {
        toast.error("You need to Login first");
        return;
      }
      router.push(item.route.toLowerCase());
    },
    [router, user]
  );
  return (
    <>
      <div className="  h-full w-full max-w-xs pt-5 px-2 md:px-8 flex flex-col justify-between">
        <div>
          <div className="text-4xl w-fit  p-2 rounded-full ">
            <Image src={logo} alt="logo" width={150} height={30} />
          </div>
          <div className="flex flex-col gap-4 mt-4 text-xl font-semibold">
            {sidebarList.map((item) => (
              <div
                key={item.name}
                className={`flex space-x-4 items-center max-md:justify-center cursor-pointer  p-3 px-4 rounded-full hover:bg-gray-600 ${
                  pathname === item.route && "bg-gray-700"
                }`}
                onClick={() => handleClick(item)}
              >
                <div>{item.icon}</div>
                <span className="md:block hidden">{item.name}</span>
              </div>
            ))}
          </div>
          <div className="max-md:hidden">
            <button className=" bg-[#086972] hover:opacity-90 text-white p-3 px-6 mt-4 rounded-full w-full font-semibold ">
              Tweet
            </button>
          </div>
        </div>
        {user && (
          <div className="flex items-start justify-start max-md:justify-center gap-4 pb-12">
            <Image
              src={user.profileImage}
              height={40}
              width={40}
              className="rounded-full"
              alt="profile-pic"
            />
            <div className="max-md:hidden">{user.firstName}</div>
          </div>
        )}
      </div>
    </>
  );
}
