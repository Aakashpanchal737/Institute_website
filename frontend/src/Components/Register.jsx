import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import Footer from './Footer';

export default function Register() {
  var navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  console.log("Onchange" + name, email, mobile, password);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(
      "name,email,password in handleSubmit: " + name,
      email,
      mobile,
      password
    );
      var formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password",password);
      formData.append("mobile", mobile);
      console.log("formData: " + formData);

      // backend api calling
      axios.post("http://localhost:8000/api/register", formData).then((response) => {
        console.log("backend response: " + response);
        var stringdata = JSON.stringify(response);
        console.log("stringdata: " + stringdata);
        var ParseData = JSON.parse(stringdata);
        console.log("ParseData: " + ParseData);

        if (ParseData.data.status =="1"){
          setTimeout(() => {
            navigate("/login");
          },4000);
        }
      }).catch((error) => {
        console.log("error: " + error);
      });
      // alert message after registered
      swal("Registered successfully");
  };

  return (
    <div className="container">
      <Header />
      <form>
        <h2>Registration</h2>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="Name">Name</label>
              </td>
              <td>
                <input
                  type="text"
                  id="Name"
                  name="name"
                  required
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                *
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="Email">Email</label>
              </td>
              <td>
                <input
                  type="email"
                  id="Email"
                  name="email"
                  required
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                *
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="Mobile">Mobile</label>
              </td>
              <td>
                <input
                  type="number"
                  id="Mobile"
                  name="Name"
                  required
                  placeholder="Enter mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
                *
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="Password">Password</label>
              </td>
              <td>
                <input
                  type="text"
                  id="Password"
                  name="Password"
                  required
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                *
              </td>
            </tr>

              <td></td>
              {name.length > 0 &&
              email.length > 0 &&
              password.length > 0 &&
              mobile.length > 0 ?(
                <td>
                  <button onClick={handleSubmit} style={{ cursor :"pointer"}}>Register</button>
                </td>
              ) : (
                <tr>
              <td></td>
              <td id="submit">
                <button onClick={handleSubmit} style={{cursor:"not-allowed"}}disabled>Register</button>
              </td>
            </tr>
              )
              }
            
          </tbody>
        </table>
      </form>
      <Footer/>
    </div>
  );
}
