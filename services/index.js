import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT;

export const getPosts = async () => {
  const query = gql`
    query GetPosts {
      postsConnection {
        edges {
          node {
            author {
              bio
              name
              photo {
                url
              }
            }
            excerpt
            slug
            title
            excerpt
            createdAt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;
  const data = await request(graphqlAPI, query);
  return data.postsConnection.edges;
};

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails {
      posts(
        orderBy: createdAt_ASC
        last:3
      ){
        title
        featuredImage{
          url
        }
        createdAt
        slug
      }
    }
  `;
  const data = await request(graphqlAPI, query);
  return data.posts;
}
