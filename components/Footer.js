import React, { useState, useEffect } from "react";
import { useAuth } from "react-use-auth";

const Footer = () => {
  const { isAuthenticated, user } = useAuth();

  function currentYear() {
    return new Date().getFullYear();
  }
  return (
    <footer className="h-12 text-default text-sm px-4 bg-background-default">
      <div className="container mx-auto flex">
        <div className="w-1/2 pt-3">
          &copy; {currentYear()}{" "}
          <a
            className="text-primary hover:underline transition duration-400"
            href="https://github.com/nyan-matt"
          >
            Matt Rea
          </a>
        </div>
        <div className="w-1/2 pt-3 text-right">
          {isAuthenticated()
            ? `Logged in as ${user.nickname}`
            : "Not logged in - guest"}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
