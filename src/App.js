import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import CustomHeader from './Header';
import PatientsTable from './PatientsTable';
import StatisticsTable from './StatisticsTable';
import Login from './Login';

const { Content } = Layout;

const App = () => {
  const location = useLocation();

  const shouldShowHeader = !location.pathname.startsWith('/login');

  return (
    <Layout>
      {shouldShowHeader && <CustomHeader />}
      <Content>
        <Routes>
          <Route path="/" element={<PatientsTable />} />
          <Route path="/reestr" element={<PatientsTable />} />
          <Route path="/statistics" element={<StatisticsTable />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Content>
    </Layout>
  );
};

export default App;
