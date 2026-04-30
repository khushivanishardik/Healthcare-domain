import { useState } from "react";
import axios from "axios";
import "../index.css";

export default function PatientRegister({ setView }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const API = "https://healthcare-domain.onrender.com";

  const register = async () => {
    try {
      await axios.post(API + "/api/auth/register", {
        email,
        password,
      });

      alert("Patient Registered Successfully");
      setView("patientLogin");

    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="page">
      <div className="card">

        <h1>Patient Register</h1>

        <input
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn primary" onClick={register}>
          Register
        </button>

        <button className="btn" onClick={() => setView("patientLogin")}>
          Back
        </button>

      </div>
    </div>
  );
}