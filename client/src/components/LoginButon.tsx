"use client";
import { GoogleLogin } from "@react-oauth/google";
export default function LoginButon() {
  return (
    <GoogleLogin
      onSuccess={(response) => {
        console.log(response);
      }}
    />
  );
}
