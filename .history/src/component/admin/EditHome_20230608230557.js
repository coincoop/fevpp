import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Dropzone from "react-dropzone";
import { Editor } from "@tinymce/tinymce-react";
import { Helmet } from "react-helmet";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";

import { storage } from "../../firebase.js";
import { API_URL } from "../../config";
const EditHome = () => {
  const [imghead, setImgHead] = useState(null);
  const [headImgUrl, setHeadImgUrl] = useState("");
  const [imgfoot, setImgFoot] = useState(null);
  const [footImgUrl, setFootImgUrl] = useState("");
  const [img1, setImg1] = useState(null);
  const [Img1Url, setImg1Url] = useState("");
  const [img2, setImg2] = useState(null);
  const [Img2Url, setImg2Url] = useState("");
  const [img3, setImg3] = useState(null);
  const [Img3Url, setImg3Url] = useState("");
  const [sdt, setSdt] = useState("");
  const [diachi, setDiachi] = useState("");
  const [gmail, setGmail] = useState("");
  const [mota, setMota] = useState("");
  const [motaFooter, setMotaFooter] = useState("");
  const [ten, setTen] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getHomeById();
  }, []);

  const updateHome = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("imghead", imghead);
    formData.append("imgfoot", imgfoot);
    formData.append("img1", img1);
    formData.append("img2", img2);
    formData.append("img3", img3);
    formData.append("sdt", sdt);
    formData.append("diachi", diachi);
    formData.append("gmail", gmail);
    formData.append("mota", mota);
    formData.append("motaFooter", motaFooter);
    formData.append("ten", ten);
    try {
      setLoading(true);
      if (imghead == null) return;
      const imageRef1 = ref(storage, `home/${imghead.name}`);
      uploadBytes(imageRef1, imghead).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {

        });
      });
      if (imgfoot == null) return;
      const imageRef2 = ref(storage, `home/${imgfoot.name}`);
      uploadBytes(imageRef2, imgfoot).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {

        });
      });
      if (img1 == null) return;
      const imageRef3 = ref(storage, `home/${img1.name}`);
      uploadBytes(imageRef3, img1).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {

        });
      });
      if (img2 == null) return;
      const imageRef4 = ref(storage, `home/${img2.name}`);
      uploadBytes(imageRef4, img2).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {

        });
      });
      if (img3 == null) return;
      const imageRef5 = ref(storage, `home/${img3.name}`);
      uploadBytes(imageRef5, img3).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {

        });
      });
      await axios.patch(`${API_URL}admin/home/${id}`, {
        ten,
        sdt,
       
        diachi,
        gmail,
        mota,
        motaFooter,
        imghead: imghead.name,
        imgfoot: imgfoot.name,
        img1: img1.name,
        img2: img2.name,
        img3: img3.name,
      }, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/admin");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  };
  const getHomeById = async () => {
    const response = await axios.get(`${API_URL}admin/home/${id}`);
    setImgHead(response.data.imghead);
    setImgFoot(response.data.imgfoot);
    setImg1(response.data.img1);
    setImg2(response.data.img2);
    setImg3(response.data.img3);
    setSdt(response.data.sdt);
    setDiachi(response.data.diachi);
    setGmail(response.data.gmail);
    setMota(response.data.mota);
    setMotaFooter(response.data.motaFooter);
    setTen(response.data.ten);
    if (response.data.imghead) {
      const storageRef = ref(storage, `home/${response.data.imghead}`);
      const headImgUrl = await getDownloadURL(storageRef);
      setHeadImgUrl(headImgUrl);
    }
    if (response.data.imgfoot) {
      const storageRef = ref(storage, `home/${response.data.imgfoot}`);
      const footImgUrl = await getDownloadURL(storageRef);
      setFootImgUrl(footImgUrl);
    }
    if (response.data.img1) {
      const storageRef = ref(storage, `home/${response.data.img1}`);
      const Img1Url = await getDownloadURL(storageRef);
      setImg1Url(Img1Url);
    }
    if (response.data.img2) {
      const storageRef = ref(storage, `home/${response.data.img2}`);
      const Img2Url = await getDownloadURL(storageRef);
      setImg2Url(Img2Url);
    }
    if (response.data.img3) {
      const storageRef = ref(storage, `home/${response.data.img3}`);
      const Img3Url = await getDownloadURL(storageRef);
      setImg3Url(Img3Url);
    }
  };
  const handleHeadImageDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setImgHead(acceptedFiles[0]);
      setHeadImgUrl(URL.createObjectURL(acceptedFiles[0]));
    }
  };
  const handleFootImageDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setImgFoot(acceptedFiles[0]);
      setFootImgUrl(URL.createObjectURL(acceptedFiles[0]));
    }
  };
  const handleImage1Drop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setImg1(acceptedFiles[0]);
      setImg1Url(URL.createObjectURL(acceptedFiles[0]));
    }
  };
  const handleImage2Drop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setImg2(acceptedFiles[0]);
      setImg2Url(URL.createObjectURL(acceptedFiles[0]));
    }
  };
  const handleImage3Drop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setImg3(acceptedFiles[0]);
      setImg3Url(URL.createObjectURL(acceptedFiles[0]));
    }
  };
  return (
    <>
    <Helmet>
        <title>{`Sửa Chủ Đề - Admin`}</title>
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
            <form onSubmit={updateHome}>
              <div className="mb-3">
                <label className="form-label">Tên</label>
                <div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tên"
                    id="ten"
                    value={ten}
                    onChange={(e) => setTen(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="imghead" className="form-label">
                  Ảnh Header
                </label>
                <Dropzone onDrop={handleHeadImageDrop}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()} className="dropzone">
                      <input {...getInputProps()} />
                      {headImgUrl ? (
                        <img
                          src={headImgUrl}
                          alt="main"
                          className="img-thumbnail"
                        />
                      ) : (
                        <img
                          src={imghead}
                          alt="main"
                          className="img-thumbnail"
                        />
                      )}
                    </div>
                  )}
                </Dropzone>
              </div>

              <div className="mb-3">
                <label htmlFor="imgfoot" className="form-label">
                  Ảnh Footer
                </label>
                <Dropzone onDrop={handleFootImageDrop}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()} className="dropzone">
                      <input {...getInputProps()} />
                      {footImgUrl ? (
                        <img
                          src={footImgUrl}
                          alt="main"
                          className="img-thumbnail"
                        />
                      ) : (
                        <img
                          src={imgfoot}
                          alt="main"
                          className="img-thumbnail"
                        />
                      )}
                    </div>
                  )}
                </Dropzone>
              </div>

              <div className="mb-3">
                <label htmlFor="img1" className="form-label">
                  Ảnh Slide 1
                </label>
                <Dropzone onDrop={handleImage1Drop}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()} className="dropzone">
                      <input {...getInputProps()} />
                      {Img1Url ? (
                        <img
                          src={Img1Url}
                          alt="main"
                          className="img-thumbnail"
                        />
                      ) : (
                        <img
                          src={img1}
                          alt="main"
                          className="img-thumbnail"
                        />
                      )}
                    </div>
                  )}
                </Dropzone>
              </div>

              <div className="mb-3">
                <label htmlFor="img2" className="form-label">
                  Ảnh Slide 2
                </label>
                <Dropzone onDrop={handleImage2Drop}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()} className="dropzone">
                      <input {...getInputProps()} />
                      {Img2Url ? (
                        <img
                          src={Img2Url}
                          alt="main"
                          className="img-thumbnail"
                        />
                      ) : (
                        <img
                          src={img2}
                          alt="main"
                          className="img-thumbnail"
                        />
                      )}
                    </div>
                  )}
                </Dropzone>
              </div>

              <div className="mb-3">
                <label htmlFor="img3" className="form-label">
                  Ảnh Slide 3
                </label>
                <Dropzone onDrop={handleImage3Drop}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()} className="dropzone">
                      <input {...getInputProps()} />
                      {Img3Url ? (
                        <img
                          src={Img3Url}
                          alt="main"
                          className="img-thumbnail"
                        />
                      ) : (
                        <img
                          src={img3}
                          alt="main"
                          className="img-thumbnail"
                        />
                      )}
                    </div>
                  )}
                </Dropzone>
              </div>
              <div className="mb-3">
                <label htmlFor="mota_chinh" className="form-label">
                  Mô tả chi tiết
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
                <label htmlFor="motaFooter" className="form-label">
                  Mô tả ở Footer
                </label>
                <Editor
                  apiKey="f6zg9q8gblile6r6rmxkgy1b153klpznygp25qf70md614u4"
                  value={motaFooter}
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
                  onEditorChange={(content) => setMotaFooter(content)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Số điện thoại</label>
                <div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="sdt"
                    id="sdt"
                    value={sdt}
                    onChange={(e) => setSdt(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="diachi" className="form-label">
                  Địa chỉ
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="diachi"
                  placeholder="Địa chỉ"
                  value={diachi}
                  onChange={(e) => setDiachi(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="gmail" className="form-label">
                  Gmail
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="gmail"
                  placeholder="Gmail"
                  value={gmail}
                  onChange={(e) => setGmail(e.target.value)}
                />
              </div>
              <div style={{ textAlign: "center" }}>
                <button type="submit" className="btn btn-primary" >Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditHome;
