import React from "react";
import { FaGithub } from "react-icons/fa"
import { motion } from "framer-motion";

export default (props) => {
  return (
    <div className="container mx-auto px-6 flex relative">
      <div className="sm:w-1/2 lg:w-3/5 flex flex-col relative lg:pt-32 sm:pt-0 lg:pb-40 sm:pb-2">
        <span className="w-20 h-2 bg-white mb-12"></span>
        <h1 className="text-6xl sm:text-8xl flex flex-col leading-none font-bold">
          Next Books {" "}
          <span className="text-4xl mt-2 font-light sm:text-7xl">Next.js, FaunaDB, GraphQL &amp; Tailwind</span>
        </h1>
        <p className="text-sm pt-3 sm:text-base text-gray-500 pr-3">
          A small proof-of-concept application using Next.js &amp; React hooks to query a FaunaDB GraphQL endpoint to manage a bookshelf with reading recommendations.
        </p>
        <div className="flex mt-8">
          <a
            href="#"
            className="uppercase py-2 px-5 sm:px-8 rounded-full bg-yellow-500 border-2 border-transparent text-gray-800 text-sm mr-4 hover:bg-yellow-400"
          >
            <FaGithub className="inline mr-2" />Github
          </a>
          <a
            href="#"
            className="uppercase py-2 px-5 sm:px-8 rounded-full bg-transparent border-2 border-yellow-500 text-gray-200 hover:bg-yellow-500 hover:text-white text-sm"
          >
            Read more
          </a>
        </div>
      </div>
      <div className="hidden sm:block sm:w-1/2 lg:w-2/5 relative bg-local bg-contain bg-no-repeat bg-center" style={{backgroundImage: "url(/hero-undraw.png)"}}>
      </div>
    </div>
  );
};

