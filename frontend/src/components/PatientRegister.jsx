import { useState } from "react";
import axios from "axios";
import "../index.css";

export default function PatientRegister({ setView }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      await axios.post(
        "https://healthcare-domain.onrender.com/api/auth/register",
        { email, password }
      );

      alert("Registered successfully");
      setView("patientLogin");

    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="page">
      <div className="card">

        <h1>Patient Register</h1>

        <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />

        <button className="btn primary full" onClick={register}>
          Register
        </button>

        <button className="btn danger full" onClick={()=>setView("patientLogin")}>
          Back to Login
        </button>

      </div>
    </div>
  );
}