/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query GetData($limit: Int, $cursor: String, $before: String) {\n    allPeople(first: $limit, after: $cursor, before: $before) {\n      edges {\n        node {\n          id\n          name\n          height\n          homeworld {\n            name\n          }\n          species {\n            name\n          }\n          gender\n          eyeColor\n        }\n        cursor\n      }\n      pageInfo {\n        startCursor\n        endCursor\n        hasNextPage\n        hasPreviousPage\n      }\n    }\n  }\n": types.GetDataDocument,
    "\n  query GetSpecies {\n    allPeople {\n      edges {\n        node {\n          species {\n            name\n          }\n        }\n      }\n    }\n  }\n": types.GetSpeciesDocument,
    "\n  query GetGenders {\n    allPeople {\n      edges {\n        node {\n          gender\n        }\n      }\n    }\n  }\n": types.GetGendersDocument,
    "\n  query GetEyeColors {\n    allPeople {\n      edges {\n        node {\n          eyeColor\n        }\n      }\n    }\n  }\n": types.GetEyeColorsDocument,
    "\n  query GetPerson($id: ID!) {\n    person(id: $id) {\n      id\n      name\n      height\n      homeworld {\n        name\n      }\n      species {\n        name\n      }\n      gender\n      eyeColor\n      filmConnection {\n        films {\n          title\n        }\n      }\n    }\n  }\n": types.GetPersonDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetData($limit: Int, $cursor: String, $before: String) {\n    allPeople(first: $limit, after: $cursor, before: $before) {\n      edges {\n        node {\n          id\n          name\n          height\n          homeworld {\n            name\n          }\n          species {\n            name\n          }\n          gender\n          eyeColor\n        }\n        cursor\n      }\n      pageInfo {\n        startCursor\n        endCursor\n        hasNextPage\n        hasPreviousPage\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetData($limit: Int, $cursor: String, $before: String) {\n    allPeople(first: $limit, after: $cursor, before: $before) {\n      edges {\n        node {\n          id\n          name\n          height\n          homeworld {\n            name\n          }\n          species {\n            name\n          }\n          gender\n          eyeColor\n        }\n        cursor\n      }\n      pageInfo {\n        startCursor\n        endCursor\n        hasNextPage\n        hasPreviousPage\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetSpecies {\n    allPeople {\n      edges {\n        node {\n          species {\n            name\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetSpecies {\n    allPeople {\n      edges {\n        node {\n          species {\n            name\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetGenders {\n    allPeople {\n      edges {\n        node {\n          gender\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetGenders {\n    allPeople {\n      edges {\n        node {\n          gender\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetEyeColors {\n    allPeople {\n      edges {\n        node {\n          eyeColor\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetEyeColors {\n    allPeople {\n      edges {\n        node {\n          eyeColor\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPerson($id: ID!) {\n    person(id: $id) {\n      id\n      name\n      height\n      homeworld {\n        name\n      }\n      species {\n        name\n      }\n      gender\n      eyeColor\n      filmConnection {\n        films {\n          title\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPerson($id: ID!) {\n    person(id: $id) {\n      id\n      name\n      height\n      homeworld {\n        name\n      }\n      species {\n        name\n      }\n      gender\n      eyeColor\n      filmConnection {\n        films {\n          title\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;