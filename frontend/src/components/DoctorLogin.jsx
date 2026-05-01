import { useState } from "react";
import axios from "axios";
import "../index.css";

export default function DoctorLogin({ setView, setDoctorEmail }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      await axios.post(
        "https://healthcare-domain.onrender.com/api/doctor-auth/login",
        { email, password }
      );

      setDoctorEmail(email);
      setView("doctorDashboard");

    } catch (err) {
  console.log(err.response?.data);
  alert(err.response?.data?.msg || "Login failed");
}
  };

  return (
    <div className="page">
      <div className="card">

        <h1>Doctor Login</h1>

        <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />

        <button className="btn success full" onClick={login}>
          Login
        </button>

        <button className="btn primary full" onClick={()=>setView("doctorRegister")}>
          Apply for Approval
        </button>

        <button className="btn danger full" onClick={()=>setView("landing")}>
          Go Back
        </button>

      </div>
    </div>
  );
}