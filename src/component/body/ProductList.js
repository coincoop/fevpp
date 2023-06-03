import React from "react";
import "../../css/product.css";
import "../../css/productlist.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "rc-tooltip/assets/bootstrap.css";
import Currency from "./Currency";
import Tooltip from "rc-tooltip";
import { animateScroll as scroll } from "react-scroll";
import { API_URL } from "../../config";
import Rating from "@mui/material/Rating";
import Modal from "react-modal";

export default function Detail() {
  const [products, setProduct] = useState([]);
  useEffect(() => {
    getProduct();
  }, []);
  const [review, setReview] = useState([]);
  const getProduct = async () => {
    const response = await axios.get(`${API_URL}product`);
    setProduct(response.data.products);
setReview(response.data);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const ModalContent = ({ product, closeModal }) => {
    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
      setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
      if (quantity > 1) {
        setQuantity((prevQuantity) => prevQuantity - 1);
      }
    };

    const handleAddToCart = () => {
      // Add logic to handle adding the product to the cart
    };

    return (
      <div class="modal fade" className="modal-content" id="myModal">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="btn-close btn-lg"
                onClick={closeModal}
              ></button>
            </div>

            <div class="modal-body">
              <div class="row">
                <div class="col-6">
                  <img
                    src={`img/product/${product.img}`}
                    alt=""
                    style={{ width: "100%", height: "300px" }}
                  />
                </div>
                <div class="col-6">
                  <h2>{product.tensp}</h2>
                  <p class="mota-modal">
                    <div dangerouslySetInnerHTML={{ __html: product.mota }} />
                  </p>
                  <p class="price-modal">
                    {product.giacu && product.giacu !== 0 ? (
                      <div style={{ fontSize: "15px" }}>
                        <del>
                          <Currency value={product.giacu} />
                        </del>
                      </div>
                    ) : null}
                    <div
                      style={{
                        fontSize: "20px",
                        color: "red",
                        fontWeight: "bold",
                      }}
                    >
                      <Currency value={product.dongia} />
                    </div>
                  </p>

                  <div className="modal-quantity">
                    Số lượng:{" "}
                    <button className="quantity-btn" onClick={decreaseQuantity}>
                      -
                    </button>{" "}
                    {quantity}{" "}
                    <button className="quantity-btn" onClick={increaseQuantity}>
                      +
                    </button>
                  </div>

                  <div
                    class="d-flex gap-2 flexbut"
                    style={{ marginTop: "30px" }}
                  >
                    <button type="button" class="btn btn-danger " active>
                      Thêm vào giỏ hàng
                    </button>
                    <div>
                      <Link
                        to={`/product/${product.url}`}
                        onClick={() => {
                          scroll.scrollToTop({
                            duration: 1,
                            smooth: true,
                          });
                        }}
                      >
                        <button type="button" class="btn btn-primary " active>
                          Xem chi tiết sản phẩm
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <section class="product-thuy prolist">
        <div class="container">
          <div class="row">
            <h3 className="title-h3 text-center">Danh sách sản phẩm</h3>
           
            {products.slice(0, 12).map((product) => (
              <div class="col-lg-2 col-md-4 col-6 container-card">
                <div class="sale-banner"></div>
                <div class="img-product">
                  <Link
                    to={`/product/${product.url}`}
                    onClick={() => {
                      scroll.scrollToTop({
                        duration: 1,
                        smooth: true,
                      });
                    }}
                  >
                    <img
                      class="bottom-image"
                      src={"/img/product/" + product.img}
                      alt=""
                    />
                  </Link>
                  {/* <a href={product.url}><img class="top-image" src={"/img/product/" + product.img_con} alt="" /></a> */}
                </div>
                <div class="more-button">
                  <div class="box">
                  <span>
                    <a style={{ cursor: "pointer" }}>
                      <Tooltip
                        placement="left"
                        overlay={<span>Quick View</span>}
                      >
                        <i
                          className="fa-solid fa-magnifying-glass"
                          onClick={() => openModal(product)} // Open modal on click
                        ></i>
                      </Tooltip>
                    </a>
                  </span>
                  <span>
                    <a style={{ cursor: "pointer" }}>
                      <Tooltip placement="left" overlay={<span>Wishlist</span>}>
                        <i class="fa-regular fa-heart"></i>
                      </Tooltip>
                    </a>
                  </span>
                  <span>
                    <a style={{ cursor: "pointer" }}>
                      <Tooltip placement="left" overlay={<span>Compare</span>}>
                        <i class="fa-solid fa-rotate-right"></i>
                      </Tooltip>
                    </a>
                  </span>
                  <span>
                    <a style={{ cursor: "pointer" }}>
                      <Tooltip
                        placement="left"
                        overlay={<span>Add to Cart</span>}
                      >
                        <i class="fa-solid fa-cart-plus"></i>
                      </Tooltip>
                    </a>
                  </span>
                  </div>
                </div>
                <div class="product-info">
                  <div class="name-product ">
                    <Link
                      class="hover-underline-animation"
                      to={`/product/${product.url}`}
                      onClick={() => {
                        scroll.scrollToTop({
                          duration: 1,
                          smooth: true,
                        });
                      }}
                    >
                      {product.tensp}
                    </Link>
                  </div>
                  <div class="star-review">
                  {product.reviews && product.reviews.length > 0 ? (
                    <>
                      <Rating
                        name="read-only"
                        value={
                          product.reviews.reduce(
                            (acc, item) => acc + item.danhgia,
                            0
                          ) / product.reviews.length
                        }
                        precision={0.5}
                        readOnly
                      />
                      <span>({product.reviews.length} đánh giá)</span>
                    </>
                  ) : (
                    <span>Chưa có đánh giá</span>
                  )}
                </div>
                  <div class="price-product">
                  {product.giacu && product.giacu !== 0 ? (
                    <div style={{ fontSize: "15px" }}>
                      <del>
                        <Currency value={product.giacu} />
                      </del>
                    </div>
                  ) : null}
                  <div
                    style={{
                      fontSize: "20px",
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    <Currency value={product.dongia} />
                  </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="d-flex justify-content-center">
              <Link to={`product`}  onClick={() => {
                        scroll.scrollToTop({
                          duration: 1,
                          smooth: true,
                        });
                      }}>
                
                <button className="showmore">Xem thêm</button>
              </Link>
            </div>
          </div>
        </div>
        <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Product Modal"
      >
        {selectedProduct && (
          <ModalContent product={selectedProduct} closeModal={closeModal} />
        )}
      </Modal>
      </section>
    </>
  );
}
