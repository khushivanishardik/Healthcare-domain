import {useState}
from 'react'

import axios
from 'axios'



export default function DoctorRegister({setView}){

const [name,setName]=
useState('')

const [email,setEmail]=
useState('')

const [password,setPassword]=
useState('')

const [specialization,
setSpecialization]=
useState('')

const [message,setMessage]=
useState('')



const register=
async()=>{

try{

const res=
await axios.post(

'https://healthcare-domain.onrender.com/api/doctor-auth/register',

{
name,
email,
password,
specialization
}

)

setMessage(
res.data.message
)

}catch(err){

setMessage(
'Registration failed'
)

}

}



return(

<div>

<h2>
Doctor Register
</h2>

<label>Name</label>

<input
placeholder='Enter Full Name'
value={name}
onChange={(e)=>
setName(
e.target.value
)}
/>


<label>Email</label>

<input
placeholder='Enter Email'
value={email}
onChange={(e)=>
setEmail(
e.target.value
)}
/>


<label>Password</label>

<input
type='password'
placeholder='Enter Password'
value={password}
onChange={(e)=>
setPassword(
e.target.value
)}
/>


<label>Specialization</label>

<input
placeholder='Enter Specialization'
value={specialization}
onChange={(e)=>
setSpecialization(
e.target.value
)}
/>


<button onClick={register}>
Apply For Approval
</button>


<button
onClick={()=>setView(
'doctorLogin'
)}
>
Go To Login
</button>


<p>{message}</p>

</div>

)

}