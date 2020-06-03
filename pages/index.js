import Head from 'next/head'
import { useState, useEffect } from 'react'
import { allBooks } from './api/api'
import { Container, Spinner, Grid, Box, Heading, AspectImage, Label } from 'theme-ui'
import Hero from '../components/Hero'

function getBooks(data) {
  return data ? data.allBooks.data.reverse() : []
}

export default function Home(props) {
  const { data, errorMessage } = allBooks()
  const [books, setBooks] = useState([])

  useEffect(() => {
    if (!books.length) {
      setBooks(getBooks(data))
    }
  }, [data, books.length])

  const handleFilterByTag = (tag) => {
    let filteredBooks = 
      books.filter(b => b.tags.some(t => t.name === tag))
    setBooks(filteredBooks)
  }

  const handleResetFilter = () => {
    setBooks(getBooks(data))
  }

  return (
    <Container sx={{padding: [16, 32]}}>
      <main>
        <Hero />
        <Heading>Recent Reads</Heading>
        <Heading as="h3" sx={{fontSize:1, fontWeight: 400}}>Recently finished</Heading>
        <button onClick={handleResetFilter}>Reset Filter</button>
        <Grid columns={[1, 2, 3]} sx={{mt:32}}>
          {errorMessage ? (
            <p>{errorMessage}</p>
          ) : !data ? (
            <Spinner title="Loading Books" />
          ) : (
            books.map((book, index) => {
              return (
                <Box key={book._id}>
                  <AspectImage ratio={2/1} src={book.coverArt} alt={`Cover art - ${book.title}`}/>
                  <Heading>{book.title}</Heading>
                  <Heading as="h3" sx={{fontSize:1, fontWeight: 400}}>{book.subTitle}</Heading>
                  <p>Rating: {book.rating}</p>
                  {book.authors.map((author, index) => (
                    <span key={index}>{author.name}{' '}</span>
                  ))}
                  {book.tags.map((tag, index) => (
                    <button key={index} onClick={
                      () => handleFilterByTag(tag.name)
                      }>
                      {tag.name}
                    </button>
                  ))}
                </Box>
              )
            })
          )}
        </Grid>    
      </main>
    </Container>
  )
}
