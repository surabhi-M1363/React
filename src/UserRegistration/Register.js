import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import './Register.css';

// ✅ Validation Schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    console.log("Submitting data:", data);

    try {
      const response = await axios.post("http://localhost:5000/api/register", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Server response:", response.data);
      alert("Registration successful");
    } catch (error) {
      console.error("Error registering user:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Error registering user. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Name:</label>
        <input type="text" placeholder="Name" {...register("name")} />
        <p className="error">{errors.name?.message}</p>

        <label>Email:</label>
        <input type="email" placeholder="Email" {...register("email")} />
        <p className="error">{errors.email?.message}</p>

        <label>Password:</label>
        <input type="password" placeholder="Password" {...register("password")} />
        <p className="error">{errors.password?.message}</p>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;