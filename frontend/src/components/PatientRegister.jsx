import {useState} from 'react'
import axios from 'axios'
import '../index.css'

export default function PatientRegister({setView}){

const API='https://healthcare-domain.onrender.com'

const [email,setEmail]=useState('')
const [password,setPassword]=useState('')

const register=async()=>{

const res=await axios.post(API+'/api/patient/register',{
email,password
})

alert(res.data.message)

if(res.data.success){
setView('patientLogin')
}

}

return(

<div className="page">
<div className="card">

<h1>Patient Register</h1>

<input placeholder="Email"
onChange={e=>setEmail(e.target.value)} />

<input type="password"
placeholder="Password"
onChange={e=>setPassword(e.target.value)} />

<button className="btn success" onClick={register}>
Register
</button>

<button className="btn logout"
onClick={()=>setView('patientLogin')}>
Back
</button>

</div>
</div>

)
}