import { GraphQLClient, request } from 'graphql-request'

const URL = "https://graphql.fauna.com/graphql"
const SECRET = process.env.SECRET

export default async function (query, variables) {
  const client = new GraphQLClient(URL, {
    headers: {
      Authorization: `Bearer ${SECRET}`,
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query,
      variables
    })
  })
  
  const data = await client.request(query)
    
  return data
}
