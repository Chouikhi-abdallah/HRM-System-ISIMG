import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    visitorType: 'EMPLOYEE', // Default role
    departmentName: '',
    age: '',
    phone: '',
    sex: 'MALE',
  });
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  // Fetch departments when the component mounts
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/departments/all');
        setDepartments(response.data);
      } catch (error) {
        console.error('Departments Error:', error.response?.data || error.message);
        alert(error.response?.data?.error || 'Error getting departments');
      }
    };

    fetchDepartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Clone formData to avoid direct mutation
    const dataToSubmit = { ...formData };
  
    // If the user is signing up as HR Admin, remove the departmentName field
    if (formData.visitorType === 'HRADMIN') {
      delete dataToSubmit.departmentName;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', dataToSubmit);
  
      const { token } = response.data;
      sessionStorage.setItem('token', token);
  
      alert('Signup successful');
      navigate('/login'); // Redirect to login after signup
    } catch (error) {
      alert(error.response?.data?.error || 'Error signing up');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDepartmentChange = (e) => {
    setFormData({
      ...formData,
      departmentName: e.target.value, // Bind the departmentName to formData
    });
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
          Welcome to Registration Section
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow-md">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
              First Name
            </label>
            <div className="mt-2">
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="
                px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
              Last Name
            </label>
            <div className="mt-2">
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-medium leading-6 text-gray-900">
              Age
            </label>
            <div className="mt-2">
              <input
                id="age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                required
                min={18}
                max={60}
                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
              Phone Number
            </label>
            <div className="mt-2">
              <input
                id="phone"
                name="phone"
                type="number"
                value={formData.phone}
                onChange={handleChange}
                required
                minLength={8}
                maxLength={8}
                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="sex" className="block text-sm font-medium leading-6 text-gray-900">
              Sex
            </label>
            <div className="mt-2">
              <select
                id="sex"
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="visitorType" className="block text-sm font-medium leading-6 text-gray-900">
              Signup as
            </label>
            <div className="mt-2">
              <select
                id="visitorType"
                name="visitorType"
                value={formData.visitorType}
                onChange={handleChange}
                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              >
                <option value="EMPLOYEE">Employee</option>
                <option value="MANAGER">Manager</option>
                <option value="HRADMIN">HR Admin</option>
              </select>
            </div>
          </div>

          {/* Conditionally render the department dropdown */}
          {formData.visitorType !== 'HRADMIN' && (
            <div>
              <label htmlFor="departmentName" className="block text-sm font-medium leading-6 text-gray-900">
                Department
              </label>
              <div className="mt-2">
                <select
                  id="departmentName"
                  name="departmentName"
                  value={formData.departmentName}
                  onChange={handleDepartmentChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((department) => (
                    <option key={department.id} value={department.name}>
                      {department.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          You have already an account ?
          <Link 
            to="/login" 
            className="font-medium text-blue-600 hover:text-blue-500 ml-1"
          >
            Login Now
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
