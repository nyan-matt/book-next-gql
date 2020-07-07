import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "react-use-auth";
import { RiContrast2Line } from "react-icons/ri";
const Header = ({ ...props }) => {
  const { isAuthenticated, login, logout } = useAuth();
  const { currentTheme, handler } = props;
  const router = useRouter();
  const [navOpen, setNavOpen] = useState(false);
  const [theme, setTheme] = useState(currentTheme);

  useEffect(() => {
    handler(theme);
  }, [theme]);

  const isActive = (href) => {
    if (href === router.pathname) {
      return "is-active";
    }
  };

  const Login = () => {
    const { isAuthenticated, isAuthenticating, login, logout } = useAuth();
    if (isAuthenticated()) {
      return (
        <>
          <button
            onClick={logout}
            className="text-default lg:border lg:border-secondary rounded-full px-4 py-1"
          >
            Logout
          </button>
        </>
      );
    } else {
      return (
        <>
          <button
            onClick={login}
            className="text-default lg:border lg:border-primary rounded-full px-4 py-1"
          >
            Login
          </button>
        </>
      );
    }
  };

  return (
    <nav className="flex justify-between flex-wrap bg-background-default primary py-3 px-4">
      <div className="flex flex-shrink-0 items-center text-foreground-default">
        <Link href="/">
          <a className="no-underline hover:no-underline text-2xl">
            <svg
              className="fill-current h-8 w-8 inline-block"
              viewBox="0 0 64 64"
              style={{ marginTop: -2 + "px" }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M32,0C14.3,0,0,14.3,0,32c0,17.7,14.3,32,32,32c4.2,0,8.2-0.8,11.8-2.3L25.3,33.5v13.2c0,0.7-0.6,1.3-1.3,1.3h-4.3  c-0.7,0-1.3-0.6-1.3-1.3V21.3c0-0.7,0.6-1.3,1.3-1.3h4.3c0.5,0,0.9,0.3,1.2,0.7c0,0,0,0,0.1,0.1L50,58.5C58.4,52.7,64,43,64,32  C64,14.3,49.7,0,32,0z M44.7,42c0,0.6-0.4,1-0.9,1.2l-6.1-9.3V20.6c0-0.7,0.6-1.3,1.3-1.3h4.3c0.7,0,1.3,0.6,1.3,1.3V42z" />
            </svg>
            <span className="text-xl pl-2"> Next Books</span>
          </a>
        </Link>
      </div>

      <div className="flex lg:hidden">
        <div className="flex items-center mr-4">
          <RiContrast2Line
            className="text-default text-2xl inline-block"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          />
        </div>
        <button
          className="flex items-center px-3 py-2 border rounded text-default  focus:outline-none"
          onClick={() => setNavOpen(!navOpen)}
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      <div
        className={`w-full text-foreground-default flex-grow lg:flex lg:items-center lg:w-auto lg:block pt-6 lg:pt-0 ${
          navOpen ? "" : "hidden"
        }`}
      >
        <ul className="list-reset lg:flex justify-end flex-1 items-center shadow-sm lg:shadow-none">
          <li className="mr-3">
            <Link href="/add">
              <a
                className={`inline-block py-2 px-4 no-underline transition duration-400 hover:text-primary hover:underline ${isActive(
                  "/add"
                )}`}
                onClick={() => setNavOpen(!navOpen)}
              >
                Add a Book
              </a>
            </Link>
          </li>
          <li className="mr-3">
            <Link href="/bookshelf">
              <a
                className={`inline-block py-2 px-4 no-underline transition duration-400 hover:text-primary hover:underline ${isActive(
                  "/bookshelf"
                )}`}
                onClick={() => setNavOpen(!navOpen)}
              >
                Bookshelf
              </a>
            </Link>
          </li>
          <li className="mr-3">
            <Link href="/about">
              <a
                className={`inline-block py-2 px-4 no-underline mr-2 transition duration-400 hover:text-primary hover:underline ${isActive(
                  "/about"
                )}`}
                onClick={() => setNavOpen(!navOpen)}
              >
                About
              </a>
            </Link>
          </li>
          <li className="mr-3">
            <Login />
          </li>
          <li className="hidden lg:block text-2xl no-underline pl-2 transition duration-400 hover:text-primary hover:underline">
            <RiContrast2Line
              className=""
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
