import { useState, useEffect } from "react";
import { booksByUser } from "../utils/api";
import BookCard from "../components/BookCard";
import { useAuth } from "react-use-auth";
import AddBookForm from "../components/AddBookForm";
import Link from "next/link";
import { motion } from "framer-motion";


function getBooks(data) {
  return data ? data.booksByUser.data : [];
}

export default function Bookshelf(props) {
  const { isAuthenticated, user, login } = useAuth();
  const { data, errorMessage } = booksByUser(user.email ? user.email : "guest");
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState([]);
  const [fetched, setFetched] = useState(false)

  useEffect(() => {
    if (!books.length) {
      setBooks(getBooks(data));
    }
  }, [data, books.length]);

  useEffect(() => {
    setFetched(true);
    
  }, [books])

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

  const DisplayLogin = () => {
    return (
      <p className="text-default">
        Login button
      </p>
    )
  }

  const Display = () => {
    if (books.length > 0 ) {
      return (
      <>
        { isAuthenticated() ? 
          <p className="text-default"> You have {books.length} books on your shelf.</p>
          :
          <div>
            <p className="text-default"> 
              You're not logged in at the moment, but here you can see books added by other guests. You can <a href onClick={login} className="text-primary cursor-pointer ">Login</a>  to create a bookshelf of your own.
            </p>
            
          </div>
        }
        
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
          <motion.div className="relative grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-4">
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
      </>
      )
    } else {
      return (
        <>
          <p className="text-default"> You have no books on your shelf. You can add a book by submitting the form below.</p>
          <AddBookForm />
        </>
      )
    }
  }
  
  return (
    <div className="container mx-auto flex relative">
      <main className="relative w-full">
        <h1 className="text-default text-4xl">
          Welcome to your bookshelf, 
          {' '}
          {
            typeof window !== 'undefined' && 
              isAuthenticated() ? user.nickname : "guest"
          }
        </h1>
        {
          !data ? 
          (
            <p className="text-default">Loading...</p>
          ) : (
            <Display />
          )
        }
      </main>
    </div>
  );
}
