import useFetch from "./useFetch";

const URL = process.env.URL;
const SECRET = process.env.SECRET;

function getData(data) {
  if (!data || data.errors) return null;
  return data.data;
}

function getErrorMessage(errors, data) {
  if (errors && errors.length) return errors[0].message;
  if (data && data.errors) {
    return data.errors[0].message;
  }
  return null;
}

// get all books query
export const allBooks = (limit) => {
  const query = `query allBooks($size: Int) {
    allBooks(_size: $size) {
      data {
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
      after
    }
  }`;
  const size = limit || 100;
  const { data, error } = useFetch(URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SECRET}`,
      "Content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { size },
    }),
  });

  return {
    data: getData(data),
    errorMessage: getErrorMessage(error, data),
    error,
  };
};

// get book by id
export const bookById = (id) => {
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
  const { data, error } = useFetch(URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SECRET}`,
      "Content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { id },
    }),
  });

  return {
    data: getData(data),
    errorMessage: getErrorMessage(error, data),
    error,
  };
};

// get all books by user
export const booksByUser = (user) => {
  const query = `query booksByUser($user: String!) {
    booksByUser(user: $user) {
      data {
        _id
        title
        subTitle
        rating
        coverArt
        user
        authors {
            name
        }
        tags {
          name
        }
        comments
      }
      after
    }
  }`;
  const { data, error } = useFetch(URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SECRET}`,
      "Content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { user },
    }),
  });

  return {
    data: getData(data),
    errorMessage: getErrorMessage(error, data),
    error,
  };
};



// create a book mutation
export const createBooks = async (book) => {
  const query = `mutation createBooks($data:BooksInput!) {
    createBooks(data:$data) {
      _id
      title
      subTitle
      authors {
        name
      }
    }
  }`;
  const res = await fetch(URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SECRET}`,
      "Content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { data: book },
    }),
  });
  const { data, errors } = await res.json();

  return {
    data: data,
    errorMessage: getErrorMessage(errors, data),
    errors,
  };
};

// get all tags query
export const allTags = (limit) => {
  const query = `query allTags($size: Int) {
    allTags(_size: $size) {
      data {
        _id
        tagName
      }
    }
  }`;
  const size = limit || 100;
  const { data, error } = useFetch(URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SECRET}`,
      "Content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { size },
    }),
  });

  return {
    data: getData(data),
    errorMessage: getErrorMessage(error, data),
    error,
  };
};