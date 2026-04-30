import { useState } from "react";

import Landing from "./components/Landing";
import PatientLogin from "./components/PatientLogin";
import PatientDashboard from "./components/PatientDashboard";

import DoctorLogin from "./components/DoctorLogin";
import DoctorDashboard from "./components/DoctorDashboard";

import AdminDashboard from "./components/AdminDashboard";

export default function App() {

  const [view, setView] = useState("landing");

  const [patientEmail, setPatientEmail] = useState(null);
  const [doctorEmail, setDoctorEmail] = useState(null);

  return (

    <div>

      {/* LANDING */}
      {view === "landing" && (
        <Landing setView={setView} />
      )}

      {/* PATIENT LOGIN */}
      {view === "patientLogin" && (
        <PatientLogin
          setView={setView}
          setPatientEmail={setPatientEmail}
        />
      )}

      {/* PATIENT DASHBOARD */}
      {view === "patientDashboard" && (
        patientEmail ? (
          <PatientDashboard
            setView={setView}
            currentUserEmail={patientEmail}
          />
        ) : (
          <h1 style={{ color: "white", textAlign: "center" }}>
            Loading Patient...
          </h1>
        )
      )}

      {/* DOCTOR LOGIN */}
      {view === "doctorLogin" && (
        <DoctorLogin
          setView={setView}
          setDoctorEmail={setDoctorEmail}
        />
      )}

      {/* DOCTOR DASHBOARD */}
      {view === "doctorDashboard" && (
        doctorEmail ? (
          <DoctorDashboard
            setView={setView}
            currentDoctorEmail={doctorEmail}
          />
        ) : (
          <h1 style={{ color: "white", textAlign: "center" }}>
            Loading Doctor...
          </h1>
        )
      )}

      {/* ADMIN DASHBOARD */}
      {view === "adminDashboard" && (
        <AdminDashboard setView={setView} />
      )}

    </div>
  );
}