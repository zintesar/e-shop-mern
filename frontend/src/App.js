// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from "react-bootstrap";


import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";


const App = () => {
  return (
    <Router>
      <div className="App">
        <Header></Header>

        <main className='py-3'>
          <Container>
            <Route path='/' component={HomeScreen} exact ></Route>
            <Route path='/product/:id' component={ProductScreen} ></Route>

          </Container>
        </main>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
