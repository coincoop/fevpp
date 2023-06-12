import React from "react";
import axios from "axios";
import '../css/payment.css'
import { useState, useEffect } from "react";
import { API_URL } from "../config";


export default function Product() {
    return (
        <section className="payment">
            <h1>Thanh toán sản phẩm</h1>
            <div className="contain-prod">
                <table className="table-prod">
                    <tbody>
                        <tr key={1}>
                            <td>Stt</td>
                            <td><img src={'../img/logo/trash-can.png'} alt="" /></td>
                            <td>Tên sản phẩm</td>
                            <td className="input-quantity">Sô lượng</td>
                            <td className="thanhtien-thuy">Thanh tien</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="input-info">
                <form >
                    <div class="mb-3 mt-3">
                        <label for="email" class="form-label">Email:</label>
                        <input type="email" class="form-control" id="email" name="email"/>
                    </div>
                    <div class="mb-3">
                        <label for="sdt" class="form-label">Số điện thoại</label>
                        <input type="text" class="form-control" id="sdt" name="sdt"/>
                    </div>
                    <div class="mb-3">
                        <label for="dc" class="form-label">Địa chỉ</label>
                        <input type="text" class="form-control" id="dc" name="dc"/>
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