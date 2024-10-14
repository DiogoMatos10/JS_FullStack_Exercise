// src/components/SecurityDetail.jsx
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';

// Defina sua query GraphQL para obter detalhes do título
const GET_SECURITY_DETAIL = gql`
  query GetSecurityDetail($symbol: String!) {
    getSecurityDetail(symbol: $symbol) {
      id
      ticker
      securityName
      sector
      country
      trend
      prices {
        date
        close
        volume
      }
    }
  }
`;

function SecurityDetail() {
  const { symbol } = useParams();  
  const { loading, error, data } = useQuery(GET_SECURITY_DETAIL, {
    variables: { symbol },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { ticker, securityName, sector, country, trend, prices } = data.getSecurityDetail;

  return (
    <div>
      <h2>{securityName}</h2>
      <p>Symbol: {ticker}</p>
      <p>Sector: {sector}</p>
      <p>Country: {country}</p>
      <p>Trend: {trend}</p>

      <h3>Prices</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Close</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((price) => (
            <tr key={price.date}>
              <td>{price.date}</td>
              <td>{price.close}</td>
              <td>{price.volume}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SecurityDetail;
