import { useState, useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import axios from 'axios';

// eslint-disable-next-line react/prop-types
const TeamList = ({ departmentId}) => {  // Provide default value for departmentId
  console.log('Department ID:', departmentId);

  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    // Fetch employees by department when the component mounts
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/employees/bydepartment/${departmentId}`);
        console.log('Employees:', response.data);
        setFilteredEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    if (departmentId) {  // Check if departmentId is valid
      fetchEmployees();
    }
  }, [departmentId]);

  

  const columns = [
    { name: "firstName", label: "First Name" },
    { name: "lastName", label: "Last Name" },
    { name: "age", label: "Age" },
    { name: "sex", label: "Sex" },

  ];

  const options = {
    filterType: 'checkbox',
    customToolbar: () => (<></>),
    responsive: 'scroll',
  };

  

  return (
    <MUIDataTable
      title={"Employee List"}
      data={filteredEmployees}
      columns={columns}
      options={options}
      className="m-9"
    />
  );
};

export default TeamList;
