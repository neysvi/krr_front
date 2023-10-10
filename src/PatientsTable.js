import React, { useState, useRef, useEffect} from 'react';
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import ModalForm from './ModalForm';
import EditModalForm from './EditModalForm';
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
  
      const response = await fetch(`http://localhost:5000/edit_data/${id}`, {
        method: 'PUT',
        body: dataToSend,
      });
  
      if (response.ok) {
        const updatedDataResponse = await fetch('http://localhost:5000/get_data');
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
      const response = await fetch(`http://localhost:5000/delete_data/${record.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedDataResponse = await fetch('http://localhost:5000/get_data');
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
      const response = await fetch('http://127.0.0.1:5000/insert_data', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const updatedDataResponse = await fetch('http://localhost:5000/get_data');
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
                placeholder={`Search ${dataIndex}`}
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
                    Search
                </Button>
                <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
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

    const NeurolDeficitBoolean = ({ value }) => {
        return value ? 'Да' : 'Нет';
    };

    const GenderBoolean = ({ value }) => {
        return value ? 'Ж' : 'М';
    };

    const IntraopCultBoolean = ({ value }) => {
        return value ? 'Положительный' : 'Отрицательный';
    };

    const RhBoolean = ({ value }) => {
        return value ? 'RH+' : 'RH-';
    };

    const VashColumn = ({ record }) => {
        const values = [
            record.vash_before_operation,
            record.vash_1_month_after_operation,
            record.vash_3_months_after_operation,
            record.vash_6_months_after_operation,
            record.vash_12_months_after_operation,
        ]
        const renderedValues = values.map((value, index) => {
            if (value === null || value === undefined) {
                return ' ';
            } else {
                return value;
            }
        });
      
        return <>{renderedValues.join('/')}</>;
    };

    const ODIColumn = ({ record }) => {
        const values = [
            record.odi_before_operation,
            record.odi_1_month_after_operation,
            record.odi_3_months_after_operation,
            record.odi_6_months_after_operation,
            record.odi_12_months_after_operation,
        ]
        const renderedValues = values.map((value, index) => {
            if (value === null || value === undefined) {
                return ' ';
            } else {
                return value;
            }
        });
      
        return <>{renderedValues.join('/')}</>;
    };

    const SFColumn = ({ record }) => {
        const values = [
            record.sf_before_operation,
            record.sf_1_month_after_operation,
            record.sf_3_months_after_operation,
            record.sf_6_months_after_operation,
            record.sf_12_months_after_operation,
        ]
        const renderedValues = values.map((value, index) => {
            if (value === null || value === undefined) {
                return ' ';
            } else {
                return value;
            }
        });
      
        return <>{renderedValues.join('/')}</>;
    };

    const vashSorter = (a, b) => {
        const combinedA = [
          a.vash_before_operation,
          a.vash_1_month_after_operation,
          a.vash_3_months_after_operation,
          a.vash_6_months_after_operation,
          a.vash_12_months_after_operation,
        ].map(value => (value !== null && value !== undefined ? parseFloat(value) : NaN));
      
        const combinedB = [
          b.vash_before_operation,
          b.vash_1_month_after_operation,
          b.vash_3_months_after_operation,
          b.vash_6_months_after_operation,
          b.vash_12_months_after_operation,
        ].map(value => (value !== null && value !== undefined ? parseFloat(value) : NaN));
      
        return combinedA[0] - combinedB[0];
    };

    const odiSorter = (a, b) => {
        const combinedA = [
          a.odi_before_operation,
          a.odi_1_month_after_operation,
          a.odi_3_months_after_operation,
          a.odi_6_months_after_operation,
          a.odi_12_months_after_operation,
        ].map(value => (value !== null && value !== undefined ? parseFloat(value) : NaN));
      
        const combinedB = [
          b.odi_before_operation,
          b.odi_1_month_after_operation,
          b.odi_3_months_after_operation,
          b.odi_6_months_after_operation,
          b.odi_12_months_after_operation,
        ].map(value => (value !== null && value !== undefined ? parseFloat(value) : NaN));
      
        return combinedA[0] - combinedB[0];
    };

    const sfSorter = (a, b) => {
        const combinedA = [
          a.sf_before_operation,
          a.sf_1_month_after_operation,
          a.sf_3_months_after_operation,
          a.sf_6_months_after_operation,
          a.sf_12_months_after_operation,
        ].map(value => (value !== null && value !== undefined ? parseFloat(value) : NaN));
      
        const combinedB = [
          b.sf_before_operation,
          b.sf_1_month_after_operation,
          b.sf_3_months_after_operation,
          b.sf_6_months_after_operation,
          b.sf_12_months_after_operation,
        ].map(value => (value !== null && value !== undefined ? parseFloat(value) : NaN));
      
        return combinedA[0] - combinedB[0]; 
    };

    // Функция для форматирования даты из "yyyy-mm-dd" в "dd-mm-yyyy"
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
      title: 'Доктор',
      dataIndex: 'doctor',
      key: 'doctor',
      width: getColumnWidth('Доктор'),
      ...getColumnSearchProps('doctor'),
      sorter: (a, b) => a.doctor.localeCompare(b.doctor),
    },
    {
        title: 'ФИО',
        dataIndex: 'full_name',
        key: 'full_name',
        width: getColumnWidth('ФИО'),
        sorter: (a, b) => a.full_name.localeCompare(b.full_name),
    },
    {
        title: 'Пол',
        dataIndex: 'gender',
        key: 'gender',
        width: getColumnWidth('Пол'),
        sorter: (a, b) => a.gender - b.gender,
        render: (value) => <GenderBoolean value={value} />,
    },
    {
        title: 'Дата рождения',
        dataIndex: 'birth_date',
        key: 'birth_date',
        width: getColumnWidth('Дата рождения'),
        sorter: (a, b) => dateSorter(a.birth_date, b.birth_date),
        render: (text, record) => moment(record.birth_date).format('DD-MM-YYYY'),
    },
    {
        title: 'Возраст',
        dataIndex: 'age',
        key: 'age',
        width: getColumnWidth('Возраст'),
        sorter: (a, b) => a.age - b.age,
    },
    {
        title: 'Диагноз по МКБ',
        dataIndex: 'diagnosis_mkb',
        key: 'diagnosis_mkb',
        width: getColumnWidth('Диагноз по МКБ'),
        sorter: (a, b) => a.diagnosis_mkb.localeCompare(b.diagnosis_mkb),
    },
    {
        title: 'Дата операции',
        dataIndex: 'operation_date',
        key: 'operation_date',
        width: getColumnWidth('Дата операции'),
        sorter: (a, b) => dateSorter(a.operation_date, b.operation_date),
        render: (text, record) => moment(record.operation_date).format('DD-MM-YYYY'),
    },
    {
        title: 'Название операции',
        dataIndex: 'operation_name',
        key: 'operation_name',
        width: getColumnWidth('Название операции'),
        sorter: (a, b) => a.operation_name.localeCompare(b.operation_name),
    },
    {
        title: 'Уровень вмешательства',
        dataIndex: 'intervention_level',
        key: 'intervention_level',
        width: getColumnWidth('Уровень вмешательства'),
        sorter: (a, b) => a.intervention_level.localeCompare(b.intervention_level),
    },
    {
        title: 'Время между первичной и ревизионной операцией',
        dataIndex: 'time_between_primary_and_revision_operation',
        key: 'atime_between_primary_and_revision_operationge',
        width: getColumnWidth('Время между первичной и ревизионной операцией'),
        sorter: (a, b) => a.time_between_primary_and_revision_operation - b.time_between_primary_and_revision_operation,
    },
    {
        title: 'Неврологический дефицит',
        dataIndex: 'neurological_deficit',
        key: 'neurological_deficit',
        width: getColumnWidth('Неврологический дефицит'),
        sorter: (a, b) => a.neurological_deficit - b.neurological_deficit,
        render: (value) => <NeurolDeficitBoolean value={value} />,
    },
    {
        title: 'Индекс коморбидности Чарлсона',
        dataIndex: 'charlson_index',
        key: 'charlson_index',
        width: getColumnWidth('Индекс коморбидности Чарлсона'),
        sorter: (a, b) => a.charlson_index - b.charlson_index,
    },
    {
        title: 'ВАШ (визуально-аналоговая спина)',
        dataIndex: 'vash',
        key: 'vash',
        width: 200,
        render: (value, record) => <VashColumn record={record} />,
        sorter: vashSorter,
    },
    {
        title: 'ODI',
        dataIndex: 'odi',
        key: 'odi',
        width: 200,
        render: (value, record) => <ODIColumn record={record} />,
        sorter: odiSorter,
    },
    {
        title: 'SF 36',
        dataIndex: 'sf',
        key: 'sf',
        width: 200,
        render: (value, record) => <SFColumn record={record} />,
        sorter: sfSorter,
    },
    {
      title: 'КТ (компьютерная томография)',
      dataIndex: 'ct_before_operation',
      key: 'ct_before_operation',
      width: getColumnWidth('КТ (компьютерная томография)'),
      sorter: (a, b) => a.ct_before_operation.localeCompare(b.ct_before_operation),
      render: (text, record) => (
        <a href={record.ct_before_operation} target="_blank" rel="noopener noreferrer">
          Скачать
        </a>
      ),
    },    
    {
        title: 'СРБ (с-реактивный белок)  до операции',
        dataIndex: 'crb',
        key: 'crb',
        width: getColumnWidth('СРБ (с-реактивный белок) до операции'),
        sorter: (a, b) => a.crb - b.crb,
    },
    {
        title: 'Остеопороз (HU)',
        dataIndex: 'osteoporosis',
        key: 'osteoporosis',
        width: getColumnWidth('Остеопороз (HU)'),
        sorter: (a, b) => a.osteoporosis - b.osteoporosis,
    },
    {
        title: 'Рост',
        dataIndex: 'height',
        key: 'height',
        width: getColumnWidth('Рост'),
        sorter: (a, b) => a.height - b.height,
    },
    {
        title: 'Вес',
        dataIndex: 'weight',
        key: 'weight',
        width: getColumnWidth('Вес'),
        sorter: (a, b) => a.weight - b.weight,
    },
    {
        title: 'BMI (индекс массы тела)',
        dataIndex: 'bmi',
        key: 'bmi',
        width: getColumnWidth('BMI (индекс массы тела)'),
        sorter: (a, b) => a.bmi - b.bmi,
    },
    {
        title: 'Интраоперационный посев',
        dataIndex: 'intraoperative_culture_result',
        key: 'intraoperative_culture_result',
        width: getColumnWidth('Интраоперационный посев'),
        sorter: (a, b) => a.intraoperative_culture_result - b.intraoperative_culture_result,
        render: (value) => <IntraopCultBoolean value={value} />,
    },
    {
        title: 'Риск по ASA',
        dataIndex: 'asa_risk',
        key: 'asa_risk',
        width: getColumnWidth('Риск по ASA'),
        sorter: (a, b) => a.asa_risk - b.asa_risk,
    },
    {
        title: 'Группа крови',
        dataIndex: 'blood_group',
        key: 'blood_group',
        width: getColumnWidth('Группа крови'),
        sorter: (a, b) => a.blood_group - b.blood_group,
    },
    {
        title: 'Резус фактор',
        dataIndex: 'rh_factor',
        key: 'rh_factor',
        width: getColumnWidth('Резус фактор'),
        sorter: (a, b) => a.rh_factor - b.rh_factor,
        render: (value) => <RhBoolean value={value} />,
    },
    {
        title: 'Осложнения',
        dataIndex: 'complications',
        key: 'complications',
        width: getColumnWidth('Осложнения'),
        sorter: (a, b) => a.complications.localeCompare(b.complications),
    },
    {
        title: 'Шкала Макнаб',
        dataIndex: 'mcnab_scale',
        key: 'mcnab_scale',
        width: getColumnWidth('Шкала Макнаб'),
        sorter: (a, b) => a.mcnab_scale - b.mcnab_scale,
    },
    {
        title: 'Исходный уровень тромбоцитов, *109/л',
        dataIndex: 'initial_platelet_level',
        key: 'initial_platelet_level',
        width: getColumnWidth('Исходный уровень тромбоцитов, *109/л'),
        sorter: (a, b) => a.initial_platelet_level - b.initial_platelet_level,
    },
    {
        title: 'Конечный уровень тромбоцитов, *109/л',
        dataIndex: 'final_platelet_level',
        key: 'final_platelet_level',
        width: getColumnWidth('Конечный уровень тромбоцитов, *109/л'),
        sorter: (a, b) => a.final_platelet_level - b.final_platelet_level,
    },
    {
        title: 'Конечный объем тромбогеля, мл',
        dataIndex: 'final_thrombogel_volume',
        key: 'final_thrombogel_volume',
        width: getColumnWidth('Конечный объем тромбогеля, мл'),
        sorter: (a, b) => a.final_thrombogel_volume - b.final_thrombogel_volume,
    },
    {
        title: 'Аллокость',
        dataIndex: 'alloimmunity',
        key: 'alloimmunity',
        width: getColumnWidth('Аллокость'),
        sorter: (a, b) => a.alloimmunity - b.alloimmunity,
        render: (value) => <NeurolDeficitBoolean value={value} />,
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

  useEffect(() => {
    // функция для получения данных от API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/get_data', {
          method: 'GET',
          credentials: 'include', // куки
        });
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
          ct: item.ct_before_operation,
          crb: item.crb,
          osteoporosis: item.osteoporosis,
          height: item.height,
          weight: item.weight,
          bmi: item.bmi,
          intraoperative_culture_result: item.intraoperative_culture_result,
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
  <>
    <div className="header-container">
      <h1 className="app-title">Реестр пациентов</h1>
      <Button type="primary" className="add-data-button" onClick={openModal}>
        Добавить данные
      </Button>
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
    </>
  );
};

export default PatientsTable;
