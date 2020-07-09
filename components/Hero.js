import React from "react";
import { RiGithubLine } from "react-icons/ri";
import { motion } from "framer-motion";

export default (props) => {
  return (
    <div className="container mx-auto px-6 flex relative">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 0 }}
        positionTransition={true}
        className="sm:w-1/2 lg:w-3/5 flex flex-col relative lg:pt-32 sm:pt-0 lg:pb-40 sm:pb-2"
      >
        <span className="w-20 h-2 mb-12"></span>
        <h1 className="text-6xl sm:text-8xl flex flex-col leading-none font-bold text-default">
          Next Books{" "}
          <span className="text-4xl mt-2 font-light text-foreground-default sm:text-7xl">
            Next.js, FaunaDB, GraphQL &amp; Tailwind
          </span>
        </h1>
        <p className="text-sm pt-3 sm:text-base text-gray-500 pr-3">
          A small proof-of-concept application using Next.js &amp; React hooks
          to query a FaunaDB GraphQL endpoint to manage a bookshelf with book
          recommendations.
        </p>
        <div className="flex mt-8">
          <a
            href="https://github.com/nyan-matt/book-next-gql"
            className="uppercase py-2 px-4  rounded-full bg-primary border-2 border-transparent text-white text-sm text-center hover:bg-primary"
          >
            <RiGithubLine className="inline text-xl mr-1" />
            Github
          </a>
        </div>
      </motion.div>
      <div
        className="hidden sm:block sm:w-1/2 lg:w-2/5 relative bg-local bg-contain bg-no-repeat bg-center"
        style={{ backgroundImage: "url(/undraw-book-lover.png)" }}
      ></div>
    </div>
  );
};
