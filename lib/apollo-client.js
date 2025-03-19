import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_WORDPRESS_API_URL, // Ensure this is set in your .env.local
  cache: new InMemoryCache(),
});

export default client;
