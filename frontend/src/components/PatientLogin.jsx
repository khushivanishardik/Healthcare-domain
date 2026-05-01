import { useState } from "react";
import axios from "axios";
import "../index.css";

export default function PatientLogin({ setView, setPatientEmail }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      await axios.post(
        "https://healthcare-domain.onrender.com/api/auth/login",
        { email, password }
      );

      setPatientEmail(email);
      setView("patientDashboard");

    }
     catch (err) {
        console.log(err.response?.data);
        alert(err.response?.data?.msg || "Login failed");
  }
  };

  return (
    <div className="page">
      <div className="card">

        <h1>Patient Login</h1>

        <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />

        <button className="btn primary full" onClick={login}>
          Login
        </button>

        <button className="btn success full" onClick={()=>setView("patientRegister")}>
          Register
        </button>

        <button className="btn danger full" onClick={()=>setView("landing")}>
          Go Back
        </button>

      </div>
    </div>
  );
}
