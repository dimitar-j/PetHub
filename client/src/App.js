import './App.css'
import { BrowserRouter, Route, Routes, } from "react-router-dom";
import Register from "./pages/Register"
import Home from "./pages/Home"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;