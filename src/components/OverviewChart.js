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
        const apiKey = 'M06Q1IOY9CQ3NU8M'; // Ваш API ключ
        let interval = '5min';
        
        if (timeframe === '1d') {
          interval = '5min';
        } else if (timeframe === '1w') {
          interval = '30min';
        } else if (timeframe === '1m') {
          interval = '60min';
        }

        const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=AAPL&interval=${interval}&apikey=${apiKey}`);
        const data = response.data['Time Series (5min)'];

        const chartData = Object.keys(data).map(key => ({
          date: new Date(key).toLocaleString(),
          price: data[key]['4. close']
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