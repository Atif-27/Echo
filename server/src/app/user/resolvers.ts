export const resolvers = {
  verifyGoogleToken: async (parent: any, { token }: { token: string }) => token,
};
