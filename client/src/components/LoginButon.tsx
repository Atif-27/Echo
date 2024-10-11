"use client";
import gql_client from "@/clients";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useCallback } from "react";
import toast from "react-hot-toast";

export default function LoginButon() {
  const handleResponse = useCallback(async (res: CredentialResponse) => {
    try {
      const googleToken = res.credential;
      if (!googleToken) throw new Error("Google credential are missing");
      const { verifyGoogleToken } = await gql_client.request(
        verifyUserGoogleTokenQuery,
        {
          token: googleToken,
        }
      );
    } catch (error) {
      toast.error(error.message || "Something Went Wrong");
    }
  }, []);
  return <GoogleLogin onSuccess={handleResponse} />;
}
