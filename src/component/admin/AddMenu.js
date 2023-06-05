import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import "../../css/addmenu.css";
import unidecode from "unidecode";
import { API_URL } from "../../config";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";

import { storage } from "../../firebase.js";
const AddMenu = () => {
  const [name, setName] = useState("");
  const [parent_id, setParentId] = useState("");
  const [img, setImg] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [url, setUrl] = useState("");
  const [menuList, setMenuList] = useState([]);
  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getMenus();
  }, []);

  const getMenus = async () => {
    const response = await axios.get(`${API_URL}admin/admenus`);
    setMenuList(response.data);
  };


  const saveMenu = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("parent_id", parent_id);
      formData.append("url", url);
      formData.append("img", img);

      try {
        setLoading(true);
        const imagesListRef = ref(storage, "menu/");

        if (img == null) return;
        const imageRef = ref(storage, `menu/${img.name}`);
        uploadBytes(imageRef, img).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            setImageUrls((prev) => [...prev, url]);
          });
        });

        await axios.post(
          `${API_URL}admin/admenus`,
          {
            name,
            parent_id,
            url,
            img: img.name,
          },

          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );


        navigate("/admin");
      } catch (error) {
        console.log(error);
      }
      finally {
        setLoading(false);
      }
    }
  };

  const validateForm = () => {
    const errors = {};

    if (name.trim() === "") {
      errors.name = "Vui lòng nhập tên menu";
    }
    if (parent_id.trim() === "") {
      errors.parent_id = "Vui lòng chọn menu cha";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleMainImageDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setImg(acceptedFiles[0]);

    }
  };

  return (
    <>
      {loading && <div><div class="box-of-star1">
        <div class="star star-position1"></div>
        <div class="star star-position2"></div>
        <div class="star star-position3"></div>
        <div class="star star-position4"></div>
        <div class="star star-position5"></div>
        <div class="star star-position6"></div>
        <div class="star star-position7"></div>
      </div>
        <div class="box-of-star2">
          <div class="star star-position1"></div>
          <div class="star star-position2"></div>
          <div class="star star-position3"></div>
          <div class="star star-position4"></div>
          <div class="star star-position5"></div>
          <div class="star star-position6"></div>
          <div class="star star-position7"></div>
        </div>
        <div class="box-of-star3">
          <div class="star star-position1"></div>
          <div class="star star-position2"></div>
          <div class="star star-position3"></div>
          <div class="star star-position4"></div>
          <div class="star star-position5"></div>
          <div class="star star-position6"></div>
          <div class="star star-position7"></div>
        </div>
        <div class="box-of-star4">
          <div class="star star-position1"></div>
          <div class="star star-position2"></div>
          <div class="star star-position3"></div>
          <div class="star star-position4"></div>
          <div class="star star-position5"></div>
          <div class="star star-position6"></div>
          <div class="star star-position7"></div>
        </div>
        <div data-js="astro" class="astronaut">
          <div class="head"></div>
          <div class="arm arm-left"></div>
          <div class="arm arm-right"></div>
          <div class="body">
            <div class="panel"></div>
          </div>
          <div class="leg leg-left"></div>
          <div class="leg leg-right"></div>
          <div class="schoolbag"></div>
        </div></div>}
      {!loading && (
        <div className="containeradmin">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <form onSubmit={saveMenu} encType="multipart/form-data" method="post">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Tên menu
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    id="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => {
                      const value = e.target.value;
                      const url = unidecode(value)
                        .toLowerCase()
                        .replace(/\s+/g, "-")
                        .replace(/[^a-z0-9-]+/g, "");
                      setName(value);
                      setUrl(url);
                    }}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="parent_id" className="form-label">
                    Menu cha
                  </label>
                  <select
                    className={`form-control ${errors.parent_id ? "is-invalid" : ""}`}
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
                  {errors.parent_id && <div className="invalid-feedback">{errors.parent_id}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="img" className="form-label">
                    Ảnh chính
                  </label>
                  <Dropzone onDrop={handleMainImageDrop}>
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()} className="dropzone">
                        <input {...getInputProps()} />
                        {img ? (
                          <img
                            src={URL.createObjectURL(img)}
                            alt="main"
                            className="img-thumbnail"
                          />
                        ) : (
                          <p>Kéo vào hoặc chọn ảnh</p>
                        )}
                      </div>
                    )}
                  </Dropzone>
                </div>
                <div className="mb-3">
                  <label htmlFor="url" className="form-label">
                    Url
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="url"
                    placeholder="Url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
                <div style={{ textAlign: "center" }}><button type="submit" className="btn btn-primary" >
                  Thêm
                </button></div>
              </form>
            </div>
          </div>

        </div>
      )}
    </>
  );
};

export default AddMenu;
