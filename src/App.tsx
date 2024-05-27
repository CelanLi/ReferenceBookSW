import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import AppRoutes from "./Routes";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        allPeople: {
          // Don't cache separate results based on
          // any of this field's arguments.
          keyArgs: false,
          // merge(existing = { edges: [], pageInfo: {} }, incoming) {
          //   console.log("existing", existing, "incoming", incoming);
          //   const merged = {
          //     edges: [...existing.edges, ...incoming.edges],
          //     pageInfo: incoming.pageInfo,
          //   };
          //   console.log("merged", merged);
          //   return merged;
          // },
          // merge(
          //   existing = { edges: [], pageInfo: {} },
          //   incoming,
          //   { args, readField }
          // ) {
          //   console.log("existing", existing, "incoming", incoming);
          //   const merged = existing
          //     ? { ...existing }
          //     : { edges: [], pageInfo: {} };
          //   let offset = 0;
          //   if (args && "cursor" in args) {
          //     offset = offsetFromCursor(merged, args.cursor, readField);
          //   }
          //   // If we couldn't find the cursor, default to appending to
          //   // the end of the list, so we don't lose any data.
          //   if (offset < 0) offset = merged.length;
          //   // Now that we have a reliable offset, the rest of this logic
          //   // is the same as in offsetLimitPagination.
          //   for (let i = 0; i < incoming.edges.length; ++i) {
          //     merged[offset + i] = incoming.edges[i];
          //   }
          //   console.log("merged", merged);
          //   return merged;
          // },
          //         // If you always want to return the whole list, you can omit
          //         // this read function.
          //         read(existing, { args, readField }) {
          //           if (existing) {
          //             const existingEdges =
          //               existing && existing.edges ? existing.edges : [];
          //             let cursor = args && "cursor" in args ? args.cursor : null;
          //             let limit =
          //               args && "limit" in args ? args.limit : existingEdges.length;
          //             let offset = offsetFromCursor(existingEdges, cursor, readField);
          //             // If we couldn't find the cursor, default to reading the
          //             // entire list.
          //             if (offset < 0) offset = 0;
          //             return existingEdges.slice(offset, offset + limit);
          //           }
          // },
        },
      },
    },
  },
});

function offsetFromCursor(
  items: Record<string, any>[],
  cursor: string,
  readField: Function
) {
  for (let i = items.length - 1; i >= 0; --i) {
    const item = items[i];
    if (readField("id", item) === cursor) {
      return i + 1;
    }
  }
  // Report that the cursor could not be found.
  return -1;
}

const client = new ApolloClient({
  uri: "https://swapi-graphql.netlify.app/.netlify/functions/index",
  cache: cache,
  connectToDevTools: true,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div style={{ width: "100%" }}>
        <AppRoutes />
      </div>
    </ApolloProvider>
  );
}

export default App;
