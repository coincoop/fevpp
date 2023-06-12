import React from "react";
import axios from "axios";
import '../css/payment.css'
import { useState, useEffect } from "react";
import { API_URL } from "../config";


export default function Product() {
    return (
        <div className="payment">
            <h1>Payment Details</h1>

            <form className="payment" id="payment-form" method="post" action="/process-payment">
                <label for="card-number">Card Number:</label>
                <input type="text" id="card-number" name="card-number" required />

                <label for="expiration-date">Expiration Date:</label>
                <input type="text" id="expiration-date" name="expiration-date" required />

                <label for="cvv">CVV:</label>
                <input type="text" id="cvv" name="cvv" required />

                <label for="name">Cardholder Name:</label>
                <input type="text" id="name" name="name" required />

                <button type="submit">Submit Payment</button>
            </form>
        </div>
    )
}