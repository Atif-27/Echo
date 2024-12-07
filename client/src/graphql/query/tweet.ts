import { graphql } from "@/gql";

export const getAllTweetsQuery = graphql(`
  query GetAllTweets {
    getAllTweets {
      author {
        id
        firstName
        profileImage
        lastName
      }
      id
      content
      imageURL
    }
  }
`);


export const getSignedURLQuery = graphql(`
  query getSignedURLQuery($imageType: String!) {
    getSignedURL(imageType: $imageType)
  }
`);


