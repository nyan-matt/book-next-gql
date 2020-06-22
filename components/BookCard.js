import React from "react";
import Link from "next/link";
import StarRatingComponent from "react-star-rating-component";
import { motion } from "framer-motion";

const BookCard = ({ ...props }) => {
  const { book, handler } = props;
  return (
    <div className="rounded">
    <div className="relative pb-full">
      <Link href="/book/[id]" as={`/book/${book._id}`}>
        <img className="absolute w-full h-full object-cover rounded border border-gray-500 cursor-pointer" src={book.coverArt ? book.coverArt : "/no-image.png"}
          alt={`Cover art - ${book.title}`}
        />
      </Link>
      </div>
      <h3 className="mt-2">
        <Link href="/book/[id]" as={`/book/${book._id}`}>
          <a className="text-primary font-medium">{book.title}</a>
        </Link>
      </h3>
      <div>
        {book.authors.map((author, index) => (
          <span key={index} className="text-default">
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
        />
      )}
      <div>
        {book.tags.map((tag, index) => (
          <span
            key={index}
            className="text-xs bg-transparent rounded mr-1 text-primary px-2 py-1 cursor-pointer border border-primary hover:bg-primary hover:text-reverse-primary transition duration-200"
            onClick={() => handler(tag.name)}
          >
            {tag.name}
          </span>
        ))}
      </div>
    </div>
    
  );
};
export default BookCard;
