// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from "react-bootstrap";


import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";


const App = () => {
  return (
    <Router>
      <Header></Header>
      <main className='py-3'>
        <Container>
          {/* <ProductScreen></ProductScreen> */}
          <Route path='/' element={<HomeScreen></HomeScreen>} exact ></Route>
          <Route path='/product/:id' element={<ProductScreen></ProductScreen>} ></Route>
          <Route path='/cart' element={<CartScreen></CartScreen>}></Route>
          <Route path='/cart/:id' element={<CartScreen></CartScreen>} ></Route>
        </Container>
      </main>
      <Footer></Footer>
    </Router >
  );
}

export default App;
