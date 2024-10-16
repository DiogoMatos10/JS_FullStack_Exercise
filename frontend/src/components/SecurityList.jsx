import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, Container, TableSortLabel, TablePagination, Box
} from '@mui/material';
import './SecurityList.css';
import Footer from './Footer'; 


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

  const [order, setOrder] = useState(localStorage.getItem('order') || 'asc');
  const [orderBy, setOrderBy] = useState(localStorage.getItem('orderBy') || 'ticker');
  const [page, setPage] = useState(parseInt(localStorage.getItem('page')) || 0);
  const [rowsPerPage, setRowsPerPage] = useState(parseInt(localStorage.getItem('rowsPerPage')) || 5);

  useEffect(() => {
    localStorage.setItem('order', order);
    localStorage.setItem('orderBy', orderBy);
    localStorage.setItem('page', page);
    localStorage.setItem('rowsPerPage', rowsPerPage);
  }, [order, orderBy, page, rowsPerPage]);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedData = data?.getSecurities.slice().sort((a, b) => {
    if (order === 'asc') {
      return a[orderBy] < b[orderBy] ? -1 : 1;
    }
    return a[orderBy] > b[orderBy] ? -1 : 1;
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading securities</p>;

  return (
    <Container className="security-list-container">
      <Typography variant="h4" component="h1" className="title">
        Securities
      </Typography>
      <Box className="table-box">
      <TableContainer component={Paper} className="table-container" style={{ borderRadius: '8px 8px 0 0' }}>
        <Table>
            <TableHead>
              <TableRow>
                <TableCell sortDirection={orderBy === 'ticker' ? order : false}>
                  <TableSortLabel
                    active={orderBy === 'ticker'}
                    direction={orderBy === 'ticker' ? order : 'asc'}
                    onClick={() => handleRequestSort('ticker')}
                  >
                    Symbol
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderBy === 'securityName' ? order : false}>
                  <TableSortLabel
                    active={orderBy === 'securityName'}
                    direction={orderBy === 'securityName' ? order : 'asc'}
                    onClick={() => handleRequestSort('securityName')}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderBy === 'sector' ? order : false}>
                  <TableSortLabel
                    active={orderBy === 'sector'}
                    direction={orderBy === 'sector' ? order : 'asc'}
                    onClick={() => handleRequestSort('sector')}
                  >
                    Sector
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderBy === 'country' ? order : false}>
                  <TableSortLabel
                    active={orderBy === 'country'}
                    direction={orderBy === 'country' ? order : 'asc'}
                    onClick={() => handleRequestSort('country')}
                  >
                    Country
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderBy === 'trend' ? order : false}>
                  <TableSortLabel
                    active={orderBy === 'trend'}
                    direction={orderBy === 'trend' ? order : 'asc'}
                    onClick={() => handleRequestSort('trend')}
                  >
                    Trend
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((security) => (
                <TableRow
                  key={security.id}
                  onClick={() => navigate(`/securities/${security.ticker}`)}
                  style={{ cursor: 'pointer' }}
                  className="table-row"
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
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={data.getSecurities.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className="table-pagination"
          style={{ borderRadius: '0 0 8px 8px', borderTop: 'none' }}
        />
      </Box>
      <Footer/>
    </Container>
  );
}

export default SecurityList;
