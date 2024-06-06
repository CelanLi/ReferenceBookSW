import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import AppRoutes from "./Routes";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        allPeople: {
          keyArgs: false,
          merge(
            existing = { edges: [], pageInfo: {} },
            incoming,
            { args, readField }
          ) {
            const merged = existing
              ? {
                  ...existing,
                  edges: [...existing.edges],
                  pageInfo: { ...existing.pageInfo },
                }
              : { edges: [], pageInfo: {} };
            let offset = 0;
            if (args && "after" in args && args.after !== null) {
              offset = offsetFromCursor(merged.edges, args.after, readField);
            }
            // If we couldn't find the cursor, default to appending to
            // the end of the list, so we don't lose any data.
            if (offset < 0) offset = merged.edges.length;
            // Now that we have a reliable offset, the rest of this logic
            // is the same as in offsetLimitPagination.
            for (let i = 0; i < incoming.edges.length; ++i) {
              merged.edges[offset + i] = incoming.edges[i];
              merged.pageInfo = incoming.pageInfo;
            }
            return merged;
          },
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
    if (readField("cursor", item) == cursor) {
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
