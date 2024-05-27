import { graphql } from "./gql/gql";

// get people query
export const PEOPLE_QUERY = graphql(`
  query GetData($limit: Int, $cursor: String, $before: String) {
    allPeople(first: $limit, after: $cursor, before: $before) {
      edges {
        node {
          id
          name
          height
          homeworld {
            name
          }
          species {
            name
          }
          gender
          eyeColor
        }
        cursor
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`);

// get people query for detail page
export const GET_PERSON = graphql(`
  query GetPerson($id: ID!) {
    person(id: $id) {
      id
      name
      height
      homeworld {
        name
      }
      species {
        name
      }
      gender
      eyeColor
      filmConnection {
        films {
          title
        }
      }
    }
  }
`);
