import './App.css'
import { BrowserRouter, Route, Routes, } from "react-router-dom";
import { createTheme } from '@mui/material/styles';
import Register from "./pages/Register"
import Home from "./pages/Home"
import Blogs from './pages/Blogs';
import Marketplace from './pages/Marketplace';
import Services from './pages/Services';
import LogIn from './pages/LogIn'
import { ThemeProvider } from '@emotion/react';
import BlogPage from './pages/BlogPage';
import MyServices from './pages/MyServices';

const theme = createTheme({
  palette: {
    primary: {
      main: '#76BCFF',
    },
    secondary: {
      main: "#F0F8FF"
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<LogIn/>}/>
            <Route path="/blogs" element={<Blogs/>}/>
            <Route path="/blogs/:name" element={<BlogPage/>}/>
            <Route path="/marketplace" element={<Marketplace/>}/>
            <Route path="/services" element={<Services/>}/>
            <Route path="/myservices" element={<MyServices/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;