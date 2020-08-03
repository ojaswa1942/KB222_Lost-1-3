import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import getToast from "../utils/getToast";
import config from "../utils/config";

const uri = config.apiEndpoint;
const apiLink = new HttpLink({ uri });

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      // eslint-disable-next-line no-console
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    );
  }

  if (networkError) {
    if (networkError.statusCode === 401) {
      // logout();
      // eslint-disable-next-line
      console.log(`unauthorized, logout`);
    } else {
      const toast = getToast();
      toast.fire({
        icon: "error",
        title: `Network Error: ${networkError.message}`,
      });
      // eslint-disable-next-line no-console
      console.log(`[Network error]: ${networkError}`);
    }
  }
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, apiLink]),
});

export default client;
