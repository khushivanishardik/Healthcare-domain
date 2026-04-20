import {useState}
from 'react'

import axios
from 'axios'



export default function PatientRegister({setView}){

const API=
'https://healthcare-domain.onrender.com'



const [username,setUsername]=
useState('')

const [email,setEmail]=
useState('')

const [password,setPassword]=
useState('')

const [message,setMessage]=
useState('')

const [isSuccess,setIsSuccess]=
useState(false)



const register=
async()=>{

try{

const res=
await axios.post(

API+'/api/auth/register',

{
username,
email,
password
}

)

setIsSuccess(
true
)

setMessage(
res.data.message
)


}catch(err){

setIsSuccess(
false
)

setMessage(

err?.response?.data?.message ||

'Patient registration failed'

)

}

}



return(

<div>

<h2>
Patient Register
</h2>


<label>
Username
</label>

<input
placeholder='Enter Username'
value={username}
onChange={(e)=>
setUsername(
e.target.value
)}
/>


<label>
Email
</label>

<input
placeholder='Enter Email'
value={email}
onChange={(e)=>
setEmail(
e.target.value
)}
/>


<label>
Password
</label>

<input
type='password'
placeholder='Enter Password'
value={password}
onChange={(e)=>
setPassword(
e.target.value
)}
/>


<button onClick={register}>
Register
</button>


<button
onClick={()=>setView(
'patientLogin'
)}
>
Go To Login
</button>



{
message &&
(
<div>

{
isSuccess
?

'✅ '+message

:

'❌ '+message

}

</div>
)
}

</div>

)

}