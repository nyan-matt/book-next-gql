import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useBooks } from '../utils/api'
import { Container, Box, Input, Button, Label } from 'theme-ui'

const initialFormData = {
  title: undefined,
  authors: [
    {
      name: undefined
    }
  ],
}

export default function Add(props) {
  const [formData, setFormData] = useState(initialFormData)
  const handleSubmit = (e) => {
    e.preventDefault()
    const submittedFormData = {
      title: e.target.title.value,
    } 
    //setFormData(submittedFormData)
    console.log(e.target.title.value)
  }

  const handleAddAuthor = () => {
    setFormData(prevState => ({
      ...prevState,
      ...prevState.authors.push({ name: undefined })
      })
    )
  }
  const handleDeleteAuthor = () => {
    setFormData(prevState => ({
      ...prevState,
      ...prevState.authors.pop()
      })
    )
  }

  // useEffect(() => {
  //   if (!books.length) {
  //     setBooks(getBooks(data))
  //   }
  // }, [data, books.length])

  return (
    <Container>
      <main>
        <h1>Add Book</h1>
        <Box
          as="form"
          onSubmit={e => handleSubmit(e)}
        >
          <Label htmlFor="title">Title</Label>
          <Input
            name="title"
            id="title"
            mb={3}
          />
          <Label>{formData.authors.length > 1 ? 'Authors' : 'Author'}</Label>
          {formData.authors.map((author, index) => {
            return (
              <Input
                key={`author${index}`}
                name={`author${index}`}
                id={`author${index}`}
                mb={3}
              />
            )
          })}
          <button onClick={handleAddAuthor}>add new author</button>  
          <button onClick={handleDeleteAuthor}>delete author</button>  
          <Button>Submit</Button>  
        </Box>
      </main>
    </Container>
  )
}
