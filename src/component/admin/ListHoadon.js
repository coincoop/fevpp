import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table, Button, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { API_URL } from "../../config";
import { DataGrid } from '@mui/x-data-grid';
const ListReview = () => {
    const [hoadon, setHoadon] = useState([]);

    useEffect(() => {
        getHoadon();
    }, []);

    const getHoadon = async () => {
        try {
            const response = await axios.get(`${API_URL}admin/hoadon`);
            setHoadon(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const columns = [
        { field: 'mahd', headerName: 'Mã hóa đơn', width: 130 },
        { field: 'makh', headerName: 'Mã khách hàng', width: 130 },
        { field: 'tongtien',type:'number', headerName: 'Tổng tiền', width: 130 },
        {
            field: 'email',
            headerName: 'Email',
            width: 250,
        },
        { field: 'diachi', headerName: 'Địa chỉ', width: 200 },
        { field: 'sodienthoai', headerName: 'Số điện thoại', width: 130 },
        { field: 'tinhtrang', headerName: 'Tình trạng', width: 70 },
    ];



    return (
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={hoadon}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            getRowId={(row) => row.mahd}
            checkboxSelection
          />
        </div>
      );
    
};

export default ListReview;
