import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../../api";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const { email, password } = formData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseurl}/auth/register`, formData);
      setMessage(res.data.message || "Registration successful!");
      navigate("/login");
      setFormData({ email: "", password: "" });
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div style={styles.container}>
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Email"
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
        <button type="submit" style={styles.button}>
          Register
        </button>

        <p>
          Already registered?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{
              color: "blue",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Login here
          </span>
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
    color: "green",
  },
};

export default Register;
