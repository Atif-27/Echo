"use client";
import { useCreateTweet } from "@/hooks/tweet";
import { useCurrentUser } from "@/hooks/user";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { FaImage } from "react-icons/fa";

interface TNewTweet {
  content: string;
  imageURL: string;
}
const initialNewTweet = {
  content: "",
  imageURL: "",
};
export default function FeedHeader() {
  const [newTweet, setNewTweet] = useState<TNewTweet>(initialNewTweet);
  const mutate = useCreateTweet();
  const handleImageUpload = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "images/*");
    input.click();
  }, []);
  const handleTweet = useCallback(() => {
    mutate(newTweet);
  }, [mutate, newTweet]);
  const { user } = useCurrentUser();
  if (!user) return;
  return (
    <section className="grid grid-cols-12 border-b border-gray-600/80 hover:bg-gray-800 p-4 ">
      <div className="col-span-1 ">
        <Image
          src={user?.profileImage || ""}
          width={40}
          height={40}
          className="rounded-full"
          alt="profile"
        />
      </div>
      <div className="col-span-11 ">
        <textarea
          className="w-full bg-transparent focus:outline-none border-b border-slate-950 border-b-slate-700 p-3"
          placeholder="So what's up"
          value={newTweet.content}
          onChange={(e) =>
            setNewTweet((newTweet) => ({
              ...newTweet,
              content: e.target.value,
            }))
          }
          rows={3}
        />
        <div className="w-full flex justify-between items-center">
          <FaImage className=" cursor-pointer" onClick={handleImageUpload} />

          <button
            onClick={handleTweet}
            className="bg-blue-400 hover:bg-blue-500 text-sm text-white py-2 px-4  mt-4 rounded-full w-fit"
          >
            Tweet
          </button>
        </div>
      </div>
    </section>
  );
}
