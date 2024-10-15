import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';

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
  const { symbol } = useParams();

  const { loading: loadingTicker, error: errorTicker, data: dataTicker } = useQuery(GET_SECURITY_BY_TICKER, {
    variables: { ticker: symbol },
  });

  const security_id = dataTicker?.getSecurityByTicker?.id;

  const { loading, error, data } = useQuery(GET_PRICES_BY_SECURITY_ID, {
    variables: { security_id },
    skip: !security_id,
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleString('default', { month: 'short' })} '${date.getFullYear().toString().slice(-2)}`; 
  };

  if (loadingTicker || loading) return <p>Loading...</p>;
  if (errorTicker) return <p>Error: {errorTicker.message}</p>;
  if (error) return <p>Error: {error.message}</p>;

  const security = dataTicker.getSecurityByTicker;
  const prices = data.getPricesBySecurityId;

  const chartOptions = {
    chart: {
        type: 'line',
        scrollablePlotArea: {
            minWidth: 500,
            scrollPositionX: 1
        }
    },
    title: {
        text: `Prices for ${security.securityName}`
    },
    xAxis: {
        categories: prices.map((price) => formatDate(price.date)),
        scrollbar: {
            enabled: true
        }
    },
    yAxis: [{
        title: {
            text: 'Close'
        }
    }, {
        title: {
            text: 'Volume'
        },
        opposite: true
    }],
    series: [{
        name: 'Close',
        data: prices.map((price) => price.close),
        yAxis: 0
    }, {
        name: 'Volume',
        data: prices.map((price) => price.volume),
        yAxis: 1
    }],
    responsive: {
        rules: [{
            condition: {
                maxWidth: 500,
            },
            chartOptions: {
                chart: {
                    scrollablePlotArea: {
                        minWidth: 500
                    }
                },
                xAxis: {
                    scrollbar: {
                        enabled: true
                    }
                }
            },
        }],
    },
};


  return (
    <div>
      <h2>{security.securityName}</h2>
      <p>Symbol: {security.ticker}</p>
      <p>Sector: {security.sector}</p>
      <p>Country: {security.country}</p>
      <p>Trend: {security.trend}</p>
      <h3>Prices</h3>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
}

export default SecurityDetail;
