import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Dropzone from "react-dropzone";
import unidecode from "unidecode";
import "../../css/addmenu.css";
import { API_URL } from "../../config";

const EditMenu = () => {
  const [name, setName] = useState("");
  const [parent_id, setParentId] = useState("");
  const [img, setImg] = useState(null);
  const [mainImgUrl, setMainImgUrl] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [menuList, setMenuList] = useState([]);
  useEffect(() => {
    getMenuById();
    getMenus();
  },[]);
 
  const getMenus = async () => {
    const response = await axios.get("http://localhost:5000/menus");
    setMenuList(response.data);
  };
  const updateMenu = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("parent_id", parent_id);
    formData.append("img", img);
    formData.append("url", url);
    console.log(formData.get("img"));

    try {
      await axios.patch(`${API_URL}admin/admenus/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const getMenuById = async () => {
    const response = await axios.get(`${API_URL}admin/admenus/${id}`);
    setName(response.data.name);
    setParentId(response.data.parent_id);
    setImg(response.data.img);
    setUrl(response.data.url);
    
  };
  const handleMainImageDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setImg(acceptedFiles[0]);
      setMainImgUrl(URL.createObjectURL(acceptedFiles[0]));
    }
  };
  return (
    <div className="containeradmin">
      <div className="row">
      <div className="col-md-6 offset-md-3">
        <form onSubmit={updateMenu}>
          <div>
            <label className="form-label">Tên Menu</label>
           
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  const value = e.target.value;
                  const url = unidecode(value)
                    .toLowerCase()
                    .replace(/\s+/g, "-") // Thay thế khoảng trắng bằng dấu gạch ngang
                    .replace(/[^a-z0-9-]+/g, ""); // Loại bỏ các ký tự không phải chữ cái, số, dấu gạch ngang
                  setName(value);
                  setUrl(url);
                }}
              />
            
          </div>
          <div className="mb-3">
              <label htmlFor="parent_id" className="form-label">
                Menu cha
              </label>
              <select
                className="select-control"
                id="parent_id"
                value={parent_id}
                onChange={(e) => setParentId(e.target.value)}
              >
                <option value="">-- Chọn menu cha--</option>
                {menuList.map((menu) => (
                  <option key={menu.id} value={menu.id}>
                    {menu.name}
                  </option>
                ))}
              </select>
            </div>
          <div className="mb-3">
            <label htmlFor="img" className="form-label">
              Ảnh chính
            </label>
            <Dropzone onDrop={handleMainImageDrop}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className="dropzone">
                  <input {...getInputProps()} />
                  {mainImgUrl ? (
                    <img
                      src={mainImgUrl}
                      alt="main"
                      className="img-thumbnail"
                    />
                  ) : (
                    <img
                      src={`/img/menu/${img}`}
                      alt="main"
                      className="img-thumbnail"
                    />
                  )}
                </div>
              )}
            </Dropzone>
          </div>
          <div className="mb-3">
            <label className="form-label">Url</label>
            
              <input
                type="text"
                placeholder="Url"
                className="form-control"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            
          </div>
          <div style={{textAlign: "center"}}>
              <button type="submit" className="btn btn-primary" >Update</button>
            </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default EditMenu;
