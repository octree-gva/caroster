import {useMemo} from 'react';
import {ApolloClient, HttpLink, InMemoryCache, from} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {onError} from '@apollo/client/link/error';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';
import useAuthStore from '../stores/useAuthStore';

const {STRAPI_URL = ''} = process.env;

// https://github.com/vercel/next.js/tree/canary/examples/with-apollo
// https://github.com/vercel/next.js/tree/canary/examples/layout-component
// https://www.apollographql.com/docs/react/networking/authentication/
// https://www.apollographql.com/docs/react/data/error-handling/
// https://www.apollographql.com/docs/react/caching/cache-field-behavior/#the-merge-function

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';
let apolloClient;

const authLink = setContext((_, {headers}) => {
  // get the authentication token from local storage if it exists
  const {token} = useAuthStore.getState();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const errorLink = onError(({graphQLErrors = []}) => {
  const [error] = graphQLErrors;
  console.error({graphQLErrors});

  if (
    error?.message === 'Invalid token.' ||
    error?.message === 'User Not Found' ||
    error?.message === 'Your account has been blocked by the administrator.'
  ) {
    useAuthStore.getState().setToken();
    useAuthStore.getState().setUser();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
});

const httpLink = uri =>
  new HttpLink({
    uri,
    credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
  });

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: from([authLink, errorLink, httpLink(`${STRAPI_URL}/graphql`)]),
    cache: new InMemoryCache({
      typePolicies: {
        Event: {
          fields: {
            waitingList: {
              merge(_, incoming) {
                return incoming;
              },
            },
          },
        },
        Car: {
          fields: {
            passengers: {
              merge(_, incoming) {
                return incoming;
              },
            },
          },
        },
      },
    }),
  });
};

export const initializeApollo = (initialState = null) => {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // Combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter(d => sourceArray.every(s => !isEqual(d, s))),
      ],
    });
    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
};

export const addApolloState = (client, pageProps) => {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }
  return pageProps;
};

export const useApollo = pageProps => {
  const state = pageProps[APOLLO_STATE_PROP_NAME];

  return useMemo(() => initializeApollo(state), [state]);
};
