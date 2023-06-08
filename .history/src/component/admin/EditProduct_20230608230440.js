import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Dropzone from "react-dropzone";
import { Editor } from "@tinymce/tinymce-react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";

import { storage } from "../../firebase.js";
import "../../css/addmenu.css";
import { API_URL } from "../../config";
import unidecode from "unidecode";
const EditProduct = () => {
  const [warning, setWarning] = useState("");
  const [tensp, setTensp] = useState("");
  const [mota, setMota] = useState("");
  const [mota_chinh, setMotachinh] = useState("");
  const [dongia, setDongia] = useState("");
  const [giacu, setGiacu] = useState(0);
  const [img, setImg] = useState(null);
  const [mainImgUrl, setMainImgUrl] = useState("");
  const [img_con, setImg_con] = useState([]);
  const [subImgUrls, setSubImgUrls] = useState([]);
  const [id_nhacungcap, setIdnhacungcap] = useState("");
  const [id_loailon, setIdloailon] = useState("");
  const [id_loai, setIdloai] = useState("");
  const [color, setColor] = useState("");
  const [menu1List, setMenu1List] = useState([]);
  const [menu2List, setMenu2List] = useState([]);
  const [donvitinh, setDonvitinh] = useState("");
  const [dinhluong, setDinhluong] = useState("");
  const [chatlieu, setChatlieu] = useState("");
  const [donggoi, setDonggoi] = useState("");
  const [khogiay, setKhogiay] = useState("");
  const [xuatxu, setXuatxu] = useState("");
  const [kichthuoc, setKichthuoc] = useState("");
  const [thuonghieu, setThuonghieu] = useState("");
  const [thetich, setThetich] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("tensp", tensp);
    formData.append("mota", mota);
    formData.append("mota_chinh", mota_chinh);
    formData.append("dongia", dongia);
    formData.append("giacu", giacu);
    formData.append("img", img);
    img_con.forEach((file) => {
      formData.append("img_con", file);
    });

    formData.append("id_nhacungcap", id_nhacungcap);
    formData.append("id_loailon", id_loailon);
    formData.append("id_loai", id_loai);
    formData.append("color", color);
    formData.append("donvitinh", donvitinh);
    formData.append("dinhluong", dinhluong);
    formData.append("chatlieu", chatlieu);
    formData.append("donggoi", donggoi);
    formData.append("khogiay", khogiay);
    formData.append("xuatxu", xuatxu);
    formData.append("kichthuoc", kichthuoc);
    formData.append("thuonghieu", thuonghieu);
    formData.append("thetich", thetich);
    formData.append("url", url);
    console.log(formData.get("img"));
    console.log(formData.getAll("img_con"));
    try {
      setLoading(true);
      if (img == null) return;
      const imageRef = ref(storage, `product/${img.name}`);
      uploadBytes(imageRef, img);

      
      img_con.forEach(async (file) => {
        const subImageRef = ref(storage, `product/${file.name}`);
        await uploadBytes(subImageRef, file);
       
      });
      await axios.patch(`${API_URL}admin/adproducts/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/admin");
      
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  };

  const getProductById = async () => {
    const response = await axios.get(`${API_URL}admin/adproducts/${id}`);
    setTensp(response.data.tensp);
    setMota(response.data.mota);
    setMotachinh(response.data.mota_chinh);
    setDongia(response.data.dongia);
    setGiacu(response.data.giacu);
    setImg(response.data.img);
    setImg_con(response.data.img_con);

    setIdnhacungcap(response.data.id_nhacungcap);
    setIdloailon(response.data.id_loailon);
    setIdloai(response.data.id_loai);
    setColor(response.data.color);
    setDonvitinh(response.data.donvitinh);
    setDinhluong(response.data.dinhluong);
    setChatlieu(response.data.chatlieu);
    setDonggoi(response.data.donggoi);
    setKhogiay(response.data.khogiay);
    setXuatxu(response.data.xuatxu);
    setKichthuoc(response.data.kichthuoc);
    setThuonghieu(response.data.thuonghieu);
    setThetich(response.data.thetich);
    setUrl(response.data.url);
    const imgConUrls = await Promise.all(
      response.data.img_con.split(",").map(async (name) => {
        const storageRef = ref(storage, `product/${name}`);
        return await getDownloadURL(storageRef);
      })
    );
    setImg_con(imgConUrls);
    if (response.data.img) {
      const storageRef = ref(storage, `product/${response.data.img}`);
      const imgUrl = await getDownloadURL(storageRef);
      setMainImgUrl(imgUrl);
    }
  };
  useEffect(() => {
    getMenus();
    getProductById();
  }, []);
  const getMenus = async () => {
    const response = await axios.get(`${API_URL}admin/admenus`);
    setMenu1List(response.data);
    setMenu2List(response.data);
  };
  const handleMainImageDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setImg(acceptedFiles[0]);
      setMainImgUrl(URL.createObjectURL(acceptedFiles[0]));
    }
  };
  const handleSubImageDrop = (acceptedFiles) => {
    if (acceptedFiles.length < 2) {
      setWarning("Please select at least 2 sub images");
      return;
    }
    setWarning("");
    const newSubImgUrls = acceptedFiles.map((file) =>
      URL.createObjectURL(file)
    );
    // Kiểm tra từng ảnh mới đã tồn tại trong danh sách chưa
    const newSubImgUrlsFiltered = newSubImgUrls.filter(
      (newUrl) => subImgUrls.findIndex((url) => url === newUrl) === -1
    );
    if (newSubImgUrlsFiltered.length > 0) {
      setImg_con([...acceptedFiles]);
      setSubImgUrls((prevUrls) => [...prevUrls, ...newSubImgUrlsFiltered]);
    }
  };
  
  return (
    <>
    <Helmet>
        <title>{`Sửa Blog - Admin`}</title>
      </Helmet>
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
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Tên sp</label>
              <div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tên sp"
                  value={tensp}
                  onChange={(e) => {
                    const value = e.target.value;
                    const url = unidecode(value)
                      .toLowerCase()
                      .replace(/\s+/g, "-") // Thay thế khoảng trắng bằng dấu gạch ngang
                      .replace(/[^a-z0-9-]+/g, ""); // Loại bỏ các ký tự không phải chữ cái, số, dấu gạch ngang
                    setTensp(value);
                    setUrl(url);
                  }}
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Url</label>
              <div>
                <input
                  type="text"
                  placeholder="Url"
                  className="form-control"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="mota" className="form-label">
                Mô tả ngắn
              </label>
              <Editor
                apiKey="f6zg9q8gblile6r6rmxkgy1b153klpznygp25qf70md614u4"
                value={mota}
                init={{
                  height: 500,
                  menubar: true,
                  images_upload_max_filesize: "5mb",
                  plugins: [
                  
                    
                    "autoresize",
                    "autosave",
                    "autolink",
                    "autosubmit",
                    "bbcode",
                    
                    "codesample",
                    "directionality",
                    "emoticons",
                    "fullpage",
                    "fullscreen",
                    "help",
                    "hr",
                    "image",
                    "imagetools",
                    "importcss",
                    "insertdatetime",
                    "legacyoutput",
                    "link",
                    "lists",
                    "media",
                    "nonbreaking",
                    "noneditable",
                    "pagebreak",
                    "paste",
                    "preview",
                    "print",
                    "quickbars",
                    "searchreplace",
                    "spellchecker",
                    "tabfocus",
                    "table",
                    "template",
                    "textcolor",
                    "textpattern",
                    "toc",
                    "visualblocks",
                    "visualchars",
                    "wordcount",
                  ],
                  toolbar:
                    "undo redo | styleselect | bold italic underline strikethrough | " +
                    "forecolor backcolor | link image media | alignleft aligncenter " +
                    "alignright alignjustify | numlist bullist outdent indent | " +
                    "removeformat | subscript superscript | code | table | hr | " +
                    "blockquote | charmap | emoticons | preview | searchreplace | " +
                    "visualblocks | visualchars | fullscreen | help | insertdatetime | " +
                    "nonbreaking | pagebreak | paste",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
                onEditorChange={(content) => setMota(content)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="mota_chinh" className="form-label">
                Mô tả chi tiết
              </label>
              <Editor
                apiKey="f6zg9q8gblile6r6rmxkgy1b153klpznygp25qf70md614u4"
                value={mota_chinh}
                init={{
                  height: 500,
                  menubar: true,
                  images_upload_max_filesize: "5mb",
                  plugins: [
                  
                    
                    "autoresize",
                    "autosave",
                    "autolink",
                    "autosubmit",
                    "bbcode",
                    
                    "codesample",
                    "directionality",
                    "emoticons",
                    "fullpage",
                    "fullscreen",
                    "help",
                    "hr",
                    "image",
                    "imagetools",
                    "importcss",
                    "insertdatetime",
                    "legacyoutput",
                    "link",
                    "lists",
                    "media",
                    "nonbreaking",
                    "noneditable",
                    "pagebreak",
                    "paste",
                    "preview",
                    "print",
                    "quickbars",
                    "searchreplace",
                    "spellchecker",
                    "tabfocus",
                    "table",
                    "template",
                    "textcolor",
                    "textpattern",
                    "toc",
                    "visualblocks",
                    "visualchars",
                    "wordcount",
                  ],
                  toolbar:
                    "undo redo | styleselect | bold italic underline strikethrough | " +
                    "forecolor backcolor | link image media | alignleft aligncenter " +
                    "alignright alignjustify | numlist bullist outdent indent | " +
                    "removeformat | subscript superscript | code | table | hr | " +
                    "blockquote | charmap | emoticons | preview | searchreplace | " +
                    "visualblocks | visualchars | fullscreen | help | insertdatetime | " +
                    "nonbreaking | pagebreak | paste",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
                onEditorChange={(content) => setMotachinh(content)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Giá cũ</label>
              <div>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Giá cũ"
                  value={giacu}
                  min={0}
                  onChange={(e) => setGiacu(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Đơn giá</label>
              <div>
                <input
                  type="number"
                  placeholder="Đơn giá"
                  className="form-control"
                  value={dongia}
                  min={0}
                  onChange={(e) => setDongia(e.target.value)}
                />
              </div>
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
                        src={img}
                        alt="main"
                        className="img-thumbnail"
                      />
                    )}
                  </div>
                )}
              </Dropzone>
            </div>
            <div className="mb-3">
              <label htmlFor="img_con" className="form-label">
                Sub Images
              </label>
              <Dropzone onDrop={handleSubImageDrop}>
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()} className="dropzone">
                    <input {...getInputProps()} />
                    <p>Drop sub images here or click to select files</p>
                  </div>
                )}
              </Dropzone>
              {warning && <div className="alert alert-danger">{warning}</div>}
              {Array.isArray(img_con) && img_con.length > 0 && (
                <div className="mt-3 row">
                  {img_con.map((image, index) => (
                    <div key={`sub-image-${index}`} className="col-6">
                      {image.name &&
                      image.type &&
                      image.type.startsWith("image/") ? (
                        <img
                          src={URL.createObjectURL(image)}
                          alt="sub"
                          className="img-thumbnail"
                        />
                      ) : (
                        <img
                          src={image}
                          alt="sub"
                          className="img-thumbnail"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="id_loailon" className="form-label">
                Menu cấp 1
              </label>
              <select
                className="select-control"
                id="id_loailon"
                value={id_loailon}
                onChange={(e) => setIdloailon(e.target.value)}
              >
                <option value="">-- Chọn menu cấp 1 --</option>
                {menu1List.map((menu) => (
                  <option key={menu.id} value={menu.id}>
                    {menu.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="id_loai" className="form-label">
                Menu cấp 2
              </label>
              <select
                className="select-control"
                id="id_loai"
                value={id_loai}
                onChange={(e) => setIdloai(e.target.value)}
              >
                <option value="">-- Chọn menu cấp 2 --</option>
                {menu2List.map((menu) => (
                  <option key={menu.id} value={menu.id}>
                    {menu.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="color" className="form-label">
                Màu
              </label>
              <input
                type="text"
                className="form-control"
                id="color"
                placeholder="Nhập màu"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="donvitinh" className="form-label">
                Đơn vị tính
              </label>
              <input
                type="text"
                className="form-control"
                id="donvitinh"
                placeholder="Nhập đơn vị tính"
                value={donvitinh}
                onChange={(e) => setDonvitinh(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dinhluong" className="form-label">
                Định lượng
              </label>
              <input
                type="text"
                className="form-control"
                id="dinhluong"
                placeholder="Nhập định lượng"
                value={dinhluong}
                onChange={(e) => setDinhluong(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="chatlieu" className="form-label">
                Chất liệu
              </label>
              <input
                type="text"
                className="form-control"
                id="chatlieu"
                placeholder="Nhập chất liệu"
                value={chatlieu}
                onChange={(e) => setChatlieu(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="donggoi" className="form-label">
                Đóng gói
              </label>
              <input
                type="text"
                className="form-control"
                id="donggoi"
                placeholder="Nhập đóng gói"
                value={donggoi}
                onChange={(e) => setDonggoi(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="khogiay" className="form-label">
                Khổ giấy
              </label>
              <input
                type="text"
                className="form-control"
                id="khogiay"
                placeholder="Nhập khổ giấy"
                value={khogiay}
                onChange={(e) => setKhogiay(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="xuatxu" className="form-label">
                Xuất xứ
              </label>
              <input
                type="text"
                className="form-control"
                id="xuatxu"
                placeholder="Nhập xuất xứ"
                value={xuatxu}
                onChange={(e) => setXuatxu(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="kichthuoc" className="form-label">
                Kích thước
              </label>
              <input
                type="text"
                className="form-control"
                id="kichthuoc"
                placeholder="Nhập kích thước"
                value={kichthuoc}
                onChange={(e) => setKichthuoc(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="thuonghieu" className="form-label">
                Thương hiệu
              </label>
              <input
                type="text"
                className="form-control"
                id="thuonghieu"
                placeholder="Nhập thương hiệu"
                value={thuonghieu}
                onChange={(e) => setThuonghieu(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="thetich" className="form-label">
                Thể tích
              </label>
              <input
                type="text"
                className="form-control"
                id="thetich"
                placeholder="Nhập thể tích"
                value={thetich}
                onChange={(e) => setThetich(e.target.value)}
              />
            </div>
            
            <div style={{textAlign: "center"}}>
              <button type="submit" className="btn btn-primary" >Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
     )}
     </>
  );
};

export default EditProduct;
