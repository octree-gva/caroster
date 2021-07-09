import {useMemo} from 'react';
import {ApolloClient, HttpLink, InMemoryCache} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {onError} from '@apollo/client/link/error';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';
import useAuthStore from '../stores/useAuthStore';

const {STRAPI_URL = ''} = process.env;

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

export let apolloClient;

const httpLink = new HttpLink({
  uri: `${STRAPI_URL}/graphql`, // Server URL (must be absolute)
  credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
});

const handleError = onError(({graphQLErrors = [], ...details}) => {
  const [error] = graphQLErrors;
  console.error({graphQLErrors, error, details});

  if (error?.message === 'Invalid token.') {
    useAuthStore.getState().logout();
  } else if (error?.message == 'Forbidden') {
    window.location.href = '/auth/login';
  }
});

const createApolloClient = token => {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: setContext((_, {headers}) => {
      if (!token) return {headers};
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${token}`,
        },
      };
    })
      .concat(handleError)
      .concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export const initializeApollo = (
  initialState: object = {},
  token: string = ''
) => {
  const _apolloClient = createApolloClient(token);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
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
  const token = useAuthStore(s => s.token);
  return useMemo(() => {
    const newClient = initializeApollo(state, token);
    apolloClient = newClient;
    return newClient;
  }, [state, token]);
};
