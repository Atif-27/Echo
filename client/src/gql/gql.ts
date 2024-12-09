/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  #graphql\n  mutation createTweet($payload: CreateTweetData) {\n    createTweet(payload: $payload) {\n      id\n    }\n  }\n": types.CreateTweetDocument,
    "\n  #graphql\n  mutation FollowUser($to: ID!) {\n    followUser(to: $to)\n  }\n": types.FollowUserDocument,
    "\n  #graphql\n  mutation UnfollowUser($to: ID!) {\n    unFollowUser(to: $to)\n  }\n": types.UnfollowUserDocument,
    "\n  query GetAllTweets {\n    getAllTweets {\n      author {\n        id\n        firstName\n        profileImage\n        lastName\n      }\n      id\n      content\n      imageURL\n    }\n  }\n": types.GetAllTweetsDocument,
    "\n  query getSignedURLQuery($imageType: String!) {\n    getSignedURL(imageType: $imageType)\n  }\n": types.GetSignedUrlQueryDocument,
    "\n  query VerifyUserGoogleTokenQuery($token: String!) {\n    verifyGoogleToken(token: $token)\n  }\n": types.VerifyUserGoogleTokenQueryDocument,
    "\n  query GetCurrentUserQuery {\n    getCurrentUser {\n      id\n      email\n      firstName\n      lastName\n      isFollowing\n      isMyProfile\n      profileImage\n      following {\n        firstName\n        lastName\n        profileImage\n        id\n      }\n      followers {\n        firstName\n        lastName\n        profileImage\n        id\n      }\n    }\n  }\n": types.GetCurrentUserQueryDocument,
    "\n  query GetUserById($userId: String!) {\n    getUserById(id: $userId) {\n      firstName\n      lastName\n      profileImage\n      isFollowing\n      isMyProfile\n      id\n      following {\n        firstName\n        lastName\n        profileImage\n        id\n      }\n      followers {\n        firstName\n        lastName\n        profileImage\n        id\n      }\n      tweets {\n        id\n        content\n        imageURL\n        author {\n          id\n          firstName\n          profileImage\n          lastName\n        }\n      }\n    }\n  }\n": types.GetUserByIdDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  mutation createTweet($payload: CreateTweetData) {\n    createTweet(payload: $payload) {\n      id\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  mutation createTweet($payload: CreateTweetData) {\n    createTweet(payload: $payload) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  mutation FollowUser($to: ID!) {\n    followUser(to: $to)\n  }\n"): (typeof documents)["\n  #graphql\n  mutation FollowUser($to: ID!) {\n    followUser(to: $to)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  mutation UnfollowUser($to: ID!) {\n    unFollowUser(to: $to)\n  }\n"): (typeof documents)["\n  #graphql\n  mutation UnfollowUser($to: ID!) {\n    unFollowUser(to: $to)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllTweets {\n    getAllTweets {\n      author {\n        id\n        firstName\n        profileImage\n        lastName\n      }\n      id\n      content\n      imageURL\n    }\n  }\n"): (typeof documents)["\n  query GetAllTweets {\n    getAllTweets {\n      author {\n        id\n        firstName\n        profileImage\n        lastName\n      }\n      id\n      content\n      imageURL\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getSignedURLQuery($imageType: String!) {\n    getSignedURL(imageType: $imageType)\n  }\n"): (typeof documents)["\n  query getSignedURLQuery($imageType: String!) {\n    getSignedURL(imageType: $imageType)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query VerifyUserGoogleTokenQuery($token: String!) {\n    verifyGoogleToken(token: $token)\n  }\n"): (typeof documents)["\n  query VerifyUserGoogleTokenQuery($token: String!) {\n    verifyGoogleToken(token: $token)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCurrentUserQuery {\n    getCurrentUser {\n      id\n      email\n      firstName\n      lastName\n      isFollowing\n      isMyProfile\n      profileImage\n      following {\n        firstName\n        lastName\n        profileImage\n        id\n      }\n      followers {\n        firstName\n        lastName\n        profileImage\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCurrentUserQuery {\n    getCurrentUser {\n      id\n      email\n      firstName\n      lastName\n      isFollowing\n      isMyProfile\n      profileImage\n      following {\n        firstName\n        lastName\n        profileImage\n        id\n      }\n      followers {\n        firstName\n        lastName\n        profileImage\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUserById($userId: String!) {\n    getUserById(id: $userId) {\n      firstName\n      lastName\n      profileImage\n      isFollowing\n      isMyProfile\n      id\n      following {\n        firstName\n        lastName\n        profileImage\n        id\n      }\n      followers {\n        firstName\n        lastName\n        profileImage\n        id\n      }\n      tweets {\n        id\n        content\n        imageURL\n        author {\n          id\n          firstName\n          profileImage\n          lastName\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetUserById($userId: String!) {\n    getUserById(id: $userId) {\n      firstName\n      lastName\n      profileImage\n      isFollowing\n      isMyProfile\n      id\n      following {\n        firstName\n        lastName\n        profileImage\n        id\n      }\n      followers {\n        firstName\n        lastName\n        profileImage\n        id\n      }\n      tweets {\n        id\n        content\n        imageURL\n        author {\n          id\n          firstName\n          profileImage\n          lastName\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;