import gql_client from "@/clients";
import FeedCard from "@/components/FeedCard";
import { getUserById } from "@/graphql/query/user";
import Image from "next/image";
import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

async function fetchUserDetails(id: string) {
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
    <section className="my-4">
      <div className="flex justify-start items-center gap-6">
        <IoMdArrowRoundBack size={20} className="cursor-pointer" />
        <div>
          <h1 className="font-semibold">
            {user?.firstName} {user?.lastName}
          </h1>
          <p className="text-sm text-slate-400">{user?.tweets?.length} posts</p>
        </div>
      </div>
      <div className="p-4 pt-10 border">
        {user?.profileImage && (
          <Image
            src={user.profileImage}
            alt="profile-image"
            width={100}
            height={100}
            className="rounded-full"
          />
        )}
      </div>
      <div>
        <div className="px-6 mt-4">
          <h1 className="font-semibold text-3xl">
            {user?.firstName} {user?.lastName}
          </h1>
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
