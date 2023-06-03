import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProductList from './Product';
import ProductContain from "./body/ProductContain";
import { API_URL } from "../config";
function SearchResults() {
    const { searchText } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, [searchText]);
    const fetchProducts = async () => {
        const response = await axios.get(`${API_URL}product`)
        setProducts(response.data.products);
      
    };

    const filteredProducts = products.filter((product) =>
        product.tensp.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(searchText.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
    );

    return (
        <div className="product-thuy">
   
            <div className="container">
            <h2>Kết quả tìm kiếm cho "{searchText}"</h2>
                <div className="row">
                    {filteredProducts.map((product) => (
                        <ProductContain product={product} />
                    ))}
                </div>
            </div>

        </div>

    );
}

export default SearchResults;
