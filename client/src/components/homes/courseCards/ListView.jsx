import {
  Card,
  CardContent,
  Paper,
  TableContainer,
  TableHead,
  TableBody,
  Table,
  TableCell,
  TableRow,
} from "@mui/material";
import React from "react";

const ListView = ({ header, children }) => {
  console.log(header);
  console.log("body:", children);
  return (
    <div>
      <Paper>
        <Card className="custom-table" sx={{ marginTop: "20px",width:'100%' }}>
          <CardContent>
            <TableContainer>
              <Table sx={{ width: "100%", borderCollapse: "collapse" }}>
                <TableHead>
                  <TableCell>Quizzes</TableCell>
                </TableHead>
                <TableBody>
                  {React.Children.map(children, (child, index) => (
                    
                     <TableRow key={index}>{child}</TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Paper>
    </div>
  );
};

export default ListView;
