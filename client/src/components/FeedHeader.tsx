"use client";
import gql_client from "@/clients";
import { getSignedURLQuery } from "@/graphql/query/tweet";
import { useCreateTweet } from "@/hooks/tweet";
import { useCurrentUser } from "@/hooks/user";
import axios from "axios";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { FaImage } from "react-icons/fa";
import LoginButon from "./LoginButon";

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
  const handleInputChange = useCallback((input: HTMLInputElement) => {
    return async (event: Event) => {
      event.preventDefault();
      const file: File | null | undefined = input.files?.item(0);
      if (!file) return;
      const { getSignedURL } = await gql_client.request(getSignedURLQuery, {
        imageType: file.type,
      });
      if (!getSignedURL) return;
      const id = crypto.randomUUID();
      toast.loading("Uploading Image", { id });
      const uploadRes = await axios.put(getSignedURL, file, {
        headers: {
          "Content-type": file.type,
        },
      });
      if (uploadRes.status >= 400) {
        toast.error("Couldnt Upload image", { id });
        return;
      }
      toast.success("Uploading Image", { id });
      const url = new URL(getSignedURL);
      const path = url.origin + url.pathname;

      setNewTweet((tweet) => ({
        ...tweet,
        imageURL: path,
      }));
    };
  }, []);
  const handleImageUpload = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "images/*");
    input.click();
    const handleFn = handleInputChange(input);

    input.addEventListener("change", handleFn);
  }, [handleInputChange]);
  const handleTweet = useCallback(() => {
    mutate(newTweet);
    setNewTweet(initialNewTweet);
  }, [mutate, newTweet]);
  const { user } = useCurrentUser();
  return (
    <section>
      {user && user.firstName ? (
        <>
          <div className="grid grid-cols-12 border-b border-gray-600/80 hover:bg-gray-800 p-4 ">
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
                <FaImage
                  className=" cursor-pointer"
                  onClick={handleImageUpload}
                />

                <button
                  onClick={handleTweet}
                  className="bg-[#086972] hover:opacity-90 text-sm text-white py-2 px-4  mt-4 rounded-full w-fit"
                >
                  Tweet
                </button>
              </div>
            </div>
          </div>
          <div className="p-5">
            {newTweet.imageURL && (
              <Image
                src={newTweet.imageURL}
                alt="image-upload"
                height={100}
                width={200}
              />
            )}
          </div>
        </>
      ) : (
        <div className="mb-4 md:hidden">
          <LoginButon />
        </div>
      )}
    </section>
  );
}
