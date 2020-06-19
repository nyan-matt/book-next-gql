import Head from "next/head";
import { useRouter } from "next/router";
import fetcher from "../../utils/fetcher";
import { useState, useEffect } from "react";
import {
  Container,
  Spinner,
  Flex,
  Box,
  Heading,
  AspectImage,
  Badge,
  useThemeUI,
} from "theme-ui";
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
  const context = useThemeUI();
  const { theme } = context;


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
    );
  }
  
  return (
    <Container sx={{ padding: [16, 32] }}>
      <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
      <main>
        {book ? (
          <Flex
            mt={32}
            sx={{ flexWrap: ["wrap", "no-wrap", null], flexDirection: "row" }}
          >
            <Box
              sx={{
                flexBasis: ["100%", "40%", "30%", ""],
              }}
            >
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
            </Box>
            <Box
              sx={{
                flexBasis: ["100%", "60%", "70%"],
                paddingLeft: ["0px", "8px", "24px"],
              }}
            >
              <Heading 
                as="h1"
                mt={0}
                sx={{fontSize: 6}}
              >
                {book.title}
              </Heading>
              <Heading as="h2" sx={{ fontSize: 3, fontWeight: 400 }}>
                {book.subTitle}
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
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </Box>
          </Flex>
        ) : (
          <Heading>Ooops, couldn't find that book. </Heading>
        )}
      </main>
      </motion.div>
    </Container>
  );
}
export default Book;
