// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from "react-bootstrap";


import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderLIstScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>

            <Route path='/order/:id' element={<OrderScreen></OrderScreen>} />
            <Route path='/shipping' element={<ShippingScreen></ShippingScreen>} />
            <Route path='/payment' element={<PaymentScreen></PaymentScreen>} />
            <Route path='/placeorder' element={<PlaceOrderScreen></PlaceOrderScreen>} />
            <Route path='/login' element={<LoginScreen></LoginScreen>}></Route>
            <Route path='/register' element={<RegisterScreen></RegisterScreen>} exact ></Route>
            <Route path='/profile' element={<ProfileScreen></ProfileScreen>}></Route>
            <Route path='/product/:id' element={<ProductScreen></ProductScreen>} ></Route>
            <Route path='/cart' element={<CartScreen></CartScreen>} >
              <Route path=':id' element={<CartScreen></CartScreen>} />
            </Route>
            <Route path='/admin/userlist' element={<UserListScreen></UserListScreen>} ></Route>
            <Route path='/admin/user/:id/edit' element={<UserEditScreen></UserEditScreen>} ></Route>
            <Route path='/admin/product/:id/edit' element={<ProductEditScreen></ProductEditScreen>} ></Route>
            <Route path='/admin/productlist/:pageNumber' element={<ProductListScreen></ProductListScreen>} ></Route>
            <Route path='/admin/productlist' element={<ProductListScreen></ProductListScreen>} ></Route>
            <Route path='/admin/orderlist' element={<OrderListScreen></OrderListScreen>} ></Route>
            <Route path='/search/:keyword' element={<HomeScreen></HomeScreen>}  ></Route>
            <Route path='/page/:pageNumber' element={<HomeScreen></HomeScreen>} exact ></Route>
            <Route path='/search/:keyword/page/:pageNumber' element={<HomeScreen></HomeScreen>} exact ></Route>
            <Route path='/' element={<HomeScreen></HomeScreen>} exact ></Route>

          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
