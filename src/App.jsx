import { useState } from 'react'
import './App.css'
import{createBrowserRouter} from "react-router-dom";
import{createRoutesFromElements} from "react-router-dom";
import{Route} from "react-router-dom";
import { RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import {Provider} from "react-redux"
import {store} from "./store"
import Checkout from './pages/Checkout';
import AuthProvider from './firebase/Auth';

const router=createBrowserRouter(
  createRoutesFromElements(
    <>
  <Route path="/" element={<Layout/>}>
    <Route index element={<Home/>}/>
    <Route path="/cart" index element ={<Cart/>}/>
    <Route path="/checkout" index element ={<Checkout/>}/>
  </Route>
    <Route path="/login" index element ={<Login/>}/>
</>
  )
)
function App() {

    return (
      <AuthProvider>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
      </AuthProvider>
    );

}

export default App
