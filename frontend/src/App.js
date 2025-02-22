
import './App.css';
// import Footer from './components/Footer';
import Home from './screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './screens/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Signup from './screens/Signup.jsx';
import { CartProvider } from './components/ContextReducer.jsx';
import MyOrder from './screens/MyOrder.jsx';
import Cart from './screens/Cart.jsx';

function App() {
  return (
  
  // {/* to access component in entire project we use  context API Component CardProvider*/}
  <>
  <CartProvider>
        <Router>
    <div>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/createUser" element={<Signup/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route exact path="/myOrderHistory" element={<MyOrder/>}/>


      </Routes>
    </div>
  </Router>
  </CartProvider>
  
  
  </>
  
 )
}
export default App;
