import React from 'react'
import NavBar from '../components/NavBar';
import { Link, useNavigate, useLocation } from "react-router-dom";

const BlogPage = () => {
    const location = useLocation();
    console.log(location.state);
    return (
        <div>
            <NavBar></NavBar>
        </div>
    )
}

export default BlogPage
