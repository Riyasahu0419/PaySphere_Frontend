import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth.jsx"; // ✅ import hook
import { baseurl } from "../../api.js";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ from AuthContext

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseurl}/auth/login`, formData);

      // ✅ backend returns { token }
      const token = res.data.token;

      // ✅ save token + minimal userData (email for now)
      login({ email: formData.email }, token);

      setMessage("Login successful!");
      alert("Login successful!");

      navigate("/"); // 🚀 redirect now works
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed. Invalid credentials.");
      alert(err.response?.data?.message || "Login failed. Invalid credentials.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>User Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Enter email"
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Password"
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
        <p
          type="button"
          onClick={() => navigate("/register")}
          style={{
            background: "none",
            border: "none",
            color: "blue",
            cursor: "pointer",
          }}
        >
          Not registered? Sign up
        </p>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
    cursor: "pointer",
  },
  message: {
    marginTop: "15px",
    color: "red",
  },
};

export default Login;