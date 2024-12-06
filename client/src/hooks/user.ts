import gql_client from "@/clients";
import { getCurrentUserQuery, getUserById } from "@/graphql/query/user";
import { useQuery } from "@tanstack/react-query";

export function useCurrentUser() {
  const query = useQuery({
    queryKey: ["current-user"],
    queryFn: () => gql_client.request(getCurrentUserQuery),
  });

  return {
    ...query,
    user: query.data?.getCurrentUser,
  };
}
