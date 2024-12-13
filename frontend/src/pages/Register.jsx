import React, { useEffect ,useState} from "react";
import "./register.css"

import Server_url from "../Utils/server_url"
import axios from "axios";
import {redirect, useNavigate} from "react-router-dom";
import { toast } from "react-toastify";

export function loader({ request }) {
  if (sessionStorage.getItem("token") !== null) {
    throw redirect("/dashboard?message=AlreadyLogin");
  }
  return null;
}

const Register = () => {
  const navigate=useNavigate()
  const [signup,setSignup]=useState({
    email:"",
    password:"",
    username:"",
    location:"rajasthan"
  }) 
  const [signin,setSignin]=useState({
    email:"",
    password:"",
  })
  useEffect(() => {
    const sign_in_btn = document.querySelector("#sign-in-btn");
  const sign_up_btn = document.querySelector("#sign-up-btn");
  const container = document.querySelector(".container");

  if(sign_up_btn && container)
  sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
  });

  if(sign_in_btn && container)
  sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
  });
  
  }, [])
  
  
  function handleSignupChange(e){
    const {name,value}=e.target;
    setSignup(prev=>({...prev,[name]:value}));
  }

  function handleSigninChange(e){
    const {name,value}=e.target;
    setSignin(prev=>({...prev,[name]:value}));
  }
  function handleSignin(e){
    console.log(signin)
    e.preventDefault();
    const idLoad = toast.loading("Checking Credentials...", {
      position: toast.POSITION.TOP_RIGHT,
    });
    axios.post(`${Server_url}api/users/login`,signin)
    .then((res)=>{
      sessionStorage.setItem("token",res.data.user.token)
      sessionStorage.setItem("email",res.data.user.email)
      sessionStorage.setItem("username",res.data.user.username)
      sessionStorage.setItem("userId", res.data.user.id)
      setTimeout(
        function () {
          toast.update(idLoad, {
            render: "Welcome to BlogBunny",
            type: "success",
            isLoading: false,
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
        },
        [500]
      );
      console.log(e);
      navigate("/dashboard")

      console.log(res)
    })
    .catch((err)=>{
      setTimeout(
        function () {
          toast.update(idLoad, {
            render: "Invalid Credentials",
            type: "error",
            isLoading: false,
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
        },
        [500]
      );
      console.log(e);
      console.log(err)
    })
  }
  
  function handleSignup(e){
    e.preventDefault();
    const idLoad = toast.loading("Checking Credentials...", {
      position: toast.POSITION.TOP_RIGHT,
    });
    axios.post(`${Server_url}api/users/register`,signup)
    .then((res)=>{
      sessionStorage.setItem("token",res.data.user.token)
      sessionStorage.setItem("email",res.data.user.email)
      sessionStorage.setItem("username",res.data.user.username)
      sessionStorage.setItem("userId", res.data.user.id)
      navigate("/dashboard")
      setTimeout(
        function () {
          toast.update(idLoad, {
            render: "Welcome to BlogBunny",
            type: "error",
            isLoading: false,
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
        },
        [500]
      );
      console.log(e);
      console.log(res)  
    })
    .catch((err)=>{
      setTimeout(
        function () {
          toast.update(idLoad, {
            render: "Invalid Credentials",
            type: "error",
            isLoading: false,
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
        },
        [500]
      );
      console.log(e);
      console.log(err)
    })
  }
  return (
    <>
      <div className="container">
        <div className="forms-container">
          <div className="signin-signup">
            <form onSubmit={handleSignin} className="sign-in-form">
              <h2 className="title">Welcome Back!!</h2>
              <div className="input-field">
              <div className="flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a0a0a0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <input type="email" name="email" onChange={handleSigninChange} placeholder="Email" />
              </div>
              <div className="input-field">
                <div className="flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a0a0a0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                </div>
                <input type="password" name="password" onChange={handleSigninChange} placeholder="Password" />
              </div>
              <input type="submit" value="Login" className="btn solid" />
              
            </form>
            <form onSubmit={handleSignup} className="sign-up-form">
              <h2 className="title">Welcome to BlogBunny</h2>
              <div className="input-field">
              <div className="flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a0a0a0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </div>
                <input type="text" name="username" onChange={handleSignupChange} placeholder="Username" />
              </div>
              <div className="input-field">
                <div className="flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a0a0a0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <input type="email" name="email" onChange={handleSignupChange} placeholder="Email" />
              </div>
              <div className="input-field">
              <div className="flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a0a0a0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                </div>
                <input type="password" name="password" onChange={handleSignupChange} placeholder="Password" />
              </div>
              <input type="submit" className="btn" value="Sign up" />
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here ?</h3>
              <p>
                Register Now and Get Started today...
              </p>
              <button className="btn transparent" id="sign-up-btn">
                Sign up
              </button>
            </div>
            <img src="log.svg" className="image" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>Already Registered?</h3>
              <p>
                Sign In , Publish your Passions, your way
              </p>
              <button className="btn transparent" id="sign-in-btn">
                Sign in
              </button>
            </div>
            <img src="register.svg" className="image" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

