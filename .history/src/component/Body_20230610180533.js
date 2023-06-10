import React from "react";
import ProductList from "./body/ProductList";
import Blogbody from "./body/Blogbody";
import SlideHeader from "./body/SlideHeader";
import ProductSlide from "./body/ProductSlide";
import Service from "./body/Service";
import CategoryProdHome from "./body/CategoryProdHome";
import { Helmet, HelmetProvider } from "react-helmet-async";
import CategorySale from "./body/CategorySale";
import PolicyBody from "./body/PolicyBody";
import PartnerSlider from "./body/Partner";

export default function Body() {
  return (
    <div>
      <HelmetProvider>
      <Helmet>
        <title>Vpp Phú Cường</title>
        <meta property="og:image" content="https://cdn-icons-png.flaticon.com/256/1930/1930026.png" />
        <meta property="og:image:width" content="436"/>
    <meta property="og:image:height" content="228"/>
        <meta property="og:title" content={`Vpp Phú Cường`} />
        <meta property="og:description" content={`Trang bán hàng vpp online`} />
      </Helmet>
      <SlideHeader />
      <Service />

      <ProductSlide />
      <CategoryProdHome />
      <CategorySale />
      <PolicyBody />
      <ProductList />

      <Blogbody />
      <PartnerSlider />

      {/* <Product /> */}
    </div>
  );
}
