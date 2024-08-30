import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import{Link} from 'react-router-dom';
import logo from '../../assets/logo.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
  
      console.log('Login Response:', response.data); 
  
      const { token } = response.data;
      localStorage.setItem('token', token);
  
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.visitorType;
      const userId=decodedToken.id;
      const userIdByRole=decodedToken.HrId || decodedToken.managerId || decodedToken.employeeId;
      const userdepartmentId=decodedToken.departmentId;
      localStorage.setItem('userId', userId);
      localStorage.setItem('UserIdByRole',userIdByRole );
      localStorage.setItem('userdepartmentId',userdepartmentId);
      console.log('User Role:', userRole);
      console.log('User IdByRole :', userIdByRole);
      console.log('User DepartmentId:', userdepartmentId);

      if (userRole === 'HRADMIN') {
        navigate('/admin');
      } else if (userRole === 'MANAGER') {
        navigate('/manager');
      } else if (userRole === 'EMPLOYEE') {
        navigate('/employee');
      }
    } catch (error) {
      console.error('Login Error:', error.response?.data || error.message); // Log any errors
      alert(error.response?.data?.error || 'Error logging in');
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src={logo}
          className="mx-auto h-40 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Welcome to Login Section
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow-md">
        <div className="block text-sm font-medium leading-6 text-gray-900">
        <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'> Email</label>
        <div className='mt-2'>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
          required
        />
        </div>
        </div>
        <div className="block text-sm font-medium leading-6 text-gray-900">
          <label htmlFor='password' className="block text-sm font-medium leading-6 text-gray-900">Password</label>
        <div className='mt-4'>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6
          px-2"
          required
        />
        </div>
        </div>
        <button type="submit" 
              className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
          Login
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Don&apos;t have an account? 
        <Link 
          to="/signup" 
          className="font-medium text-blue-600 hover:text-blue-500 ml-1"
        >
          Register Now
        </Link>
      </p>
      <p className="mt-4 text-center text-sm text-gray-600">
          <Link to="/forgetpassword" className="font-medium text-blue-600 hover:text-blue-500 ml-1">
            Forgot your password?
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
