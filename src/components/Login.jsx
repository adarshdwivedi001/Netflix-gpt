import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

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
      <form className="absolute w-3/12 p-12 my-36 mx-auto right-0 left-0 text-white bg-black rounded-lg bg-opacity-80">
        <h1 className="font-bold text-white text-3xl py-4 ">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            className="p-4 my-4 w-full bg-gray-900 text-gray-300 border border-gray-600 rounded-md bg-opacity-80"
            type="text"
            placeholder="Full name"
          />
        )}
        <input
          className="p-4 my-4 w-full bg-gray-900 text-gray-300 border border-gray-600 rounded-md bg-opacity-80"
          type="text"
          placeholder="Email or mobile number"
        />
        <input
          className="p-4 my-4 w-full bg-gray-900 text-gray-300 border border-gray-600 rounded-md bg-opacity-80"
          type="password"
          placeholder="Password"
        />
        <button className="p-2 my-2 w-full bg-red-600 text-white font-medium rounded-md  hover:bg-red-700 ease-in-out duration-300">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="p-2 my-2 text-gray-400 ">
          {isSignInForm ? "New to Netflix ? " : "Already a user ? "}
          <span
            className="text-white cursor-pointer hover:underline"
            onClick={toggleSignInForm}
          >
           {isSignInForm ? " Sign up now." : " Sign in now." } 
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
