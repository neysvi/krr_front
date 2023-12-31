import React from 'react';
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUserName }) => { 
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
        credentials: 'include', 
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        localStorage.setItem('userName', data.username);
        setUserName(data.username); 
        navigate('/reestr');
      } else {
        const data = await response.json();
        console.error(data.message);
      }     
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  };

  const validateEmail = (rule, value, callback) => {
    if (!value) {
      callback('Введите имя пользователя');
    } else {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailRegex.test(value)) {
        callback('Введите корректный адрес электронной почты');
      } else {
        callback();
      }
    }
  };

  return (
    <div className="login-container">
      <Form
        name="login"
        onFinish={onFinish}
        layout="vertical"
        initialValues={{ remember: true }}
      >
        <Form.Item
          label="Имя пользователя"
          name="user_email"
          rules={[
            { validator: validateEmail },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="user_password"
          rules={[{ required: true, message: 'Введите пароль' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
        <div className="login-buttons">
          <Button type="primary" htmlType="submit">
            Войти
          </Button>

          {/* Кнопка регистрации */}
          <Button type="default" onClick={() => navigate('/registration')} style={{ marginTop: '10px' }} >
            Зарегистрироваться
          </Button>
        </div>
      </Form.Item>
    </Form>
  </div>
  );
};

export default Login;
