import gql_client from "@/clients";
import { CreateTweetData } from "@/gql/graphql";
import { createTweetMutation } from "@/graphql/mutation/twitter";
import { getAllTweetsQuery } from "@/graphql/query/tweet";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useGetAllTweet() {
  const query = useQuery({
    queryKey: ["all-tweets"],
    queryFn: () => gql_client.request(getAllTweetsQuery),
  });
  return { ...query, tweets: query.data?.getAllTweets };
}

export function useCreateTweet() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload: CreateTweetData) =>
      gql_client.request(createTweetMutation, { payload }),
    onMutate: () => toast.loading("Posting your tweet", { id: "1" }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["all-tweets"] }),
        toast.success("Tweet Posted", {
          id: "1",
        });
    },
  });
  return mutation.mutate;
}
