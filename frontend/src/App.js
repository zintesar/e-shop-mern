// import logo from './logo.svg';
// import './App.css';

import { Container } from "react-bootstrap";


import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="App">
      <Header></Header>

      <main className='py-3'>
        <Container>
          <h1>Welcome To E-Shop</h1>
        </Container>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
