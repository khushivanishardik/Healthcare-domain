import React,{useState}
from 'react'

import Landing from './components/Landing'

import PatientRegister from './components/PatientRegister'

import PatientLogin from './components/PatientLogin'

import DoctorRegister from './components/DoctorRegister'

import DoctorLogin from './components/DoctorLogin'

import PatientDashboard from './components/PatientDashboard'

import DoctorDashboard from './components/DoctorDashboard'

import AdminDashboard from './components/AdminDashboard'



export default function App(){

const [view,setView]=
useState('landing')


const [currentUserEmail,
setCurrentUserEmail]=
useState('')


const [currentDoctorEmail,
setCurrentDoctorEmail]=
useState('')



return(

<>

{
view==='landing'
&&
<Landing setView={setView}/>
}


{
view==='patientRegister'
&&
<PatientRegister setView={setView}/>
}


{
view==='patientLogin'
&&
<PatientLogin
setView={setView}
setCurrentUserEmail={setCurrentUserEmail}
/>
}



{
view==='doctorRegister'
&&
<DoctorRegister setView={setView}/>
}



{
view==='doctorLogin'
&&
<DoctorLogin
setView={setView}
setCurrentDoctorEmail={setCurrentDoctorEmail}
/>
}



{
view==='patientDashboard'
&&
<PatientDashboard
setView={setView}
currentUserEmail={currentUserEmail}
/>
}



{
view==='doctorDashboard'
&&
<DoctorDashboard
setView={setView}
currentDoctorEmail={currentDoctorEmail}
/>
}



{
view==='adminDashboard'
&&
<AdminDashboard setView={setView}/>
}

</>

)

}