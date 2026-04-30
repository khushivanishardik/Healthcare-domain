import { useState } from "react";
import axios from "axios";
import "../index.css";

export default function DoctorRegister({ setView }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [specialization, setSpecialization] = useState("");

  const API = "https://healthcare-domain.onrender.com";

  const register = async () => {
    try {
      await axios.post(API + "/api/doctor-auth/register", {
        name,
        email,
        password,
        specialization,
      });

      alert("Application sent for admin approval");
      setView("doctorLogin");

    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="page">
      <div className="card">

        <h1>Doctor Registration</h1>

        <input
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          placeholder="Specialization"
          onChange={(e) => setSpecialization(e.target.value)}
        />

        <button className="btn success" onClick={register}>
          Apply for Approval
        </button>

        <button className="btn" onClick={() => setView("doctorLogin")}>
          Back
        </button>

      </div>
    </div>
  );
}