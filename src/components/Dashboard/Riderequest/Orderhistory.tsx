
import React, { useEffect, useState } from 'react';
import {
  Box,
  Checkbox,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Snackbar,
  InputAdornment,
  Pagination,
} from '@mui/material';
import { Delete as DeleteIcon, Search as SearchIcon } from '@mui/icons-material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Dashboard from '../Dashboard';
import './order.css';

interface TableRowData {
  id: number;
  user: string;
  productName: string;
  pickup: string;
  dropoff: string;
}

const mockData: TableRowData[] = [
  { id: 1, user: 'Alice', productName: 'Wireless Mouse', pickup: 'Location A', dropoff: 'Location B' },
  { id: 2, user: 'Bob', productName: 'Keyboard', pickup: 'Location C', dropoff: 'Location D' },
  { id: 3, user: 'Charlie', productName: 'Monitor', pickup: 'Location E', dropoff: 'Location F' },
  { id: 4, user: 'Diana', productName: 'Laptop', pickup: 'Location G', dropoff: 'Location H' },
  { id: 5, user: 'Eve', productName: 'USB-C Hub', pickup: 'Location I', dropoff: 'Location J' },
  { id: 6, user: 'Frank', productName: 'Smartphone', pickup: 'Location K', dropoff: 'Location L' },
  { id: 7, user: 'Grace', productName: 'Earbuds', pickup: 'Location M', dropoff: 'Location N' },
  { id: 8, user: 'Hank', productName: 'Tablet', pickup: 'Location O', dropoff: 'Location P' },
  { id: 9, user: 'Ivy', productName: 'Smartwatch', pickup: 'Location Q', dropoff: 'Location R' },
  { id: 10, user: 'Jack', productName: 'Fitness Tracker', pickup: 'Location S', dropoff: 'Location T' }
];

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function TableHistory() {
  const [rows, setRows] = useState<TableRowData[]>(mockData);
  const [filteredRows, setFilteredRows] = useState<TableRowData[]>(mockData);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [page, setPage] = useState(1);
  const rowsPerPage = 5; // Rows per page

  useEffect(() => {
    setFilteredRows(mockData);
  }, []);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelectedRows = new Set(filteredRows.map((row: TableRowData) => row.id));
      setSelectedRows(newSelectedRows);
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectClick = (id: number) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(id)) {
      newSelectedRows.delete(id);
    } else {
      newSelectedRows.add(id);
    }
    setSelectedRows(newSelectedRows);
  };

  const handleDelete = (id: number) => {
    setRows(rows.filter(row => row.id !== id));
    setFilteredRows(filteredRows.filter(row => row.id !== id));
    setSnackbarMessage("Row deleted successfully");
    setSnackbarOpen(true);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = (event.target.value || "").toLowerCase();
    const filtered = rows.filter((row) => {
      if (row && row.user && row.productName && row.pickup && row.dropoff) {
        return (
          row.user.toLowerCase().includes(searchQuery) ||
          row.productName.toLowerCase().includes(searchQuery) ||
          row.pickup.toLowerCase().includes(searchQuery) ||
          row.dropoff.toLowerCase().includes(searchQuery)
        );
      }
      return false;
    });
    setFilteredRows(filtered);
    setPage(1); // Reset to first page when search results are updated
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  // Calculate displayed rows based on pagination
  const displayedRows = filteredRows.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Box className="table-history">
      <Box>
        <Dashboard />
      </Box>
      <Box className="table-content">
        <Box className="header-container">
          <Grid container spacing={1} alignItems="center" justifyContent="space-between">
            <Grid item>
              <h5 className="header-title">Order History</h5>
            </Grid>
            <Grid item>
              <TextField
                className="search-field"
                label="Search By User, Product, Pickup, or Dropoff"
                variant="outlined"
                onChange={handleSearch}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Box>
        <TableContainer component={Paper}>
          <Table className="table" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Checkbox
                    indeterminate={
                      selectedRows.size > 0 &&
                      selectedRows.size < filteredRows.length
                    }
                    checked={
                      filteredRows.length > 0 &&
                      selectedRows.size === filteredRows.length
                    }
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                <TableCell className="table-header">ID</TableCell>
                <TableCell align="center" className="table-header">
                  User
                </TableCell>
                <TableCell align="center" className="table-header">
                  Product
                </TableCell>
                <TableCell align="center" className="table-header">
                  Pickup
                </TableCell>
                <TableCell align="center" className="table-header">
                  Dropoff
                </TableCell>
                <TableCell align="center" className="table-header">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedRows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="center">
                    <Checkbox
                      checked={selectedRows.has(row.id)}
                      onChange={() => handleSelectClick(row.id)}
                    />
                  </TableCell>
                  <TableCell>{row.id}</TableCell>
                  <TableCell align="center">{row.user}</TableCell>
                  <TableCell align="center">{row.productName}</TableCell>
                  <TableCell align="center">{row.pickup}</TableCell>
                  <TableCell align="center">{row.dropoff}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleDelete(row.id)} aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box className="pagination-container">
          <Pagination
            count={Math.ceil(filteredRows.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            variant="outlined"
            shape="rounded"
            color="primary"
          />
        </Box>
        <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
          <Alert onClose={() => setSnackbarOpen(false)} severity="success">
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}
