import './App.css'
import { BrowserRouter, Route, Routes, } from "react-router-dom";
import Register from "./pages/Register"
import Home from "./pages/Home"
import Blogs from './pages/Blogs';
import Marketplace from './pages/Marketplace';
import Services from './pages/Services';
import LogIn from './pages/LogIn'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<LogIn/>}/>
          <Route path="/blogs" element={<Blogs/>}/>
          <Route path="/marketplace" element={<Marketplace/>}/>
          <Route path="/services" element={<Services/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;