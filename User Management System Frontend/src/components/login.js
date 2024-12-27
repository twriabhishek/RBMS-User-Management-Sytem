import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import endpoints from "../ApiEndpoint";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [logindetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!logindetails.email.trim() || !logindetails.password.trim()) {
      toast.error("All Fields required");
      return;
    }
    try {
      const response = await axios.post(endpoints.loginAuth, logindetails, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        const data = await response.data;
        const token = data.token;
        const user = data.user;
        localStorage.setItem("token", token);
        localStorage.setItem("roles", user.role);
        localStorage.setItem("email", user.email);
        localStorage.setItem("name", user.name);
        toast.success("Login Successfully");
        setTimeout(() => {
          navigate("/login/navbar/profile");
        }, 300);
      }
    } catch (error) {
      console.log(error);
      
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="log-w3">
      <div className="container text-center logo">
        <img src={`${process.env.PUBLIC_URL}/images/logo.png`} />
      </div>
      <div className="w3layouts-main">
        <h2>Sign In Now</h2>
        <form onSubmit={handleLogin}>
          <input
            className="ggg"
            name="email"
            placeholder="Enter ID"
            required
            value={logindetails.email}
            onChange={handleChange}
          />
          <input
            className="ggg"
            name="password"
            placeholder="Password"
            required
            value={logindetails.password}
            onChange={handleChange}
          />
          <span>
            <input type="checkbox" /> Remember Me
          </span>
          <h6>
            <a href="#">Forgot Password?</a>
          </h6>
          <div className="clearfix"></div>
          <input type="submit" value="Sign In" name="login" />
        </form>
        <p>
          Don't Have an Account ?
          <Link to="/registration">Create an account</Link>
        </p>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
