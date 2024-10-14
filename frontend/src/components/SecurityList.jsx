// src/components/SecurityList.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const GET_SECURITIES = gql`
  query GetSecurities {
    getSecurities {
      id
      ticker
      securityName
      sector
      country
      trend
    }
  }
`;

function getTrendColor(trend) {
  if (trend < -20) return 'red';
  if (trend >= -20 && trend <= 20) return 'green';
  return 'blue';
}

function SecurityList() {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_SECURITIES);  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading securities</p>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Symbol</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Sector</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Trend</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.getSecurities.map((security) => (
            <TableRow
              key={security.id}
              onClick={() => navigate(`/securities/${security.ticker}`)} 
              style={{ cursor: 'pointer' }}
            >
              <TableCell>{security.ticker}</TableCell>
              <TableCell>{security.securityName}</TableCell>
              <TableCell>{security.sector}</TableCell>
              <TableCell>{security.country}</TableCell>
              <TableCell style={{ backgroundColor: getTrendColor(security.trend) }}>
                {security.trend}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SecurityList;
