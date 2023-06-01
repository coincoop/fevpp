import React, { useState } from "react";
import  "../css/account.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../config";

export default function Account() {
    const user = useSelector((state) => state.user.login.currentUser);
    if (user == null) {
        return (
            <div>Vui lòng đăng nhập!!!</div>
        )
    } else {
        return (
            <section className="info-user">
                <div class="profile-container container"  >
                    <div class="sidebar">
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
                    <div class="profile-main">
                        <div class="profile-header">
                            <h2 class="profile-title">Thông tin Khách hàng</h2>
                        </div>
                        <div class="profile-body">
                            <div class="profile-info">
                                <div class="profile-details">
                                    <h3 class="profile-name">{user.tenkh}</h3>
                                    <p class="profile-email">Email: {user.email}</p>
                                    <p class="profile-phone">Phone: {user.sodienthoai}</p>
                                    <p class="profile-address">Address: {user.diachi}</p>
                                </div>
                            </div>
                            <a href="#" class="edit-profile-link">Edit Profile</a>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}