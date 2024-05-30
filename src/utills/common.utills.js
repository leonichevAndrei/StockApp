import { format } from 'date-fns';
import axios from 'axios';

export const fetchData = async (period, precision, startTime, endTime, set) => {
  try {
    const identifier = 'AAPL.XNAS';
    const identifierType = 'Symbol';
    const adjustmentMethod = 'All';
    const includeExtended = 'False';
    const fields = 'ChartBars.StartDate,ChartBars.High,ChartBars.Low,ChartBars.StartTime,ChartBars.Open,ChartBars.Close,ChartBars.Volume';
    const apiUrl = `https://test.fxempire.com/api/v1/en/stocks/chart/candles?Identifier=${identifier}&IdentifierType=${identifierType}&AdjustmentMethod=${adjustmentMethod}&IncludeExtended=${includeExtended}&period=${period}&Precision=${precision}&StartTime=${encodeURIComponent(startTime)}&EndTime=${encodeURIComponent(endTime)}&_fields=${fields}`;

   return axios.get(apiUrl);
  } catch (error) {
    console.error('Error fetching stock data:', error);
  }
};

export const getAllDates = () => {
  const dateFormat = 'MM/dd/yyyy';
  const oneDayMilliseconds = 24 * 60 * 60 * 1000;
  // Get the current date and time
  const now = new Date();
  const todayFormatted = format(now, dateFormat);
  const todayLastMinuteFormatted = `${todayFormatted} 23:59`;
  // Get the date and time 24 hours ago
  const yesterday = new Date(now.getTime() - oneDayMilliseconds);
  const yesterdayFormatted = format(yesterday, dateFormat);
  // Get the date and time one week ago
  const lastWeek = new Date(now.getTime() - (7 * oneDayMilliseconds));
  const lastWeekFormatted = format(lastWeek, dateFormat);
  // Get the date and time 30 days ago
  const lastMonth = new Date(now.getTime() - (30 * oneDayMilliseconds));
  const lastMonthFormatted = format(lastMonth, dateFormat);
  return {
    todayFormatted, 
    todayLastMinuteFormatted,
    yesterdayFormatted,
    lastWeekFormatted,
    lastMonthFormatted
  }
}

export const getStockData = (data) => {
  const lastRecord = data[data.length - 1];
  const preLastRecord = data[data.length - 2];
  const priceChange = lastRecord.Close - preLastRecord.Close;
  return {
    currentPrice: lastRecord.Close,
    priceChange: priceChange.toFixed(2),
    percentChange: (priceChange / preLastRecord.Close * 100).toFixed(2),
    lastUpdated: lastRecord.Date
  };
}