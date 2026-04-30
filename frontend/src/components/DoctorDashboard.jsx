import { useEffect, useState } from "react";
import axios from "axios";
import "../index.css";

export default function DoctorDashboard({ setView, currentDoctorEmail }) {

  const API = "https://healthcare-domain.onrender.com";

  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);

  // 🔥 FIX 1: WAIT until email exists
  useEffect(() => {
  if (!currentDoctorEmail) return;

  axios
    .get(API + "/api/doctor-auth/profile/" + currentDoctorEmail)
    .then((r) => setDoctor(r.data))
    .catch((err) => console.log(err));
}, [currentDoctorEmail]);
  // 🔥 FIX 2: safe appointments fetch
  useEffect(() => {
    if (!doctor) return;

    axios
      .get(API + "/api/appointments/all")
      .then((r) =>
        setAppointments(
          r.data.filter((a) => a.doctorId === doctor._id)
        )
      )
      .catch((err) => console.log("Appointment error:", err));
  }, [doctor]);

  const update = async (id, status) => {
  try {
    await axios.put(API + "/api/appointments/update/" + id, { status });

    // 🔥 REFRESH DATA WITHOUT RELOAD
    const res = await axios.get(API + "/api/appointments/all");

    setAppointments(
      res.data.filter((a) => a.doctorId === doctor._id)
    );

  } catch (err) {
    console.log(err);
  }
};

  // 🔥 FIX 3: prevent crash
  if (!currentDoctorEmail) {
  return <h1 style={{ color: "white" }}>Waiting for login...</h1>;
}

  if (!doctor) {
    return <div className="page"><h2>Fetching doctor data...</h2></div>;
  }

  return (
    <div className="page">
      <div className="container">

        <div className="card">
          <h1>Doctor Dashboard</h1>

          <button
            className="btn logout"
            onClick={() => setView("landing")}
          >
            Logout
          </button>
        </div>

        <div className="card">
          <h2>{doctor.name}</h2>
          <p>{doctor.specialization}</p>
        </div>

        <div className="card">
          <h2>Appointments</h2>

          {appointments.length === 0 && <p>No appointments</p>}

          {appointments.map((a) => (
            <div className="appointment" key={a._id}>
              <div>
                {a.patientName} | {a.appointmentDate}
              </div>

              <div>

                {a.status === "Pending" && (
                  <>
                    <button
                      className="btn success"
                      onClick={() => update(a._id, "Accepted")}
                    >
                      ✔
                    </button>

                    <button
                      className="btn danger"
                      onClick={() => update(a._id, "Rejected")}
                    >
                      ✖
                    </button>
                  </>
                )}

                {a.status === "Accepted" && (
                  <button
                    className="btn primary"
                    onClick={() => update(a._id, "Completed")}
                  >
                    Done
                  </button>
                )}

                <span className="badge">{a.status}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}