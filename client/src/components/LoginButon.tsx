"use client";
import gql_client from "@/clients";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import toast from "react-hot-toast";

export default function LoginButon() {
  const queryClient = useQueryClient();
  const handleResponse = useCallback(
    async (res: CredentialResponse) => {
      try {
        const googleToken = res.credential;
        if (!googleToken) throw new Error("Google credential are missing");
        const data = await gql_client.request(verifyUserGoogleTokenQuery, {
          token: googleToken,
        });

        localStorage.setItem("echo_token", data.verifyGoogleToken as string);
        toast.success("Logged In Successfully");
        await queryClient.invalidateQueries({ queryKey: ["current-user"] });
      } catch (error: any) {
        toast.error(error.message || "Something Went Wrong");
      }
    },
    [queryClient]
  );
  return <GoogleLogin onSuccess={handleResponse} />;
}
