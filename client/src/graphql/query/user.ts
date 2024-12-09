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
      isFollowing
      isMyProfile
      profileImage
      following {
        firstName
        lastName
        profileImage
        id
      }
      followers {
        firstName
        lastName
        profileImage
        id
      }
      recommendedUser {
        firstName
        lastName
        profileImage
        id
        isFollowing
      }
    }
  }
`);

export const getUserById = graphql(`
  query GetUserById($userId: String!) {
    getUserById(id: $userId) {
      firstName
      lastName
      profileImage
      isFollowing
      isMyProfile
      id
      following {
        firstName
        lastName
        profileImage
        id
      }
      followers {
        firstName
        lastName
        profileImage
        id
      }
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