import {useEffect,useState} from 'react'
import axios from 'axios'
import '../App.css'

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

useEffect(()=>{load()},[])

const load=async()=>{
const p=await axios.get(API+'/api/profile/one/'+currentUserEmail)
setProfile(p.data||{})

const a=await axios.get(API+'/api/appointments/all')
setAppointments(a.data.filter(x=>x.patientId===currentUserEmail))

const d=await axios.get(API+'/api/admin/approved-doctors')
setDoctors(d.data)
}

const book=async()=>{
await axios.post(API+'/api/appointments/book',{
patientId:currentUserEmail,
patientName:profile.name,
doctorId,doctorName,specialization,
appointmentDate:date,
appointmentTime:time
})
load()
}

return(
<div className='dashboard'>

<div className='navbar'>
<h1 className='title'>👤 Patient Dashboard</h1>
<button className='logout' onClick={()=>setView('landing')}>
Logout
</button>
</div>

<div className='section'>
<h2>Personal Details</h2>
<p><b>Name:</b> {profile.name}</p>
<p><b>Phone:</b> {profile.phone}</p>
</div>

<div className='section'>
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

<input type='date' onChange={(e)=>setDate(e.target.value)} />
<input type='time' onChange={(e)=>setTime(e.target.value)} />

<button className='primary' onClick={book}>
Book Appointment
</button>

</div>

<div className='section'>
<h2>Appointments</h2>

{appointments.map(a=>(
<div className='item' key={a._id}>

<div>
<b>{a.doctorName}</b><br/>
{a.appointmentDate} | {a.appointmentTime}
</div>

</div>
))}

</div>

</div>
)
}