"use client";

import { useRouter, usePathname, redirect } from "next/navigation";
import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { unProtectedRoutesArr } from "@/utils/unprotectedRoutes";

const Authentication = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname(); // get pathname
  const router = useRouter();

  const onAuthStateChange = (user: object | null) => {
      if (user) {
        // User is logged in.
        if (unProtectedRoutesArr.includes(pathname)) router.replace("/");
      } else {
        // User is not logged in.
        if (!unProtectedRoutesArr.includes(pathname)) router.replace("/login");
      }
  };

  onAuthStateChanged(auth, onAuthStateChange);

  return <div>{children}</div>;
};

export default Authentication;
