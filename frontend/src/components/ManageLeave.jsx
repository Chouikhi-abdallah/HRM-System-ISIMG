/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar, Button, Card, CardContent, Typography, Chip } from '@mui/material';
import { CheckCircle, HourglassEmpty, Cancel } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';

const StyledCard = styled(Card)(({ theme }) => ({
    transition: 'transform 0.3s',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: theme.shadows[10],
    },
}));

const ManageLeave = ({hrAdminId}) => {
    const [vacations, setVacations] = useState([]);

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

    const getDateInfo = (startDate, endDate) => {
        const today = dayjs();
        const end = dayjs(endDate);

        if (end.isBefore(today)) {
            return <Typography variant="body2" className="text-red-600">This vacation has ended</Typography>;
        } else {
            const daysLeft = end.diff(today, 'day');
            return <Typography variant="body2" className="text-green-600">{daysLeft} days left</Typography>;
        }
    };

    return (
        <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
            <Typography variant="h4" gutterBottom className="mb-6 font-semibold text-gray-800">
                Manage Leave Requests
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vacations.map((vacation) => {
                    const isEnded = dayjs(vacation.endDate).isBefore(dayjs());

                    if (vacation.status === 'REJECTED') {
                        return (
                            <StyledCard key={vacation.id} className="shadow-md rounded-lg">
                                <CardContent className="flex flex-col items-start p-6">
                                    <Typography variant="h6" className="font-bold text-red-600">
                                        Request Rejected
                                    </Typography>
                                    <Typography variant="body2" className="text-gray-500 mt-1">
                                        Employee: {vacation.visitor.firstName} {vacation.visitor.lastName}
                                    </Typography>
                                    
                                    <Typography variant="body2" className="text-gray-500 mt-1">
                                        Requested from {new Date(vacation.startDate).toLocaleDateString()} to {new Date(vacation.endDate).toLocaleDateString()}
                                    </Typography>
                                </CardContent>
                            </StyledCard>
                        );
                    }

                    if (isEnded) {
                        return (
                            <StyledCard key={vacation.id} className="shadow-md rounded-lg">
                                <CardContent className="flex flex-col items-start p-6">
                                    <Typography variant="h6" className="font-bold text-gray-600">
                                        This vacation has ended
                                    </Typography>
                                    <Typography variant="body2" className="text-gray-500 mt-1">
                                        Employee: {vacation.visitor.firstName} {vacation.visitor.lastName}
                                    </Typography>
                                    
                                    <Typography variant="body2" className="text-gray-500 mt-1">
                                        From {new Date(vacation.startDate).toLocaleDateString()} to {new Date(vacation.endDate).toLocaleDateString()}
                                    </Typography>
                                </CardContent>
                            </StyledCard>
                        );
                    }

                    return (
                        <StyledCard key={vacation.id} className="shadow-md rounded-lg">
                            <CardContent className="flex flex-col items-start p-6">
                                <Avatar className="bg-indigo-500 text-white" sx={{ width: 56, height: 56 }}>
                                    {(vacation.visitor.firstName.charAt(0)).toUpperCase()}
                                    {(vacation.visitor.lastName.charAt(0)).toUpperCase()}
                                </Avatar>
                                <Typography variant="h6" className="mt-2 font-bold">
                                    {vacation.visitor.firstName} {vacation.visitor.lastName}
                                </Typography>
                                
                                <Typography variant="body2" className="text-gray-500 mt-1">
                                    Start Date: {new Date(vacation.startDate).toLocaleDateString()}
                                </Typography>
                                <Typography variant="body2" className="text-gray-500">
                                    End Date: {new Date(vacation.endDate).toLocaleDateString()}
                                </Typography>
                                <div className="mt-3 w-full">{getStatusChip(vacation.status)}</div>
                                <div className="mt-2">{getDateInfo(vacation.startDate, vacation.endDate)}</div>
                                <div className="flex justify-between w-full mt-4">
                                    <Button
                                        variant="contained"
                                        color="success"
                                        onClick={() => handleStatusChange(vacation.id, 'APPROVED')}
                                        className="text-white bg-green-500 hover:bg-green-600 transition-all"
                                    >
                                        APPROVE
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleStatusChange(vacation.id, 'REJECTED')}
                                        className="text-white bg-red-500 hover:bg-red-600 transition-all"
                                    >
                                        REJECT
                                    </Button>
                                </div>
                            </CardContent>
                        </StyledCard>
                    );
                })}
            </div>
        </div>
    );
};

export default ManageLeave;
