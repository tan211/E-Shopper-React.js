import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Blog from './components/Blog/index';
import Blog_Detail from './components/Blog/Detail';
import Member from './components/Member/index';
import Account from './components/Member/Account';
import AddProduct from './components/Member/AddProduct';
import MyProduct from './components/Member/MyProduct';
import EditProduct from './components/Member/EditProduct';
import Home from './components/Product/Home';
import ProductDetail from './components/Product/ProductDetail';
import Cart from './components/Product/Cart';
import WishList from './components/Member/WishList';
import { Provider } from 'react-redux';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App>
          <Routes>
            <Route index path='/blog' element={<Blog/>}/>
            <Route index path='/blog/detail/:id' element={<Blog_Detail/>}/>
            <Route index path='/login' element={<Member/>}/>
            <Route index path='/register' element={<Member/>}/>
            <Route index path='/account/user/update/:id' element={<Account/>}/>
            <Route index path='/account/user/product/add' element={<AddProduct/>}/>
            <Route index path='/account/user/product/list' element={<MyProduct/>}/>
            <Route index path='/account/product/edit/:id' element={<EditProduct/>}/>
            <Route index path='/' element={<Home/>}/>
            <Route index path='/product/detail/:id' element={<ProductDetail/>}/>
            <Route index path='/cart' element={<Cart/>}/>
            <Route index path='/wishlist' element={<WishList/>}/>

          </Routes>
        </App>
      </Provider>
    </Router>
  </React.StrictMode>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
