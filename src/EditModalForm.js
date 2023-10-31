import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker, Switch, Upload, Button } from 'antd';
import dayjs from 'dayjs';
import { InboxOutlined } from '@ant-design/icons';


const { Option } = Select;

const EditModalForm = ({ visible, onCancel, onSave, currentData }) => {
  const [form] = Form.useForm();
  const [ctBeforeOperationFile, setCtBeforeOperationFile] = useState(null);
  const [setCt1MonOperation, setCt1MonOperationFile] = useState(null);
  const [setCt3MonOperation, setCt3MonOperationFile] = useState(null);
  const [setCt6MonOperation, setCt6MonOperationFile] = useState(null);
  const [setCt12MonOperation, setCt12MonOperationFile] = useState(null);

  useEffect(() => {
    if (currentData) {
      const isDateValid = date => dayjs(date).isValid();
  
      form.setFieldsValue({
        ...currentData,
        birth_date: isDateValid(currentData.birth_date) ? dayjs(currentData.birth_date) : null,
        operation_date: isDateValid(currentData.operation_date) ? dayjs(currentData.operation_date) : null,
      });
    }
  }, [currentData, form]);
  

    const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const dataToSend = { ...values };
        
        
        if (ctBeforeOperationFile) {
          dataToSend.ct_before_operation = ctBeforeOperationFile;
        }
        if (setCt1MonOperation) {
          dataToSend.ct_1_month_after_operation = setCt1MonOperation;
        }
        if (setCt3MonOperation) {
          dataToSend.ct_3_month_after_operation = setCt3MonOperation;
        }
        if (setCt6MonOperation) {
          dataToSend.ct_6_month_after_operation = setCt6MonOperation;
        }
        if (setCt12MonOperation) {
          dataToSend.ct_12_month_after_operation = setCt12MonOperation;
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
        setCt1MonOperationFile(null);
        setCt3MonOperationFile(null);
        setCt6MonOperationFile(null);
        setCt12MonOperationFile(null);
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
      okText="Сохранить"
    >
      <Form form={form} name="editForm">
        <Form.Item
          name="full_name"
          label="ФИО"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Пол"
        >
          <Select>
            <Option value={1}>Ж</Option>
            <Option value={0}>М</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="birth_date"
          label="Дата рождения"
        >
          <DatePicker format="DD-MM-YYYY" />
        </Form.Item>
        <Form.Item
          name="age"
          label="Возраст"
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item 
          name="height"
          label="Рост" 
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item 
          name="weight"
          label="Вес" 
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="diagnosis_mkb"
          label="Диагноз по МКБ"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="operation_date"
          label="Дата операции"
        >
          <DatePicker format="DD-MM-YYYY" />
        </Form.Item>
        <Form.Item
          name="operation_name"
          label="Название операции"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="intervention_level"
          label="Уровень вмешательства"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="time_between_primary_and_revision_operation"
          label="Время между первичной и ревизионной операцией"
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="neurological_deficit"
          label="Неврологический дефицит"
        >
          <Select>
            <Option value={1}>Да</Option>
            <Option value={0}>Нет</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="charlson_index"
          label="Индекс коморбидности Чарлсона"
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="vash_before_operation"
          label="ВАШ (визуально-аналоговая спина) до операции"
        >
          <Input type="number" min="0" max="10" />
        </Form.Item>
        <Form.Item
          name="vash_1_month_after_operation"
          label="ВАШ через 1 месяц после операции"
        >
          <Input type="number" min="0" max="10" />
        </Form.Item>
        <Form.Item
          name="vash_3_months_after_operation"
          label="ВАШ через 3 месяца после операции"
        >
          <Input type="number" min="0" max="10" />
        </Form.Item>
        <Form.Item
          name="vash_6_months_after_operation"
          label="ВАШ через 6 месяцев после операции"
        >
          <Input type="number" min="0" max="10" />
        </Form.Item>
        <Form.Item
          name="vash_12_months_after_operation"
          label="ВАШ через 12 месяцев после операции"
        >
          <Input type="number" min="0" max="10" />
        </Form.Item>
        <Form.Item
          name="odi_before_operation"
          label="ODI до операции"
        >
          <Input type="number" min="0" max="100" />
        </Form.Item>
        <Form.Item
          name="odi_1_month_after_operation"
          label="ODI через 1 месяц после операции"
        >
          <Input type="number" min="0" max="100" />
        </Form.Item>
        <Form.Item
          name="odi_3_months_after_operation"
          label="ODI через 3 месяца после операции"
        >
          <Input type="number" min="0" max="100" />
        </Form.Item>
        <Form.Item
          name="odi_6_months_after_operation"
          label="ODI через 6 месяцев после операции"
        >
          <Input type="number" min="0" max="100" />
        </Form.Item>
        <Form.Item
          name="odi_12_months_after_operation"
          label="ODI через 12 месяцев после операции"
        >
          <Input type="number" min="0" max="100" />
        </Form.Item>
        <Form.Item
          name="sf_before_operation"
          label="SF-36 до операции"
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="sf_1_month_after_operation"
          label="SF-36 через 1 месяц после операции"
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="sf_3_months_after_operation"
          label="SF-36 через 3 месяца после операции"
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="sf_6_months_after_operation"
          label="SF-36 через 6 месяцев после операции"
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="sf_12_months_after_operation"
          label="SF-36 через 12 месяцев после операции"
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item name="ct_before_operation" label="КТ (компьютерная томография) до операции" >
          <Upload
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
            <Button icon={<InboxOutlined />}>Загрузить</Button>
          </Upload>
        </Form.Item>
        <Form.Item name="ct_1_month_after_operation" label="КТ через 1 месяц после операции" >
          <Upload
            customRequest={({ file, onSuccess }) => {
              setTimeout(() => {
                onSuccess('ok');
              }, 0);
            }}
            onChange={(info) => {
              if (info.file.status === 'done' && info.file.originFileObj) {
                setCt1MonOperationFile(info.file.originFileObj);
              }
            }}
          >
            <Button icon={<InboxOutlined />}>Загрузить</Button>
          </Upload>
        </Form.Item>
        <Form.Item name="ct_3_month_after_operation" label="КТ через 3 месяца после операции" >
          <Upload
            customRequest={({ file, onSuccess }) => {
              setTimeout(() => {
                onSuccess('ok');
              }, 0);
            }}
            onChange={(info) => {
              if (info.file.status === 'done' && info.file.originFileObj) {
                setCt3MonOperationFile(info.file.originFileObj);
              }
            }}
          >
            <Button icon={<InboxOutlined />}>Загрузить</Button>
          </Upload>
        </Form.Item>
        <Form.Item name="ct_6_month_after_operation" label="КТ через 6 месяцев после операции" >
          <Upload
            customRequest={({ file, onSuccess }) => {
              setTimeout(() => {
                onSuccess('ok');
              }, 0);
            }}
            onChange={(info) => {
              if (info.file.status === 'done' && info.file.originFileObj) {
                setCt6MonOperationFile(info.file.originFileObj);
              }
            }}
          >
            <Button icon={<InboxOutlined />}>Загрузить</Button>
          </Upload>
        </Form.Item>
        <Form.Item name="ct_12_month_after_operation" label="КТ через 12 месяцев после операции" >
          <Upload
            customRequest={({ file, onSuccess }) => {
              setTimeout(() => {
                onSuccess('ok');
              }, 0);
            }}
            onChange={(info) => {
              if (info.file.status === 'done' && info.file.originFileObj) {
                setCt12MonOperationFile(info.file.originFileObj);
              }
            }}
          >
            <Button icon={<InboxOutlined />}>Загрузить</Button>
          </Upload>
        </Form.Item>
        <Form.Item name="crb" label="СРБ (с-реактивный белок) до операции" >
          <Input type="number" />
        </Form.Item>
        <Form.Item 
          name="osteoporosis" 
          label="Остеопороз (HU)" 
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item 
          name="intraoperative_culture_result"
          label="Интраоперационный посев" 
        >
          <Select>
            <Option value={1}>Положительный</Option>
            <Option value={0}>Отрицательный</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="pathogen"
          label="Интраоперационный посев (возбудитель)"
        >
          <Input />
        </Form.Item>
        <Form.Item 
          name="asa_risk"
          label="Риск по ASA" 
        >
          <Select>
            <Option value={1}>I</Option>
            <Option value={2}>II</Option>
            <Option value={3}>III</Option>
            <Option value={4}>IV</Option>
            <Option value={5}>V</Option>
          </Select>
        </Form.Item>
        <Form.Item 
          name="blood_group"
          label="Группа крови" 
        >
          <Select>
            <Option value={1}>I</Option>
            <Option value={2}>II</Option>
            <Option value={3}>III</Option>
            <Option value={4}>IV</Option>
          </Select>
        </Form.Item>
        <Form.Item 
          name="rh_factor"
          label="Резус-фактор"
        >
        <Select>
            <Option value={1}>RH+</Option>
            <Option value={0}>RH-</Option>
          </Select>
        </Form.Item>
        <Form.Item 
          name="complications"
          label="Осложнения" 
        >
          <Input />
        </Form.Item>
        <Form.Item 
          name="mcnab_scale"
          label="Шкала McNab" 
        >
          <Select>
            <Option value={5}>Отлично</Option>
            <Option value={4}>Хорошо</Option>
            <Option value={3}>Удовлетворительно</Option>
            <Option value={2}>Неудовлетворительно</Option>
          </Select>
        </Form.Item>
        <Form.Item 
          name="initial_platelet_level"
          label="Исходный уровень тромбоцитов, *109/л" 
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item 
          name="final_platelet_level"
          label="Конечный уровень тромбоцитов, *109/л" 
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item 
          name="final_thrombogel_volume"
          label="Конечный объем тромбогеля, мл" 
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item 
          name="alloimmunity" 
          label="Аллокость"
        >
          <Select>
            <Option value={1}>Да</Option>
            <Option value={0}>Нет</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModalForm;
