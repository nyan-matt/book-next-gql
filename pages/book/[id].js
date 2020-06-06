import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { request } from 'graphql-request'
import fetcher from '../../utils/fetcher'
import { useState, useEffect } from 'react'
import { bookById } from '../../utils/api'
import { Container, Spinner, Grid, Box, Heading, AspectImage } from 'theme-ui'

export async function getStaticPaths() {
  const query = `query allBooks($size: Int) {
    allBooks(_size: $size) {
      data {
        _id
      }
    }
  }`
  const data = await fetcher(query, { _size : 8 })
  let idList = []
  data.allBooks.data.map((item) => {
    idList.push({params: { id: item._id }})
  })
  
  return {
    paths: idList,
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const query = 
  `query bookById($id:ID!) {
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
  }`
  const data = await fetcher(query, { id : params.id })
  return { props: { data } }
}

function Book({ data }) {
  const router = useRouter()
  const [book, setBook] = useState()
  const [loading, setLoading] = useState(false)
  //const { data, errorMessage } = bookById(id)
  
  useEffect(() => {
    if(data && data.findBooksByID) {
      setLoading(false)
      setBook(data.findBooksByID)
    } else {
      setLoading(true)
    }
  },[data])
  
  if (router.isFallback) {
    return (
      <Box>
        <Spinner
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }} 
        />
      </Box>
    )
  }

  return (
    <Container sx={{padding: [16, 32]}}>
      <main>
        { book ? (
          <>
          <Heading>{book.title}</Heading>
          <Heading as="h3" sx={{fontSize:1, fontWeight: 400}}>{book.subTitle}</Heading>
          <Grid columns={[1, 2, 3]} sx={{mt:32}}>
            <Box>
              <AspectImage ratio={2/1} src={book.coverArt} alt=""/>
            </Box>
          </Grid>
          </>
          )
        :
          (
            <Heading>Ooops, couldn't find that book. </Heading>
          )
        }
      </main>
    </Container>
  )
}
export default Book