/* eslint-disable react/prop-types */
import  { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import { format } from 'date-fns';

// Set up the localizer using moment.js
const localizer = momentLocalizer(moment);

// Enable drag-and-drop functionality
const DragAndDropCalendar = withDragAndDrop(Calendar);

function TrainingCalendar({ hrAdminId }) {
    const [events, setEvents] = useState([]);

    // Fetch events from the server on component mount
    useEffect(() => {
        const fetchTrainings = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/trainings/all/${hrAdminId}`);
                const trainings = response.data.map(training => ({
                    id: training.id,
                    title: training.title,
                    start: new Date(training.schedule),  // Assuming schedule is ISO string
                    end: new Date(training.schedule),    // You can adjust end time if needed
                }));
                setEvents(trainings);
            } catch (error) {
                console.error('Error fetching trainings:', error);
            }
        };

        fetchTrainings();
    }, [hrAdminId]);

    // Handle event drop (drag-and-drop functionality)
    const onEventDrop = async ({ event, start, end }) => {
        try {
            await axios.put(`http://localhost:5000/api/trainings/updateTraining`, {
                trainingId: event.id,
                schedule: format(start, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx") // Convert date to ISO format
            });
            setEvents(events.map(ev => ev.id === event.id ? { ...ev, start, end } : ev));
        } catch (error) {
            console.error('Error updating training:', error);
        }
    };

    return (
        <div style={{ height: '500px', margin: '50px' }}>
            <DragAndDropCalendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                onEventDrop={onEventDrop} // Handle drag-and-drop
                resizable // Make events resizable if needed
                draggableAccessor={() => true} // Enable dragging
            />
        </div>
    );
}

export default TrainingCalendar;
