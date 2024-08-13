// apollo-client.js
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3008/graphql', 
  cache: new InMemoryCache(),
  credentials:"include"
});

export default client;
