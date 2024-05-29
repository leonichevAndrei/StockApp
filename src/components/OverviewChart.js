import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

// OverviewChart component that displays current stock data
const OverviewChart = () => {
  const [data, setData] = useState([]);
  const [timeframe, setTimeframe] = useState('1d');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = 'cpbpsl1r01qqbq2adk20cpbpsl1r01qqbq2adk2g';
        const symbol = 'AAPL';
        
        const response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`);
        const quoteData = response.data;

        const currentTime = new Date().toLocaleString();
        const newData = {
          date: currentTime,
          price: quoteData.c
        };

        setData(prevData => [...prevData, newData]);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    // Fetch data every minute
    const intervalId = setInterval(fetchData, 60000);
    fetchData(); // Initial fetch

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [timeframe]);

  return (
    <div>
      <select onChange={(e) => setTimeframe(e.target.value)}>
        <option value="1d">1 Day</option>
        <option value="1w">1 Week</option>
        <option value="1m">1 Month</option>
      </select>
      <LineChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
};

export default OverviewChart;
