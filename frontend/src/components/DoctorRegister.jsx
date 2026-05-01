import { useState } from "react";
import axios from "axios";
import "../index.css";

export default function DoctorRegister({ setView }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [specialization, setSpecialization] = useState("");

  const register = async () => {
    try {
      await axios.post(
        "https://healthcare-domain.onrender.com/api/doctor-auth/register",
        { name, email, password, specialization }
      );

      alert("Applied for approval");
      setView("doctorLogin");

    } catch (err) {
  console.log(err.response?.data);   // 🔥 THIS LINE
  alert(err.response?.data?.msg || "Application failed");
}
    
  };

  return (
    <div className="page">
      <div className="card">

        <h1>Doctor Registration</h1>

        <input placeholder="Name" onChange={(e)=>setName(e.target.value)} />
        <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
        <input placeholder="Specialization" onChange={(e)=>setSpecialization(e.target.value)} />

        <button className="btn primary full" onClick={register}>
          Apply
        </button>

        <button className="btn danger full" onClick={()=>setView("doctorLogin")}>
          Back to Login
        </button>

      </div>
    </div>
  );
}