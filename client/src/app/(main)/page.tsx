"use client";
import React from "react";
import { useGetAllTweet } from "@/hooks/tweet";
import FeedCard from "@/components/FeedCard";
import FeedHeader from "@/components/FeedHeader";

export default function MainFeed() {
  const { tweets } = useGetAllTweet();

  return (
    <div className="flex flex-col overflow-y-auto h-screen">
      <FeedHeader />
      {tweets?.map((tweet) => {
        return (
          <div key={tweet?.id}>
            <FeedCard tweet={tweet} />
          </div>
        );
      })}
    </div>
  );
}
