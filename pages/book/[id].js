import Head from "next/head";
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
      <div styles={{postion: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
            Loading...
      </div>
    );
  }
  
  return (
    <div>
      <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
      <main>
        {book ? (
          <div>
            <div>
              <img src={book.coverArt ? book.coverArt : "/no-image.png"}
                alt={`Cover art - ${book.title}`}
              />
            </div>
            <div>
              <h1>
                {book.title}
              </h1>
              <h2>
                {book.subTitle}
              </h2>
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
                />
              )}
              <div>
                {book.tags.map((tag, index) => (
                  <span>
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <h1>Ooops, couldn't find that book. </h1>
        )}
      </main>
      </motion.div>
    </div>
  );
}
export default Book;
