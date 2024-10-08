import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home';
import Menu from './core/Menu';
import PrivateRoute from './auth/PrivateRoute';
import Dashboard from './user/UserDashboard';
import AdminRoute from './auth/AdminRoute';
import AdminDashboard from './user/AdminDashboard';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import Shop from './core/Shop';
import Product from './core/Product';
import Cart from './core/Cart';
import Orders from './admin/Orders';
import Profile from './user/Profile';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
// import UpdateCategory from './admin/updateCategory';

const Router = () => {
    return (
        <BrowserRouter>
        <Menu/>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/shop" element={<Shop/>} />
                <Route path="/signin" element={<Signin/>} />
                <Route path="/signup" element={<Signup/>} />
                {/* <Route path="/user/dashboard" element={<PrivateRoute Component={Dashboard} />} /> */}
                <Route path="/user/dashboard" element={
                    <PrivateRoute>
                    <Dashboard />
                    </PrivateRoute>
                }/>
                <Route path="/admin/dashboard" element={
                    <AdminRoute>
                    <AdminDashboard />
                    </AdminRoute>
                }/>
                <Route path="/create/category" element={
                    <AdminRoute>
                    <AddCategory />
                    </AdminRoute>
                }/>
                <Route path="/create/product" element={
                    <AdminRoute>
                    <AddProduct />
                    </AdminRoute>
                }/>
                
                <Route path="/product/:productId" element={<Product/>} />
                <Route path="/cart" element={<Cart/>} />
                <Route path="/admin/orders" element={
                    <AdminRoute>
                    <Orders />
                    </AdminRoute>
                }/>
                <Route path="/profile/:userId" element={
                    <PrivateRoute>
                    <Profile />
                    </PrivateRoute>
                }/>
                <Route path="/admin/products" element={
                    <AdminRoute>
                    <ManageProducts />
                    </AdminRoute>
                }/>
                <Route path="/admin/product/update/:productId" element={
                    <AdminRoute>
                    <UpdateProduct />
                    </AdminRoute>
                }/>
                {/*
                
                <AdminRoute path="/admin/category/update/:categoryId" exact component={UpdateCategory} /> */}
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
