import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

export default function SignupPageHeroView() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/auth/signup', {
        email,
        password,
      });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className="flex min-h-full items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl space-y-8">
        <div>
          <h2 className="text-6xl text-center font-medium title-font mb-4 text-gray-900">
            Create a new account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600"></p>
        </div>
        <form
          className="mt-8 space-y-6 max-w-lg mx-auto"
          action="#"
          method="POST"
        >
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <Link to="/">
              <a
                type="submit"
                className="group relative flex w-full mx-auto justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                Sign up
              </a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
