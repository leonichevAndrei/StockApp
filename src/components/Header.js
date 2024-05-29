import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HeaderContainer, Title, StockInfo } from '../styles/HeaderStyles';

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
    <HeaderContainer>
      <Title>Apple Inc. (AAPL)</Title>
      <StockInfo>Current Price: {stockData.currentPrice}</StockInfo>
      <StockInfo>Price Change: {stockData.priceChange}</StockInfo>
      <StockInfo>Percent Change: {stockData.percentChange}%</StockInfo>
      <StockInfo>Last Updated: {stockData.lastUpdated}</StockInfo>
    </HeaderContainer>
  );
};

export default Header;
