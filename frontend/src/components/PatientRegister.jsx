import {useState} from 'react'
import axios from 'axios'

export default function PatientRegister({setView}){

const [name,setName]=useState('')
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')

const register=async()=>{

await axios.post(
'http://localhost:5000/api/auth/register',
{
name,
email,
password
}
)

alert('Registered')

setView(
'patientLogin'
)

}

return(

<div>

<h2>Patient Register</h2>

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

<button onClick={register}>
Register
</button>

</div>

)

}