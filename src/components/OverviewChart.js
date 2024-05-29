import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

// OverviewChart component that displays stock data over a selected timeframe
const OverviewChart = () => {
  const [data, setData] = useState([]);
  const [timeframe, setTimeframe] = useState('1d');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = 'cpbpsl1r01qqbq2adk20cpbpsl1r01qqbq2adk2g'; // Ваш API ключ
        const symbol = 'AAPL';
        let resolution = '1';

        if (timeframe === '1d') {
          resolution = '1';
        } else if (timeframe === '1w') {
          resolution = '5';
        } else if (timeframe === '1m') {
          resolution = '60';
        }

        const response = await axios.get(`https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=${resolution}&from=1615298999&to=1615302599&token=${apiKey}`);
        const data = response.data;

        const chartData = data.t.map((timestamp, index) => ({
          date: new Date(timestamp * 1000).toLocaleString(),
          price: data.c[index]
        }));

        setData(chartData);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };
    fetchData();
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
