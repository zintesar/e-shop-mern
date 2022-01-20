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

const App = () => {
  return (
    <Router>
      <Header></Header>
      <main className='py-3'>
        <Container>
          <Routes>

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
            <Route path='/' element={<HomeScreen></HomeScreen>} exact ></Route>

          </Routes>
        </Container>
      </main>
      <Footer></Footer>
    </Router>
  );
}

export default App;
