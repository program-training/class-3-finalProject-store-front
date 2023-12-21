import { gql } from "@apollo/client";

export const PRODUCTS_GRAPH = gql`
  subscription TriggerMongo {
    triggerMongo
  }
`;

export const USERS_GRAPH = gql`
  subscription TriggerPostgres {
    triggerPostgres
  }
`;
