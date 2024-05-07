import React, { useState } from "react";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [showSignOut, setShowSignOut] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  const handleUserClick = () => {
    setShowSignOut(!showSignOut);
    console.log(showSignOut);
  };

  return (
    <div className="absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img
        className="w-44"
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="logo"
      />
      {user && (
        <div className="flex p-2 gap-3">
          <img
            className="w-12 h-12 m-1 cursor-pointer"
            onClick={handleUserClick}
            alt="usericon"
            src={user?.photoURL}
          />
          {showSignOut && (
            <button
              onClick={handleSignOut}
              className="bg-red-600 font-bold px-1   text-white rounded-lg hover:bg-red-700"
            >
              Sign Out
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
