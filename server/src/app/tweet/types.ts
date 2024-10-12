export const types = `#graphql
    input CreateTweetData{
        content: String!,
        imageURL:String
    }
    type Tweet{
    id: String!,
    content: String!,
    imageURL: String ,
    authorId: String!,
    author:User,
    }
`;
