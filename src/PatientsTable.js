import React, { useState, useRef, useEffect} from 'react';
import { Table, Input, ConfigProvider, Button, Space } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import ruRU from 'antd/lib/locale/ru_RU';
import Highlighter from 'react-highlight-words';
import ModalForm from './ModalForm';
import EditModalForm from './EditModalForm';
import Excel from './Excel';
import moment from 'moment';
import 'moment/locale/ru';
import './App.css';

const PatientsTable = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const getColumnWidth = (title) => {
    const padding = 15; // отступ
    const minWidth = 150; // мин ширина столбца
    const textWidth = title.length * 10; // ширина символа
    return Math.max(textWidth + padding, minWidth);
  };
  

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentEditData, setCurrentEditData] = useState(null);

  const handleEdit = (record) => {
    setCurrentEditData(record);
    setIsEditModalVisible(true);
  };

  const handleEditSave = async (id, formData) => {
    try {
      const dataToSend = new FormData();
      for (const key in formData) {
        if (formData[key] instanceof File) {
          dataToSend.append(key, formData[key]);
        } else {
          dataToSend.append(key, JSON.stringify(formData[key]));
        }
      }
  
      const response = await fetch(`/api/edit_data/${id}`, {
        method: 'PUT',
        body: dataToSend,
      });
  
      if (response.ok) {
        const updatedDataResponse = await fetch('/api/get_data');
        const updatedData = await updatedDataResponse.json();
        setTableData(updatedData);
        setIsEditModalVisible(false);
      } else {
        console.error('Ошибка при редактировании данных на сервере');
      }
    } catch (error) {
      console.error('Ошибка при отправке данных на сервер:', error);
    }
  };

  const handleDelete = async (record) => {
    try {
      const response = await fetch(`/api/delete_data/${record.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedDataResponse = await fetch('/api/get_data');
        const updatedData = await updatedDataResponse.json();
        setTableData(updatedData);
      }
    } catch (error) {
      console.error('Ошибка при удалении данных:', error);
    }
  };

  const [tableData, setTableData] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  
  const handleSave = async (formData) => {
    try {
      const response = await fetch('/api/insert_data', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const updatedDataResponse = await fetch('/api/get_data');
        const updatedData = await updatedDataResponse.json();
        setTableData(updatedData);
  
        setIsModalVisible(false);
      } else {
        console.error('Ошибка при сохранении данных на сервере');
      }
    } catch (error) {
      console.error('Ошибка при отправке данных на сервер:', error);
    }
  };
  

  const openModal = () => {
    showModal();
  };

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Найти`} // Замените "Search name" на "Найти"
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Поиск
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Отмена
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  
    
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    
    const [resetKey, setResetKey] = useState(0);

    const handleReset = clearFilters => {
        setSearchText('');
        setSearchedColumn('');
        clearFilters([]);
        setResetKey(prevKey => prevKey + 1);
    };

    const NeurolDeficiAndAlloimtInteger = ({ value }) => {
      if (value === 0) {
        return 'Нет';
      } else if (value === 1) {
        return 'Да';
      }
    };

    const GenderInteger = ({ value }) => {
      if (value === 0) {
        return 'М';
      } else if (value === 1) {
        return 'Ж';
      }
    };

    const IntraopCultInteger = ({ value }) => {
      if (value === 0) {
        return 'Отрицательный';
      } else if (value === 1) {
        return 'Положительный';
      }
    };

    const AsaInteger = ({ value }) => {
      if (value === 1) {
        return 'I'; 
      } else if (value === 2) {
        return 'II'; 
      } else if (value === 3) {
        return 'III'; 
      } else if (value === 4) {
        return 'IV'; 
      } else if (value === 5) {
        return 'V';
      } 
    };

    const BloodGrInteger = ({ value }) => {
      if (value === 1) {
        return 'I'; 
      } else if (value === 2) {
        return 'II'; 
      } else if (value === 3) {
        return 'III'; 
      } else if (value === 4) {
        return 'IV'; 
      } 
    };

    const RhInteger = ({ value }) => {
      if (value === 0) {
        return 'RH-';
      } else if (value === 1) {
        return 'RH+';
      }
    };

    const McnabGrInteger = ({ value }) => {
      if (value === 2) {
        return 'Неудовлетворительно'; 
      } else if (value === 3) {
        return 'Удовлетворительно'; 
      } else if (value === 4) {
        return 'Хорошо'; 
      } else if (value === 5) {
        return 'Отлично'; 
      } 
    };

    // const VashColumn = ({ record }) => {
    //     const values = [
    //         record.vash_before_operation,
    //         record.vash_1_month_after_operation,
    //         record.vash_3_months_after_operation,
    //         record.vash_6_months_after_operation,
    //         record.vash_12_months_after_operation,
    //     ]
    //     const renderedValues = values.map((value, index) => {
    //         if (value === null || value === undefined) {
    //             return ' ';
    //         } else {
    //             return value;
    //         }
    //     });
      
    //     return <>{renderedValues.join('/')}</>;
    // };

    // const ODIColumn = ({ record }) => {
    //     const values = [
    //         record.odi_before_operation,
    //         record.odi_1_month_after_operation,
    //         record.odi_3_months_after_operation,
    //         record.odi_6_months_after_operation,
    //         record.odi_12_months_after_operation,
    //     ]
    //     const renderedValues = values.map((value, index) => {
    //         if (value === null || value === undefined) {
    //             return ' ';
    //         } else {
    //             return value;
    //         }
    //     });
      
    //     return <>{renderedValues.join('/')}</>;
    // };

    // const SFColumn = ({ record }) => {
    //     const values = [
    //         record.sf_before_operation,
    //         record.sf_1_month_after_operation,
    //         record.sf_3_months_after_operation,
    //         record.sf_6_months_after_operation,
    //         record.sf_12_months_after_operation,
    //     ]
    //     const renderedValues = values.map((value, index) => {
    //         if (value === null || value === undefined) {
    //             return ' ';
    //         } else {
    //             return value;
    //         }
    //     });
      
    //     return <>{renderedValues.join('/')}</>;
    // };

    // const vashSorter = (a, b) => {
    //     const combinedA = [
    //       a.vash_before_operation,
    //       a.vash_1_month_after_operation,
    //       a.vash_3_months_after_operation,
    //       a.vash_6_months_after_operation,
    //       a.vash_12_months_after_operation,
    //     ].map(value => (value !== null && value !== undefined ? parseFloat(value) : NaN));
      
    //     const combinedB = [
    //       b.vash_before_operation,
    //       b.vash_1_month_after_operation,
    //       b.vash_3_months_after_operation,
    //       b.vash_6_months_after_operation,
    //       b.vash_12_months_after_operation,
    //     ].map(value => (value !== null && value !== undefined ? parseFloat(value) : NaN));
      
    //     return combinedA[0] - combinedB[0];
    // };

    // const odiSorter = (a, b) => {
    //     const combinedA = [
    //       a.odi_before_operation,
    //       a.odi_1_month_after_operation,
    //       a.odi_3_months_after_operation,
    //       a.odi_6_months_after_operation,
    //       a.odi_12_months_after_operation,
    //     ].map(value => (value !== null && value !== undefined ? parseFloat(value) : NaN));
      
    //     const combinedB = [
    //       b.odi_before_operation,
    //       b.odi_1_month_after_operation,
    //       b.odi_3_months_after_operation,
    //       b.odi_6_months_after_operation,
    //       b.odi_12_months_after_operation,
    //     ].map(value => (value !== null && value !== undefined ? parseFloat(value) : NaN));
      
    //     return combinedA[0] - combinedB[0];
    // };

    // const sfSorter = (a, b) => {
    //     const combinedA = [
    //       a.sf_before_operation,
    //       a.sf_1_month_after_operation,
    //       a.sf_3_months_after_operation,
    //       a.sf_6_months_after_operation,
    //       a.sf_12_months_after_operation,
    //     ].map(value => (value !== null && value !== undefined ? parseFloat(value) : NaN));
      
    //     const combinedB = [
    //       b.sf_before_operation,
    //       b.sf_1_month_after_operation,
    //       b.sf_3_months_after_operation,
    //       b.sf_6_months_after_operation,
    //       b.sf_12_months_after_operation,
    //     ].map(value => (value !== null && value !== undefined ? parseFloat(value) : NaN));
      
    //     return combinedA[0] - combinedB[0]; 
    // };

    // функция для форматирования даты из "yyyy-mm-dd" в "dd-mm-yyyy"
    function dateSorter(a, b) {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateA - dateB;
  }
  

  const columns = [
    {
        title: '№',
        dataIndex: 'number',
        key: 'number',
        sorter: (a, b) => a.number - b.number,
        fixed: 'left',
        width: getColumnWidth('№'),
        ...getColumnSearchProps('number'),
    },
    {
      title: 'Дата создания',
      dataIndex: 'create_date',
      key: 'create_date',
      width: getColumnWidth('Дата создания'),
      ...getColumnSearchProps('create_date'),
      sorter: (a, b) => dateSorter(a.create_date, b.create_date),
      render: (text, record) => moment(record.create_date).format('DD-MM-YYYY'),
    },
    {
      title: 'Пользователь',
      dataIndex: 'doctor',
      key: 'doctor',
      width: getColumnWidth('Пользователь'),
      ...getColumnSearchProps('doctor'),
      sorter: (a, b) => a.doctor.localeCompare(b.doctor),
    },
    {
        title: 'ФИО',
        dataIndex: 'full_name',
        key: 'full_name',
        width: getColumnWidth('ФИО'),
        ...getColumnSearchProps('full_name'),
        sorter: (a, b) => a.full_name.localeCompare(b.full_name),
    },
    {
        title: 'Пол',
        dataIndex: 'gender',
        key: 'gender',
        width: getColumnWidth('Пол'),
        ...getColumnSearchProps('gender'),
        sorter: (a, b) => a.gender - b.gender,
        render: (value) => <span>{GenderInteger({ value })}</span>,
    },
    {
        title: 'Дата рождения',
        dataIndex: 'birth_date',
        key: 'birth_date',
        width: getColumnWidth('Дата рождения'),
        ...getColumnSearchProps('birth_date'),
        sorter: (a, b) => dateSorter(a.birth_date, b.birth_date),
        render: (text, record) => {
          const createDate = moment(record.birth_date);
          return createDate.isValid() ? createDate.format('DD-MM-YYYY') : '';
        },
    },
    {
        title: 'Возраст',
        dataIndex: 'age',
        key: 'age',
        width: getColumnWidth('Возраст'),
        ...getColumnSearchProps('age'),
        sorter: (a, b) => a.age - b.age,
    },
    {
        title: 'Рост',
        dataIndex: 'height',
        key: 'height',
        width: getColumnWidth('Рост'),
        ...getColumnSearchProps('height'),
        sorter: (a, b) => a.height - b.height,
    },
    {
        title: 'Вес',
        dataIndex: 'weight',
        key: 'weight',
        width: getColumnWidth('Вес'),
        ...getColumnSearchProps('weight'),
        sorter: (a, b) => a.weight - b.weight,
    },
    {
        title: 'BMI (индекс массы тела)',
        dataIndex: 'bmi',
        key: 'bmi',
        width: getColumnWidth('BMI (индекс массы тела)'),
        ...getColumnSearchProps('bmi'),
        sorter: (a, b) => a.bmi - b.bmi,
    },
    {
        title: 'Диагноз по МКБ',
        dataIndex: 'diagnosis_mkb',
        key: 'diagnosis_mkb',
        width: getColumnWidth('Диагноз по МКБ'),
        ...getColumnSearchProps('diagnosis_mkb'),
        sorter: (a, b) => a.diagnosis_mkb.localeCompare(b.diagnosis_mkb),
    },
    {
        title: 'Дата операции',
        dataIndex: 'operation_date',
        key: 'operation_date',
        width: getColumnWidth('Дата операции'),
        sorter: (a, b) => dateSorter(a.operation_date, b.operation_date),
        ...getColumnSearchProps('operation_date'),
        render: (text, record) => {
          const createDate = moment(record.operation_date);
          return createDate.isValid() ? createDate.format('DD-MM-YYYY') : '';
        },
    },
    {
        title: 'Название операции',
        dataIndex: 'operation_name',
        key: 'operation_name',
        width: getColumnWidth('Название операции'),
        ...getColumnSearchProps('operation_name'),
        sorter: (a, b) => a.operation_name.localeCompare(b.operation_name),
    },
    {
        title: 'Уровень вмешательства',
        dataIndex: 'intervention_level',
        key: 'intervention_level',
        width: getColumnWidth('Уровень вмешательства'),
        ...getColumnSearchProps('intervention_level'),
        sorter: (a, b) => a.intervention_level.localeCompare(b.intervention_level),
    },
    {
        title: 'Время между первичной и ревизионной операцией',
        dataIndex: 'time_between_primary_and_revision_operation',
        key: 'atime_between_primary_and_revision_operationge',
        width: getColumnWidth('Время между первичной и ревизионной операцией'),
        ...getColumnSearchProps('atime_between_primary_and_revision_operationge'),
        sorter: (a, b) => a.time_between_primary_and_revision_operation - b.time_between_primary_and_revision_operation,
    },
    {
        title: 'Неврологический дефицит',
        dataIndex: 'neurological_deficit',
        key: 'neurological_deficit',
        width: getColumnWidth('Неврологический дефицит'),
        ...getColumnSearchProps('neurological_deficit'),
        sorter: (a, b) => a.neurological_deficit - b.neurological_deficit,
        render: (value) => <span>{NeurolDeficiAndAlloimtInteger({ value })}</span>,
    },
    {
        title: 'Индекс коморбидности Чарлсона',
        dataIndex: 'charlson_index',
        key: 'charlson_index',
        width: getColumnWidth('Индекс коморбидности Чарлсона'),
        ...getColumnSearchProps('charlson_index'),
        sorter: (a, b) => a.charlson_index - b.charlson_index,
    },
    {
        title: 'ВАШ (визуально-аналоговая спина) до операции',
        dataIndex: 'vash_before_operation',
        key: 'vash_before_operation',
        width: getColumnWidth('ВАШ (визуально-аналоговая спина) до операции'),
        ...getColumnSearchProps('vash_before_operation'),
        sorter: (a, b) => a.vash_before_operation - b.vash_before_operation,
    },
    {
        title: 'ВАШ через 1 месяц после операции',
        dataIndex: 'vash_1_month_after_operation',
        key: 'vash_1_month_after_operation',
        width: getColumnWidth('ВАШ через 1 месяц после операции'),
       ...getColumnSearchProps('vash_1_month_after_operation'),
        sorter: (a, b) => a.vash_1_month_after_operation - b.vash_1_month_after_operation,
    },
    {
        title: 'ВАШ через 3 месяца после операции',
        dataIndex: 'vash_3_months_after_operation',
        key: 'vash_3_months_after_operation',
        width: getColumnWidth('ВАШ через 3 месяца после операции'),
        ...getColumnSearchProps('vash_3_months_after_operation'),
        sorter: (a, b) => a.vash_3_months_after_operation - b.vash_3_months_after_operation,
    },
    {
        title: 'ВАШ через 6 месяцев после операции',
        dataIndex: 'vash_6_months_after_operation',
        key: 'vash_6_months_after_operation',
        width: getColumnWidth('ВАШ через 6 месяцев после операции'),
        ...getColumnSearchProps('vash_6_months_after_operation'),
        sorter: (a, b) => a.vash_6_months_after_operation - b.vash_6_months_after_operation,
    },
    {
        title: 'ВАШ через 12 месяцев после операции',
        dataIndex: 'vash_12_months_after_operation',
        key: 'vash_12_months_after_operation',
        width: getColumnWidth('ВАШ через 12 месяцев после операции'),
        ...getColumnSearchProps('vash_12_months_after_operation'),
        sorter: (a, b) => a.vash_12_months_after_operation - b.vash_12_months_after_operation,
    },
    {
        title: 'ODI до операции',
        dataIndex: 'odi_before_operation',
        key: 'odi_before_operation',
        width: getColumnWidth('ODI до операции'),
        ...getColumnSearchProps('odi_before_operation'),
        sorter: (a, b) => a.odi_before_operation - b.odi_before_operation,
    },
    {
        title: 'ODI через 1 месяц после операции',
        dataIndex: 'odi_1_month_after_operation',
        key: 'odi_1_month_after_operation',
        width: getColumnWidth('ODI через 1 месяц после операции'),
       ...getColumnSearchProps('odi_1_month_after_operation'),
        sorter: (a, b) => a.odi_1_month_after_operation - b.odi_1_month_after_operation,
    },
    {
        title: 'ODI через 3 месяца после операции',
        dataIndex: 'odi_3_months_after_operation',
        key: 'odi_3_months_after_operation',
        width: getColumnWidth('ODI через 3 месяца после операции'),
        ...getColumnSearchProps('odi_3_months_after_operation'),
        sorter: (a, b) => a.odi_3_months_after_operation - b.odi_3_months_after_operation,
    },
    {
        title: 'ODI через 6 месяцев после операции',
        dataIndex: 'odi_6_months_after_operation',
        key: 'odi_6_months_after_operation',
        width: getColumnWidth('ODI через 6 месяцев после операции'),
        ...getColumnSearchProps('odi_6_months_after_operation'),
        sorter: (a, b) => a.odi_6_months_after_operation - b.odi_6_months_after_operation,
    },
    {
        title: 'ODI через 12 месяцев после операции',
        dataIndex: 'odi_12_months_after_operation',
        key: 'odi_12_months_after_operation',
        width: getColumnWidth('ODI через 12 месяцев после операции'),
        ...getColumnSearchProps('odi_12_months_after_operation'),
        sorter: (a, b) => a.odi_12_months_after_operation - b.odi_12_months_after_operation,
    },
    {
        title: 'SF-36 до операции',
        dataIndex: 'sf_before_operation',
        key: 'sf_before_operation',
        width: getColumnWidth('SF-36 до операции'),
        ...getColumnSearchProps('sf_before_operation'),
        sorter: (a, b) => a.sf_before_operation - b.sf_before_operation,
    },
    {
        title: 'SF-36 через 1 месяц после операции',
        dataIndex: 'sf_1_month_after_operation',
        key: 'sf_1_month_after_operation',
        width: getColumnWidth('SF-36 через 1 месяц после операции'),
       ...getColumnSearchProps('sf_1_month_after_operation'),
        sorter: (a, b) => a.sf_1_month_after_operation - b.sf_1_month_after_operation,
    },
    {
        title: 'SF-36 через 3 месяца после операции',
        dataIndex: 'sf_3_months_after_operation',
        key: 'sf_3_months_after_operation',
        width: getColumnWidth('SF-36 через 3 месяца после операции'),
        ...getColumnSearchProps('sf_3_months_after_operation'),
        sorter: (a, b) => a.sf_3_months_after_operation - b.sf_3_months_after_operation,
    },
    {
        title: 'SF-36 через 6 месяцев после операции',
        dataIndex: 'sf_6_months_after_operation',
        key: 'sf_6_months_after_operation',
        width: getColumnWidth('SF-36 через 6 месяцев после операции'),
        ...getColumnSearchProps('sf_6_months_after_operation'),
        sorter: (a, b) => a.sf_6_months_after_operation - b.sf_6_months_after_operation,
    },
    {
        title: 'SF-36 через 12 месяцев после операции',
        dataIndex: 'sf_12_months_after_operation',
        key: 'sf_12_months_after_operation',
        width: getColumnWidth('SF-36 через 12 месяцев после операции'),
        ...getColumnSearchProps('sf_12_months_after_operation'),
        sorter: (a, b) => a.sf_12_months_after_operation - b.sf_12_months_after_operation,
    },
    {
      title: 'КТ (компьютерная томография) до операции',
      dataIndex: 'ct_before_operation',
      key: 'ct_before_operation',
      width: getColumnWidth('КТ (компьютерная томография) до операции'),
      ...getColumnSearchProps('ct_before_operation'),
      sorter: (a, b) => a.ct_before_operation.localeCompare(b.ct_before_operation),
      render: (text, record) => {
        if (record.ct_before_operation) {
          const fileName = record.ct_before_operation.split('/').pop(); // имя файла из ссылки
          return (
            <a href={record.ct_before_operation} target="_blank" rel="noopener noreferrer">
              {fileName}
            </a>
          );
        } else {
          return <span>Нет файла</span>;
        }
      },
    }, 
    {
      title: 'КТ через 1 месяц после операции',
      dataIndex: 'ct_1_month_after_operation',
      key: 'ct_1_month_after_operation',
      width: getColumnWidth('КТ через 1 месяц после операции'),
      ...getColumnSearchProps('ct_1_month_after_operation'),
      sorter: (a, b) => a.ct_1_month_after_operation.localeCompare(b.ct_1_month_after_operation),
      render: (text, record) => {
        if (record.ct_1_month_after_operation) {
          const fileName = record.ct_1_month_after_operation.split('/').pop();
          return (
            <a href={record.ct_1_month_after_operation} target="_blank" rel="noopener noreferrer">
              {fileName}
            </a>
          );
        } else {
          return <span>Нет файла</span>;
        }
      },
    },    
    {
      title: 'КТ через 3 месяца после операции',
      dataIndex: 'ct_3_months_after_operation',
      key: 'ct_3_months_after_operation',
      width: getColumnWidth('КТ через 3 месяца после операции'),
      ...getColumnSearchProps('ct_3_months_after_operation'),
      sorter: (a, b) => a.ct_3_months_after_operation.localeCompare(b.ct_3_months_after_operation),
      render: (text, record) => {
        if (record.ct_3_months_after_operation) {
          const fileName = record.ct_3_months_after_operation.split('/').pop();
          return (
            <a href={record.ct_3_months_after_operation} target="_blank" rel="noopener noreferrer">
              {fileName}
            </a>
          );
        } else {
          return <span>Нет файла</span>;
        }
      },
    },    
    {
      title: 'КТ через 6 месяцев после операции',
      dataIndex: 'ct_6_months_after_operation',
      key: 'ct_6_months_after_operation',
      width: getColumnWidth('КТ через 6 месяцев после операции'),
      ...getColumnSearchProps('ct_6_months_after_operation'),
      sorter: (a, b) => a.ct_6_months_after_operation.localeCompare(b.ct_6_months_after_operation),
      render: (text, record) => {
        if (record.ct_6_months_after_operation) {
          const fileName = record.ct_6_months_after_operation.split('/').pop();
          return (
            <a href={record.ct_6_months_after_operation} target="_blank" rel="noopener noreferrer">
              {fileName}
            </a>
          );
        } else {
          return <span>Нет файла</span>;
        }
      },
    },       
    {
      title: 'КТ через 12 месяцев после операции',
      dataIndex: 'ct_12_months_after_operation',
      key: 'ct_12_months_after_operation',
      width: getColumnWidth('КТ через 12 месяцев после операции'),
      ...getColumnSearchProps('ct_12_months_after_operation'),
      sorter: (a, b) => a.ct_12_months_after_operation.localeCompare(b.ct_12_months_after_operation),
      render: (text, record) => {
        if (record.ct_12_months_after_operation) {
          const fileName = record.ct_12_months_after_operation.split('/').pop(); 
          return (
            <a href={record.ct_12_months_after_operation} target="_blank" rel="noopener noreferrer">
              {fileName}
            </a>
          );
        } else {
          return <span>Нет файла</span>;
        }
      },
    },    
    {
        title: 'СРБ (с-реактивный белок)  до операции',
        dataIndex: 'crb',
        key: 'crb',
        width: getColumnWidth('СРБ (с-реактивный белок) до операции'),
        ...getColumnSearchProps('crb'),
        sorter: (a, b) => a.crb - b.crb,
    },
    {
        title: 'Остеопороз (HU)',
        dataIndex: 'osteoporosis',
        key: 'osteoporosis',
        width: getColumnWidth('Остеопороз (HU)'),
        ...getColumnSearchProps('osteoporosis'),
        sorter: (a, b) => a.osteoporosis - b.osteoporosis,
    },
    {
        title: 'Интраоперационный посев',
        dataIndex: 'intraoperative_culture_result',
        key: 'intraoperative_culture_result',
        width: getColumnWidth('Интраоперационный посев'),
        ...getColumnSearchProps('intraoperative_culture_result'),
        sorter: (a, b) => a.intraoperative_culture_result - b.intraoperative_culture_result,
        render: (value) => <span>{IntraopCultInteger({ value })}</span>,
    },
    {
        title: 'Интраоперационный посев (возбудитель)',
        dataIndex: 'pathogen',
        key: 'pathogen',
        width: getColumnWidth('Интраоперационный посев (возбудитель)'),
        ...getColumnSearchProps('pathogen'),
        sorter: (a, b) => a.pathogen - b.pathogen,
    },
    {
        title: 'Риск по ASA',
        dataIndex: 'asa_risk',
        key: 'asa_risk',
        width: getColumnWidth('Риск по ASA'),
        ...getColumnSearchProps('asa_risk'),
        sorter: (a, b) => a.asa_risk - b.asa_risk,
        render: (value) => <span>{AsaInteger({ value })}</span>,
    },
    {
        title: 'Группа крови',
        dataIndex: 'blood_group',
        key: '',
        width: getColumnWidth('Группа крови'),
        ...getColumnSearchProps('blood_group'),
        sorter: (a, b) => a.blood_group - b.blood_group,
        render: (value) => <span>{BloodGrInteger({ value })}</span>,
    },
    {
        title: 'Резус-фактор',
        dataIndex: 'rh_factor',
        key: 'rh_factor',
        width: getColumnWidth('Резус-фактор'),
        ...getColumnSearchProps('rh_factor'),
        sorter: (a, b) => a.rh_factor - b.rh_factor,
        render: (value) => <span>{RhInteger({ value })}</span>,
    },
    {
        title: 'Осложнения',
        dataIndex: 'complications',
        key: 'complications',
        width: getColumnWidth('Осложнения'),
        ...getColumnSearchProps('complications'),
        sorter: (a, b) => a.complications.localeCompare(b.complications),
    },
    {
        title: 'Шкала Макнаб',
        dataIndex: 'mcnab_scale',
        key: 'mcnab_scale',
        width: 180,
        ...getColumnSearchProps('mcnab_scale'),
        sorter: (a, b) => a.mcnab_scale - b.mcnab_scale,
        render: (value) => <span>{McnabGrInteger({ value })}</span>,
    },
    {
        title: 'Исходный уровень тромбоцитов, *109/л',
        dataIndex: 'initial_platelet_level',
        key: 'initial_platelet_level',
        width: getColumnWidth('Исходный уровень тромбоцитов, *109/л'),
        ...getColumnSearchProps('initial_platelet_level'),
        sorter: (a, b) => a.initial_platelet_level - b.initial_platelet_level,
    },
    {
        title: 'Конечный уровень тромбоцитов, *109/л',
        dataIndex: 'final_platelet_level',
        key: 'final_platelet_level',
        width: getColumnWidth('Конечный уровень тромбоцитов, *109/л'),
        ...getColumnSearchProps('final_platelet_level'),
        sorter: (a, b) => a.final_platelet_level - b.final_platelet_level,
    },
    {
        title: 'Конечный объем тромбогеля, мл',
        dataIndex: 'final_thrombogel_volume',
        key: 'final_thrombogel_volume',
        width: getColumnWidth('Конечный объем тромбогеля, мл'),
        ...getColumnSearchProps('final_thrombogel_volume'),
        sorter: (a, b) => a.final_thrombogel_volume - b.final_thrombogel_volume,
    },
    {
        title: 'Аллокость',
        dataIndex: 'alloimmunity',
        key: 'alloimmunity',
        width: getColumnWidth('Аллокость'),
        sorter: (a, b) => a.alloimmunity - b.alloimmunity,
        ...getColumnSearchProps('alloimmunity'),
        render: (value) => <span>{NeurolDeficiAndAlloimtInteger({ value })}</span>,
    },
    {
        title: ' ',
        key: 'action',
        fixed: 'right',
        width: getColumnWidth(' '),
        render: (text, record) => (
          <Space size="middle">
            <a onClick={() => handleEdit(record)}><EditOutlined /></a>
            <a onClick={() => handleDelete(record)}><DeleteOutlined /></a>
          </Space>
        ),
      },
    ];

  const [data, setData] = useState([]);

  // функция для получения данных от API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/get_data');
        const responseData = await response.json();
        setData(responseData.map((item, index) => ({
          key: index,
          id: item.id,
          number: item.number,
          create_date: item.create_date,
          doctor: item.doctor,
          full_name: item.full_name,
          gender: item.gender,
          birth_date: item.birth_date,  
          age: item.age,
          diagnosis_mkb: item.diagnosis_mkb,
          operation_date: item.operation_date,
          operation_name: item.operation_name,
          intervention_level: item.intervention_level,
          time_between_primary_and_revision_operation: item.time_between_primary_and_revision_operation,
          neurological_deficit: item.neurological_deficit,
          charlson_index: item.charlson_index,
          vash_before_operation: item.vash_before_operation,
          vash_1_month_after_operation: item.vash_1_month_after_operation,
          vash_3_months_after_operation: item.vash_3_months_after_operation,
          vash_6_months_after_operation: item.vash_6_months_after_operation,
          vash_12_months_after_operation: item.vash_12_months_after_operation,
          odi_before_operation: item.odi_before_operation,
          odi_1_month_after_operation: item.odi_1_month_after_operation,
          odi_3_months_after_operation: item.odi_3_months_after_operation,
          odi_6_months_after_operation: item.odi_6_months_after_operation,
          odi_12_months_after_operation: item.odi_12_months_after_operation,
          sf_before_operation: item.sf_before_operation,
          sf_1_month_after_operation: item.sf_1_month_after_operation,
          sf_3_months_after_operation: item.sf_3_months_after_operation,
          sf_6_months_after_operation: item.sf_6_months_after_operation,
          sf_12_months_after_operation: item.sf_12_months_after_operation,
          ct_before_operation: item.ct_before_operation,
          ct_1_month_after_operation: item.ct_1_month_after_operation,
          ct_3_months_after_operation: item.ct_3_months_after_operation,
          ct_6_months_after_operation: item.ct_6_months_after_operation,
          ct_12_months_after_operation: item.ct_12_months_after_operation,
          crb: item.crb,
          osteoporosis: item.osteoporosis,
          height: item.height,
          weight: item.weight,
          bmi: item.bmi,
          intraoperative_culture_result: item.intraoperative_culture_result,
          pathogen: item.pathogen,
          asa_risk: item.asa_risk,
          blood_group: item.blood_group,
          rh_factor: item.rh_factor,
          complications: item.complications,
          mcnab_scale: item.mcnab_scale,
          initial_platelet_level: item.initial_platelet_level,
          final_platelet_level: item.final_platelet_level,
          final_thrombogel_volume: item.final_thrombogel_volume,
          alloimmunity: item.alloimmunity,
        })));
        setTableData([...responseData]);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchData();
  }, []);

  const [pageSize, setPageSize] = useState(10); // начальное количество строк на странице

  const paginationSet = {
    position: ['topRight', 'bottomRight'],
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50'],
    onShowSizeChange: (current, newSize) => {
      setPageSize(newSize);
    }
  };

  return (
  <ConfigProvider locale={ruRU}>
    <div className="header-container">
      <h1 className="app-title">Реестр пациентов</h1>
      <div className="buttons-container">
        <Button type="primary" className="add-data-button" onClick={openModal}> 
          Добавить данные
        </Button>
        <Excel data={tableData}/>
      </div>
    </div>
      <Table
        key={resetKey}
        columns={columns} 
        dataSource={tableData} 
        pagination={paginationSet} 
        bordered={true} 
        scroll={{ y: 3000 }}
        style={{ overflowX: 'auto' }} // горизонтальная прокрутка
        className="App"
      />
      <ModalForm
      visible={isModalVisible}
      onCancel={handleCancel}
      onSave={handleSave}
      />
      <EditModalForm
      visible={isEditModalVisible}
      onCancel={() => setIsEditModalVisible(false)}
      onSave={handleEditSave}
      currentData={currentEditData}
    />
    </ConfigProvider>
  );
};

export default PatientsTable;
