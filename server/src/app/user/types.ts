export const types = `#graphql
 type User{
    id:ID!,
    email: String!,
    firstName:String!,
    lastName:String,
    profileImage:String!
    tweets:[Tweet]
 }
`;
