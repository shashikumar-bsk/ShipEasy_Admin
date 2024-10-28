
import React, { useEffect, useState } from "react";
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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Delete as DeleteIcon, Search as SearchIcon } from "@mui/icons-material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { getAllOrders, deleteOrder } from "../../../api-requests/orderRouter";
import Dashboard from "../Dashboard";
import "../menu.css";

interface Order {
  order_id: number;
  user_id: number;
  total_price: number;
  order_status: "pending" | "completed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
  User: {
    username: string;
    phone: string;
  };
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function OrdersTable() {
  const [rows, setRows] = useState<Order[]>([]);
  const [filteredRows, setFilteredRows] = useState<Order[]>([]);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // Pagination state (new)
  const [currentPage] = useState<number>(1);
  const [rowsPerPage] = useState<number>(10);

  useEffect(() => {
    getData();
  }, [currentPage, rowsPerPage]); // Added dependencies to refetch data on pagination change

  const getData = async () => {
    try {
      const orders = await getAllOrders(currentPage, rowsPerPage); // Provided required arguments
      console.log(orders);
      setRows(orders);
      setFilteredRows(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelectedRows = new Set<number>(filteredRows.map((row: Order) => row.order_id));
      setSelectedRows(newSelectedRows);
    } else {
      setSelectedRows(new Set<number>());
    }
  };

  const handleSelectClick = (id: number) => {
    const newSelectedRows = new Set<number>(selectedRows);
    if (newSelectedRows.has(id)) {
      newSelectedRows.delete(id);
    } else {
      newSelectedRows.add(id);
    }
    setSelectedRows(newSelectedRows);
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (deleteId !== null) {
      try {
        await deleteOrder(deleteId);
        setSnackbarMessage("Order deleted successfully");
        setSnackbarOpen(true);
        setDeleteConfirmationOpen(false);
        setDeleteId(null);
        getData(); // Update data without reloading the page
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteId(null);
    setDeleteConfirmationOpen(false);
  };

  const handleDeleteSelected = async () => {
    for (const id of selectedRows) {
      await deleteOrder(id);
    }
    setSnackbarMessage("Selected orders deleted successfully");
    setSnackbarOpen(true);
    setSelectedRows(new Set<number>());
    getData(); // Update data without reloading the page
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = (event.target.value || "").toLowerCase();
    const filtered = rows.filter((row) => {
      return (
        row.User.username.toLowerCase().includes(searchQuery) ||
        row.User.phone.toLowerCase().includes(searchQuery) ||
        row.total_price.toString().toLowerCase().includes(searchQuery) ||
        row.order_status.toLowerCase().includes(searchQuery)
      );
    });
    setFilteredRows(filtered);
  };

  return (
    <Box sx={{ backgroundColor: "white" }}>
      <Box>
        <Dashboard />
      </Box>
      <Box sx={{ marginLeft: "15%", width: "75%", marginTop: "40px" }}>
        <Box sx={{ marginLeft: "10%", width: "100%", marginTop: "40px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <Grid item>
                <h5
                  style={{
                    margin: 0,
                    color: "black",
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                >
                  Orders Table
                </h5>
              </Grid>
              <Grid item>
                <TextField
                  sx={{
                    height: "40px",
                    width: "350px",
                    "& .MuiOutlinedInput-root": {
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      paddingRight: "8px",
                    },
                    "& .MuiInputBase-input": {
                      fontSize: "0.875rem",
                      textAlign: "center",
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "0.875rem",
                      top: "-6px",
                    },
                  }}
                  label="Search By Username, Phone, Price, or Status"
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
          {selectedRows.size > 0 && (
            <IconButton onClick={handleDeleteSelected} aria-label="delete">
              <DeleteIcon />
            </IconButton>
          )}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "lightgray" }}>
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
                  <TableCell sx={{ fontWeight: "bold" }}>Order ID</TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Username
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Phone
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Total Price
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Order Status
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Created At
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Updated At
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRows.map((row) => (
                  <TableRow
                    key={row.order_id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="center">
                      <Checkbox
                        checked={selectedRows.has(row.order_id)}
                        onChange={() => handleSelectClick(row.order_id)}
                      />
                    </TableCell>
                    <TableCell>{row.order_id}</TableCell>
                    <TableCell align="center">
                      {row.User ? row.User.username : 'N/A'}
                    </TableCell>
                    <TableCell align="center">
                      {row.User ? row.User.phone : 'N/A'}
                    </TableCell>
                    <TableCell align="center">{row.total_price}</TableCell>
                    <TableCell align="center">{row.order_status}</TableCell>
                    <TableCell align="center">{new Date(row.createdAt).toLocaleString()}</TableCell>
                    <TableCell align="center">{new Date(row.updatedAt).toLocaleString()}</TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => handleDelete(row.order_id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Dialog
        open={deleteConfirmationOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Order?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this order?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

