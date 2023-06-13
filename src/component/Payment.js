import React from "react";
import axios from "axios";
import '../css/payment.css'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../config";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";
import { Link, useNavigate } from "react-router-dom";


export default function Product() {
    const user = useSelector((state) => state.user.login.currentUser);
    const [Uemail, setEmail] = useState(user.email)
    const [Usdt, setSdt] = useState(user.sodienthoai)
    const [Udiachi, setDiachi] = useState(user.diachi)
    const [userCart, setUserCart] = useState([]);
    const [productsByMakh, setProductsByMakh] = useState([]);
    const navigate = useNavigate();
    let tongcong = 0

    const getUserCart = async () => {
        let userId = user.makh;
        const response = await axios.get(`${API_URL}cart/${userId}`);
        setUserCart(response.data);

        const maspArray = response.data.map((item) => item.masp);
        const products = await getProductsByMakh(maspArray);
        await Promise.all(
            products.map(async (prod) => {
                if (prod.img) {
                    const storageRef = ref(storage, `product/${prod.img}`);
                    const imgUrl = await getDownloadURL(storageRef);
                    prod.img = imgUrl;
                }
            })
        );
        setProductsByMakh(products);
    };

    const getProductsByMakh = async (maspArray) => {
        const products = [];
        for (let i = 0; i < maspArray.length; i++) {
            const response = await axios.get(`${API_URL}product/${maspArray[i]}`);
            products.push(response.data);
        }
        return products;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const hoadon = await axios.post(`${API_URL}hoadon/${user.makh}`, {
                email: Uemail,
                sodienthoai: Usdt,
                diachi: Udiachi,
                tongtien : tongcong
            })
           
            for (let i = 0; i < productsByMakh.length; i++) {
                await axios.post(`${API_URL}cthoadon/${hoadon.data.mahd}`,{
                    masp : productsByMakh[i].id,
                    soluong: userCart[i].quantity,
                    dongia : productsByMakh[i].dongia,
                    tongtien :  userCart[i].quantity*productsByMakh[i].dongia
                });
                
            }
            await axios.delete(`${API_URL}cart/${user.makh}`)
            navigate('/')
            
        } catch (error) {
            console.log(error);
        }
    }



    useEffect(() => {
        getUserCart()
    }, []);

    return (
        <section className="payment">
            <h1>Thanh toán sản phẩm</h1>
            <div className="contain-prod">
                <table className="table-prod">
                    <tbody>
                        {productsByMakh.map((product, index) => {
                            const stt = index + 1;
                            const thanhTien = product.dongia * (userCart[index]?.quantity || 0);
                            tongcong += thanhTien;
                            return (
                                <tr key={product.id}>
                                    <td>{stt}</td>
                                    <td><img src={product.img} alt="" /></td>
                                    <td>{product.tensp}</td>
                                    <td className="input-quantity">{userCart[index]?.quantity.toLocaleString()}</td>
                                    <td className="thanhtien-thuy">{parseInt(product.dongia).toLocaleString('vi-VN')} VNĐ</td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>
            <div className="input-info">
                <form onSubmit={handleSubmit}>
                    <div class="mb-3 mt-3">
                        <label for="email" class="form-label">Email:</label>
                        <input type="email" defaultValue={Uemail} onChange={(e) => setEmail(e.target.value)} class="form-control" id="email" name="email" />
                    </div>
                    <div class="mb-3">
                        <label for="sdt" class="form-label">Số điện thoại</label>
                        <input type="text" defaultValue={Usdt} onChange={(e) => setSdt(e.target.value)} class="form-control" id="sdt" name="sdt" />
                    </div>
                    <div class="mb-3">
                        <label for="dc" class="form-label">Địa chỉ</label>
                        <input type="text" defaultValue={Udiachi} onChange={(e) => setDiachi(e.target.value)} class="form-control" id="dc" name="dc" />
                    </div>
                    <button type="submit" class="btn btn-primary">Thanh toán</button>
                </form>
            </div>
            <div className="shipcost">
                {/* ...developing */}
            </div>
        </section>
    )
}