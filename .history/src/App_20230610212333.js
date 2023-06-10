
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
  const [metaTags, setMetaTags] = useState({
    title: 'Vpp Phú Cường',
    description: 'Trang bán hàng vpp online',
    ogImage: 'https://cdn-icons-png.flaticon.com/256/1930/1930026.png',
    ogImageWidth: '436',
    ogImageHeight: '228',
  });
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
      </HelmetProvider>
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
        <Route path="/admin" element={<AdLayout />}></Route>
        {/* <Route path="/product" element={<ProductList/>} />
          <Route path="/menu" element={<MenuList/>} /> */}
        <Route path="/admin/addmenu" element={<AddMenu />} />
        <Route path="/admin/addproduct" element={<AddProduct />} />
        <Route path="/admin/edit/:id" element={<EditMenu />} />
        <Route path="/admin/editproduct/:id" element={<EditProduct />} />
        <Route path="/admin/addhome" element={<AddHome />} />
        <Route path="/admin/edithome/:id" element={<EditHome />} />
        <Route path="/admin/addContact" element={<AddContact />} />
        {/* <Route path="/edithome/:id" element={<EditHome />} /> */}
        <Route path="/admin/addblog" element={<AddBlog />} />
        <Route path="/admin/editblog/:idblog" element={<EditBlog />} />
        <Route path="/admin/addCateProd" element={<AddCateProd />} />
        <Route path="/admin/editCateProd/:id" element={<EditCateProd />} />
        {/* <Route path="/addReview" element={<AddReview />} /> */}
        <Route path="/admin/editReview/:id" element={<EditReview />} />

      </Routes>
    </BrowserRouter>
 
</>
  );
}

export default App;