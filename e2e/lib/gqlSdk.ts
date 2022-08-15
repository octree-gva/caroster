import { getSdk } from "../graphql";
import { GraphQLClient } from "graphql-request";

const ENDPOINT = "http://localhost:1337/graphql";

const graphqlClient = new GraphQLClient(ENDPOINT);
export const sdk = getSdk(graphqlClient);
