import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import endpoints from "../ApiEndpoint";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [signupdetails, setSignupDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Password strength regular expression
  const passwordStrengthRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!signupdetails.name.trim() || !signupdetails.email.trim() || !signupdetails.password.trim()) {
      toast.error("All Fields required");
      return;
    }

    if (!passwordStrengthRegex.test(signupdetails.password)) {
      toast.error("Password must be at least 8 characters long, contain an uppercase letter, a number, and a special character.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(endpoints.signupAuth, signupdetails, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      if (response.status === 201) {
        const data = await response.data;
        console.log(data);
        toast.success("Login Successfully");
        setTimeout(() => {
          navigate("/login");
        }, 300);
      } else {
        toast.error("No token found");
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
        <h2>Register Now</h2>
        <form onSubmit={handleSignup}>
          <input
            className="ggg"
            name="name"
            placeholder="Enter Name"
            required
            value={signupdetails.name}
            onChange={handleChange}
          />
          <input
            className="ggg"
            name="email"
            placeholder="Enter Email"
            required
            value={signupdetails.email}
            onChange={handleChange}
          />
          <input
            className="ggg"
            name="password"
            placeholder="Enter Password"
            required
            value={signupdetails.password}
            onChange={handleChange}
          />
          <div className="clearfix"></div>
          <input type="submit" value="Register" name="register" />
        </form>
        <p>
          <Link to="/login">Back to Login</Link>
        </p>
      </div>
      <Toaster />
    </div>
  );
};

export default Signup;
