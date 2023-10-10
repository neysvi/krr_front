import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker, Switch, Upload, Button } from 'antd';
import dayjs from 'dayjs';
import { InboxOutlined } from '@ant-design/icons';


const { Option } = Select;

const EditModalForm = ({ visible, onCancel, onSave, currentData }) => {
  const [form] = Form.useForm();
  const [ctBeforeOperationFile, setCtBeforeOperationFile] = useState(null);


  useEffect(() => {
    if (currentData) {
      form.setFieldsValue({
        ...currentData,
        birth_date: dayjs(currentData.birth_date),
        operation_date: dayjs(currentData.operation_date),
        gender: currentData.gender === 1 ? 'Ж' : 'М',
      });
    }
  }, [currentData, form]);

    const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const dataToSend = { ...values };
        
        dataToSend.gender = dataToSend.gender === '"Ж"' ? 1 : 0;
        
        if (ctBeforeOperationFile) {
          dataToSend.ct_before_operation = ctBeforeOperationFile;
        }

        for (const key in dataToSend) {
          if (typeof dataToSend[key] === 'string') {
            try {
              dataToSend[key] = JSON.parse(dataToSend[key]);
            } catch (error) {
            }
          }
        }

        onSave(currentData.id, dataToSend);
        form.resetFields();
        setCtBeforeOperationFile(null); // Сброс файла после отправки
      })
      .catch((info) => {
        console.log('Ошибка валидации:', info);
      });
  };

  return (
    <Modal
      visible={visible}
      title="Редактировать данные"
      onCancel={onCancel}
      onOk={handleOk}
      destroyOnClose={true}
    >
      <Form form={form} layout="vertical" name="editForm">
        <Form.Item
          name="full_name"
          label="ФИО"
          rules={[{ required: true, message: 'Пожалуйста, введите ФИО' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Пол"
          rules={[{ required: true, message: 'Выберите пол' }]}
        >
          <Select>
            <Option value="1">Ж</Option>
            <Option value="0">М</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="birth_date"
          label="Дата рождения"
          rules={[{ required: true, message: 'Укажите дату рождения' }]}
        >
          <DatePicker format="DD-MM-YYYY" />
        </Form.Item>
        <Form.Item
          name="age"
          label="Возраст"
          rules={[{ required: true, message: 'Укажите возраст' }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="diagnosis_mkb"
          label="Диагноз по МКБ"
          rules={[{ required: true, message: 'Укажите диагноз по МКБ' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="operation_date"
          label="Дата операции"
          rules={[{ required: true, message: 'Укажите дату операции' }]}
        >
          <DatePicker format="DD-MM-YYYY" />
        </Form.Item>
        <Form.Item
          name="operation_name"
          label="Название операции"
          rules={[{ required: true, message: 'Укажите название операции' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="intervention_level"
          label="Уровень вмешательства"
          rules={[{ required: true, message: 'Укажите уровень вмешательства' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="time_between_primary_and_revision_operation"
          label="Время между первичной и ревизионной операцией"
          rules={[{ required: true, message: 'Укажите время' }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="neurological_deficit"
          label="Неврологический дефицит"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item
          name="charlson_index"
          label="Индекс коморбидности Чарлсона"
          rules={[{ required: true, message: 'Укажите индекс' }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="vash_before_operation"
          label="ВАШ (визуально-аналоговая спина) до операции"
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="vash_1_month_after_operation"
          label="ВАШ (визуально-аналоговая спина) 1 месяц после операции"
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="vash_3_months_after_operation"
          label="ВАШ (визуально-аналоговая спина) 3 месяца после операции"
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="vash_6_months_after_operation"
          label="ВАШ (визуально-аналоговая спина) 6 месяцев после операции"
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="vash_12_months_after_operation"
          label="ВАШ (визуально-аналоговая спина) 12 месяцев после операции"
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="odi_before_operation"
          label="ODI до операции"
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="odi_1_month_after_operation"
          label="ODI 1 месяц после операции"
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="odi_3_months_after_operation"
          label="ODI 3 месяца после операции"
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="odi_6_months_after_operation"
          label="ODI 6 месяцев после операции"
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="odi_12_months_after_operation"
          label="ODI 12 месяцев после операции"
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="sf_before_operation"
          label="SF 36 до операции"
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="sf_1_month_after_operation"
          label="SF 36 1 месяц после операции"
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="sf_3_months_after_operation"
          label="SF 36 3 месяца после операции"
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="sf_6_months_after_operation"
          label="SF 36 6 месяцев после операции"
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="sf_12_months_after_operation"
          label="SF 36 12 месяцев после операции"
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item label="CT до операции" name="ct_before_operation">
          <Upload
            accept=".rar,.zip"
            customRequest={({ file, onSuccess }) => {
              setTimeout(() => {
                onSuccess('ok');
              }, 0);
            }}
            onChange={(info) => {
              if (info.file.status === 'done' && info.file.originFileObj) {
                setCtBeforeOperationFile(info.file.originFileObj);
              }
            }}
          >
            <Button icon={<InboxOutlined />}>Загрузить CT-скан</Button>
          </Upload>
        </Form.Item>
        <Form.Item label="CRB" name="crb">
          <Input type="number" />
        </Form.Item>
        <Form.Item label="Остеопороз" name="osteoporosis">
          <Input type="number" />
        </Form.Item>
        <Form.Item label="Рост" name="height">
          <Input type="number" />
        </Form.Item>
        <Form.Item label="Вес" name="weight">
          <Input type="number" />
        </Form.Item>
        <Form.Item label="ИМТ" name="bmi">
          <Input type="number" />
        </Form.Item>
        <Form.Item label="Результат интроперационного культурного исследования" name="intraoperative_culture_result">
          <Switch />
        </Form.Item>
        <Form.Item label="ASA риск" name="asa_risk">
          <Input type="number" />
        </Form.Item>
        <Form.Item label="Группа крови" name="blood_group">
          <Select >
            <Option value={3}>IV</Option>
            <Option value={2}>III</Option>
            <Option value={1}>II</Option>
            <Option value={0}>I</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Rh-фактор" name="rh_factor">
          <Switch />
        </Form.Item>
        <Form.Item label="Осложнения" name="complications">
          <Input />
        </Form.Item>
        <Form.Item label="Шкала McNab" name="mcnab_scale">
          <Input type="number" />
        </Form.Item>
        <Form.Item label="Начальное количество тромбоцитов" name="initial_platelet_level">
          <Input type="number" />
        </Form.Item>
        <Form.Item label="Конечное количество тромбоцитов" name="final_platelet_level">
          <Input type="number" />
        </Form.Item>
        <Form.Item label="Объем тромбогеля в конце операции" name="final_thrombogel_volume">
          <Input type="number" />
        </Form.Item>
        <Form.Item label="Аллоиммунитет" name="alloimmunity" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModalForm;
