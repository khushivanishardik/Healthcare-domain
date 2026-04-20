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

const [message,setMessage]=
useState('')



const login=
async()=>{

try{

const res=
await axios.post(

API+
'/api/doctor-auth/login',

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

}catch(err){

setMessage(

err?.response?.data?.message

||

'Doctor login failed'

)

}

}



return(

<div>

<h2>
Doctor Login
</h2>


<input
placeholder='Doctor Email'
value={email}
onChange={(e)=>
setEmail(
e.target.value
)}
/>


<input
type='password'
placeholder='Password'
value={password}
onChange={(e)=>
setPassword(
e.target.value
)}
/>


<button onClick={login}>
Login
</button>


<button
onClick={()=>setView(
'landing'
)}
style={{
marginLeft:'10px'
}}
>
Go Back Home
</button>


<p>{message}</p>

</div>

)

}