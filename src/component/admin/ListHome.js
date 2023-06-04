import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table, Switch, Image, Button,Space,Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { API_URL } from "../../config";
const ListHome = () => {
  const [home, setHome] = useState([]);

  useEffect(() => {
    getHome();
  }, []);

  const getHome = async () => {
    try {
      const response = await axios.get("http://localhost:5000/admin/home");
      setHome(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHome = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/admin/home/${id}`);
      getHome();
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 1 ? 0 : 1;
      await axios.put(`http://localhost:5000/admin/home/${id}`, {
        status: newStatus,
      });
      getHome();
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: "Kích hoạt",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <Switch
          checked={record.status === 1}
          onChange={() => updateStatus(record.id, record.status)}
        />
      ),
      fixed: "left",
      width: 100,
    },
    {
      title: "Tên",
      dataIndex: "ten",
      key: "ten",
      fixed: "left",
      width: 120,
    },
    {
      title: "Hình Header",
      dataIndex: "imghead",
      key: "imghead",
      render: (imghead, record) => (
        <Image src={`/img/home/${imghead}`} width={75} alt={record.name} />
      ),
      width: 120,
    },
    {
      title: "Hình Footer",
      dataIndex: "imgfoot",
      key: "imgfoot",
      render: (imgfoot, record) => (
        <Image src={`/img/home/${imgfoot}`} width={75} alt={record.name} />
      ),
      width: 120,
    },
    {
      title: "Hình Slide 1",
      dataIndex: "img1",
      key: "img1",
      render: (img1, record) => (
        <Image src={`/img/home/${img1}`} width={75} alt={record.name} />
      ),
      width: 120,
    },
    {
      title: "Hình Slide 2",
      dataIndex: "img2",
      key: "img2",
      render: (img2, record) => (
        <Image src={`/img/home/${img2}`} width={75} alt={record.name} />
      ),
      width: 120,
    },
    {
      title: "Hình Slide 3",
      dataIndex: "img3",
      key: "img3",
      render: (img3, record) => (
        <Image src={`/img/home/${img3}`} width={75}  alt={record.name} />
      ),
      width: 120,
    },
    {
      title: "Mô tả",
      dataIndex: "mota",
      key: "mota",
      ellipsis: {
        showTitle: false,
      },
      render: (mota) => (
        <Tooltip placement="topLeft" title={mota}>
          {mota}
        </Tooltip>
      ),
      width: 150,
    },
    {
      title: "Mô tả Footer",
      dataIndex: "motaFooter",
      key: "motaFooter",
      ellipsis: {
        showTitle: false,
      },
      render: (motaFooter) => (
        <Tooltip placement="topLeft" title={motaFooter}>
          {motaFooter}
        </Tooltip>
      ),
      width: 150,
    },
    {
      title: "Số điện thoại",
      dataIndex: "sdt",
      key: "sdt",
      width: 130,
    },
    {
      title: "Địa chỉ",
      dataIndex: "diachi",
      key: "diachi",
      width: 150,
    },
    {
      title: "Gmail",
      dataIndex: "gmail",
      key: "gmail",
      width: 130,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      
      render: (_, record) => (
        <Space>
          <Link to={`edithome/${record.id}`}>
            <Button type="primary"
              size="large" icon={<EditOutlined />} />
          </Link>
          <Button
            type="primary"
            size="large"
            danger
            icon={<DeleteOutlined />}
            onClick={() => deleteHome(record.id)}
          />
        </Space>
      ),
      fixed: "right",
      width: 120,
    },
  ];

  return (
   
      <div >
        <Link to={`addhome`} className="btn btn-primary mb-2">
          Thêm mới
        </Link>
        <Table columns={columns} dataSource={home} pagination={false} bordered scroll={{
          x: 1000,
          y: "calc(100vh - 300px)",
        }}/>
      </div>
 
  );
};

export default ListHome;
