import { useState } from "react";
import axios from "axios";

export default function PatientLogin({ setView, setPatientEmail }) {

  const [email, setEmailInput] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      await axios.post(
        "https://healthcare-domain.onrender.com/api/auth/login",
        { email, password }
      );

      console.log("Patient login success:", email);

      setPatientEmail(email);
      setView("patientDashboard");

    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  return (
    <div style={{ color: "white" }}>
      <h1>Patient Login</h1>

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