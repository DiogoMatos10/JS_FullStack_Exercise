import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, Container, TableSortLabel, TablePagination, Box
} from '@mui/material';
import './SecurityList.css'; 
import Footer from './Footer';  

// GraphQL query to fetch the list of securities with key details
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

// Function to get the trend color based on the trend value
function getTrendColor(trend) {
  if (trend < -20) return 'red'; // Red for negative trends
  if (trend >= -20 && trend <= 20) return 'green'; // Green for neutral trends
  return 'blue'; // Blue for positive trends
}

function SecurityList() {
  const navigate = useNavigate(); // Initialize router navigation
  const { loading, error, data } = useQuery(GET_SECURITIES); // Fetch securities data using GraphQL query

  // State to manage table sorting, pagination, and row limit
  const [order, setOrder] = useState(localStorage.getItem('order') || 'asc'); // Initial sorting order (asc/desc)
  const [orderBy, setOrderBy] = useState(localStorage.getItem('orderBy') || 'ticker'); // Sort by field (default: ticker)
  const [page, setPage] = useState(parseInt(localStorage.getItem('page')) || 0); // Current page number
  const [rowsPerPage, setRowsPerPage] = useState(parseInt(localStorage.getItem('rowsPerPage')) || 5); // Number of rows per page

  // UseEffect hook to save table state (order, orderBy, page, rowsPerPage) in localStorage
  useEffect(() => {
    localStorage.setItem('order', order);
    localStorage.setItem('orderBy', orderBy);
    localStorage.setItem('page', page);
    localStorage.setItem('rowsPerPage', rowsPerPage);
  }, [order, orderBy, page, rowsPerPage]);

  // Handle sorting when a column header is clicked
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc'; // Check if current order is ascending
    setOrder(isAsc ? 'desc' : 'asc'); // Toggle between asc/desc
    setOrderBy(property); // Set the column to sort by
  };

  // Handle page change when user clicks pagination controls
  const handleChangePage = (event, newPage) => {
    setPage(newPage); // Update current page number
  };

  // Handle change in the number of rows per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10)); // Update rows per page
    setPage(0); // Reset to first page
  };

  // Sort the data based on selected column and order (asc/desc)
  const sortedData = data?.getSecurities.slice().sort((a, b) => {
    if (order === 'asc') {
      return a[orderBy] < b[orderBy] ? -1 : 1; // Sort ascending
    }
    return a[orderBy] > b[orderBy] ? -1 : 1; // Sort descending
  });

  // Display loading message while data is being fetched
  if (loading) return <p>Loading...</p>;

  // Display error message if there was an issue fetching data
  if (error) return <p>Error loading securities</p>;

  return (
    <>
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
                  onClick={() => navigate(`/securities/${security.ticker}`)} // Navigate to the security details page on row click
                  style={{ cursor: 'pointer' }} // Change cursor to pointer on hover
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
          rowsPerPageOptions={[5, 10, 15]} // Options for number of rows per page
          component="div"
          count={data.getSecurities.length} // Total number of records
          rowsPerPage={rowsPerPage} // Current number of rows per page
          page={page} // Current page
          onPageChange={handleChangePage} // Handle page change
          onRowsPerPageChange={handleChangeRowsPerPage} // Handle change in rows per page
          className="table-pagination"
          style={{ borderRadius: '0 0 8px 8px', borderTop: 'none' }} // Styling for pagination
        />
      </Box>
    </Container>
    <Footer /> {/* Footer component */}
    </>
  );
}

export default SecurityList;
