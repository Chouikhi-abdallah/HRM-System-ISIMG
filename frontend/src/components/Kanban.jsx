/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Grid, Box, Divider } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import axios from "axios";
import TaskCard from "./TaskCard";
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


const Container = styled("div")(() => ({
  display: "flex",
  flexDirection: "row",
}));

const TaskList = styled("div")(() => ({
  minHeight: "100px",
  display: "flex",
  flexDirection: "column",
  background: "#d7dce8",
  minWidth: "341px",
  borderRadius: "5px",
  padding: "15px 15px",
  marginRight: "45px",
}));

const TaskColumnStyles = styled("div")(() => ({
  margin: "8px",
  display: "flex",
  width: "100%",
  minHeight: "80vh",
}));

const Title = styled("span")(() => ({
  fontWeight: "bold",
  color: "#333333",
  fontSize: 16,
  marginBottom: "1.5px",
}));

const FilterIcon = styled("span")(() => ({
  marginBottom: "1.5px",
  color: "text.secondary",
}));

const Kanban = ({ employeeId }) => {
  const [columns, setColumns] = useState({
    PENDING: { title: "To Do", items: [] },
    inProgress: { title: "In Progress", items: [] },
    done: { title: "Done", items: [] },
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/tasks/TaskByemployeeId/${employeeId}`);
        const tasks = response.data;

        console.log('Fetched Tasks:', tasks); // Log the fetched tasks to check the data structure

        const groupedTasks = {
          pending: { title: "To Do", items: tasks.filter(task => task.status === "PENDING") },
          inProgress: { title: "In Progress", items: tasks.filter(task => task.status === "INPROGRESS") },
          completed: { title: "Done", items: tasks.filter(task => task.status === "COMPLETED") },
        };

        setColumns(groupedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [employeeId]);

  const onDragEnd = async (result) => {
    const { source, destination } = result;

    // If there's no destination (dropped outside any droppable), return
    if (!destination) return;

    // Prevent dropping in the same place
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    // Reorder tasks within the same column or move them to another column
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];

    const [removed] = sourceItems.splice(source.index, 1);

    // If moving to a different column, update the status of the task
    if (source.droppableId !== destination.droppableId) {
      removed.status = destination.droppableId.toUpperCase();
      destItems.splice(destination.index, 0, removed);

      // Update task status in the backend
      try {
        await axios.put(`http://localhost:5000/api/tasks/changeStatus/${removed.id}`, { status: removed.status });
        toast('task updated succefully', {
            autoClose: 2000, // 3 seconds
          });      
        } catch (error) {
        console.error('Error updating task status:', error);
      }
    } else {
      // Reorder within the same column
      sourceItems.splice(destination.index, 0, removed);
    }

    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <TaskColumnStyles>
          {Object.entries(columns).map(([columnId, column], index) => (
            <Droppable key={index} droppableId={columnId}>
              {(provided) => (
                <TaskList ref={provided.innerRef} {...provided.droppableProps}>
                  <Box sx={{ width: "100%" }}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                      <Grid item xs={10}>
                        <Title>{column.title}</Title>
                      </Grid>
                      <Grid item xs={2} display="flex" alignContent="flex-end" justifyContent="flex-end">
                        <FilterIcon>
                          <FilterAltIcon />
                        </FilterIcon>
                      </Grid>
                    </Grid>
                  </Box>
                  <Divider />
                  {column.items.map((item, index) => (
                    <TaskCard key={item.id} item={item} index={index} />
                  ))}
                  {provided.placeholder}
                </TaskList>
              )}
            </Droppable>
          ))}
        </TaskColumnStyles>
      </Container>
      <ToastContainer />

    </DragDropContext>

    
  );
};

export default Kanban;
