import {useState} from 'react'
import axios from 'axios'
import '../index.css'

export default function DoctorRegister({setView}){

const API='https://healthcare-domain.onrender.com'

const [name,setName]=useState('')
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')
const [specialization,setSpecialization]=useState('')

const register=async()=>{

const res=await axios.post(API+'/api/doctor-auth/register',{
name,email,password,specialization
})

alert(res.data.message)

if(res.data.success){
setView('doctorLogin')
}

}

return(

<div className="page">
<div className="card">

<h1>Doctor Apply</h1>

<input placeholder="Name"
onChange={e=>setName(e.target.value)} />

<input placeholder="Email"
onChange={e=>setEmail(e.target.value)} />

<input type="password"
placeholder="Password"
onChange={e=>setPassword(e.target.value)} />

<input placeholder="Specialization"
onChange={e=>setSpecialization(e.target.value)} />

<button className="btn success" onClick={register}>
Apply for Approval
</button>

<button className="btn logout"
onClick={()=>setView('doctorLogin')}>
Back
</button>

</div>
</div>

)
}