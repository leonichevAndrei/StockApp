import React, { useState } from 'react';
import OverviewChart from './OverviewChart';
import { TabContainer, TabButton } from '../styles/TabComponentStyles';

const TabComponent = () => {
  const [selectedTab, setSelectedTab] = useState('overview');

  return (
    <TabContainer>
      <div>
        <TabButton onClick={() => setSelectedTab('overview')}>Overview Chart</TabButton>
        <TabButton onClick={() => setSelectedTab('historical')}>Historical Data</TabButton>
      </div>
      {selectedTab === 'overview' && <OverviewChart />}
      {selectedTab === 'historical' && <p>Historical Data Table Placeholder</p>}
    </TabContainer>
  );
};

export default TabComponent;
