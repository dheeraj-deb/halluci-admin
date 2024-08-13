"use client";

import { GET_PROFILE } from "@/app/graphql/query";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import React from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const nav = useRouter();
  const { data, loading, error } = useQuery(GET_PROFILE, {
    onError(error) {
      console.log("Error occurred:", error.message);
      nav.push("/login");
    },
    onCompleted(data) {
      nav.push("/dashboard");
    },
  });
  return children;
};

export default AuthProvider;
