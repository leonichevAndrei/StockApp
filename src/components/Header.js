
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
      const response = await axios.get('https://test.fxempire.com/api/v1/en/stocks/chart/candles?Identifier=AAPL.XNAS&IdentifierType=Symbol&AdjustmentMethod=All&IncludeExtended=False&period=30&Precision=Minutes&StartTime=02/22/2023&EndTime=03/01/2023%2023:59&_fields=ChartBars.StartDate,ChartBars.High,ChartBars.Low,ChartBars.StartTime,ChartBars.Open,ChartBars.Close,ChartBars.Volume');
      const data = response.data;
      setStockData({
        currentPrice: data.currentPrice,
        priceChange: data.priceChange,
        percentChange: data.percentChange,
        lastUpdated: new Date().toLocaleString()
      });
    };
    fetchData();
  }, []);

  return (
    <header>
      <h1>Apple Inc. (AAPL)</h1>
      <p>Current Price: {stockData.currentPrice}</p>
      <p>Price Change: {stockData.priceChange}</p>
      <p>Percent Change: {stockData.percentChange}</p>
      <p>Last Updated: {stockData.lastUpdated}</p>
    </header>
  );
};

export default Header;
