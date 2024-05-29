import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Header component that displays static stock data
const Header = () => {
  const [stockData, setStockData] = useState({
    currentPrice: '',
    priceChange: '',
    percentChange: '',
    lastUpdated: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = 'M06Q1IOY9CQ3NU8M'; // Ваш API ключ
        const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=AAPL&interval=5min&apikey=${apiKey}`);
        const data = response.data;
        const lastRefreshed = data['Meta Data']['3. Last Refreshed'];
        const lastData = data['Time Series (5min)'][lastRefreshed];
        setStockData({
          currentPrice: lastData['4. close'],
          priceChange: (lastData['4. close'] - lastData['1. open']).toFixed(2),
          percentChange: (((lastData['4. close'] - lastData['1. open']) / lastData['1. open']) * 100).toFixed(2),
          lastUpdated: new Date(lastRefreshed).toLocaleString()
        });
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <header>
      <h1>Apple Inc. (AAPL)</h1>
      <p>Current Price: {stockData.currentPrice}</p>
      <p>Price Change: {stockData.priceChange}</p>
      <p>Percent Change: {stockData.percentChange}%</p>
      <p>Last Updated: {stockData.lastUpdated}</p>
    </header>
  );
};

export default Header;