import { GraphQLClient } from "graphql-request";

const isClient = typeof window !== "undefined";
console.log("lol");

const gql_client = new GraphQLClient(process.env.NEXT_PUBLIC_GQL_URL || "", {
  headers: {
    Authorization: `Bearer ${
      isClient ? localStorage && localStorage.getItem("echo_token") : ""
    }`,
  },
});

export default gql_client;
