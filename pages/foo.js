/** @jsx jsx */
import Head from "next/head";
import { useState, useEffect } from "react";
import { createBooks, allTags } from "../utils/api";
import {
  Container,
  Flex,
  Box,
  Input,
  Label,
  Alert,
  Close,
  Spinner,
  Checkbox,
  jsx,
} from "theme-ui";
import Button from "../components/Button";
import { FaPlus, FaMinus } from "react-icons/fa";
import StarRatingComponent from 'react-star-rating-component';

export default function Add(props) {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [authors, setAuthors] = useState([{ name: "" }]);
  const [alert, setAlert] = useState({ show: false, message: "message" });
  const [coverArt, setCoverArt] = useState("");
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState();
  const [tags, setTags] = useState([]);
  const [taglist, setTaglist] = useState([]);
  const { data, error } = allTags();
  
  

  
  const GBAPI =
    "https://www.googleapis.com/books/v1/volumes?printType=books&maxResults=5&printType=books&";

  /*  Fetch title results from Google's book api, and if there seems to be an author match, pre-populate it in the author field. Unfortunately, GBAPI doesn't always return the most relevant results. Sometimes it works... e.g. "Frankstein" returns "Mary Wollstonecraft Shelley"
*/
  const handleLookAhead = () => {
    async function fetchAuthorsFromTitle() {
      const res = await fetch(
        GBAPI + new URLSearchParams({ q: `intitle:'${title}'` })
      );
      const data = await res.json();
      let authorArray = [];
      if(data.totalItems > 0) {
        data.items.map((item) => {
          authorArray.push(item.volumeInfo.authors);
        });
      }
      let count = authorArray.reduce(
        (acc, value) => ({
          ...acc,
          [value]: (acc[value] || 0) + 1,
        }),
        {}
      );
      const winner = Object.keys(count)
        .filter((key) => count[key] > 2)
        .toString();
      if (winner.length > 0 && !authors[0].name) {
        setAuthors([{ name: winner }]);
      }
    }
    fetchAuthorsFromTitle();
  };

  useEffect(() => {
    if (data && data.allTags) {
      setTaglist(data.allTags.data.map(tag => tag.tagName))
    }
  }, [data])

  const handleSubmit = (e) => {
    e.preventDefault();
    const book = {
      title: title,
      subTitle: subTitle,
      coverArt: coverArt,
      authors: authors,
      rating: rating,
    };
    setLoading(true);
    createBooks(book).then((response) => {
      if (response.data && !response.errorMessage) {
        setLoading(false);
        setAlert({
          show: true,
          message: `${response.data.createBooks.title} successfully added`,
        });
        clearFields();
      } else if (!response.data && response.errorMessage) {
        setLoading(false);
        setAlert({
          show: true,
          message: `Error adding book: ${response.errorMessage}`,
        });
      } else {
        setLoading(false);
        setAlert({
          show: true,
          message: "WTF happened? 🤷‍♂️",
        });
      }
    });
  };

  const handleAddAuthor = (e) => {
    e.preventDefault();
    setAuthors(authors.concat({ name: "" }));
  };

  const handleDeleteAuthor = (e, index) => {
    e.preventDefault();
    let temp = [...authors];
    temp.splice(index, 1);
    setAuthors(temp);
  };

  const handleAuthorChange = (index, value) => {
    let newVal = [...authors];
    newVal[index] = { name: value };
    setAuthors(newVal);
  };

  const clearFields = () => {
    setTitle("");
    setSubTitle("");
    setAuthors([{ name: "" }]);
  };

  const closeAlert = () => {
    setAlert({ show: false, message: "" });
  };

  console.log(tags);
  return (
    <Container>
      <main>
        <h1>Add Book</h1>
        {alert.show ? (
          <Alert mb={4} variant="sucess">
            {alert.message}
            <Close ml="auto" sx={{ minWidth: "32px" }} onClick={closeAlert} />
          </Alert>
        ) : null}
        {loading ? (
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
          <Box as="form" onSubmit={(e) => handleSubmit(e)}>
            <Label htmlFor="title">Title</Label>
            <Input
              name="title"
              placeholder="The Hobbit"
              required
              mb={3}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => handleLookAhead()}
            />
            <Label htmlFor="title">Subtitle</Label>
            <Input
              name="subTitle"
              placeholder="There and Back Again"
              mb={3}
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
            />
            <Label>{authors.length > 1 ? "Authors" : "Author"}</Label>
            {authors.map((author, index) => {
              return (
                <Flex key={`authors${index}`}>
                  <Box sx={{ flex: "1 1 auto" }}>
                    <Input
                      name={`authors${index}`}
                      placeholder={index === 0 ? "J.R.R. Tolkien" : ""}
                      value={authors[index].name}
                      onChange={(e) =>
                        handleAuthorChange(index, e.target.value)
                      }
                      mb={3}
                    />
                  </Box>
                  <Box>
                    {index === 0 && (
                      <Box
                        key={index}
                        as="button"
                        sx={{ height: "42px", ml: "6px" }}
                        onClick={(e) => handleAddAuthor(e)}
                        disabled={!authors[0].name}
                      >
                        <FaPlus />
                      </Box>
                    )}
                    {index !== 0 && (
                      <Box
                        key={index}
                        as="button"
                        sx={{ height: "42px", ml: "6px" }}
                        onClick={(e) => handleDeleteAuthor(e, index)}
                      >
                        <FaMinus />
                      </Box>
                    )}
                  </Box>
                </Flex>
              );
            })}
            <Label htmlFor="coverArt">Cover Art</Label>
            <Input
              name="coverArt"
              placeholder="https://example.com/bookcover.jpg"
              mb={3}
              value={coverArt}
              onChange={(e) => setCoverArt(e.target.value)}
            />
            <Flex sx={{flexWrap: 'wrap'}}>
            <Box sx={{flexBasis:['100%', '40%', '30%']}}>
            <Label htmlFor="rating">Rating</Label>
            <StarRatingComponent 
              name="rating" 
              starCount={5}
              value={rating}
              onStarClick={(e) => setRating(e)}
              sx={{fontSize:'36px', display:'block'}}
            />
            </Box>
            <Box sx={{flexBasis:['100%', '60%', '70%']}}>
              <Label htmlFor="tags" mb={2}>Tags</Label>
              <Flex sx={{ flexWrap: 'wrap'}}>
              {
                taglist && taglist.length > 0 &&
                taglist.map((tag, index) => {
                  return (
                    <Box key={index} mx={1}>
                    <Label key={index} p={2} sx={{border: '1px solid', borderRadius: '4px', borderColor: 'muted' }}>
                    <Checkbox name="tags" value={tag}  
                    onChange={(e) => e.target.checked 
                      ? setTags([...tags,  e.target.value]) 
                      : setTags(tags.filter((i) => (i !== e.target.value)))} 
                    />{tag}</Label>
                    </Box>
                  )
                })
              }
              </Flex>
            </Box>
            </Flex>  
            <Button
              foo="bar"
              onSubmit={handleSubmit}
              disabled={!title || !authors[0].name}
            >
              Submit
            </Button>
          </Box>
        )}
      </main>
    </Container>
  );
}
