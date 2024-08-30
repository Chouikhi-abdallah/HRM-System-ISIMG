/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import {
  Box,
  Card,
  Grid,
  Chip,
  Typography,
  CardContent,
  CardActions,
  Avatar,
} from "@mui/material";
import { Draggable } from "react-beautiful-dnd";
import { styled } from "@mui/system";

const Title = styled("div")(() => ({
  marginBottom: "1.5px",
  color: "#666666",
}));

const SubTitle = styled("span")(() => ({
  marginBottom: "1.5px",
  color: "#333333",
  fontWeight: "bold",
}));

const Heading = styled("div")(() => ({
  color: "#333333",
  fontWeight: "bold",
  fontSize: "14px",
  margin: "10px 0",
}));

const TaskCard = ({ item, index }) => {
  return (
    <Draggable key={item.id} draggableId={String(item.id)} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card sx={{ minWidth: 275, m: "8px 1px" }}>
          
            <CardContent sx={{ p: "0 16px" }}>
              <Heading>{item.title}</Heading>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {item.description}
              </Typography>
              <Box sx={{ flexGrow: 1, color: "#333333", m: "20px 0 0" }}>
                <Grid container spacing={2}>
            
                  <Grid item >
                    <Title>Due Date</Title>
                    <SubTitle>{item.completionDate?.split("T")[0]}</SubTitle>
                  </Grid>

                </Grid>
              </Box>
            </CardContent>
            <CardActions>
              <Chip
                label={`Manager ID: ${item.managerId}`}
                sx={{
                  m: 1,
                  minWidth: "70px",
                  maxHeight: "25px",
                  background: "#EEFFF3",
                  color: "#1CA13E",
                }}
                icon={
                    <Avatar
                      sx={{
                        bgcolor: "#1CA13E",
                        width: 24,
                        height: 24,
                        fontSize: 14,
                      }}
                    >
                      M
                    </Avatar>
                  }
                />
              </CardActions>
            </Card>
          </div>
        )}
      </Draggable>
    );
  };
  
  export default TaskCard;
  
