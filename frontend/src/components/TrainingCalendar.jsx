/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
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

function TrainingCalendar({ trainings }) {
  const [events, setEvents] = useState([]);

  // Convert trainings to calendar events
  useEffect(() => {
    const calendarEvents = trainings.map((training) => ({
      id: training.id,
      title: training.title,
      description: training.description, // Include description for the tooltip
      start: new Date(training.schedule), 
      end: new Date(training.schedule), 
    }));
    setEvents(calendarEvents);
  }, [trainings]);

  // Handle event drop (drag-and-drop functionality)
  const onEventDrop = async ({ event, start, end }) => {
    try {
      await axios.put(`http://localhost:5000/api/trainings/updateTraining`, {
        trainingId: event.id,
        schedule: format(start, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"), // Convert date to ISO format
      });
      setEvents(events.map((ev) => (ev.id === event.id ? { ...ev, start, end } : ev)));
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
        onEventDrop={onEventDrop}
        resizable
        draggableAccessor={() => true} 
        tooltipAccessor={(event) => `Title: ${event.title}\nDescription: ${event.description}\nStart: ${event.start}`} // Tooltip with training details
      />
    </div>
  );
}

export default TrainingCalendar;
