import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import unidecode from "unidecode";

import { API_URL } from "../../config";
const EditBlog = () => {
  const [tenblog, setTenBlog] = useState("");
  const [mota, setMota] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    getBlogById();
  }, []);
  console.log(tenblog);
  console.log(mota);
  console.log(url);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("tenblog", tenblog);
    formData.append("mota", mota);
    formData.append("url", url);
    console.log(formData);
    try {
      await axios.patch(`${API_URL}blog/${id}`, formData, {
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

  const getBlogById = async () => {
    const response = await axios.get(`${API_URL}admin/blog/${id}`);
    console.log(response.data);
    setTenBlog(response.data.tenblog);
    setMota(response.data.mota);
    setUrl(response.data.url);
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Tên Blog</label>
            <div>
              <input
                type="text"
                placeholder="Tên blog"
                value={tenblog}
                onChange={(e) => {
                  const value = e.target.value;
                  const url = unidecode(value)
                    .toLowerCase()
                    .replace(/\s+/g, "-") // Thay thế khoảng trắng bằng dấu gạch ngang
                    .replace(/[^a-z0-9-]+/g, ""); // Loại bỏ các ký tự không phải chữ cái, số, dấu gạch ngang
                  setTenBlog(value);
                  setUrl(url);
                }}
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="mota_chinh" className="form-label">
              Mô tả chính
            </label>
            <Editor
              apiKey="f6zg9q8gblile6r6rmxkgy1b153klpznygp25qf70md614u4"
              value={mota}
              init={{
                height: 500,
                menubar: true,
                plugins: [
                  "a11ychecker",
                  "advcode",
                  "autoresize",
                  "autosave",
                  "autolink",
                  "autosubmit",
                  "bbcode",
                  "casechange",
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

          <div>
            <label>Url</label>
            <div>
              <input
                type="text"
                placeholder="Url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
