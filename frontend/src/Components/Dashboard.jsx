import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import{userOutLined} from "@ant-design/icons";
import axios from "axios";
import swal from 'sweetalert';


export default function Dashboard() {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const [userData,setUserData] = useState([]);
  const [specificUserData,setSpecificUserData] = useState([]);
  const [update,setUpdate] = useState("false");
  const [name,setName] = useState("");
  const [email1,setEmail1] = useState("");
  const [mobile,setMobile] = useState("");
  const [password,setPassword] = useState("");
  const [image,setImage] = useState("");
  const [newSpecificUserData,setNewSpecificUserData] = useState([]);
  
  

  if (
    email === null ||
    email === undefined ||
    email === "undefined" ||
    email === ""
  ) {
    navigate("/login");
  }
//  user logout

  const userLogout = async () => {
    console.log("user called logout");

   var isUser = localStorage.removeItem("email");
   const email = localStorage.getItem("email");

   if(email == null || email == undefined || email=="undefined" || email==""){
    navigate("/login");
   }

   console.log("isuser",isUser);
  };
// get user data
  const getUserData = async()=>{
    axios
    .get("http://localhost:8000/api/users")
    .then((response)=>{
      console.log("backend response :" + response);
      var stringData = JSON.stringify(response);
      console.log("stringData",stringData);
      var parseData = JSON.parse(stringData);
      console.log("parsedata",parseData);
      setUserData(parseData.data.data);

      if(parseData.data.status =="1"){
        swal("you successfully fatched");
      }
      else{
        swal("something went wrong");
      }
    })
    .catch((error)=> {
      console.log("backend error :" + error);
    });
  }

   // specific user data

   const getSpecificUserData = async(email)=>{
    axios
    .get(`http://localhost:8000/api/users/${email}`)
    .then((response)=>{
      console.log("backend response: " + response);
      var stringData = JSON.stringify(response);
      console.log = JSON.parse(stringData);
      var parseData = JSON.parse(stringData);
      console.log("parseData", parseData);
      setSpecificUserData(parseData.data.data[0]);

      if(parseData.data.status =="1"){
        swal("user successfully fatched");
      }
      else{
        swal("something went wrong");
      }
    })
    .catch((error)=> {
      console.log("backend error :" + error);
    });
  }

  // userDelete
  const userDelete =async(email)=>{
    console.log("delete",email);
    const isDelete=window.confirm("Are you sure you want to delete");
    if(isDelete){
      axios.post(`http://localhost:8000/api/delete/${email}`).then((response)=>{
        console.log("backend response :" + response);
        var stringData = JSON.stringify(response);
        console.log("stringData",stringData);
        var parseData = JSON.parse(stringData);
        console.log("parseData",parseData);

        if(parseData.data.status =="1"){
          setTimeout(()=>{
            getUserData();
          },4000);

          swal("user deleted successfully");

        } else {
          swal("user not deleted");
        }

      })

      .catch((error) => {
        console.log("backend error",error);
      });
    } else{

    }
  }

  // userUpdate

  const userUpdate = async (email)=>{
    console.log("update",email);

    axios
    .get(`http://localhost:8000/api/users/${email}`)
    .then((response)=>{
      console.log("backend response:"+ response);
      var stringData = JSON.stringify(response);
      console.log("stringData",stringData);
      var parseData = JSON.parse(stringData);
      console.log("parseData",parseData);
      setNewSpecificUserData(parseData.data.data[0]);

      setNewSpecificUserData(parseData.data.data[0]);
      setName(parseData.data.data[0].name);
      setEmail1(parseData.data.data[0].email);
      setPassword(parseData.data.data[0].password);
      setMobile(parseData.data.data[0].m_no);

      if (parseData.data.status =="1"){
        swal("user fatched successfully");
      } else {
        swal("something went wrong");
      }
    })
    .catch((error) => {
      console.log("backend error: " + error);
    });

    setUpdate("true");
  };


    const saveUserData = async(e) => {
      console.log("e",e);
      alert("hello")

      e.preventDefault();
      console.log("getting data at the time of save data",name,image,email,mobile);

      var formData = new FormData();

      formData.append("name",name);
      formData.append("email1",email1);
      formData.append("m_no",mobile);
      formData.append("image",image[0].File);

      axios
    .post(`http://localhost:8000/api/update/${email}`,formData)
    .then((response)=>{
      console.log("backend response:"+ response);
      var stringData = JSON.stringify(response);
      console.log("stringData",stringData);
      var parseData = JSON.parse(stringData);
      console.log("parseData",parseData);

      setNewSpecificUserData(parseData.data.data[0]);
      setName(parseData.data.data[0].name);
      setEmail1(parseData.data.data[0].email);
      setPassword(parseData.data.data[0].password);
      setMobile(parseData.data.data[0].m_no);

      if (parseData.data.status == "1"){
        swal("user fatched successfully");
      } else {
        swal("something went wrong");
      }
    })
    .catch((error) => {
      console.log("backend error: " + error);
    });
    }
  

 

  return (
    <div className="dashboard">
      <div className="header">
        <h1>Welcome {email}</h1>
         <div> {specificUserData.name}
         <img src={`/upload/images/myimg.png`} alt="User" id="profile-image"/></div>

         {/* <img src = {`../upload/images/${specificUserData.image}`} alt=""/> */}
        <nav>
          <ul>
            <li>Home</li>
            <li>Courses</li>
            <li>Profile</li>
            <li>Settings</li>
            <li>User profile</li>
            <li>{specificUserData.name}</li>
          </ul>
        </nav>
        {/* <button className="usericon"><userOutLined /></button> */}
        <button className="logout" onClick={userLogout}>
          Logout
        </button>
      </div>
      <div className="content">
        <div className="widget">
          <h2>Course Offerings</h2>
          <p>Choose from a variety of courses to enhance your skills:</p>
          <ul>
            <li>Web Development</li>
            <li>Data Science</li>
            <li>Mobile App Development</li>
            <li>UI/UX Design</li>
            <li>Machine Learning</li>
            
          </ul>
        </div>
        <div className="widget">
          <h2>Course Details</h2>
          <p>Learn more about our popular courses:</p>
          <ul>
            <li>Web Development: HTML, CSS, JavaScript</li>
            <li>Data Science: Python, R, Data Visualization</li>
            <li>Mobile App Development: iOS, Android, React Native</li>
            <li>UI/UX Design: User Research, Prototyping, Wireframing</li>
            <li>Machine Learning: Algorithms, Neural Networks, TensorFlow</li>
          </ul>
        </div>
      </div>
      <table id="dynamic-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Password</th>
      <th>Image</th>
      <th>Delete</th>
      <th>Update</th>
    </tr>
  </thead>
  <tbody>
    {userData.map((data, i) => (
      <tr key={i}>
        <td>{data.name}</td>
        <td>{data.email}</td>
        <td>{data.password}</td>
        <td>{data.image}</td>
        <td>
          <button onClick={() => userDelete(data.email)}>Delete</button>
        </td>
        <td>
          <button onClick={() => userUpdate(data.email)}>Update</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

      <button onClick={getUserData}>get</button>
      <div className="footer">
        <p>© 2023 Dashboard</p>
      </div>
      {update == "true" ? (
        <div>
          {" "}
      <form>
        <h2>update</h2>
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
                  value={email1}
                  onChange={(e) => setEmail1(e.target.value)}
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

            <tr>
              <td>
                <label htmlFor="image">image</label>
              </td>
              <td>
                <input
                  type="file"
                  id="image"
                  name="image"
                  required
                  placeholder="Enter password"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
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
                  <button onClick = {saveUserData} style={{ cursor :"pointer"}}>Save</button>
                </td>
              ) : (
                <tr>
              <td></td>
              <td id="submit">
                <button onClick={(e)=>saveUserData} style={{cursor:"not-allowed"}}disabled>Save</button>
              </td>
            </tr>
              )
              }
            
          </tbody>
        </table>
      </form>
      </div>
      ) : (
        ""
      )}
     
    </div>
  );
}
