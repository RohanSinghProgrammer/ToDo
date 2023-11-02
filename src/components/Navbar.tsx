import Link from "next/link";
import React from "react";

type Params = {
  tab: string | null;
};

const Navbar = ({ tab }: Params) => {
  return (
    <nav className="w-full flex justify-between border-b px-4 md:px-0.5">
      <Link href={"/"} className={tab ? "text-gray-600" : "border-b-2 border-green-500 font-semibold"}>
        All
      </Link>
      <Link
        href={"/?todos=active"}
        className={tab === "active" ? "border-b-2 border-green-500 font-semibold" : "text-gray-600"}
      >
        Active
      </Link>
      <Link
        href={"/?todos=completed"}
        className={tab === "completed" ? "border-b-2 border-green-500 font-semibold" : "text-gray-600"}
      >
        Completed
      </Link>
    </nav>
  );
};

export default Navbar;
