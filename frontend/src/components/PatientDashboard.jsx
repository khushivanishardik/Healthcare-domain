import {useEffect,useState} from 'react'
import axios from 'axios'
import '../index.css'

export default function PatientDashboard({setView,currentUserEmail}){

const API='https://healthcare-domain.onrender.com'

const [profile,setProfile]=useState({})
const [appointments,setAppointments]=useState([])
const [doctors,setDoctors]=useState([])

const [doctorId,setDoctorId]=useState('')
const [doctorName,setDoctorName]=useState('')
const [specialization,setSpecialization]=useState('')
const [date,setDate]=useState('')
const [time,setTime]=useState('')

useEffect(()=>{
axios.get(API+'/api/profile/one/'+currentUserEmail)
.then(r=>setProfile(r.data||{}))

axios.get(API+'/api/appointments/all')
.then(r=>setAppointments(r.data.filter(a=>a.patientId===currentUserEmail)))

axios.get(API+'/api/admin/approved-doctors')
.then(r=>setDoctors(r.data))
},[])

const book=async()=>{
await axios.post(API+'/api/appointments/book',{
patientId:currentUserEmail,
patientName:profile.name,
doctorId,doctorName,specialization,
appointmentDate:date,
appointmentTime:time
})
window.location.reload()
}

return(

<div className="page">
<div className="container">

<div className="card">

<h1>Patient Dashboard</h1>

<button className="btn logout"
onClick={()=>setView('landing')}>
Logout
</button>

</div>

<div className="card">

<h2>Personal Info</h2>

<p>Name: {profile.name}</p>
<p>Phone: {profile.phone}</p>

</div>

<div className="card">

<h2>Book Appointment</h2>

<select onChange={e=>{
const d=doctors.find(x=>x._id===e.target.value)
setDoctorId(d._id)
setDoctorName(d.name)
setSpecialization(d.specialization)
}}>

<option>Select Doctor</option>

{doctors.map(d=>(
<option key={d._id} value={d._id}>
{d.name} - {d.specialization}
</option>
))}

</select>

<input type="date" onChange={e=>setDate(e.target.value)} />
<input type="time" onChange={e=>setTime(e.target.value)} />

<button className="btn primary" onClick={book}>
Book
</button>

</div>

<div className="card">

<h2>Appointments</h2>

{appointments.map(a=>(
<div className="appointment" key={a._id}>
{a.doctorName} | {a.appointmentDate}
<span className="badge">{a.status}</span>
</div>
))}

</div>

</div>
</div>

)
}