import client from "../apollo-client";
import { gql } from "@apollo/client";

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query GetPosts {
        posts(first: 5) {
          nodes {
            id
            title
            excerpt
            date
          }
        }
      }
    `,
  });

  return {
    props: { posts: data.posts.nodes },
    revalidate: 10,
  };
}

export default function Home({ posts }) {
  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p dangerouslySetInnerHTML={{ __html: post.excerpt }} />
        </div>
      ))}
    </div>
  );
}
