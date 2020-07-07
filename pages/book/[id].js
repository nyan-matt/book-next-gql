import { useRouter } from "next/router";
import fetcher from "../../utils/fetcher";
import { useState, useEffect } from "react";
import StarRatingComponent from "react-star-rating-component";
import { motion } from "framer-motion";

export async function getStaticPaths() {
  const query = `query allBooks($size: Int) {
    allBooks(_size: $size) {
      data {
        _id
      }
    }
  }`;
  const data = await fetcher(query, { _size: 8 });
  let idList = [];
  data.allBooks.data.map((item) => {
    idList.push({ params: { id: item._id } });
  });

  return {
    paths: idList,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const query = `query bookById($id:ID!) {
    findBooksByID(id: $id) {
      _id
      title
      subTitle
      rating
      coverArt
      comments
      user
      authors {
        name
      }
      tags {
        name
      }
    }
  }`;
  const data = await fetcher(query, { id: params.id });
  return { props: { data } };
}

function Book({ data }) {
  const router = useRouter();
  const [book, setBook] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data && data.findBooksByID) {
      setLoading(false);
      setBook(data.findBooksByID);
    } else {
      setLoading(true);
    }
  }, [data]);

  if (router.isFallback) {
    return (
      <div
        styles={{
          postion: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div className="lg:pt-32 sm:pt-16 lg:pb-40 sm:pb-2">
      {book ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="container mx-auto px-6 md:flex"
        >
          <div className="w-full md:w-1/2">
            <img
              className="w-full rounded border border-color-gray-500"
              src={book.coverArt ? book.coverArt : "/no-image.png"}
              alt={`Cover art - ${book.title}`}
            />
          </div>
          <div className="w-full md:w-1/2 md:ml-4 sm:ml-0 md:mt-0 sm:mt-4 break-words">
            <h1 className="text-default font-bold text-4xl">{book.title}</h1>
            <h2 className="text-default font-thin text-2xl -mt-2">
              {book.subTitle}
            </h2>
            <div className="text-default mt-8">
              {book.authors.map((author, index) => (
                <span key={index}>
                  {author.name}
                  {book.authors.length > 1 && index < book.authors.length - 1
                    ? ", "
                    : " "}
                </span>
              ))}
            </div>
            <div className="text-default">
              {book.rating && (
                <StarRatingComponent
                  name={book._id}
                  starCount={5}
                  value={book.rating}
                  starColor=""
                  editing={false}
                  className="text-2xl"
                />
              )}
            </div>
            <div className="text-default">
              {book.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-transparent rounded mr-2 text-primary px-2 py-1 border border-primary"
                >
                  {tag.name}
                </span>
              ))}
            </div>
            <div className="text-default mt-8 blockquote whitespace-pre-wrap">
              {book.comments}
            </div>
            <div className="text-default mt-8 text-sm">
              Added by: {book.user}
            </div>
          </div>
        </motion.div>
      ) : (
        <h1 className="text-default text-3xl">
          Ooops, couldn't find that book.{" "}
        </h1>
      )}
    </div>
  );
}
export default Book;
