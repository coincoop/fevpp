import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table, Switch, Image, Button,Space,Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { API_URL } from "../../config";
import { getDownloadURL,ref } from "firebase/storage";
import { storage } from "../../firebase";
const ListHome = () => {
  const [home, setHome] = useState([]);

  useEffect(() => {
    getHome();
  }, []);

  const getHome = async () => {
    try {
      const response = await axios.get(`${API_URL}admin/home`);
      const homedata = response.data;
      await Promise.all(
        homedata.map(async (home) => {
          if (home.imghead) {
            const storageRef1 = ref(storage, `home/${home.imghead}`);
            const imgUrlHead = await getDownloadURL(storageRef1);
            home.imghead = imgUrlHead;
          }
          if (home.imgfoot) {
            const storageRef2 = ref(storage, `home/${home.imgfoot}`);
            const imgUrlFoot = await getDownloadURL(storageRef2);
            home.imgfoot = imgUrlFoot;
          }
          if (home.img1) {
            const storageRef3 = ref(storage, `home/${home.img1}`);
            const imgUrl1 = await getDownloadURL(storageRef3);
            home.img1 = imgUrl1;
          }
          if (home.img2) {
            const storageRef4 = ref(storage, `home/${home.img2}`);
            const imgUrl2 = await getDownloadURL(storageRef4);
            home.img2 = imgUrl2;
          }
          if (home.img3) {
            const storageRef5 = ref(storage, `home/${home.img3}`);
            const imgUrl3 = await getDownloadURL(storageRef5);
            home.img3 = imgUrl3;
          }
        })
      );
      setHome(homedata);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHome = async (id) => {
    try {
      await axios.delete(`${API_URL}admin/home/${id}`);
      getHome();
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 1 ? 0 : 1;
      await axios.put(`${API_URL}admin/home/${id}`, {
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
        <Image src={imghead} width={75} alt={record.name} />
      ),
      width: 120,
    },
    {
      title: "Hình Footer",
      dataIndex: "imgfoot",
      key: "imgfoot",
      render: (imgfoot, record) => (
        <Image src={imgfoot} width={75} alt={record.name} />
      ),
      width: 120,
    },
    {
      title: "Hình Slide 1",
      dataIndex: "img1",
      key: "img1",
      render: (img1, record) => (
        <Image src={img1} width={75} alt={record.name} />
      ),
      width: 120,
    },
    {
      title: "Hình Slide 2",
      dataIndex: "img2",
      key: "img2",
      render: (img2, record) => (
        <Image src={img2} width={75} alt={record.name} />
      ),
      width: 120,
    },
    {
      title: "Hình Slide 3",
      dataIndex: "img3",
      key: "img3",
      render: (img3, record) => (
        <Image src={img3} width={75}  alt={record.name} />
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
