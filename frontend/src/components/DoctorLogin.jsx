import {useState} from 'react'
import axios from 'axios'
import '../index.css'

export default function DoctorLogin({setView,setCurrentDoctorEmail}){

const API='https://healthcare-domain.onrender.com'

const [email,setEmail]=useState('')
const [password,setPassword]=useState('')

const login=async()=>{

const res=await axios.post(API+'/api/doctor-auth/login',{
email,password
})

if(res.data.success){
setCurrentDoctorEmail(email)
setView('doctorDashboard')
}else{
alert(res.data.message)
}

}

return(

<div className="page">
<div className="card">

<h1>Doctor Login</h1>

<input placeholder="Email"
onChange={e=>setEmail(e.target.value)} />

<input type="password"
placeholder="Password"
onChange={e=>setPassword(e.target.value)} />

<button className="btn primary" onClick={login}>
Login
</button>

<button className="btn"
onClick={()=>setView('doctorRegister')}>
Apply Registration
</button>

<button className="btn logout"
onClick={()=>setView('landing')}>
Back
</button>

</div>
</div>

)
}