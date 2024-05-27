import { gql } from "@apollo/client";
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

// get all species query
export const SPECIES_QUERY = gql`
  query GetSpecies {
    allPeople {
      edges {
        node {
          species {
            name
          }
        }
      }
    }
  }
`;

// get all genders query
export const GENDERS_QUERY = gql`
  query GetGenders {
    allPeople {
      edges {
        node {
          gender
        }
      }
    }
  }
`;

// get all eye colors query
export const EYECOLORS_QUERY = gql`
  query GetEyeColors {
    allPeople {
      edges {
        node {
          eyeColor
        }
      }
    }
  }
`;

// get people query for detail page
export const GET_PERSON = gql`
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
`;

// get people query for favorites
// export const GET_FAVORITES = gql`
//   query GetPeople($id: [ID!]!) {
//     person(id: $id) {
//       id
//       name
//       height
//       homeworld {
//         name
//       }
//       species {
//         name
//       }
//       gender
//       eyeColor
//       filmConnection {
//         films {
//           title
//         }
//       }
//     }
//   }
// `;
