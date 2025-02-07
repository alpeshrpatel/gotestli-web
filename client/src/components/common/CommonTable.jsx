import React, { useEffect, useState } from "react";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Paper,
  IconButton,
  Table,
  Card,
  CardContent,
} from "@mui/material";

const CommonTable = ({
  columns,
  // data,
  getRowId, 
  renderRowCells, 
  fetchData,
  
}) => {
  let rowsPerPageOptions = [5, 10, 25]
  let initialRowsPerPage = 5

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState(columns[0].id);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

 
  
  

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        if (typeof fetchData !== "function") {
          console.error("fetchData is not a function. Check if it is passed as a prop.");
          return;
        }
    
        const response = await fetchData(page + 1, rowsPerPage);
    
        
    
        if (!response || typeof response !== "object" || !("data" in response)) {
          throw new Error("Invalid API response: Expected an object with a 'data' property.");
        }
        if (response){
          console.log("API Response:", response); // Debugging step
          setData(response.data || []);
        setTotalCount(response.totalRecords ?? 0); 
        }
    
        
      } catch (error) {
        console.error("Error fetching data:", error.message || error);
      }
    };
      fetchDataFromAPI();
    
  }, [page, rowsPerPage]); 

  const handleSortRequest = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => orderBy == 'result' ? passFailComparator(a,b) : descendingComparator(a, b, orderBy)
      : (a, b) => orderBy == 'result' ? -passFailComparator(a,b) : -descendingComparator(a, b, orderBy);
  };

  const passFailComparator = (a, b) => {
    const aPass = a.percentage >= a.pass_percentage;
    const bPass = b.percentage >= b.pass_percentage;

    if (aPass && !bPass) return -1;
    if (!aPass && bPass) return 1;
    return 0;
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
  };

  const sortedData = stableSort(data, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper>
      <Card className="custom-table" sx={{marginTop:'20px'}}>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id}>
                      {column.sortable ? (
                        <TableSortLabel
                          active={orderBy === column.id}
                          direction={orderBy === column.id ? order : "asc"}
                          onClick={() => handleSortRequest(column.id)}
                        >
                          {column.label}
                        </TableSortLabel>
                      ) : (
                        column.label
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedData.map((row, index) => (
                  <TableRow key={getRowId(row, index)}>
                    {renderRowCells(row, index)}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <TablePagination
        component="div"
        count={totalCount}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
      />
    </Paper>
  );
};

export default CommonTable;
