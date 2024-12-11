import React from "react";
import { TableHead, TableRow, TableCell, Card, TableContainer, Paper } from "@mui/material";
import CourseList from "./ListView";

const TableHeader = () => {
  return (
      <>
      
        <TableRow>
         
            <TableCell align="center"><strong>Image</strong></TableCell>
            <TableCell align="center"><strong>Title</strong></TableCell>
            <TableCell align="center"><strong>Description</strong></TableCell>
            <TableCell align="center"><strong>Author</strong></TableCell>
            <TableCell align="center"><strong>Date</strong></TableCell>
            <TableCell align="center"><strong>Questions</strong></TableCell>
            <TableCell align="center"><strong>Duration</strong></TableCell>
            <TableCell align="center"><strong>Rating</strong></TableCell>
            <TableCell align="center"><strong>Actions</strong></TableCell>
          </TableRow>
   
          
          </>
  );
};

export default TableHeader;
