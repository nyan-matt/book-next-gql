
import Head from "next/head";
import { useState, useEffect } from "react";
import { allBooks } from "../utils/api";
import Hero from "../components/Hero";
import BookCard from "../components/BookCard";
import { motion } from "framer-motion";
import { useAuth } from "react-use-auth";

function getBooks(data) {
  return data ? data.allBooks.data.reverse() : [];
}

export default function Home(props) {
  const { data, errorMessage } = allBooks();
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState([]);
  const { isAuthenticated, user, authResult } = useAuth();

  useEffect(() => {
    if (!books.length) {
      setBooks(getBooks(data));
    }
  }, [data, books.length]);
  
  // TODO abstract filtering
  const handleFilterByTag = (tag) => {
    let tempFilters = [...filters];
    tempFilters.push(tag);
    const dedup = new Set(tempFilters);
    tempFilters = [...dedup];
    setFilters(tempFilters);
    let filteredBooks = books.filter((b) => b.tags.some((t) => t.name === tag));
    setBooks(filteredBooks);
  };

  const handleResetFilter = () => {
    setBooks(getBooks(data));
    setFilters([])
  };

  const stagger = (staggerChildren = 0.3) => { 
    return { 
        animate: { 
          transition: { 
            staggerChildren
          }
        }
      }
  }

  const Login = () => {
    const { isAuthenticated, isAuthenticating, login, logout } = useAuth();
    if (isAuthenticated()) {
      return (
          <>
              <button onClick={logout} className="bg-secondary text-sm rounded-full text-default px-3 py-2">Logout</button>
              <small>{isAuthenticating ? "Authenticating ..." : null}</small>
              <span className="text-default ml-3">Hi {user.name}</span>
          </>
      );
    } else {
      return (
          <>
              <button onClick={login} className="text-default bg-secondary text-sm rounded-full text-default px-3 py-2">Login</button>
              <small>{isAuthenticating ? "Authenticating ..." : null}</small>
              <span className="text-default ml-3">Sup, stranger?</span>
          </>
      );
    }
  }
  

  return (
    <div className="container mx-auto flex relative">
      <main className="relative">
        <Hero />
        <Login />
       
        <h2 className="text-foreground-default font-thin text-2xl mb-2 mx-4  mt-12 lg:mt-0">Latest books</h2>
        <div className="mx-4 h-12">
          {
            filters.length > 0 && 
              (
                <button className="bg-primary text-reverse-primary rounded-full py-2 px-4 rounded text-xs" onClick={() => handleResetFilter()}>Reset Filter</button>
              )
          }
          {
            filters.map((filter, index) => {
              return (
                <span
                  key={index}
                  className="ml-1 text-xs bg-transparent rounded mr-1 text-primary px-2 py-1 border border-primary"
                >
                  {filter}
                </span>
              )
            })
          }
        </div>  
        {
          errorMessage &&
            <p>{errorMessage}</p>
        }
        {
          !data ? 
            (
            <div className="container mx-auto">
              <motion.div className="container mx-auto border bg-color-gray-500 border-full h-12 w-12"
                animate={{
                  scale: [1, 2, 2, 1, 1],
                  rotate: [0, 0, 270, 270, 0],
                  borderRadius: ["20%", "20%", "50%", "50%", "20%"]
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  times: [0, 0.2, 0.5, 0.8, 1],
                  loop: Infinity,
                  repeatDelay: 1
                }}
              />
            </div>
           ) : (
            <motion.div variants={stagger(0.3)}  className="relative grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-4">
              {books.map((book, index) => {
                  return (
                    <motion.div key={index} initial={{opacity: 0, y: 40}} 
                      animate={{opacity: 1, y: 0}} 
                      exit={{opacity: 0, y: 0}}
                      positionTransition={true}
                    >
                      <BookCard key={index} book={book} handler={handleFilterByTag} />
                  </motion.div>
                  )
              })}
              </motion.div>        
          )
      }
        
      </main>
    </div>
  );
}
