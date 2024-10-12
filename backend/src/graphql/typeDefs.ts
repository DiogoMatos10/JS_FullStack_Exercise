// src/graphql/typeDefs.ts
import { gql } from 'apollo-server';

export const typeDefs = gql`
    type Security {
        id: Int!
        ticker: String!
        securityName: String!
        sector: String!
        country: String!
        trend: Float!
    }

    type Query {
        getSecurities: [Security!]!
    }
`;
