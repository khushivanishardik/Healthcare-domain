import {useState} from 'react'
import axios from 'axios'

export default function PatientLogin({setView}){

const [email,setEmail]=useState('')
const [password,setPassword]=useState('')

const login=async()=>{

await axios.post(
'http://localhost:5000/api/auth/login',
{
email,
password
}
)

setView(
'patientDashboard'
)

}

return(

<div>

<h2>Patient Login</h2>

<input
value={email}
onChange={(e)=>
setEmail(e.target.value)
}
/>

<input
type='password'
value={password}
onChange={(e)=>
setPassword(e.target.value)
}
/>

<button onClick={login}>
Login
</button>

<button
onClick={()=>setView('landing')}
>
Back
</button>

</div>

)

}