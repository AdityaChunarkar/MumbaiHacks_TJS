import React from "react";
import instagram from "../assets/instagram_logo_2016.svg";
import x from "../assets/x.svg";
import linkedin from "../assets/linkedin.svg";
import github from "../assets/github.svg";
import loginimage from "../assets/login image.svg";

const Login = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:justify-evenly min-h-screen bg-secondary p-5 md:p-12 gap-5 md:gap-0">
      <div className="w-full md:w-auto max-w-sm bg-white rounded-2xl shadow-lg p-8 text-center mb-5 md:mb-0 md:flex-1 md:max-w-md">
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-6">Welcome back</h2>

        <div className="mb-4">
          <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors">
            Sign in with Google
          </button>
        </div>
        <p className="text-gray-600 my-4 text-sm md:text-base">OR</p>

        <form className="space-y-4">
          <div className="text-left">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm md:text-base"
            />
          </div>
          <div className="text-left">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm md:text-base"
            />
          </div>
          <div className="flex items-center gap-2 text-xs md:text-sm">
            <input type="checkbox" id="remember" className="w-4 h-4 cursor-pointer" />
            <label htmlFor="remember" className="text-gray-700 cursor-pointer">
              Keep me signed in
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-primary hover:bg-accent text-white font-semibold py-2 rounded-lg transition-colors mt-2"
          >
            Login
          </button>
        </form>
        <a href="#" className="inline-block mt-4 text-gray-600 hover:text-gray-800 text-xs md:text-sm transition-colors">
          Forgot your username or password?
        </a>
      </div>

      <div className="flex flex-col items-center justify-center md:flex-1 md:max-w-md">
        <h1 className="text-3xl md:text-4xl font-bold text-primary text-center mb-6">FINANCE MANAGER</h1>
        <div className="flex gap-4 mb-6">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
            <img src={x} alt="Twitter" className="w-8 h-8 md:w-10 md:h-10" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
            <img src={instagram} alt="Instagram" className="w-8 h-8 md:w-10 md:h-10" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
            <img src={linkedin} alt="LinkedIn" className="w-8 h-8 md:w-10 md:h-10" />
          </a>
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
            <img src={github} alt="GitHub" className="w-8 h-8 md:w-10 md:h-10" />
          </a>
        </div>
        <img src={loginimage} alt="Login Visual" className="w-4/5 md:w-full max-w-sm rounded-2xl" />
      </div>
    </div>
  );
};

export default Login;
