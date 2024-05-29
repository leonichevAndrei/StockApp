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
        const apiKey = 'cpbpsl1r01qqbq2adk20cpbpsl1r01qqbq2adk2g';
        const symbol = 'AAPL';
        const response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`);
        const data = response.data;
        setStockData({
          currentPrice: data.c,
          priceChange: data.d,
          percentChange: data.dp,
          lastUpdated: new Date().toLocaleString()
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
