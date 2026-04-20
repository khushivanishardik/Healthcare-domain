import {useState}
from 'react'

import axios
from 'axios'


export default function DoctorLogin({
setView,
setCurrentDoctorEmail
}){

const API=
'https://healthcare-domain.onrender.com'

const [email,setEmail]=
useState('')

const [password,setPassword]=
useState('')



const login=
async()=>{

await axios.post(

API+'/api/doctor-auth/login',

{
email,
password
}

)

setCurrentDoctorEmail(
email
)

setView(
'doctorDashboard'
)

}



return(

<div>

<h2>Doctor Login</h2>

<input
placeholder='Email'
value={email}
onChange={(e)=>
setEmail(e.target.value)
}
/>

<input
type='password'
placeholder='Password'
value={password}
onChange={(e)=>
setPassword(e.target.value)
}
/>

<button onClick={login}>
Login
</button>

</div>

)

}