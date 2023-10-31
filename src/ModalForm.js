import React, { useState, useRef } from 'react';
import { Modal, Form, Input, Button, DatePicker, Select, Switch, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import ruRU from 'antd/lib/locale/ru_RU';

const { Option } = Select;

const ModalForm = ({ visible, onCancel, onSave }) => {
  const [form] = Form.useForm();
  const firstErrorRef = useRef(null);

  const [full_name, setFullName] = useState('');
  const [gender, setGender] = useState(null);
  const [birth_date, setBirthDate] = useState(null);
  const [age, setAge] = useState(null);
  const [diagnosis_mkb, setDiagnosisMKB] = useState('');
  const [operation_date, setOperationDate] = useState(null);
  const [operation_name, setOperationName] = useState('');
  const [intervention_level, setInterventionLevel] = useState('');
  const [time_between_primary_and_revision_operation, setTimeBetweenPrimaryAndRevisionOperation] = useState(null);
  const [neurological_deficit, setNeurologicalDeficit] = useState(null);
  const [charlson_index, setCharlsonIndex] = useState(null);
  const [vash_before_operation, setVashBeforeOperation] = useState(null);
  const [vash_1_month_after_operation, setVash1MonthAfterOperation] = useState(null);
  const [vash_3_months_after_operation, setVash3MonthsAfterOperation] = useState(null);
  const [vash_6_months_after_operation, setVash6MonthsAfterOperation] = useState(null);
  const [vash_12_months_after_operation, setVash12MonthsAfterOperation] = useState(null);
  const [odi_before_operation, setOdiBeforeOperation] = useState(null);
  const [odi_1_month_after_operation, setOdi1MonthAfterOperation] = useState(null);
  const [odi_3_months_after_operation, setOdi3MonthsAfterOperation] = useState(null);
  const [odi_6_months_after_operation, setOdi6MonthsAfterOperation] = useState(null);
  const [odi_12_months_after_operation, setOdi12MonthsAfterOperation] = useState(null);
  const [sf_before_operation, setSfBeforeOperation] = useState(null);
  const [sf_1_month_after_operation, setSf1MonthAfterOperation] = useState(null);
  const [sf_3_months_after_operation, setSf3MonthsAfterOperation] = useState(null);
  const [sf_6_months_after_operation, setSf6MonthsAfterOperation] = useState(null);
  const [sf_12_months_after_operation, setSf12MonthsAfterOperation] = useState(null);
  const [ct_before_operation, setCtBeforeOperation] = useState('');
  const [ct_1_month_after_operation, setCt1MonOperation] = useState('');
  const [ct_3_months_after_operation, setCt3MonOperation] = useState('');
  const [ct_6_months_after_operation, setCt6MonOperation] = useState('');
  const [ct_12_months_after_operation, setCt12MonOperation] = useState('');
  const [crb, setCrb] = useState(null);
  const [osteoporosis, setOsteoporosis] = useState(null);
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [intraoperative_culture_result, setIntraoperativeCultureResult] = useState(null);
  const [pathogen, setPathogen] = useState('');
  const [asa_risk, setASARisk] = useState(null);
  const [blood_group, setBloodGroup] = useState(null);
  const [rh_factor, setRhFactor] = useState(null);
  const [complications, setComplications] = useState('');
  const [mcnab_scale, setMcnabScale] = useState(null);
  const [initial_platelet_level, setInitialPlateletLevel] = useState(null);
  const [final_platelet_level, setFinalPlateletLevel] = useState(null);
  const [final_thrombogel_volume, setFinalThrombogelVolume] = useState(null);
  const [alloimmunity, setAlloimmunity] = useState(null);

  const onFinish = () => {
    form.validateFields()
      .then(() => {
        const formData = new FormData();
        formData.append('full_name', full_name);
        formData.append('gender', gender);
        formData.append('birth_date', birth_date);
        formData.append('age', age);
        formData.append('diagnosis_mkb', diagnosis_mkb);
        formData.append('operation_date', operation_date);
        formData.append('operation_name', operation_name);
        formData.append('intervention_level', intervention_level);
        formData.append('time_between_primary_and_revision_operation', time_between_primary_and_revision_operation);
        formData.append('neurological_deficit', neurological_deficit);
        formData.append('charlson_index', charlson_index);
        formData.append('vash_before_operation', vash_before_operation);
        formData.append('vash_1_month_after_operation', vash_1_month_after_operation);
        formData.append('vash_3_months_after_operation', vash_3_months_after_operation);
        formData.append('vash_6_months_after_operation', vash_6_months_after_operation);
        formData.append('vash_12_months_after_operation', vash_12_months_after_operation);
        formData.append('odi_before_operation', odi_before_operation);
        formData.append('odi_1_month_after_operation', odi_1_month_after_operation);
        formData.append('odi_3_months_after_operation', odi_3_months_after_operation);
        formData.append('odi_6_months_after_operation', odi_6_months_after_operation);
        formData.append('odi_12_months_after_operation', odi_12_months_after_operation);
        formData.append('sf_before_operation', sf_before_operation);
        formData.append('sf_1_month_after_operation', sf_1_month_after_operation);
        formData.append('sf_3_months_after_operation', sf_3_months_after_operation);
        formData.append('sf_6_months_after_operation', sf_6_months_after_operation);
        formData.append('sf_12_months_after_operation', sf_12_months_after_operation);
        formData.append('ct_before_operation', ct_before_operation);
        formData.append('ct_1_month_after_operation', ct_1_month_after_operation);
        formData.append('ct_3_months_after_operation', ct_3_months_after_operation);
        formData.append('ct_6_months_after_operation', ct_6_months_after_operation);
        formData.append('ct_12_months_after_operation', ct_12_months_after_operation);
        formData.append('crb', crb);
        formData.append('osteoporosis', osteoporosis);
        formData.append('height', height);
        formData.append('weight', weight);
        formData.append('intraoperative_culture_result', intraoperative_culture_result);
        formData.append('pathogen', pathogen);
        formData.append('asa_risk', asa_risk);
        formData.append('blood_group', blood_group);
        formData.append('rh_factor', rh_factor);
        formData.append('complications', complications);
        formData.append('mcnab_scale', mcnab_scale);
        formData.append('initial_platelet_level', initial_platelet_level);
        formData.append('final_platelet_level', final_platelet_level);
        formData.append('final_thrombogel_volume', final_thrombogel_volume);
        formData.append('alloimmunity', alloimmunity);

        onSave(formData);
        form.resetFields();
      })
      .catch((error) => {
        if (firstErrorRef.current) {
          firstErrorRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      });
  };


  return (
    <Modal
      visible={visible}
      title="Добавить данные"
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          name="full_name"
          label="ФИО"
        >
          <Input value={full_name} onChange={(e) => setFullName(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Пол"
        >
          <Select value={gender} onChange={(value) => setGender(value)}>
            <Option value={1}>Ж</Option>
            <Option value={0}>М</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="birth_date"
          label="Дата рождения"
        >
          <DatePicker locale={ruRU} format="DD-MM-YYYY" value={birth_date} onChange={(date) => setBirthDate(date)} />
        </Form.Item>
        <Form.Item
          name="age"
          label="Возраст"
        >
          <Input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="height"
          label="Рост"
        >
          <Input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="weight"
          label="Вес"
        >
          <Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="diagnosis_mkb"
          label="Диагноз по МКБ"
        >
          <Input value={diagnosis_mkb} onChange={(e) => setDiagnosisMKB(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="operation_date"
          label="Дата операции"
        >
          <DatePicker format="DD-MM-YYYY" value={operation_date} onChange={(date) => setOperationDate(date)} />
        </Form.Item>
        <Form.Item
          name="operation_name"
          label="Название операции"
        >
          <Input value={operation_name} onChange={(e) => setOperationName(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="intervention_level"
          label="Уровень вмешательства"
        >
          <Input value={intervention_level} onChange={(e) => setInterventionLevel(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="time_between_primary_and_revision_operation"
          label="Время между первичной и ревизионной операцией"
        >
          <Input type="number" value={time_between_primary_and_revision_operation} onChange={(e) => setTimeBetweenPrimaryAndRevisionOperation(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="neurological_deficit"
          label="Неврологический дефицит"
        >
          <Select value={neurological_deficit} onChange={(value) => setNeurologicalDeficit(value)}>
            <Option value={1}>Да</Option>
            <Option value={0}>Нет</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="charlson_index"
          label="Индекс коморбидности Чарльсона"
        >
          <Input type="number" value={charlson_index} onChange={(e) => setCharlsonIndex(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="vash_before_operation"
          label="ВАШ (визуально-аналоговая спина) до операции"
        >
          <Input type="number" value={vash_before_operation} onChange={(e) => setVashBeforeOperation(e.target.value)} min="0" max="10" />
        </Form.Item>
        <Form.Item
          name="vash_1_month_after_operation"
          label="ВАШ через 1 месяц после операции"
        >
          <Input type="number" value={vash_1_month_after_operation} onChange={(e) => setVash1MonthAfterOperation(e.target.value)} min="0" max="10" />
        </Form.Item>
        <Form.Item
          name="vash_3_months_after_operation"
          label="ВАШ через 3 месяца после операции"
        >
          <Input type="number" value={vash_3_months_after_operation} onChange={(e) => setVash3MonthsAfterOperation(e.target.value)} min="0" max="10" />
        </Form.Item>
        <Form.Item
          name="vash_6_months_after_operation"
          label="ВАШ через 6 месяцев после операции"
        >
          <Input type="number" value={vash_6_months_after_operation} onChange={(e) => setVash6MonthsAfterOperation(e.target.value)} min="0" max="10" />
        </Form.Item>
        <Form.Item
          name="vash_12_months_after_operation"
          label="ВАШ через 12 месяцев после операции"
        >
          <Input type="number" value={vash_12_months_after_operation} onChange={(e) => setVash12MonthsAfterOperation(e.target.value)} min="0" max="10" />
        </Form.Item>
        <Form.Item
          name="odi_before_operation"
          label="ODI до операции"
        >
          <Input type="number" value={odi_before_operation} onChange={(e) => setOdiBeforeOperation(e.target.value)} min="0" max="100" />
        </Form.Item>
        <Form.Item
          name="odi_1_month_after_operation"
          label="ODI через 1 месяц после операции"
        >
          <Input type="number" value={odi_1_month_after_operation} onChange={(e) => setOdi1MonthAfterOperation(e.target.value)}  min="0" max="100" />
        </Form.Item>
        <Form.Item
          name="odi_3_months_after_operation"
          label="ODI через 3 месяца после операции"
        >
          <Input type="number" value={odi_3_months_after_operation} onChange={(e) => setOdi3MonthsAfterOperation(e.target.value)}  min="0" max="100" />
        </Form.Item>
        <Form.Item
          name="odi_6_months_after_operation"
          label="ODI через 6 месяцев после операции"
        >
          <Input type="number" value={odi_6_months_after_operation} onChange={(e) => setOdi6MonthsAfterOperation(e.target.value)}  min="0" max="100" />
        </Form.Item>
        <Form.Item
          name="odi_12_months_after_operation"
          label="ODI через 12 месяцев после операции"
        >
          <Input type="number" value={odi_12_months_after_operation} onChange={(e) => setOdi12MonthsAfterOperation(e.target.value)}  min="0" max="100" />
        </Form.Item>
        <Form.Item
          name="sf_before_operation"
          label="SF-36 до операции"
        >
          <Input type="number" value={sf_before_operation} onChange={(e) => setSfBeforeOperation(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="sf_1_month_after_operation"
          label="SF-36 через 1 месяц после операции"
        >
          <Input type="number" value={sf_1_month_after_operation} onChange={(e) => setSf1MonthAfterOperation(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="sf_3_months_after_operation"
          label="SF-36 через 3 месяца после операции"
        >
          <Input type="number" value={sf_3_months_after_operation} onChange={(e) => setSf3MonthsAfterOperation(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="sf_6_months_after_operation"
          label="SF-36 через 6 месяцев после операции"
        >
          <Input type="number" value={sf_6_months_after_operation} onChange={(e) => setSf6MonthsAfterOperation(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="sf_12_months_after_operation"
          label="SF-36 через 12 месяцев после операции"
        >
          <Input type="number" value={sf_12_months_after_operation} onChange={(e) => setSf12MonthsAfterOperation(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="ct_before_operation"
          label="КТ (компьютерная томография) до операции"
        >
          <Upload
            customRequest={({ file, onSuccess }) => {
              setTimeout(() => {
                onSuccess('ok');
              }, 0);
            }}
            onChange={(info) => {
              if (info.file.status === 'done' && info.file.originFileObj) {
                setCtBeforeOperation(info.file.originFileObj);
              }
            }}
          >
            <Button icon={<InboxOutlined />}>Загрузить</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name="ct_1_month_after_operation"
          label="КТ через 1 месяц после операции"
        >
          <Upload
            customRequest={({ file, onSuccess }) => {
              setTimeout(() => {
                onSuccess('ok');
              }, 0);
            }}
            onChange={(info) => {
              if (info.file.status === 'done' && info.file.originFileObj) {
                setCt1MonOperation(info.file.originFileObj);
              }
            }}
          >
            <Button icon={<InboxOutlined />}>Загрузить</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name="ct_3_months_after_operation"
          label="КТ через 3 месяца после операции"
        >
          <Upload
            customRequest={({ file, onSuccess }) => {
              setTimeout(() => {
                onSuccess('ok');
              }, 0);
            }}
            onChange={(info) => {
              if (info.file.status === 'done' && info.file.originFileObj) {
                setCt3MonOperation(info.file.originFileObj);
              }
            }}
          >
            <Button icon={<InboxOutlined />}>Загрузить</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name="ct_6_months_after_operation"
          label="КТ через 6 месяцев после операции"
        >
          <Upload
            customRequest={({ file, onSuccess }) => {
              setTimeout(() => {
                onSuccess('ok');
              }, 0);
            }}
            onChange={(info) => {
              if (info.file.status === 'done' && info.file.originFileObj) {
                setCt6MonOperation(info.file.originFileObj);
              }
            }}
          >
            <Button icon={<InboxOutlined />}>Загрузить</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name="ct_12_months_after_operation"
          label="КТ через 12 месяцев после операции"
        >
          <Upload
            customRequest={({ file, onSuccess }) => {
              setTimeout(() => {
                onSuccess('ok');
              }, 0);
            }}
            onChange={(info) => {
              if (info.file.status === 'done' && info.file.originFileObj) {
                setCt12MonOperation(info.file.originFileObj);
              }
            }}
          >
            <Button icon={<InboxOutlined />}>Загрузить</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name="crb"
          label="СРБ (с-реактивный белок) до операции"
        >
          <Input type="number" value={crb} onChange={(e) => setCrb(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="osteoporosis"
          label="Остеопороз (HU)"
        >
           <Input type="number" value={osteoporosis} onChange={(e) => setOsteoporosis(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="intraoperative_culture_result"
          label="Интраоперационный посев"
        >
          <Select value={intraoperative_culture_result} onChange={(value) => setIntraoperativeCultureResult(value)}>
            <Option value={1}>Положительный</Option>
            <Option value={0}>Отрицательный</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="pathogen"
          label="Интраоперационный посев (возбудитель)"
        >
          <Input value={pathogen} onChange={(e) => setPathogen(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="asa_risk"
          label="Риск по ASA"
        >
          <Select value={asa_risk} onChange={(value) => setASARisk(value)}>
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
          <Select value={blood_group} onChange={(value) => setBloodGroup(value)}>
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
          <Select value={rh_factor} onChange={(value) => setRhFactor(value)}>
            <Option value={1}>RH+</Option>
            <Option value={0}>RH-</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="complications"
          label="Осложнения"
        >
          <Input value={complications} onChange={(e) => setComplications(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="mcnab_scale"
          label="Шкала Макнаб"
        >
          <Select value={mcnab_scale} onChange={(value) => setMcnabScale(value)}>
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
          <Input type="number" value={initial_platelet_level} onChange={(e) => setInitialPlateletLevel(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="final_platelet_level"
          label="Конечный уровень тромбоцитов, *109/л"
        >
          <Input type="number" value={final_platelet_level} onChange={(e) => setFinalPlateletLevel(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="final_thrombogel_volume"
          label="Конечный объем тромбогеля, мл"
        >
          <Input type="number" value={final_thrombogel_volume} onChange={(e) => setFinalThrombogelVolume(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="alloimmunity"
          label="Аллокость"
        >
          <Select value={alloimmunity} onChange={(value) => setAlloimmunity(value)}>
            <Option value={1}>Да</Option>
            <Option value={0}>Нет</Option>
          </Select>
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                form.getFieldsError().filter(({ errors }) => errors.length).length > 0
              }
              ref={firstErrorRef}
            >
              Сохранить
            </Button>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalForm;
