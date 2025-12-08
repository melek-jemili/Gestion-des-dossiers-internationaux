import React  from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Formulaire from './enseignant/formulaire';
import DeveValidationInterface from './DEVE/DEVE';
import DRIInterface from './DRI/DRI';
import InterfaceCEVU from './CEVU/CEVU';
import RegisterForm from './register/register';
import LoginForm from './login/login';
import TeacherDashboard from './enseignant/dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element ={<Formulaire />} />
        <Route path='/login' element ={<LoginForm />} />
        <Route path='/register' element ={<RegisterForm />} />
      <Route path='/enseignant/formulaire' element ={<Formulaire />} />
      <Route path='/enseignant/dashboard' element ={<TeacherDashboard />} />
      <Route path='/DEVE/DEVE' element ={<DeveValidationInterface />} />
      <Route path='/DRI/DRI' element ={<DRIInterface />} />
      <Route path='/CEVU/CEVU' element ={<InterfaceCEVU />} />
      </Routes>
    </Router>
    
  );
}

export default App;
