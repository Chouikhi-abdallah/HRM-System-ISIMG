import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Admin from './pages/Admin';
import Manager from './pages/Manager';
import Employee from './pages/Employee';
import Error from './pages/error';
import 'react-toastify/dist/ReactToastify.css';
import ForgetPassword from './components/ForgetPassword';
import ResetPassword from './pages/ResetPassword';


ReactDOM.createRoot(document.getElementById('root')).render(
  
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/manager" element={<Manager />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="*" element={<Error/>}/>
        <Route path='/'element={<Login/>}/>
        <Route path='/forgetpassword' element={<ForgetPassword/>}/>
        <Route path="/resetpassword/:token" element={<ResetPassword />}/>
      </Routes>
    </Router>
);
