import React, { useState, useRef, useEffect} from 'react';
import { Table, Input, Button, Space, Select } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

const StatisticsTable = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const getColumnWidth = (title) => {
    const padding = 16; // отступ
    const minWidth = 100; // минимальная ширина столбца
    const textWidth = title.length * 10; // ширину символа
    return Math.max(textWidth + padding, minWidth);
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

    const ConfIntColumn = ({ record }) => {
        const values = [
            record.confidence_interval_min,
            record.confidence_interval_max,
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

    const intervSorter = (a, b) => {
        const combinedA = [
          a.confidence_interval_min,
          a.confidence_interval_max,
        ].map(value => (value !== null && value !== undefined ? parseFloat(value) : NaN));
      
        const combinedB = [
          b.confidence_interval_min,
          b.confidence_interval_max,
        ].map(value => (value !== null && value !== undefined ? parseFloat(value) : NaN));
      
        return combinedA[0] - combinedB[0];
    };

  const columns = [
    {
        title: '№',
        dataIndex: 'id',
        key: 'id',
        sorter: (a, b) => a.id - b.id,
        fixed: 'left',
        width: getColumnWidth('№'),
    },
    {
        title: 'Название',
        dataIndex: 'column_name',
        key: 'column_name',
        width: getColumnWidth('Название'),
        ...getColumnSearchProps('column_name'),
        sorter: (a, b) => a.column_name.localeCompare(b.column_name),
    },
    {
        title: 'Среднее значение',
        dataIndex: 'mean',
        key: 'mean',
        width: getColumnWidth('Среднее значение'),
        sorter: (a, b) => a.mean - b.mean,
    },
    {
        title: 'Медиана',
        dataIndex: 'median',
        key: 'median',
        width: getColumnWidth('Медиана'),
        sorter: (a, b) => a.median - b.median,
    },
    {
        title: 'Доверительный интервал',
        dataIndex: 'confidence_interval',
        key: 'confidence_interval',
        width: 200,
        render: (value, record) => <ConfIntColumn record={record} />,
        sorter: intervSorter,
    },
    {
        title: 'Стандартная девиация',
        dataIndex: 'standard_deviation',
        key: 'standard_deviation',
        width: getColumnWidth('Стандартная девиация'),
        sorter: (a, b) => a.standard_deviation - b.standard_deviation,
    },
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/get_stat');
        const responseData = await response.json();
        setData(responseData.map((item, index) => ({
          key: index,
          id: item.id,
          column_name: item.column_name,
          mean: item.mean,
          median: item.median,
          confidence_interval_min: item.confidence_interval_min,
          confidence_interval_max: item.confidence_interval_max,
          standard_deviation: item.standard_deviation,
        })));
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchData();
  }, []);

  const [pageSize, setPageSize] = useState(10); 

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
      <h1 className="app-title">Расчетные показатели</h1>
    </div>
      <Table
        key={resetKey}
        columns={columns}
        dataSource={data}
        pagination={paginationSet}
        bordered={true}
        scroll={{ y: 3000 }}
        style={{ overflowX: 'auto' }}
        className="App"
      />
    </>
  );
};

export default StatisticsTable;
