import { gql } from "@apollo/client";
import client from "../apollo-client";

export default function Home({ posts }) {
  return (
    <div>
      <h1>WordPress + GraphQL + Next.js</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query {
        posts {
          nodes {
            id
            title
            excerpt
          }
        }
      }
    `,
  });

  return {
    props: {
      posts: data.posts.nodes,
    },
    revalidate: 10, // ISR for fresh data
  };
}
