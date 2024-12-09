import { GraphQLClient } from "graphql-request";

const gql_client = new GraphQLClient(process.env.NEXT_PUBLIC_GQL_URL || "", {
  credentials: "include",
});

export default gql_client;
