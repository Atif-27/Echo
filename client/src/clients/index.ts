import { GraphQLClient } from "graphql-request";

const gql_client = new GraphQLClient(process.env.NEXT_PUBLIC_GQL_URL || "");
export default gql_client;
