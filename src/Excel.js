import React from 'react';
import * as XLSX from 'xlsx'; 
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import './App.css';

const Excel = ({ data }) => {
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'PatientsData');
    XLSX.writeFile(wb, 'patients_data.xlsx');
  };

  return (
    <div className="excel-button">
      <Button onClick={exportToExcel} icon={<DownloadOutlined />}>
        Выгрузить в Excel
      </Button>
    </div>
  );
};

export default Excel;


