import React, { useState, useEffect } from "react";
import { createBooks, allTags } from "../utils/api";
import StarRatingComponent from "react-star-rating-component";
import { motion } from "framer-motion";
import { FaPlus, FaMinus, FaTimes } from "react-icons/fa";
import { useAuth } from "react-use-auth";

const AddBookForm = ({ ...props }) => {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [authors, setAuthors] = useState([{ name: "" }]);
  const [alert, setAlert] = useState({ show: false, message: "message" });
  const [coverArt, setCoverArt] = useState("");
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState();
  const [rating, setRating] = useState();
  const [tags, setTags] = useState([]);
  const [taglist, setTaglist] = useState([]);
  const { data, error } = allTags();
  const { isAuthenticated, user } = useAuth();
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
      if (data.totalItems > 0) {
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
      setTaglist(data.allTags.data.map((tag) => tag.tagName).sort());
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let submitTags = [];
    tags.map((tag, index) => {
      submitTags.push({ name: tag });
    });

    const book = {
      title: title,
      subTitle: subTitle,
      coverArt: coverArt,
      authors: authors,
      rating: rating,
      comments: comments,
      tags: submitTags,
      user: isAuthenticated() ? user.email : 'guest',
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
    setCoverArt("");
    setComments("");
    setRating();
    setTags([]);
  };

  const closeAlert = () => {
    setAlert({ show: false, message: "" });
  };
  
  return (
    
      <div className="px-4 w-full">
        {alert.show ? (
          <div className="bg-primary text-reverse-primary rounded mt-2 px-3 py-3">
            {alert.message}
            <span onClick={closeAlert} className="float-right pt-1">
              <FaTimes className="" />
            </span>
          </div>
        ) : null}
        {loading ? (
          <div className="container mx-auto">
            <motion.div
              className="container mx-auto border bg-color-gray-500 border-full h-12 w-12"
              animate={{
                scale: [1, 2, 2, 1, 1],
                rotate: [0, 0, 270, 270, 0],
                borderRadius: ["20%", "20%", "50%", "50%", "20%"],
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                times: [0, 0.2, 0.5, 0.8, 1],
                loop: Infinity,
                repeatDelay: 1,
              }}
            />
          </div>
        ) : (
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="flex flex-col w-full">
              <div className="w-full">
                <label className="tracking-wide font-bold block text-sm uppercase text-gray-500 mt-4 mb-2">
                  Title *
                </label>
                <input
                  className="appearance-none bg-background-default block w-full text-default border rounded py-3 px-4 border-primary focus:shadow-focus focus:outline-none focus:border-primary transition duration-400 "
                  name="title"
                  placeholder="The Hobbit"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={() => handleLookAhead()}
                />
              </div>
              <div className="w-full">
                <label className="tracking-wide font-bold block text-sm uppercase text-gray-500 mt-4 mb-2">
                  Subtitle
                </label>
                <input
                  className="appearance-none bg-background-default block w-full text-default border rounded py-3 px-4 border-primary focus:shadow-focus focus:outline-none focus:border-primary transition duration-400 "
                  name="subTitle"
                  placeholder="There and Back Again"
                  value={subTitle}
                  onChange={(e) => setSubTitle(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label className="tracking-wide font-bold block text-sm uppercase text-gray-500 mt-4 mb-2">
                  {authors.length > 1 ? "Authors" : "Author *"}
                </label>
                {authors.map((author, index) => {
                  return (
                    <div key={`authors${index}`} className="flex mb-3">
                      <div className="flex-grow">
                        <input
                          className="appearance-none bg-background-default block w-full text-default border border-r-0 rounded rounded-r-none py-3 px-4 border-primary focus:shadow-focus focus:outline-none focus:border-primary transition duration-400 "
                          name={`authors${index}`}
                          placeholder={index === 0 ? "J.R.R. Tolkien" : ""}
                          value={authors[index].name}
                          onChange={(e) =>
                            handleAuthorChange(index, e.target.value)
                          }
                        />
                      </div>
                      <div className="">
                        {index === 0 && (
                          <button
                            key={index}
                            onClick={(e) => handleAddAuthor(e)}
                            disabled={!authors[0].name}
                            className="border border-primary rounded-l-none py-3 px-4 rounded border-l-0 h-full focus:shadow-focus focus:outline-none focus:border-primary transition duration-200 "
                            tabIndex="0"
                            role="button"
                          >
                            <FaPlus
                              className={`${
                                !authors[0].name
                                  ? "text-gray-500"
                                  : "text-primary"
                              }`}
                            />
                          </button>
                        )}
                        {index !== 0 && (
                          <button
                            key={index}
                            onClick={(e) => handleDeleteAuthor(e, index)}
                            className="border border-primary rounded-l-none py-3 px-4 rounded border-l-0 h-full focus:shadow-focus focus:outline-none focus:border-primary transition duration-200 "
                          >
                            <FaMinus className="text-primary" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="w-full">
                <label className="tracking-wide font-bold block text-sm uppercase text-gray-500 mt-3 mb-2">
                  Cover Art URL <small className="text-xs font-thin normal-case">(square format works best)</small>
                </label>
                <input
                  className="appearance-none bg-background-default block w-full text-default border rounded py-3 px-4 border-primary focus:shadow-focus focus:outline-none focus:border-primary transition duration-400 invalid:border-danger"
                  name="coverArt"
                  type="url"
                  pattern="https://.*"
                  title="Must be https:// scheme - 500 px square formats work best"
                  placeholder="https://example/com/path/to/coverart.jpg"
                  value={coverArt}
                  onChange={(e) => setCoverArt(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label className="tracking-wide font-bold block text-sm uppercase text-gray-500 mt-3 mb-2">
                  Review
                </label>
                <textarea
                  className="appearance-none bg-background-default block w-full text-default border rounded py-3 px-4 border-primary focus:shadow-focus focus:outline-none focus:border-primary transition duration-400 "
                  name="comments"
                  placeholder=""
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                />
              </div>
              <div className="w-full">
                <div className="flex flex-wrap">
                  <div className="w-full sm:w-1/3 lg:w-1/5">
                    <label className="tracking-wide font-bold block text-sm uppercase text-gray-500 mt-4 mb-2">
                      Rating
                    </label>
                    <StarRatingComponent
                      name="rating"
                      starCount={5}
                      value={rating}
                      starColor=""
                      className="text-4xl -mt-3"
                      onStarClick={(e) => setRating(e)}
                    />
                  </div>
                  <div className="w-full sm:w-2/3 lg:w-4/5">
                    <label className="tracking-wide font-bold block text-sm uppercase text-gray-500 mt-4 mb-2">
                      Tags
                    </label>
                    {taglist &&
                      taglist.length > 0 &&
                      taglist.map((tag, index) => {
                        return (
                          <span
                            key={index}
                            className="relative border border-primary inline-block rounded-lg mr-3 px-2 py-1 mb-2 "
                          >
                            <label className="check-button text-default pl-3 pr-1 text-sm vertical-top">
                              {tag}
                              <input
                                id={tag}
                                type="checkbox"
                                name="tags"
                                value={tag}
                                className=" ml-3"
                                onChange={(e) =>
                                  e.target.checked
                                    ? setTags([...tags, e.target.value])
                                    : setTags(
                                        tags.filter((i) => i !== e.target.value)
                                      )
                                }
                              />
                              <span className="checkmark"></span>
                            </label>
                          </span>
                        );
                      })}
                  </div>
                </div>
              </div>

              <button
                className={`uppercase py-2 px-4 rounded-full bg-primary border-2 border-transparent text-sm text-center mt-6 text-white
              ${!title || !authors[0].name ? "opacity-50 cursor-not-allowed" : ""}
            `}
                onSubmit={handleSubmit}
                disabled={!title || !authors[0].name}
              >
                Add Book
              </button>
            </div>
          </form>
        )}
      </div>
    
  )  
};
export default AddBookForm;
