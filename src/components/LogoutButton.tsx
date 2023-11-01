import { signOut } from "firebase/auth";
import React from "react";
import { BiLogOut } from "react-icons/bi";
import { auth } from "../../firebase";

const LogoutButton = () => {
    const handleLogOut = async () => {
        await signOut(auth);
    }
  return (
    <div onClick={handleLogOut} className="absolute right-4 top-4 cursor-pointer">
      <BiLogOut className="text-2xl text-gray-700 font-semibold" />
    </div>
  );
};

export default LogoutButton;
