import { useState } from "react";
import axios from "axios";

export default function DoctorLogin({ setView, setDoctorEmail }) {

  const [email, setEmailInput] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      await axios.post(
        "https://healthcare-domain.onrender.com/api/doctor-auth/login",
        { email, password }
      );

      console.log("Doctor login success:", email);

      setDoctorEmail(email);
      setView("doctorDashboard");

    } catch (err) {
      console.log(err);
      alert("Login failed or not approved");
    }
  };

  return (
    <div style={{ color: "white" }}>
      <h1>Doctor Login</h1>

      <input
        placeholder="Email"
        onChange={(e) => setEmailInput(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={login}>Login</button>

      <button onClick={() => setView("landing")}>
        Go Back
      </button>
    </div>
  );
}