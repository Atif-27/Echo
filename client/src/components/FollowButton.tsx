"use client";
import gql_client from "@/clients";
import {
  followUserMutation,
  unfollowUserMutation,
} from "@/graphql/mutation/user";
import { useCurrentUser } from "@/hooks/user";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import toast from "react-hot-toast";

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
  const { user } = useCurrentUser();

  const handleClick = useCallback(async () => {
    if (!user) {
      toast.error("You need to login first");
      return;
    }
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
  }, [isFollowing, userId, router, user]);
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
