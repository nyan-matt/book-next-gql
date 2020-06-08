/** @jsx jsx */
import Head from "next/head";
import { useState, useEffect } from "react";
import { allBooks } from "../utils/api";
import Link from "next/link";
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
import StarRatingComponent from "react-star-rating-component";
import Hero from "../components/Hero";

function getBooks(data) {
  return data ? data.allBooks.data.reverse() : [];
}

export default function Home(props) {
  const { data, errorMessage } = allBooks();
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState([])

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
    <Container sx={{ padding: [16, 32] }}>
      <main>
        <Hero />
        <Divider />
        <Heading mb={2}>Recent Reads</Heading>
        
        {
          filters.length > 0 &&
          <Button variant="buttons.small" mr={2} onClick={() => handleResetFilter()}>Reset Filter</Button>
        }
        {
          filters.length > 0 &&
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
        <Grid columns={[1, 2, 3, 4]} sx={{ mt: 32 }}>
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
            books.map((book, index) => {
              return (
                <Box key={book._id} sx={{ margin: "16px", padding: "16px" }}>
                  <Link href="/book/[id]" as={`/book/${book._id}`}>
                    <AspectImage
                      sx={{
                        borderRadius: "4px",
                        border: "1px solid",
                        borderColor: "muted",
                        cursor: "pointer",
                      }}
                      ratio={1 / 1}
                      src={book.coverArt ? book.coverArt : "/no-image.png"}
                      alt={`Cover art - ${book.title}`}
                    />
                  </Link>
                  <Heading sx={{ fontSize: "18px", marginTop: "12px" }}>
                    <Link href="/book/[id]" as={`/book/${book._id}`}>
                      <a sx={{ variant: "links.cards" }}>{book.title}</a>
                    </Link>
                  </Heading>
                  <div>
                    {book.authors.map((author, index) => (
                      <span key={index}>
                        {author.name}
                        {book.authors.length > 1 &&
                        index < book.authors.length - 1
                          ? ", "
                          : " "}
                      </span>
                    ))}
                  </div>
                  {book.rating && (
                    <StarRatingComponent
                      name={book._id}
                      starCount={5}
                      value={book.rating}
                      editing={false}
                    />
                  )}
                  <div>
                    {book.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="primary"
                        mr={2}
                        px={2}
                        sx={{ cursor: "pointer" }}
                        onClick={() => handleFilterByTag(tag.name)}
                      >
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                </Box>
              );
            })
          )}
        </Grid>
      </main>
    </Container>
  );
}
