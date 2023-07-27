import React, { useState } from 'react';
import "./Login.css"
import Header from "./Header";
import Forgot from './Forgot';
import axios from 'axios';
import Footer from './Footer';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  var navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(""); // State to store login status
  const [c, setC]= useState("");

  const getData = (a,b) => {
    console.log("a+b=",a+b);
    setC(a+b);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    var formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    console.log("formdata",formData);

    // backend api calling

    axios.post("http://localhost:8000/api/login", formData)
      .then((response) => {
        console.log("backend response: ", response);
        var stringdata = JSON.stringify(response);
        console.log("stringdata: ", stringdata);
        var ParseData = JSON.parse(stringdata);
        console.log("ParseData: ", ParseData);

        // Check if login was successful
        if (ParseData.data.status == "1") {
          setTimeout(()=>{
            navigate("/Dashboard");
          },4000);
          swal("Login Successfully");; // Set success message
        console.log("ParseData.data.email",ParseData.data.email);
        localStorage.setItem("email",ParseData.data.email);
        } else {
          swal("Login failed"); // Set failure message
        }
      })
      .catch((error) => {
        console.log("error: ", error);
        setLoginStatus("Login failed"); // Set failure message
      });
  };

  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div id='submit'>
          <button onClick={handleSubmit}>Login</button>
        </div>

    

      </form>
      {loginStatus && <p>{loginStatus}</p>} {/* Display login status message */}
      <Footer/>

      <Forgot role="students" fun={getData}/>
      <h1>{c}</h1>
    </div>
  );
}
