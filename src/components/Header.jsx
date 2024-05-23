import React, { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constant";
import { USER_AVATAR } from "../utils/constant";
import { toggleGptSearchView } from "../utils/GptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const [showSignOut, setShowSignOut] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  console.log(showGptSearch);
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

  const handleGptSearchClick = () => {
    // Toggle GPT search
    dispatch(toggleGptSearchView());
  };

  const handleUserClick = () => {
    setShowSignOut(!showSignOut);
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-44" src={LOGO} alt="logo" />
      {/* {user && ( */}
      <div className="flex p-2">
        {showGptSearch && (
          <select
            className="p-2 m-2 bg-gray-900 text-white"
            onChange={handleLanguageChange}
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.identifire} value={lang.identifire}>
                {lang.name}
              </option>
            ))}
          </select>
        )}
        <button
          className="py-2 px-2 mx-4 my-2 text-white bg-red-600 rounded-lg "
          onClick={handleGptSearchClick}
        >
          { showGptSearch ? "Homepage" : "GPT Search" }
        </button>
        <img
          className="w-12 h-12 m-1 cursor-pointer"
          onClick={handleUserClick}
          alt="usericon"
          // src={user?.photoURL}
          src={USER_AVATAR}
        />
        {showSignOut && (
          <button
            onClick={handleSignOut}
            className="py-2 px-2 m-2 bg-red-600 font-bold  text-white rounded-lg hover:bg-red-700"
          >
            Sign Out
          </button>
        )}
      </div>
      {/* )} */}
    </div>
  );
};

export default Header;
