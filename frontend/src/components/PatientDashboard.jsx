import { useEffect, useState } from "react";
import axios from "axios";
import "../index.css";

export default function PatientDashboard({ setView, currentUserEmail }) {

  const API = "https://healthcare-domain.onrender.com";

  const [profile, setProfile] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [doctorId, setDoctorId] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [specialization, setSpecialization] = useState("");

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // 🔥 Safety check
  if (!currentUserEmail) {
    return <h1 style={{ color: "white" }}>Loading...</h1>;
  }

  // 🔥 Load data
  useEffect(() => {

    // profile
    axios.get(API + "/api/profile/" + currentUserEmail)
      .then((r) => {
        setProfile(r.data || {});
        setName(r.data?.name || "");
        setPhone(r.data?.phone || "");
      })
      .catch(err => console.log(err));

    // appointments
    axios.get(API + "/api/appointments/all")
      .then((r) =>
        setAppointments(
          r.data.filter((a) => a.patientId === currentUserEmail)
        )
      )
      .catch(err => console.log(err));

    // doctors
    axios.get(API + "/api/admin/approved-doctors")
      .then((r) => setDoctors(r.data))
      .catch(err => console.log(err));

  }, [currentUserEmail]);

  // 🔥 Update Profile
 const updateProfile = async () => {
  try {
    const res = await axios.put(
      `${API}/api/profile/update/${currentUserEmail}`,
      {
        name,
        phone
      }
    );

    alert("Updated successfully ✅");

  } catch (err) {
    console.log(err.response?.data || err.message);
    alert("Update failed ❌");
  }
};

  // 🔥 Book Appointment
  const book = async () => {

    if (!doctorId || !date || !time) {
      return alert("Please fill all fields");
    }

    try {
      await axios.post(API + "/api/appointments/book", {
        patientId: currentUserEmail,
        patientName: name || currentUserEmail,
        doctorId,
        doctorName,
        specialization,
        appointmentDate: date,
        appointmentTime: time,
      });

      // refresh appointments
      const res = await axios.get(API + "/api/appointments/all");

      setAppointments(
        res.data.filter((a) => a.patientId === currentUserEmail)
      );

      // reset form
      setDoctorId("");
      setDoctorName("");
      setSpecialization("");
      setDate("");
      setTime("");

      alert("Appointment booked successfully");

    } catch (err) {
      console.log("BOOK ERROR:", err.response?.data);
      alert("Booking failed");
    }
  };

  return (
    <div className="page">
      <div className="container">

        {/* HEADER */}
        <div className="card">
          <h1>Patient Dashboard</h1>

          <button
            className="btn logout"
            onClick={() => setView("landing")}
          >
            Logout
          </button>
        </div>

        {/* PERSONAL INFO */}
        <div className="card">
          <h2>Personal Info</h2>

          {!editing ? (
            <>
              <p>Name: {profile?.name || "Not set"}</p>
              <p>Phone: {profile?.phone || "Not set"}</p>

              <button
                className="btn primary"
                onClick={() => setEditing(true)}
              >
                Edit
              </button>
            </>
          ) : (
            <>
              <input
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                placeholder="Enter Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <button className="btn success" onClick={updateProfile}>
                Save
              </button>

              <button
                className="btn danger"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            </>
          )}
        </div>

        {/* BOOK APPOINTMENT */}
        <div className="card">
          <h2>Book Appointment</h2>

          <select
            value={doctorId}
            onChange={(e) => {
              const d = doctors.find(x => x._id === e.target.value);

              if (d) {
                setDoctorId(d._id);
                setDoctorName(d.name);
                setSpecialization(d.specialization);
              }
            }}
          >
            <option value="">Select Doctor</option>

            {doctors.map((d) => (
              <option key={d._id} value={d._id}>
                {d.name} - {d.specialization}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />

          <button className="btn primary" onClick={book}>
            Book Appointment
          </button>
        </div>

        {/* APPOINTMENTS */}
        <div className="card">
          <h2>Appointment History</h2>

          {appointments.length === 0 && (
            <p>No appointments yet</p>
          )}

          {appointments.map((a) => (
            <div className="appointment" key={a._id}>
              <div>
                {a.doctorName} | {a.appointmentDate} | {a.appointmentTime}
              </div>

              <span className="badge">{a.status}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}