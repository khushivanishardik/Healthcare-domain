import React,{useState}
from 'react'

import Landing
from './components/Landing'

import PatientLogin
from './components/PatientLogin'

import DoctorLogin
from './components/DoctorLogin'

import PatientDashboard
from './components/PatientDashboard'

import DoctorDashboard
from './components/DoctorDashboard'

import AdminDashboard
from './components/AdminDashboard'

import PatientRegister
from './components/PatientRegister'

import DoctorRegister
from './components/DoctorRegister'



export default function App(){

const [view,setView]=
useState(
'landing'
)



return(

<>

{
view==='landing'
&&
<Landing
setView={setView}
/>
}



{
view==='patientLogin'
&&
<PatientLogin
setView={setView}
/>
}



{
view==='doctorLogin'
&&
<DoctorLogin
setView={setView}
/>
}



{
view==='patientDashboard'
&&
<PatientDashboard
setView={setView}
/>
}



{
view==='doctorDashboard'
&&
<DoctorDashboard
setView={setView}
/>
}



{
view==='adminDashboard'
&&
<AdminDashboard
setView={setView}
/>
}

{
view==='patientRegister'
&&
<PatientRegister
setView={setView}
/>
}


{
view==='doctorRegister'
&&
<DoctorRegister
setView={setView}
/>
}

</>

)

}