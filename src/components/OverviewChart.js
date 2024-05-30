import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { fetchData, getAllDates } from "../utills/common.utills.js";
import { SelectTimeFrame, OptTimeFrame } from '../styles/OverviewChartStyles';


// OverviewChart component that displays current stock data
const OverviewChart = () => {
  const [data, setData] = useState([]);
  const [timeframe, setTimeframe] = useState('1d');

  useEffect(() => {
    const dates = getAllDates();
    const period = 60;
    const precision = 'Minutes';
    let startTime;
    switch(timeframe) {
      case "1d": startTime = dates.yesterdayFormatted; break;
      case "1w": startTime = dates.lastWeekFormatted; break;
      case "1m": startTime = dates.lastMonthFormatted; break;
      default: startTime = "1d";
    };
    const endTime = dates.todayLastMinuteFormatted;
    const updateInterval = 60 * 1000;

    // Function for updating stock data:
    const updateData = () => {
      fetchData(period, precision, startTime, endTime).then(result => {
        setData(result.data.map(elm => {
          return {
            date: elm.Date,
            price: elm.Close
          }
        }));
      });
    };

    // Update stock data every "updateInterval" milliseconds:
    const intervalId = setInterval(updateData, updateInterval);
    updateData(); // Initial fetch
    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [timeframe]);

  return (
    <div>
      <SelectTimeFrame onChange={(e) => setTimeframe(e.target.value)}>
        <OptTimeFrame value="1d">1 Day</OptTimeFrame>
        <OptTimeFrame value="1w">1 Week</OptTimeFrame>
        <OptTimeFrame value="1m">1 Month</OptTimeFrame>
      </SelectTimeFrame>

      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line dataKey="price" type="monotone" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
};

export default OverviewChart;
