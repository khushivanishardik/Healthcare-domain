import {useState}
from 'react'

import axios
from 'axios'


export default function PatientLogin({
setView,
setCurrentUserEmail
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

API+'/api/auth/login',

{
email,
password
}

)

setCurrentUserEmail(
email
)

setView(
'patientDashboard'
)

}



return(

<div>

<h2>Patient Login</h2>

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