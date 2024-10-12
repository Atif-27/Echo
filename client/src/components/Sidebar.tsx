"use client";
import { useCurrentUser } from "@/hooks/user";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaTwitter } from "react-icons/fa";
interface sidebarType {
  name: string;
  icon: React.ReactNode;
}
const sidebarList: sidebarType[] = [
  {
    name: "Home",
    icon: <FaTwitter />,
  },
  {
    name: "Explore",
    icon: <FaTwitter />,
  },
  {
    name: "Notifications",
    icon: <FaTwitter />,
  },
  {
    name: "Messages",
    icon: <FaTwitter />,
  },
  {
    name: "Bookmarks",
    icon: <FaTwitter />,
  },

  {
    name: "Profile",
    icon: <FaTwitter />,
  },
];

export default function Sidebar() {
  const { user } = useCurrentUser();
  const router = useRouter();
  return (
    <div className="col-span-3 flex items-end justify-end  ">
      <div className="  h-full w-full max-w-xs pt-5 px-8 flex flex-col justify-between">
        <div>
          <div className="text-4xl w-fit hover:bg-gray-600 p-2 rounded-full ">
            <FaTwitter />
          </div>
          <div className="flex flex-col gap-4 mt-4 text-xl font-semibold">
            {sidebarList.map((item) => (
              <div
                key={item.name}
                className="flex gap-4 items-center cursor-pointer  p-3   rounded-full hover:bg-gray-600"
                onClick={() => router.push(item.name.toLowerCase())}
              >
                {item.icon}
                <span>{item.name}</span>
              </div>
            ))}
          </div>
          <div>
            <button className="bg-blue-400 hover:bg-blue-500 text-white p-3 px-6 mt-4 rounded-full w-full font-semibold ">
              Tweet
            </button>
          </div>
        </div>
        {user && (
          <div className="flex items-start justify-start gap-4 pb-12">
            <Image
              src={user.profileImage}
              height={40}
              width={40}
              className="rounded-full"
              alt="profile-pic"
            />
            <div>{user.firstName}</div>
          </div>
        )}
      </div>
    </div>
  );
}
