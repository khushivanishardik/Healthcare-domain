import {useState} from 'react'
import axios from 'axios'

export default function DoctorRegister({setView}){

const [name,setName]=useState('')
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')
const [specialization,setSpecialization]=useState('')

const register=async()=>{

await axios.post(
'https://healthcare-domain.onrender.com/api/doctor-auth/register',
{
name,
email,
password,
specialization
}
)

alert('Registered')

setView(
'doctorLogin'
)

}

return(

<div>

<h2>Doctor Register</h2>

<input
placeholder='Name'
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<input
placeholder='Email'
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type='password'
placeholder='Password'
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<input
placeholder='Specialization'
value={specialization}
onChange={(e)=>setSpecialization(e.target.value)}
/>

<button onClick={register}>
Register
</button>

</div>

)

}