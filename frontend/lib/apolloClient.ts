import {useMemo} from 'react';
import {ApolloClient, HttpLink, InMemoryCache, from} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {onError} from '@apollo/client/link/error';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';
import {useSession} from 'next-auth/react';
import {Session} from 'next-auth';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';
let apolloClient: ApolloClient<any>;

const authLink = (session: Session | null) =>
  setContext(async (_, {headers}) => {
    const token = session?.token?.jwt;
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

const errorLink = onError(({graphQLErrors = [], operation}) => {
  console.error({graphQLErrors, operation});
  const message = graphQLErrors?.[0]?.message;

  if (message === 'Forbidden') window.location.href = '/auth/login';
});

const httpLink = (uri: string) =>
  new HttpLink({
    uri, // Server URL (must be absolute)
    credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
  });

const createApolloClient = (uri: string, session: Session | null) => {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: from([authLink(session), errorLink, httpLink(uri)]),
    cache: new InMemoryCache(),
  });
};

export const initializeApollo = (
  uri: string,
  session: Session | null,
  initialState = null
) => {
  const _apolloClient = apolloClient ?? createApolloClient(uri, session);

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
  return useMemo(() => initializeApollo('', session, state), [state, session]);
};
