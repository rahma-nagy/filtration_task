import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const TransactionChart = ({ customerId }) => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/transactions?customerId=${customerId}`);
        const transactions = response.data;

        const dataByDate = transactions.reduce((acc, transaction) => {
          const date = transaction.date;
          if (!acc[date]) {
            acc[date] = 0;
          }
          acc[date] += transaction.amount;
          return acc;
        }, {});

        const dates = Object.keys(dataByDate);
        const amounts = Object.values(dataByDate);

        setChartData({
          labels: dates,
          datasets: [
            {
              label: 'Total Transaction Amount per Day',
              data: amounts,
              fill: false,
              borderColor: 'rgba(75,192,192,1)',
              tension: 0.1,
            },
          ],
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (customerId) {
      fetchData();
    }
  }, [customerId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Transaction Chart</h2>
      {chartData.labels && chartData.labels.length > 0 ? (
        <Line data={chartData} options={{
          scales: {
            x: {
              title: {
                display: true,
                text: 'Date',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Amount',
              },
            },
          },
        }} />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default TransactionChart;
