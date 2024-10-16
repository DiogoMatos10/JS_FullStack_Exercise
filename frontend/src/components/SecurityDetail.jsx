import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import Footer from './Footer'; 
import { Typography, Container, Box } from '@mui/material'; 
import './SecurityDetail.css'; 

// GraphQL query to get the security details by ticker
const GET_SECURITY_BY_TICKER = gql`
  query GetSecurityByTicker($ticker: String!) {
    getSecurityByTicker(ticker: $ticker) {
      id
      ticker
      securityName
      sector
      country
      trend
    }
  }
`;

// GraphQL query to get the price and volume data for the security by its ID
const GET_PRICES_BY_SECURITY_ID = gql`
  query GetPricesBySecurityId($security_id: Float!) {
    getPricesBySecurityId(security_id: $security_id) {
      date
      close
      volume
    }
  }
`;

function SecurityDetail() {
  // Get the ticker symbol from the URL parameters
  const { symbol } = useParams();

  // Fetch the security details based on the ticker
  const { loading: loadingTicker, error: errorTicker, data: dataTicker } = useQuery(GET_SECURITY_BY_TICKER, {
    variables: { ticker: symbol },
  });

  // Get the security ID once the security details are loaded
  const security_id = dataTicker?.getSecurityByTicker?.id;

  // Fetch the price data based on the security ID
  const { loading, error, data } = useQuery(GET_PRICES_BY_SECURITY_ID, {
    variables: { security_id },
    skip: !security_id, // Only execute query once the security ID is available
  });

  // Function to format dates in a "Month 'YY" format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleString('default', { month: 'short' })} '${date.getFullYear().toString().slice(-2)}`;
  };

  // Show loading or error messages during data fetching
  if (loadingTicker || loading) return <p>Loading...</p>;
  if (errorTicker) return <p>Error: {errorTicker.message}</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Extract security and price details
  const security = dataTicker.getSecurityByTicker;
  const prices = data.getPricesBySecurityId;

  // Highcharts options for rendering the line chart
  const chartOptions = {
    chart: {
      type: 'line', // Define the chart type
      scrollablePlotArea: { // Enable scrollable plot area
        minWidth: 500, // Minimum width for the chart
        scrollPositionX: 1 // Position scroll at the end initially
      },
      backgroundColor: 'var(--secondary-color)', // Apply custom background color from CSS variables
      borderRadius: 8, // Rounded corners for the chart
    },
    title: {
      text: `${security.securityName} Chart`, // Title based on the security name
      style: {
        color: 'var(--text-color)' // Dynamic text color
      }
    },
    xAxis: {
      categories: prices.map((price) => formatDate(price.date)), // X-axis categories as formatted dates
      scrollbar: {
        enabled: true, // Enable scrollbar for X-axis to handle larger datasets
      },
      labels: {
        style: {
          color: 'var(--text-color)' // X-axis label color
        }
      }
    },
    yAxis: [{
      title: {
        text: 'Close', // Title for the Y-axis representing the close price
        style: {
          color: 'var(--text-color)' // Y-axis label color
        }
      },
      labels: {
        style: {
          color: 'var(--text-color)' // Labels color for Y-axis
        }
      }
    }, {
      title: {
        text: 'Volume', // Title for the secondary Y-axis (volume)
        style: {
          color: 'var(--text-color)' // Secondary axis label color
        },
      },
      labels: {
        style: {
          color: 'var(--text-color)' // Labels color for volume axis
        }
      },
      opposite: true, // Place the volume axis on the right side
    }],
    series: [{
      name: 'Close', // Close price series
      data: prices.map((price) => price.close), // Map close prices to the series
      yAxis: 0, // Link to the first Y-axis (close prices)
      color: 'blue' // Color for close prices line
    }, {
      name: 'Volume', // Volume series
      data: prices.map((price) => price.volume), // Map volumes to the series
      yAxis: 1, // Link to the secondary Y-axis (volume)
      color: 'red' // Color for volume line
    }],
    legend: {
      itemStyle: {
        color: 'var(--hover-color)' // Legend item color
      },
      itemHoverStyle: {
        color: 'var(--text-color)' // Legend item hover color
      }
    },
    // Responsive rules for smaller screens
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500, // Only apply this rule when the width is less than or equal to 500px
        },
        chartOptions: {
          chart: {
            scrollablePlotArea: {
              minWidth: 500 // Ensure scrolling is enabled on smaller screens
            }
          }
        },
      }],
    },
  };

  return (
    <Container className="security-detail-container">
      <Typography variant="h4" component="h1" className="title">
        Securities
      </Typography>
      <Box className="detail-box">
        <Box className="detail-info-box">
          <Typography variant="body1">{security.ticker} - {security.securityName}</Typography>
          <br></br>
          <Typography variant="body1">Sector : {security.sector}</Typography>
          <Typography variant="body1">Country : {security.country}</Typography>
        </Box>
        <Box className="detail-chart-box">
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </Box>
      </Box>
      <Footer /> 
    </Container>
  );
}

export default SecurityDetail;
