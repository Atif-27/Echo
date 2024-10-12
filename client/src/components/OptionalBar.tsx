"use client";
import React from "react";
import LoginButon from "./LoginButon";
import { useCurrentUser } from "@/hooks/user";

export default function OptionalBar() {
  const { user } = useCurrentUser();
  return <div className="col-span-3">{!user && <LoginButon />}</div>;
}
