import React, { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constant";

const Header = () => {
  const [showSignOut, setShowSignOut] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse"); // redirect to browse page
      } else {
        // user is signed out
        dispatch(removeUser());
        // navigate("/");
      }
    });

    // Unsubscribe when component is unmounts
    return () => unsubscribe();
  }, []);

  const handleUserClick = () => {
    setShowSignOut(!showSignOut);
  };

  return (
    <div className="absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img
        className="w-44"
        src={LOGO}
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
