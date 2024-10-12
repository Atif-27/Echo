"use client";
import FeedCard from "@/components/FeedCard";
import FeedHeader from "@/components/FeedHeader";
import LoginButon from "@/components/LoginButon";
import { useCurrentUser } from "@/hooks/user";
import Image from "next/image";
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

export default function Home() {
  const { user } = useCurrentUser();
  return (
    <main className="text-xl">
      <section className="grid grid-cols-10 w-screen h-screen">
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
        <div className="col-span-4  border-r-[1px] border-l-[1px]  border-gray-600/80">
          <div className="flex flex-col overflow-y-auto h-screen">
            <FeedHeader />
            <FeedCard />
            <FeedCard />
            <FeedCard />
            <FeedCard />
            <FeedCard />
            <FeedCard />
            <FeedCard />
          </div>
        </div>
        <div className="col-span-3">{!user && <LoginButon />}</div>
      </section>
    </main>
  );
}
