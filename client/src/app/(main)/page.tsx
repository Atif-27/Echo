"use client";
import React from "react";
import { useGetAllTweet } from "@/hooks/tweet";
import FeedCard from "@/components/FeedCard";
import FeedHeader from "@/components/FeedHeader";
import Skeleton from "react-loading-skeleton";

export default function MainFeed() {
  const { tweets, isLoading } = useGetAllTweet();
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
      {isLoading && (
        <div>
          <Skeleton className=" gap-7 h-24" count={10} />
        </div>
      )}
    </div>
  );
}
