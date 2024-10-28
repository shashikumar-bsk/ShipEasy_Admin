
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
import { getAllRideDetails, deleteRideRequest } from "../../../../src/api-requests/rideRequestRouter"; // adjust the import path based on your project structure
import { getReceiverDetails } from "../../../../src/api-requests/receiverRouter"; // import your receiver API function
import Dashboard from "../Dashboard";
// import "./rideRequest.css"; // Import the CSS file
import './rideRequestTable.css';

interface RideRequest {
  request_id: number;
  user_id: number;
  driver_id: number | null;
  service_type_id: number;
  booking_id: number;
  receiver_id: number;
  status: string;
  User: {
    username: string;
    phone: string;
  };
  Driver?: {
    driver_name: string;
  };
  Booking: {
    booking_id: number;
    pickup_address: string;
    dropoff_address: string;
  };
  ReceiverDetail?: {
    receiver_name: string;
    receiver_phone_number: string;
  };
}

interface ReceiverDetails {
  request_id: number;
  receiver_name: string;
  receiver_phone_number: string;
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function RideRequestTable() {
  const [rows, setRows] = useState<RideRequest[]>([]);
  const [filteredRows, setFilteredRows] = useState<RideRequest[]>([]);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const [rideRequestRecords, receiverDetails] = await Promise.all([
        getAllRideDetails(),
        getReceiverDetails(),
      ]);

      const mergedData = rideRequestRecords.map((ride: RideRequest) => {
        const receiver = receiverDetails.find((rec: ReceiverDetails) => rec.request_id === ride.request_id);
        return {
          ...ride,
          ReceiverDetail: receiver,
        };
      });

      setRows(mergedData);
      setFilteredRows(mergedData);
    } catch (error) {
      console.error("Error fetching ride or receiver details:", error);
    }
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelectedRows = new Set<number>(filteredRows.map((row: RideRequest) => row.request_id));
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
        await deleteRideRequest(deleteId);
        setSnackbarMessage("Ride request deleted successfully");
        setSnackbarOpen(true);
        setDeleteConfirmationOpen(false);
        setDeleteId(null);
        getData(); // Update data without reloading the page
      } catch (error) {
        console.error("Error deleting ride request:", error);
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteId(null);
    setDeleteConfirmationOpen(false);
  };

  const handleDeleteSelected = async () => {
    for (const id of selectedRows) {
      await deleteRideRequest(id);
    }
    setSnackbarMessage("Selected ride requests deleted successfully");
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
        (row.Driver && row.Driver.driver_name.toLowerCase().includes(searchQuery)) ||
        row.Booking.pickup_address.toLowerCase().includes(searchQuery) ||
        row.Booking.dropoff_address.toLowerCase().includes(searchQuery) ||
        (row.ReceiverDetail && row.ReceiverDetail.receiver_name.toLowerCase().includes(searchQuery)) ||
        (row.ReceiverDetail && row.ReceiverDetail.receiver_phone_number.toLowerCase().includes(searchQuery))
      );
    });
    setFilteredRows(filtered);
  };

  return (
    <Box sx={{ backgroundColor: "white" }}>
      <Box>
        <Dashboard />
      </Box>
      <Box className="ride-request-table-container">
        <Box sx={{ marginTop: "40px" }}>
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
                  Ride Request Table
                </h5>
              </Grid>
              <Grid item>
                <TextField
                  sx={{
                    height: "40px",
                    width: "390px", // Adjusted width
                    "& .MuiOutlinedInput-root": {
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      paddingRight: "8px",
                    },
                    "& .MuiInputBase-input": {
                      fontSize: "0.865rem",
                      textAlign: "center",
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "0.875rem",
                      top: "-6px",
                    },
                  }}
                  label="Search By Username, Phone, Driver Name,or Address"
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
          {/* Add margin to create gap between search bar and table */}
          <Box sx={{ marginTop: "20px" }}>
            {selectedRows.size > 0 && (
              <IconButton onClick={handleDeleteSelected} aria-label="delete">
                <DeleteIcon />
              </IconButton>
            )}
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="simple table">
                <TableHead>
                  <TableRow sx={{ backgroundColor: "lightgray" }}>
                    <TableCell align="center" sx={{ padding: "8px" }}>
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
                    <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      Username
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      Phone
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      Driver Name
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      Pickup Address
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      Dropoff Address
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      Receiver Name
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      Receiver Phone
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      Status
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRows.map((row) => (
                    <TableRow
                      key={row.request_id}
                      selected={selectedRows.has(row.request_id)}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedRows.has(row.request_id)}
                          onChange={() => handleSelectClick(row.request_id)}
                        />
                      </TableCell>
                      <TableCell>{row.request_id}</TableCell>
                      <TableCell align="center">{row.User.username}</TableCell>
                      <TableCell align="center">{row.User.phone}</TableCell>
                      <TableCell align="center">
                        {row.Driver ? row.Driver.driver_name : "N/A"}
                      </TableCell>
                      <TableCell align="center">
                        {row.Booking.pickup_address}
                      </TableCell>
                      <TableCell align="center">
                        {row.Booking.dropoff_address}
                      </TableCell>
                      <TableCell align="center">
                        {row.ReceiverDetail
                          ? row.ReceiverDetail.receiver_name
                          : "N/A"}
                      </TableCell>
                      <TableCell align="center">
                        {row.ReceiverDetail
                          ? row.ReceiverDetail.receiver_phone_number
                          : "N/A"}
                      </TableCell>
                      <TableCell align="center">{row.status}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleDelete(row.request_id)}
                        >
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
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmationOpen}
        onClose={() => setDeleteConfirmationOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this ride request?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

