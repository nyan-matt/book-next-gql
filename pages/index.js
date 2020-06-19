/** @jsx jsx */
import Head from "next/head";
import { useState, useEffect } from "react";
import { allBooks } from "../utils/api";
import {
  Container,
  Button,
  Spinner,
  Grid,
  Box,
  Heading,
  AspectImage,
  Divider,
  Badge,
  jsx,
} from "theme-ui";
import Hero from "../components/Hero";
import BookCard from "../components/BookCard";
import { motion } from "framer-motion";

function getBooks(data) {
  return data ? data.allBooks.data.reverse() : [];
}

export default function Home(props) {
  const { data, errorMessage } = allBooks();
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    if (!books.length) {
      setBooks(getBooks(data));
    }
  }, [data, books.length]);

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

  return (
    <div className="container mx-auto flex relative">
      <main>
        <Hero />
        <Divider my={4}/>
        <Heading mb={filters.length > 0 ? 2 : 5}>Recommended Reads</Heading>
        {
          filters.length > 0 &&
            <Button variant="buttons.small" mr={2} onClick={() => handleResetFilter()}>Reset Filter</Button>
        }
        {
          filters.map((filter, index) => {
            return (
              <Badge
                key={index}
                variant="primary"
                mr={2}
                px={2}
              >
                {filter}
              </Badge>
            )
          })
        }
        {errorMessage ? (
          <p>{errorMessage}</p>
        ) : !data ? (
          <Box>
            <Spinner
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </Box>
        ) : (
          <Grid columns={[1, 2, 3, 4]} sx={{ mt: 32 }}>
            {books.map((book, index) => {
              return (
                <motion.div key={index} initial={{opacity: 0, y: 40}} 
                  animate={{opacity: 1, y: 0}} 
                  exit={{opacity: 0, y: 0}}
                  positionTransition={true}
                >
                  <BookCard book={book} handler={handleFilterByTag} />
                </motion.div>
              )  
            })}
          </Grid>
        )}
      </main>
    </div>
  );
}
