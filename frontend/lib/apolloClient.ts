import {useMemo} from 'react';
import {ApolloClient, HttpLink, InMemoryCache, from} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {onError} from '@apollo/client/link/error';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';
import {signOut, useSession} from 'next-auth/react';

const ENV = process.env.NODE_ENV;
export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';
let apolloClient: ApolloClient<any>;

const authLink = (jwt: string | null) =>
  setContext(async (_, {headers}) => {
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: jwt ? `Bearer ${jwt}` : '',
      },
    };
  });

const errorLink = onError(({operation, networkError, response}) => {
  if (ENV !== 'production') console.error({networkError, operation});
  if (response) console.error(JSON.stringify(response, null, 4));
  const responseStatus = networkError?.response?.status;

  if (responseStatus === 401)
    signOut({
      callbackUrl: '/auth/login',
    });
});

const httpLink = (uri: string) =>
  new HttpLink({
    uri, // Server URL (must be absolute)
    credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
  });

const createApolloClient = (uri: string, jwt: string | null) => {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: from([authLink(jwt), errorLink, httpLink(uri)]),
    cache: new InMemoryCache(),
  });
};

export const initializeApollo = (
  uri: string,
  jwt: string | null,
  initialState = null
) => {
  const _apolloClient = apolloClient ?? createApolloClient(uri, jwt);

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

export const addApolloState = (client: ApolloClient<any>, pageProps: any) => {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }
  return pageProps;
};

export const useApollo = (pageProps: any) => {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const {data: session} = useSession();
  return useMemo(
    () => initializeApollo('/graphql/', session?.token?.jwt, state),
    [state, session]
  );
};
