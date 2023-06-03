import React, { useState, useEffect } from "react";
import "../css/account.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../config";

export default function Account() {
    const user = useSelector((state) => state.user.login.currentUser);
    const [userCart, setUserCart] = useState([]);
    const [productsByMakh, setProductsByMakh] = useState([]);

    useEffect(() => {
        getUserCart()

    }, []);
    let tongcong = 0;

    const getUserCart = async () => {
        let userId = user.makh;
        const response = await axios.get(`${API_URL}cart/${userId}`);
        setUserCart(response.data);
        const maspArray = response.data.map((item) => item.masp);
        const products = await getProductsByMasp(maspArray);
        setProductsByMakh(products);
    };

    const getProductsByMasp = async (maspArray) => {
        const products = [];
        for (let i = 0; i < maspArray.length; i++) {
            const response = await axios.get(`${API_URL}/product/${maspArray[i]}`);
            products.push(response.data);
        }
        return products;
    };

    if (user == null) {
        return (
            <div>Vui lòng đăng nhập!!!</div>
        )
    } else {
        return (
            <section className="info-user ">
                <div className="container">
                <div class="profile-container  row"  >
                    <div class="sidebar col-lg-4 col-md-2 col-6">
                        <ul class="sidebar-menu">
                            <li class="menu-item active">
                                <Link to="/account/user" class="menu-link">
                                    <i class="fas fa-user"></i>
                                    <span class="menu-text">Thông tin Khách hàng</span>
                                </Link>
                            </li>
                            <li class="menu-item">
                                <Link to="/account/cart" class="menu-link">
                                    <i class="fas fa-shopping-cart"></i>
                                    <span class="menu-text">Đơn hàng</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div class="profile-main col-lg-8 col-md-10 col-6">
                        <div class="profile-header">
                            <h2 class="profile-title">Thông tin Đơn hàng</h2>
                        </div>
                        <div class="profile-body ">
                            <ul class="nav nav-pills justify-content-center">
                                <li class="nav-item">
                                    <a class="nav-link active" data-bs-toggle="pill" href="#home">Trong giỏ hàng</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" data-bs-toggle="pill" href="#option1">Đang giao</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" data-bs-toggle="pill" href="#option2">Hoàn thành</a>
                                </li>
                            </ul>

                            <div class="tab-content">
                                <div class="tab-pane container active table-cart-thuy" id="home">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>STT</th>
                                                <th>Tên sản phẩm</th>
                                                <th>SL</th>
                                                <th>Giá</th>
                                                <th className="th-thanhtien-thuy">Thành tiền</th>
                                            </tr>
                                        </thead>
                                        {
                                            <tbody>
                                                {productsByMakh.map((product, index) => {
                                                    const stt = index + 1;
                                                    const thanhTien = product.dongia * (userCart[index]?.quantity || 0);
                                                    tongcong += thanhTien;
                                                    return (

                                                        <tr key={product.id}>
                                                            <td><img src={"/img/product/" + product.img} alt="" /></td>
                                                            <td>{stt}</td>
                                                            <td>{product.tensp}</td>
                                                            <td className="input-quantity">{userCart[index]?.quantity.toLocaleString()}</td>
                                                            <td className="dongia-thuy">{parseInt(product.dongia).toLocaleString('vi-VN')}</td>
                                                            <td className="thanhtien-thuy">{thanhTien.toLocaleString('vi-VN')}</td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        }



                                    </table>
                                </div>
                                <div class="tab-pane container fade" id="option1"> developing</div>
                                <div class="tab-pane container fade" id="option2"> developing</div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
               
            </section>
        )
    }
}