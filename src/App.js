import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import CustomHeader from './Header';
import PatientsTable from './PatientsTable';
import StatisticsTable from './StatisticsTable';
import Login from './Login';
import Registration from './Registration';

const { Content } = Layout;

function App() {
  const location = useLocation();
  const shouldShowHeader = !location.pathname.startsWith('/login') && !location.pathname.startsWith('/registration');
  const [userName, setUserName] = useState('');

  // проверка Local Storage при загрузке компонента
  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  return (
    <Layout>
      {shouldShowHeader && <CustomHeader userName={userName} />}
      <Content>
        <Routes>
          <Route path="/" element={<PatientsTable />} />
          <Route path="/reestr" element={<PatientsTable />} />
          <Route path="/statistics" element={<StatisticsTable />} />
          <Route path="/registration" element={<Registration/>} />
          <Route
            path="/login"
            element={<Login setUserName={setUserName} />} // Передаем функцию для установки имени пользователя
          />
        </Routes>
      </Content>
    </Layout>
  );
}

export default App;
