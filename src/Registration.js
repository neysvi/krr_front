import React from 'react';
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
        credentials: 'include',
      });

      if (response.status === 201) {
        // Успешная регистрация, перенаправляем пользователя на страницу авторизации
        navigate('/login');
      } else {
        const data = await response.json();
        console.error(data.message);
      }
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  };

  const validateUsername = (rule, value, callback) => {
    if (!value) {
      callback('Введите имя пользователя');
    } else {
      callback();
    }
  };

  const validateEmail = (rule, value, callback) => {
    if (!value) {
      callback('Введите адрес электронной почты');
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
        name="registration"
        onFinish={onFinish}
        layout="vertical"
        initialValues={{ remember: true }}
      >
        <Form.Item
          label="Имя пользователя"
          name="user_name"
          rules={[
            { validator: validateUsername },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Адрес электронной почты"
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
          <Button type="primary" htmlType="submit">
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Registration;
