import React, { useState, useRef } from 'react';
import { Modal, Form, Input, Button, DatePicker, Select, Switch, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Option } = Select;

const ModalForm = ({ visible, onCancel, onSave }) => {
  const [form] = Form.useForm();
  const firstErrorRef = useRef(null);

  const [full_name, setFullName] = useState('');
  const [gender, setGender] = useState(null); // 1 - М, 0 - Ж
  const [birth_date, setBirthDate] = useState(null);
  const [age, setAge] = useState(null);
  const [diagnosis_mkb, setDiagnosisMKB] = useState('');
  const [operation_date, setOperationDate] = useState(null);
  const [operation_name, setOperationName] = useState('');
  const [intervention_level, setInterventionLevel] = useState('');
  const [time_between_primary_and_revision_operation, setTimeBetweenPrimaryAndRevisionOperation] = useState(0.0);
  const [neurological_deficit, setNeurologicalDeficit] = useState(false);
  const [charlson_index, setCharlsonIndex] = useState(0);
  const [vash_before_operation, setVashBeforeOperation] = useState(0);
  const [vash_1_month_after_operation, setVash1MonthAfterOperation] = useState(0);
  const [vash_3_months_after_operation, setVash3MonthsAfterOperation] = useState(0);
  const [vash_6_months_after_operation, setVash6MonthsAfterOperation] = useState(0);
  const [vash_12_months_after_operation, setVash12MonthsAfterOperation] = useState(0);
  const [odi_before_operation, setOdiBeforeOperation] = useState(0);
  const [odi_1_month_after_operation, setOdi1MonthAfterOperation] = useState(0);
  const [odi_3_months_after_operation, setOdi3MonthsAfterOperation] = useState(0);
  const [odi_6_months_after_operation, setOdi6MonthsAfterOperation] = useState(0);
  const [odi_12_months_after_operation, setOdi12MonthsAfterOperation] = useState(0);
  const [sf_before_operation, setSfBeforeOperation] = useState(0);
  const [sf_1_month_after_operation, setSf1MonthAfterOperation] = useState(0);
  const [sf_3_months_after_operation, setSf3MonthsAfterOperation] = useState(0);
  const [sf_6_months_after_operation, setSf6MonthsAfterOperation] = useState(0);
  const [sf_12_months_after_operation, setSf12MonthsAfterOperation] = useState(0);
  const [ct_before_operation, setCtBeforeOperation] = useState(null);
  const [crb, setCrb] = useState(0);
  const [osteoporosis, setOsteoporosis] = useState(0);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [bmi, setBMI] = useState(0);
  const [intraoperative_culture_result, setIntraoperativeCultureResult] = useState(false);
  const [asa_risk, setASARisk] = useState(0);
  const [blood_group, setBloodGroup] = useState(0);
  const [rh_factor, setRhFactor] = useState(false);
  const [complications, setComplications] = useState('');
  const [mcnab_scale, setMcnabScale] = useState(0);
  const [initial_platelet_level, setInitialPlateletLevel] = useState(0);
  const [final_platelet_level, setFinalPlateletLevel] = useState(0);
  const [final_thrombogel_volume, setFinalThrombogelVolume] = useState(0);
  const [alloimmunity, setAlloimmunity] = useState(false);

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
        formData.append('crb', crb);
        formData.append('osteoporosis', osteoporosis);
        formData.append('height', height);
        formData.append('weight', weight);
        formData.append('bmi', bmi);
        formData.append('intraoperative_culture_result', intraoperative_culture_result);
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
          rules={[
            { required: true, message: 'Пожалуйста, введите ФИО' },
          ]}
        >
          <Input value={full_name} onChange={(e) => setFullName(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Пол"
          rules={[
            { required: true, message: 'Пожалуйста, выберите пол' },
          ]}
        >
          <Select value={gender} onChange={(value) => setGender(value)}>
            <Option value={1}>Ж</Option>
            <Option value={0}>М</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="birth_date"
          label="Дата рождения"
          rules={[
            { required: true, message: 'Пожалуйста, введите дату рождения' },
          ]}
        >
          <DatePicker format="DD-MM-YYYY" value={birth_date} onChange={(date) => setBirthDate(date)} />
        </Form.Item>
        <Form.Item
          name="age"
          label="Возраст"
          rules={[
            { required: true, message: 'Пожалуйста, введите возраст' },
          ]}
        >
          <Input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="diagnosis_mkb"
          label="Диагноз MKB"
          rules={[
            { required: true, message: 'Пожалуйста, введите диагноз MKB' },
          ]}
        >
          <Input value={diagnosis_mkb} onChange={(e) => setDiagnosisMKB(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="operation_date"
          label="Дата операции"
          rules={[
            { required: true, message: 'Пожалуйста, введите дату операции' },
          ]}
        >
          <DatePicker format="DD-MM-YYYY" value={operation_date} onChange={(date) => setOperationDate(date)} />
        </Form.Item>
        <Form.Item
          name="operation_name"
          label="Название операции"
          rules={[
            { required: true, message: 'Пожалуйста, введите название операции' },
          ]}
        >
          <Input value={operation_name} onChange={(e) => setOperationName(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="intervention_level"
          label="Уровень вмешательства"
          rules={[
            { required: true, message: 'Пожалуйста, введите уровень вмешательства' },
          ]}
        >
          <Input value={intervention_level} onChange={(e) => setInterventionLevel(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="time_between_primary_and_revision_operation"
          label="Время между первичной и ревизионной операцией"
          rules={[
            { required: true, message: 'Пожалуйста, введите время между операциями' },
          ]}
        >
          <Input type="number" value={time_between_primary_and_revision_operation} onChange={(e) => setTimeBetweenPrimaryAndRevisionOperation(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="neurological_deficit"
          label="Нейрологический дефицит"
          rules={[
            { required: true, message: 'Пожалуйста, выберите наличие нейрологического дефицита' },
          ]}
        >
          <Select value={neurological_deficit} onChange={(value) => setGender(value)}>
            <Option value={1}>Да</Option>
            <Option value={0}>Нет</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="charlson_index"
          label="Индекс Чарльсона"
          rules={[
            { required: true, message: 'Пожалуйста, введите индекс Чарльсона' },
          ]}
        >
          <Input type="number" value={charlson_index} onChange={(e) => setCharlsonIndex(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="vash_before_operation"
          label="VASH до операции"
        >
          <Input type="number" value={vash_before_operation} onChange={(e) => setVashBeforeOperation(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="vash_1_month_after_operation"
          label="VASH через 1 месяц после операции"
        >
          <Input type="number" value={vash_1_month_after_operation} onChange={(e) => setVash1MonthAfterOperation(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="vash_3_months_after_operation"
          label="VASH через 3 месяца после операции"
        >
          <Input type="number" value={vash_3_months_after_operation} onChange={(e) => setVash3MonthsAfterOperation(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="vash_6_months_after_operation"
          label="VASH через 6 месяцев после операции"
        >
          <Input type="number" value={vash_6_months_after_operation} onChange={(e) => setVash6MonthsAfterOperation(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="vash_12_months_after_operation"
          label="VASH через 12 месяцев после операции"
        >
          <Input type="number" value={vash_12_months_after_operation} onChange={(e) => setVash12MonthsAfterOperation(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="odi_before_operation"
          label="ODI до операции"
        >
          <Input type="number" value={odi_before_operation} onChange={(e) => setOdiBeforeOperation(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="odi_1_month_after_operation"
          label="ODI через 1 месяц после операции"
        >
          <Input type="number" value={odi_1_month_after_operation} onChange={(e) => setOdi1MonthAfterOperation(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="odi_3_months_after_operation"
          label="ODI через 3 месяца после операции"
        >
          <Input type="number" value={odi_3_months_after_operation} onChange={(e) => setOdi3MonthsAfterOperation(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="odi_6_months_after_operation"
          label="ODI через 6 месяцев после операции"
        >
          <Input type="number" value={odi_6_months_after_operation} onChange={(e) => setOdi6MonthsAfterOperation(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="odi_12_months_after_operation"
          label="ODI через 12 месяцев после операции"
        >
          <Input type="number" value={odi_12_months_after_operation} onChange={(e) => setOdi12MonthsAfterOperation(e.target.value)} />
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
          label="CT до операции"
          name="ct_before_operation"
          rules={[
            { required: true, message: 'Пожалуйста, загрузите CT-скан до операции' },
          ]}
        >
          <Upload
            accept=".rar,.zip"
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
            <Button icon={<InboxOutlined />}>Загрузить CT-скан</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name="crb"
          label="CRB"
          rules={[
            { required: true, message: 'Пожалуйста, введите CRB' },
          ]}
        >
          <Input type="number" value={crb} onChange={(e) => setCrb(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="osteoporosis"
          label="Остеопороз"
          rules={[
            { required: true, message: 'Пожалуйста, выберите наличие остеопороза' },
          ]}
        >
          <Select value={osteoporosis} onChange={(value) => setOsteoporosis(value)}>
            <Option value={1}>Да</Option>
            <Option value={0}>Нет</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="height"
          label="Рост (в см)"
          rules={[
            { required: true, message: 'Пожалуйста, введите рост' },
          ]}
        >
          <Input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="weight"
          label="Вес (в кг)"
          rules={[
            { required: true, message: 'Пожалуйста, введите вес' },
          ]}
        >
          <Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="bmi"
          label="ИМТ"
          rules={[
            { required: true, message: 'Пожалуйста, введите ИМТ' },
          ]}
        >
          <Input type="number" value={bmi} onChange={(e) => setBMI(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="intraoperative_culture_result"
          label="Интраоперационный посев"
          rules={[
            { required: true, message: 'Пожалуйста, выберите результат интраоперационного посева' },
          ]}
        >
          <Select value={intraoperative_culture_result} onChange={(value) => setIntraoperativeCultureResult(value)}>
            <Option value={1}>Положительный</Option>
            <Option value={0}>Отрицательный</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="asa_risk"
          label="ASA-риск"
          rules={[
            { required: true, message: 'Пожалуйста, введите ASA-риск' },
          ]}
        >
          <Select value={asa_risk} onChange={(value) => setASARisk(value)}>
            <Option value={4}>V</Option>
            <Option value={3}>IV</Option>
            <Option value={2}>III</Option>
            <Option value={1}>II</Option>
            <Option value={0}>I</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="blood_group"
          label="Группа крови"
          rules={[
            { required: true, message: 'Пожалуйста, введите группу крови' },
          ]}
        >
          <Select value={blood_group} onChange={(value) => setBloodGroup(value)}>
            <Option value={3}>IV</Option>
            <Option value={2}>III</Option>
            <Option value={1}>II</Option>
            <Option value={0}>I</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="rh_factor"
          label="Резус-фактор"
          rules={[
            { required: true, message: 'Пожалуйста, выберите резус-фактор' },
          ]}
        >
          <Select value={rh_factor} onChange={(value) => setRhFactor(value)}>
            <Option value={1}>RH+</Option>
            <Option value={0}>RH-</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="complications"
          label="Осложнения"
          rules={[
            { required: true, message: 'Пожалуйста, введите осложнения' },
          ]}
        >
          <Input value={complications} onChange={(e) => setComplications(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="mcnab_scale"
          label="Шкала McNab"
          rules={[
            { required: true, message: 'Пожалуйста, введите шкалу McNab' },
          ]}
        >
          <Input type="number" value={mcnab_scale} onChange={(e) => setMcnabScale(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="initial_platelet_level"
          label="Уровень тромбоцитов до операции"
          rules={[
            { required: true, message: 'Пожалуйста, введите уровень тромбоцитов до операции' },
          ]}
        >
          <Input type="number" value={initial_platelet_level} onChange={(e) => setInitialPlateletLevel(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="final_platelet_level"
          label="Уровень тромбоцитов после операции"
          rules={[
            { required: true, message: 'Пожалуйста, введите уровень тромбоцитов после операции' },
          ]}
        >
          <Input type="number" value={final_platelet_level} onChange={(e) => setFinalPlateletLevel(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="final_thrombogel_volume"
          label="Объем финального тромбогеля"
          rules={[
            { required: true, message: 'Пожалуйста, введите объем финального тромбогеля' },
          ]}
        >
          <Input type="number" value={final_thrombogel_volume} onChange={(e) => setFinalThrombogelVolume(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="alloimmunity"
          label="Аллоиммунные реакции"
          rules={[
            { required: true, message: 'Пожалуйста, выберите наличие аллоиммунных реакций' },
          ]}
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
