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
  const { isAuthenticated, user } = useAuth();
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
    console.log(books.length);
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

  const DisplayAddBookForm = () => {
    
    return (
      <>
      <p className="text-default">
        Looks like you haven't added anything to your book shelf yet. Why not add your first below?
      </p>
      { fetched && <AddBookForm /> }
      </>
    );
  }
  
  return (
    <div className="container mx-auto flex relative">
      
      <main className="relative w-full">
        <h1 className="text-default text-4xl">
          {isAuthenticated() ? user.email : "guest"}
        </h1>
        {
          isAuthenticated() &&
            (
              <>
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
        }
        {
          isAuthenticated() && books.length === 0 &&
          <DisplayAddBookForm />
        }
        {
          !isAuthenticated() && 
          <DisplayLogin />
        }
      </main>
    </div>
  );
}
