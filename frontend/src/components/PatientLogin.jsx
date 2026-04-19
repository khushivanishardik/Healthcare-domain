import {useState} from 'react'
import axios from 'axios'

export default function PatientLogin({setView}){

const [email,setEmail]=useState('')
const [password,setPassword]=useState('')

const login=async()=>{

await axios.post(
'https://healthcare-domain.onrender.com/api/auth/login',
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

<label>Email</label><br/>
<input
value={email}
onChange={(e)=>
setEmail(e.target.value)
}
/>

<label>Password</label><br/>
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