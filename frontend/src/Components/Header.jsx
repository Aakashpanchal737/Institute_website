import { Link } from "react-router-dom";
import React from "react";




import "./Header.css";



function Header() {
  return (
    <div>
       
      <header>
     
        
        
      
        <nav>
          
            <ul>
                <li><Link to = "/Home">Home</Link></li>
                <li><a href="#">Product & Services</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><Link to = "/Register">Register</Link></li>
                <li><Link to = "/Login">Login</Link></li>
            </ul>
        </nav>
    </header>
    
    </div>
  );
}

export default Header;