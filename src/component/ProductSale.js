import React from "react";
import "../css/product.css";
import axios from "axios";
import { useState, useEffect } from "react";
import "rc-tooltip/assets/bootstrap.css";
import Tooltip from "rc-tooltip";
import { API_URL } from "../config";
import RangeSlider from "react-bootstrap-range-slider";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import { Helmet } from "react-helmet";
import ProductContain from "./body/ProductContain";

export default function ProductSale() {
  const [product, setProduct] = useState([]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [filterPrice, setFilterPrice] = useState(maxPrice);
  const [value, setValue] = useState(0);
  const [sortValue, setSortValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 12;
  const lastIndex = currentPage * recordsPerPage;
  const fistIndex = lastIndex - recordsPerPage;

  useEffect(() => {
    getProduct();
    setFilterPrice(maxPrice);
  }, [maxPrice]);

  const getProduct = async () => {
    const response = await axios.get(`${API_URL}products/productsale`);
    setProduct(response.data.products);
    const prices = response.data.products.map((p) => p.dongia);
    setMaxPrice(Math.max(...prices));
  };

  const handlePriceFilter = (e) => {
    setFilterPrice(e.target.value);
    setValue(e.target.value);
  };

  const handleSliderAfterChange = (value) => {
    console.log(value);
  };
  //
  const handleSortChange = (e) => {
    setSortValue(e.target.value);
  };
  //sort product
  const sortedProducts = () => {
    if (sortValue.includes("price")) {
      if (sortValue.includes("Asc")) {
        return product.sort((a, b) => parseInt(a.dongia) - parseInt(b.dongia));
      } else {
        return product.sort((a, b) => parseInt(b.dongia) - parseInt(a.dongia));
      }
    } else if (sortValue.includes("name")) {
      if (sortValue.includes("Asc")) {
        return product.sort((a, b) => a.tensp.localeCompare(b.tensp));
      } else {
        return product.sort((a, b) => b.tensp.localeCompare(a.tensp));
      }
    } else {
      return product;
    }
  };

  const numProducts = product.length;
  const filteredProducts = sortedProducts().filter(
    (p) => parseInt(p.dongia) <= filterPrice
  );
  const record = filteredProducts.slice(fistIndex, lastIndex);
  const npage = Math.ceil(filteredProducts.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const prePage = () => {
    if (currentPage !== fistIndex + 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const changeCurrentPage = (n) => {
    setCurrentPage(n);
  };

  return (
    <>
      <Helmet>
        <title>{`Sản Phẩm Giảm Giá- Vpp Phú Cường`}</title>
      </Helmet>
      <section class="product-thuy">
        <div class="container">
          <div class="title-page">
            <h2>Sản phẩm giảm giá</h2>
          </div>
          <div class="filter-contain">
            <div class="dropdown rangeslider block-filsort">
              <span>Filter: </span>
              <button
                type="button"
                class="dropdown-toggle btn-rangefilter"
                data-bs-toggle="dropdown"
              >
                Price
              </button>
              <ul class="dropdown-menu rangeslider-contain">
                <li>
                  {" "}
                  <RangeSlider
                    class="range-slider "
                    value={filterPrice}
                    onChange={handlePriceFilter}
                    min={0}
                    tooltip="false"
                    onAfterChange={handleSliderAfterChange}
                    max={maxPrice}
                  />
                </li>
                <li class="rangeslider-count">
                  <div style={{ marginLeft: "5%" }}>$0</div>
                  <div style={{ marginLeft: "60%" }}>${value}</div>
                </li>
              </ul>
              <span>$0</span>
              <span>-</span>
              <span>${value}</span>
            </div>
            <div class="block-filsort justify-content-end sort-contain">
              <span>Sort: </span>
              <div>
                <select value={sortValue} onChange={handleSortChange}>
                  <option value="">Select</option>
                  <option value="priceAsc">Price (low to high)</option>
                  <option value="priceDesc">Price (high to low)</option>
                  <option value="nameAsc">Name (A to Z)</option>
                  <option value="nameDesc">Name (Z to A)</option>
                </select>
              </div>
              <span> {numProducts} products</span>
            </div>
          </div>
          <div style={{ height: "30px" }}></div>
          <div class="row">
            {record.map((product) => (
              <ProductContain product={product} />
            ))}
          </div>
        </div>
        <div style={{ height: `100px` }}></div>
        <div className="">
          <ul class="pagination justify-content-center">
            <li
              className={`page-item ${
                currentPage !== fistIndex + 1 ? "" : "disabled"
              }`}
            >
              <a
                className={`page-link `}
                style={{ cursor: "pointer" }}
                onClick={prePage}
              >
                Previous
              </a>
            </li>

            {numbers.map((n, i) => (
              <li class={`page-item ${currentPage === n ? "active" : ""}`}>
                <a
                  class="page-link"
                  style={{ cursor: "pointer" }}
                  onClick={() => changeCurrentPage(n)}
                >
                  {n}
                </a>
              </li>
            ))}
            <li
              className={`page-item ${currentPage !== npage ? "" : "disabled"}`}
            >
              <a
                class="page-link"
                style={{ cursor: "pointer" }}
                onClick={nextPage}
              >
                Next
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
