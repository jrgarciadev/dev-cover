import { useMemo } from 'react';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import fetch from 'isomorphic-unfetch';
import { HASHNODE_URL } from './constants';

let apolloClient;

const hashnodeLink = createHttpLink({
  fetch, // Switches between unfetch & node-fetch for client & server.
  uri: HASHNODE_URL, // Server URL (must be absolute)
  credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
});

function createApolloClient(initialState) {
  return new ApolloClient({
    link: hashnodeLink,
    ssrMode: typeof window === 'undefined',
    cache: new InMemoryCache()
      //  rehydrate the cache using the initial data passed from the server:
      .restore(initialState || {}),
  });
}

export function initializeApollo(initialState = null, token = null) {
  // eslint-disable-next-line no-underscore-dangle
  const _apolloClient = apolloClient ?? createApolloClient(initialState, token);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState = null) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
