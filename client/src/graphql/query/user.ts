import { graphql } from "@/gql";

export const verifyUserGoogleTokenQuery = graphql(`
  query VerifyUserGoogleTokenQuery($token: String!) {
    verifyGoogleToken(token: $token)
  }
`);

export const getCurrentUserQuery = graphql(`
  query GetCurrentUserQuery {
    getCurrentUser {
      id
      email
      firstName
      lastName
      profileImage
    }
  }
`);

export const getUserById = graphql(`
  query GetUserById($userId: String!) {
    getUserById(id: $userId) {
      firstName
      lastName
      profileImage
      id
      tweets {
        id
        content
        imageURL
        author {
          id
          firstName
          profileImage
          lastName
        }
      }
    }
  }
`);