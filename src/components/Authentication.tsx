"use client";

import { useRouter, usePathname, redirect } from "next/navigation";
import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

const unProtectedRoutesArr = ["/login"];

const Authentication = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname(); // get pathname
  const router = useRouter();

  const onAuthStateChange = (user: object) => {
    if (user) {
      // User is logged in.
      if (unProtectedRoutesArr.includes(pathname)) router.replace("/");
    } else {
      // User is not logged in.
      if (!unProtectedRoutesArr.includes(pathname)) router.replace("/login");
    }
  };

  onAuthStateChanged(auth, onAuthStateChange);

  useEffect(() => {}, []);

  return <div>{children}</div>;
};

export default Authentication;
