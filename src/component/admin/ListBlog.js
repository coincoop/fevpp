import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../css/menulist.css"
import { API_URL } from "../../config";

const ListBlog = () => {
  const [blogs, setBlog] = useState([]);

  useEffect(() => {
    getBlog();
  }, []);

  const getBlog = async () => {
    const response = await axios.get("http://localhost:5000/admin/blog");
    setBlog(response.data);
  };

  const deleteBlog = async (id) => {
    try {
      const check =await axios.delete(`http://localhost:5000/admin/blog/${id}`); 
      getBlog();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="columns my-5">
  <div className="column">
    <Link to={`addblog`} className="btn btn-primary mb-2">Thêm mới</Link>
    <table className="table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Tên</th>
          <th>Đường dẫn</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {blogs.map((blog, index) => (
          <tr key={index+1}>
            <td>{blog.idblog}</td>
            <td>{blog.tenblog}</td>
            <td>{blog.url}</td>
            <td>
              <Link to={`editblog/${blog.idblog}`} className="btn btn-primary me-2">Sửa</Link>
              <button onClick={() => deleteBlog(blog.idblog)} className="btn btn-danger">Xóa</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default ListBlog;
