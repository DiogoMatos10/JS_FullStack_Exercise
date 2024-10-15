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

    type Price {
        id: Int!
        date: String!
        close: Float
        volume: Int
        security: Security!
    }

    type Query {
        getSecurities: [Security!]!
        getPricesBySecurityId(security_id: Int!): [Price!]!
        getSecurityByTicker(ticker: String!): Security
    }
`;
