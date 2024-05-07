import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleButtonClick = () => {
    // Validate the form data
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    // Sign In Sign Up Logic
    if (!isSignInForm) {
      // Sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://avatars.githubusercontent.com/u/106523582?v=4",
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              navigate("/browse"); // redirect to browse page
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      // Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigate("/browse"); // redirect to browse page
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/4d7bb476-6d8b-4c49-a8c3-7739fddd135c/deecf71d-7a47-4739-9e1a-31b6b0d55be7/IN-en-20240429-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="Background_image"
        />
      </div>
      <form
        className="absolute w-3/12 p-12 my-36 mx-auto right-0 left-0 text-white bg-black rounded-lg bg-opacity-80"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="font-bold text-white text-3xl py-4 ">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            className="p-4 my-4 w-full bg-gray-900 text-gray-300 border border-gray-600 rounded-md bg-opacity-80"
            type="text"
            ref={name}
            placeholder="Full name"
          />
        )}
        <input
          className="p-4 my-4 w-full bg-gray-900 text-gray-300 border border-gray-600 rounded-md bg-opacity-80"
          ref={email}
          type="text"
          placeholder="Email or mobile number"
        />
        <input
          className="p-4 my-4 w-full bg-gray-900 text-gray-300 border border-gray-600 rounded-md bg-opacity-80"
          ref={password}
          type="password"
          placeholder="Password"
        />
        <p className="font-bold text-lg  text-red-600">{errorMessage}</p>
        <button
          className="p-2 my-2 w-full bg-red-600 text-white font-medium rounded-md  hover:bg-red-700 ease-in-out duration-300"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="p-2 my-2 text-gray-400 ">
          {isSignInForm ? "New to Netflix ? " : "Already a user ? "}
          <span
            className="text-white cursor-pointer hover:underline"
            onClick={toggleSignInForm}
          >
            {isSignInForm ? " Sign up now." : " Sign in now."}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
