
import React, { useState } from 'react';
import OverviewChart from './OverviewChart';

// TabComponent that allows switching between Overview Chart and Historical Data
const TabComponent = () => {
  const [selectedTab, setSelectedTab] = useState('overview');

  return (
    <div>
      <button onClick={() => setSelectedTab('overview')}>Overview Chart</button>
      <button onClick={() => setSelectedTab('historical')}>Historical Data (Placeholder)</button>
      {selectedTab === 'overview' && <OverviewChart />}
      {selectedTab === 'historical' && <p>Historical Data Table Placeholder</p>}
    </div>
  );
};

export default TabComponent;
