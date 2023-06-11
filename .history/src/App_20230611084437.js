
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
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
import AccountEdit from "./component/AccountEdit";
//Admin
import AddMenu from "./component/admin/AddMenu";
import EditMenu from "./component/admin/EditMenu";
// import MenuList from "./component/admin/MenuList";
// import ProductList from "./component/admin/ProductList";
import AddProduct from "./component/admin/AddProduct";
import EditProduct from "./component/admin/EditProduct";
import AdLayout from "./component/admin/AdLayout";
import AddHome from "./component/admin/AddHome";
import EditHome from "./component/admin/EditHome";
import AddBlog from "./component/admin/AddBlog";
import EditBlog from "./component/admin/EditBlog";
import AddCateProd from "./component/admin/AddCateProd"
import EditCateProd from "./component/admin/EditCateProd";
import EditReview from "./component/admin/EditReview";
import AddContact from "./component/admin/AddContact";
import BlogAll from "./component/BlogAll"

import { useSelector } from "react-redux";
import { Helmet, HelmetProvider } from "react-helmet-async";
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
  const user = useSelector((state) => state.user.login.currentUser);
  const accessToken = user?.accessToken;
  const vaitro = user?.vaitro
  console.log(accessToken);
  if (  vaitro == 0) {
    return <div>
    <BrowserRouter>
      <Routes>
      <Route path="/admin/*" element={<Navigate to="/404" replace />} />
      <Route path="/admin/*/*" element={<Navigate to="/404" replace />} />
      <Route path="/404" element={<NotFound />} />
      </Routes>

    </BrowserRouter>
  </div>
  } else {
  return (
<>
<HelmetProvider>
        <Helmet>
          <title>Vpp Phú Cường</title>
          <meta
            property="og:image"
            content="https://cdn-icons-png.flaticon.com/256/1930/1930026.png"
          />
          <meta property="og:image:width" content="436" />
          <meta property="og:image:height" content="228" />
          <meta property="og:title" content={`Vpp Phú Cường`} />
          <meta
            property="og:description"
            content={`Trang bán hàng vpp`}
          />
        </Helmet>
      
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Layout><Body /></Layout>} />
        <Route path="/product" element={<Layout><Product /></Layout>} />
        <Route path="/productsale" element={<Layout><ProductSale /></Layout>} />
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
        <Route path="/account/edit" element={<Layout><AccountEdit /></Layout>} />
        <Route path="/blog" element={<Layout><BlogAll/></Layout>}/>
        {/* <Route path="/products/:id" element={<Product />} />
          <Route path="/admin" element={<ProductList />} /> */}
        {/* <Route path="/login" element={<Login />} />
          <Route index element={<Body />} /> */}
        {/* <Route path="add" element={<AddProduct />} />
          <Route path="/admin/edit/:id" element={<EditProduct />} /> */}
        <Route path="*" element={<Layout><NotFound /></Layout>} />
        

      </Routes>
    </BrowserRouter>
    </HelmetProvider>
</>
  );
        }
}

export default App;