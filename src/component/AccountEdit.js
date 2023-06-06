import React, { useState ,useEffect} from "react";
import "../css/account.css";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../config";
import { updateUser  } from "../redux/slice";

export default function Account() {
    let user = useSelector((state) => state.user.login.currentUser);
    const [editTenkh, setTenkh] = useState(`${user.tenkh}`)
    const [editEmail, setEmail] = useState(`${user.email}`)
    const [editSdt, setSdt] = useState(`${user.sodienthoai}`)
    const [editDc, setDc] = useState(`${user.diachi}`)
    const accessToken = user?.accessToken;
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleSubmit = async (e)=>{
       
        try {
            e.preventDefault()
            await axios.patch(`${API_URL}account/edit/${user.makh}`,{
                tenkh: editTenkh,
                email: editEmail,
                sodienthoai : editSdt,
                diachi : editDc
            })
            const newUser = await axios.get(`${API_URL}account/${user.makh}`, {
                headers: {token: accessToken}
            })
            dispatch(updateUser(newUser.data))
            navigate('/account/user')
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
      
      }, [user]);
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
                                <form onSubmit={handleSubmit}>
                                    <label for="">Tên khách hàng</label>
                                    <input type="" name=""  defaultValue={editTenkh} onChange={(e) => setTenkh(e.target.value)} /> <br />
                                    <label for="">Email</label>
                                    <input type="" name=""   defaultValue={editEmail } onChange={(e) => setEmail(e.target.value)} />
                                    <label for="">Số điện thoại</label>
                                    <input type="" name="" defaultValue={editSdt }onChange={(e) => setSdt(e.target.value)} />
                                    <label for="">Địa chỉ</label>
                                    <input type="" name="" defaultValue={editDc } onChange={(e) => setDc(e.target.value)} />
                                    <button type="submit">Lưu</button>
                                </form>
                               
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        )
    }
}