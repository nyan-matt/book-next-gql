/** @jsx jsx */
import React from "react";
import Link from "next/link";
import { Box, AspectImage, Heading, Badge, useThemeUI, jsx } from "theme-ui";
import StarRatingComponent from "react-star-rating-component";
import { motion } from "framer-motion";

const BookCard = ({ ...props }) => {
  const { book, handler } = props;
  const context = useThemeUI();
  const { theme } = context;
  return (
    
    <Box sx={{ margin: "16px", padding: "16px" }}>
      <Link href="/book/[id]" as={`/book/${book._id}`}>
        <AspectImage
          sx={{
            borderRadius: "8px",
            border: "1px solid",
            borderColor: "highlight",
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
            {book.authors.length > 1 && index < book.authors.length - 1
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
          starColor={theme.colors.primary}
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
            onClick={() => handler(tag.name)}
          >
            {tag.name}
          </Badge>
        ))}
      </div>
      
    </Box>
    
  );
};
export default BookCard;
