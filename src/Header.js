import React, { useState } from 'react';
import { Layout, Menu, Dropdown, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const { Header } = Layout;

const CustomHeader = ({ userName }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={handleLogout}>
        Выйти
      </Menu.Item>
    </Menu>
  );

  return (
    <Header style={{ background: '#fff', padding: '0 20px' }}>
      <div className="logo" />
      <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']} style={{ float: 'left' }}>
        <Menu.Item key="1">
          <Link to="/reestr">Реестр</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/statistics">Статистика</Link>
        </Menu.Item>
      </Menu>
      {isLoggedIn && (
        <div style={{ float: 'right', marginRight: '20px' }}>
          <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
            <Button type="link" style={{ padding: '0', fontSize: '16px', color: '#1890ff' }}>
              {userName} {/* Отображаем имя пользователя */}
            </Button>
          </Dropdown>
        </div>
      )}
    </Header>
  );
};

export default CustomHeader;
