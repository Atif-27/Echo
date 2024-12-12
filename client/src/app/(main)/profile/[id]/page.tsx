import FeedCard from "@/components/FeedCard";
import FollowButton from "@/components/FollowButton";
import { getUserById } from "@/graphql/query/user";
import Image from "next/image";
import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { cookies } from "next/headers";
import { GraphQLClient } from "graphql-request";

async function fetchUserDetails(id: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const gql_client = new GraphQLClient(process.env.NEXT_PUBLIC_GQL_URL || "", {
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await gql_client.request(getUserById, {
    userId: id,
  });
  return data.getUserById;
}

export default async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const userId = params.id;
  const user = await fetchUserDetails(userId);
  return (
    <section className=" flex flex-col overflow-y-auto h-screen">
      <div className="flex justify-start items-center gap-6">
        <IoMdArrowRoundBack size={20} className="cursor-pointer" />
        <div>
          <h1 className="font-semibold">
            {user?.firstName} {user?.lastName}
          </h1>
          <p className="text-sm text-slate-400">{user?.tweets?.length} posts</p>
        </div>
      </div>
      <div className="p-4 pt-10 ">
        {user?.profileImage && (
          <Image
            src={user.profileImage}
            alt="profile-image"
            width={100}
            height={100}
            className="rounded-full"
          />
        )}
        <div>
          <div className="mt-4">
            <h1 className="font-semibold text-3xl">
              {user?.firstName} {user?.lastName}
            </h1>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-4 text-base text-slate-400">
            <p>{user?.followers?.length} Followers</p>
            <p>{user?.following?.length} Following</p>
          </div>
          <FollowButton
            userId={user?.id as string}
            isMyProfile={user?.isMyProfile as boolean}
            isFollowing={user?.isFollowing as boolean}
          />
        </div>
      </div>

      <div>
        {user?.tweets?.map((tweet) => {
          return (
            <div key={tweet?.id}>
              <FeedCard tweet={tweet} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
