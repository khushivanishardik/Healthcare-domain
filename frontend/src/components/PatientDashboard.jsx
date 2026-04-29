import {useEffect,useState} from 'react'
import axios from 'axios'
import '../App.css'

export default function PatientDashboard({setView,currentUserEmail}){

const API='https://healthcare-domain.onrender.com'

const userEmail=currentUserEmail

const [profile,setProfile]=useState({})
const [appointments,setAppointments]=useState([])
const [doctors,setDoctors]=useState([])

const [doctorId,setDoctorId]=useState('')
const [doctorName,setDoctorName]=useState('')
const [specialization,setSpecialization]=useState('')

const [appointmentDate,setAppointmentDate]=useState('')
const [appointmentTime,setAppointmentTime]=useState('')

const fetchProfile=async()=>{
const r=await axios.get(API+'/api/profile/one/'+userEmail)
setProfile(r.data||{})
}

const fetchAppointments=async()=>{
const r=await axios.get(API+'/api/appointments/all')
setAppointments(r.data.filter(a=>a.patientId===userEmail))
}

const fetchDoctors=async()=>{
const r=await axios.get(API+'/api/admin/approved-doctors')
setDoctors(r.data)
}

useEffect(()=>{
fetchProfile()
fetchAppointments()
fetchDoctors()
},[])

const book=async()=>{
await axios.post(API+'/api/appointments/book',{
patientId:userEmail,
patientName:profile.name,
doctorId,
doctorName,
specialization,
appointmentDate,
appointmentTime
})
fetchAppointments()
}

return(

<div className='page'>

<div className='card'>

<div className='nav-top'>
<h1>Patient Dashboard</h1>
<button className="logout" onClick={()=>setView('landing')}>
Logout
</button>
</div>

<div className='card'>
<h2>Personal Details</h2>
<p><b>Name:</b> {profile.name}</p>
<p><b>Phone:</b> {profile.phone}</p>
</div>

<div className='card'>
<h2>Book Appointment</h2>

<select onChange={(e)=>{
const d=doctors.find(x=>x._id===e.target.value)
if(d){
setDoctorId(d._id)
setDoctorName(d.name)
setSpecialization(d.specialization)
}
}}>

<option>Select Doctor</option>

{doctors.map(d=>(
<option key={d._id} value={d._id}>
{d.name} - {d.specialization}
</option>
))}

</select>

<input type='date' onChange={(e)=>setAppointmentDate(e.target.value)} />
<input type='time' onChange={(e)=>setAppointmentTime(e.target.value)} />

<button className="primary" onClick={book}>
Book Appointment
</button>

</div>

<div className='card'>
<h2>Appointment History</h2>

{appointments.map(a=>(

<div className='appointment-item' key={a._id}>

<div>
<p><b>{a.doctorName}</b></p>
<p>{a.appointmentDate} | {a.appointmentTime}</p>
<span className='badge'>{a.status}</span>
</div>

</div>

))}

</div>

</div>

</div>

)
}