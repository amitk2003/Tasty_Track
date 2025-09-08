
import './App.css';
// import Footer from './components/Footer';
import Home from './pages/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './pages/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Signup from './pages/Signup.jsx';
import { CartProvider } from './components/ContextReducer.jsx';
import MyOrder from './pages/MyOrder.jsx';
import Cart from './pages/Cart.jsx';
import Category from './pages/Category.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
const clientId='81605854927-e1d3d3ran47jviuupem6737ccl8qefr5.apps.googleusercontent.com'
function App() {
  return (
  
  // {/* to access component in entire project we use  context API Component CardProvider*/}
  <>
  <GoogleOAuthProvider clientId={clientId}>
      <CartProvider>
        <Router>
    
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/category/:category" element={<Category />} /> {/* <-- add this */}
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/createUser" element={<Signup/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route exact path="/myOrderHistory" element={<MyOrder/>}/>


      </Routes>
    
  </Router>
  </CartProvider>
  </GoogleOAuthProvider>

  
  
  </>
  
 )
}
export default App;
