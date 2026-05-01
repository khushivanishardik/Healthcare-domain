import { useState } from "react";

import Landing from "./components/Landing";

import PatientLogin from "./components/PatientLogin";
import PatientRegister from "./components/PatientRegister";
import PatientDashboard from "./components/PatientDashboard";

import DoctorLogin from "./components/DoctorLogin";
import DoctorRegister from "./components/DoctorRegister";
import DoctorDashboard from "./components/DoctorDashboard";

import AdminDashboard from "./components/AdminDashboard";

export default function App() {

  const [view, setView] = useState("landing");

  const [patientEmail, setPatientEmail] = useState(null);
  const [doctorEmail, setDoctorEmail] = useState(null);

  return (

    <div>

      {view === "landing" && <Landing setView={setView} />}

      {/* PATIENT */}
      {view === "patientLogin" && (
        <PatientLogin
          setView={setView}
          setPatientEmail={setPatientEmail}
        />
      )}

      {view === "patientRegister" && (
        <PatientRegister setView={setView} />
      )}

      {view === "patientDashboard" && (
        patientEmail ? (
          <PatientDashboard
            setView={setView}
            currentUserEmail={patientEmail}
          />
        ) : (
          <h1 style={{ color: "white" }}>Loading Patient...</h1>
        )
      )}

      {/* DOCTOR */}
      {view === "doctorLogin" && (
        <DoctorLogin
          setView={setView}
          setDoctorEmail={setDoctorEmail}
        />
      )}

      {view === "doctorRegister" && (
        <DoctorRegister setView={setView} />
      )}

      {view === "doctorDashboard" && (
        doctorEmail ? (
          <DoctorDashboard
            setView={setView}
            currentDoctorEmail={doctorEmail}
          />
        ) : (
          <h1 style={{ color: "white" }}>Loading Doctor...</h1>
        )
      )}

      {/* ADMIN */}
      {view === "adminDashboard" && (
        <AdminDashboard setView={setView} />
      )}

    </div>
  );
}