
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
// import Product from './component/Product';
import Footer from './component/Footer';
import Header from './component/Header';
import Login from './component/Login';
import Body from './component/Body';
import Detail from './component/Detail';
import CategoryPage from "./component/CategoryPage";
import Product from "./component/Product";
import SearchResults from "./component/SearchResult";
import Register from "./component/Register";
import Cart from "./component/Cart";
import AccountUser from "./component/AccountUser";
import AccountCart from "./component/AccountCart";
import Blog from "./component/Blog";
import ProductSale from "./component/ProductSale";
import Contact from "./component/Contact";
import NotFound from "./component/NotFound";

function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
function App() {
  return (

    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Layout><Body /></Layout>} />
        <Route path="/product" element={<Layout><Product /></Layout>} />
        <Route path="/productsale" element={<Layout><ProductSale/></Layout>} />
        <Route path="/account/login" element={<Layout><Login /></Layout>} />
        <Route path="/account/register" element={<Layout><Register /></Layout>} />
        <Route path="product/:url" element={<Layout><Detail /></Layout>} />
        <Route path="/categories/:url" element={<Layout><CategoryPage /></Layout>} />
        <Route path="/search/:searchText" element={<Layout><SearchResults /></Layout>} />
        <Route path="/cart" element={<Layout><Cart /></Layout>} />
        <Route path="/blog/:url" element={<Layout><Blog /></Layout>} />
        <Route path="/lienhe" element={<Layout><Contact /></Layout>} />
        <Route path="/account" element={<Navigate to="/account/user" replace />} />
        <Route path="/account/user" element={<Layout><AccountUser /></Layout>} />
        <Route path="/account/cart" element={<Layout><AccountCart /></Layout>} />
        {/* <Route path="/products/:id" element={<Product />} />
          <Route path="/admin" element={<ProductList />} /> */}
        {/* <Route path="/login" element={<Login />} />
          <Route index element={<Body />} /> */}
        {/* <Route path="add" element={<AddProduct />} />
          <Route path="/admin/edit/:id" element={<EditProduct />} /> */}
        <Route path="*" element={<Layout><NotFound /></Layout>} />


      </Routes>
    </BrowserRouter>
    // <Footer/>

  );
}

export default App;