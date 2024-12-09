"use client";
import gql_client from "@/clients";
import {
  followUserMutation,
  unfollowUserMutation,
} from "@/graphql/mutation/user";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

const FollowButton = ({
  isMyProfile,
  isFollowing,
  userId,
}: {
  isMyProfile: boolean;
  isFollowing: boolean;
  userId: string;
}) => {
  const router = useRouter();
  const handleClick = useCallback(async () => {
    if (!isFollowing) {
      await gql_client.request(followUserMutation, {
        to: userId,
      });
      router.refresh();
    } else {
      await gql_client.request(unfollowUserMutation, {
        to: userId,
      });
      router.refresh();
    }
  }, [isFollowing, userId, router]);
  return (
    <div>
      {!isMyProfile && (
        <button
          className="text-black bg-white px-3 py-1 text-base rounded-full"
          onClick={handleClick}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      )}
    </div>
  );
};

export default FollowButton;
