/* eslint-disable react-hooks/exhaustive-deps */
import  { useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar, Button, Card, CardContent, Typography, Chip } from '@mui/material';
import { CheckCircle, HourglassEmpty, Cancel } from '@mui/icons-material';

const ManageLeave = () => {
    const [vacations, setVacations] = useState([]);
    const hrAdminId = localStorage.getItem('UserIdByRole');

    useEffect(() => {
        const fetchVacations = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/vacations/getVacationsByHrId/${hrAdminId}`); 
                setVacations(response.data);
            } catch (error) {
                console.error('Error fetching vacations:', error);
            }
        };

        fetchVacations();
    }, []);

    const handleStatusChange = async (vacationId, status) => {
        try {
            await axios.put('http://localhost:5000/api/vacations/changeStatus', {
                vacationId,
                status,
            });
            setVacations((prevVacations) =>
                prevVacations.map((vacation) =>
                    vacation.id === vacationId ? { ...vacation, status } : vacation
                )
            );
        } catch (error) {
            console.error('Error changing status:', error);
        }
    };

    const getStatusChip = (status) => {
        switch (status) {
            case 'PENDING':
                return (
                    <Chip
                        icon={<HourglassEmpty />}
                        label="PENDING"
                        className="text-gray-600 bg-gray-200"
                    />
                );
            case 'APPROVED':
                return (
                    <Chip
                        icon={<CheckCircle />}
                        label="APPROVED"
                        className="text-green-600 bg-green-200"
                    />
                );
            case 'REJECTED':
                return (
                    <Chip
                        icon={<Cancel />}
                        label="REJECTED"
                        className="text-red-600 bg-red-200"
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="p-6">
            <Typography variant="h4" gutterBottom className="mb-6">
                Manage Leave Requests
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vacations.map((vacation) => (
                    <Card key={vacation.id} className="shadow-md rounded-lg">
                        <CardContent className="flex flex-col items-start p-4">
                            <Avatar className="bg-indigo-500 text-white">
                                {(vacation.employee.visitor.firstName.charAt(0)).toUpperCase()}
                                {(vacation.employee.visitor.lastName.charAt(0)).toUpperCase()}
                            </Avatar>
                            <Typography variant="h6" className="mt-2">
                                {vacation.employee.visitor.firstName} {vacation.employee.visitor.lastName}
                            </Typography>
                            <Typography variant="subtitle1" className="text-gray-600">
                                {vacation.employee.department.name}
                            </Typography>
                            <Typography variant="body2" className="text-gray-500 mt-1">
                                Start Date: {new Date(vacation.startDate).toLocaleDateString()}
                            </Typography>
                            <Typography variant="body2" className="text-gray-500">
                                End Date: {new Date(vacation.endDate).toLocaleDateString()}
                            </Typography>
                            <div className="mt-3 w-full">{getStatusChip(vacation.status)}</div>
                            <div className="flex justify-between w-full mt-4">
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={() => handleStatusChange(vacation.id, 'APPROVED')}
                                    className="text-white bg-green-500 hover:bg-green-600"
                                >
                                    APPROVE
                                </Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => handleStatusChange(vacation.id, 'REJECTED')}
                                    className="text-white bg-red-500 hover:bg-red-600"
                                >
                                    REJECT
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ManageLeave;
