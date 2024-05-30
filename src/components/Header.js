import React, { useState, useEffect } from 'react';
import { HeaderContainer, Title, StockInfo } from '../styles/HeaderStyles';
import { fetchData, getAllDates, getStockData } from "../utills/common.utills.js";

const Header = () => {
  const [stockData, setStockData] = useState({
    currentPrice: '',
    priceChange: '',
    percentChange: '',
    lastUpdated: ''
  });

  useEffect(() => {
    const dates = getAllDates();
    const period = 60;
    const precision = 'Minutes';
    const startTime = dates.yesterdayFormatted;
    const endTime = dates.todayLastMinuteFormatted;
    const updateInterval = 30 * 60 * 1000;

    // Function for updating stock data:
    const updateStockData = () => {
      fetchData(period, precision, startTime, endTime).then(result => {
        setStockData(getStockData(result.data));
      });
    }
    // Update stock data every "updateInterval" milliseconds:
    const intervalId = setInterval(updateStockData, updateInterval);
    updateStockData(); // Initial update

    return () => clearInterval(intervalId); // Clear interval on component unmount
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
