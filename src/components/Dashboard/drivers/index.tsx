import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import DescriptionIcon from "@mui/icons-material/Description";
import Switch from "@mui/material/Switch";

import * as yup from "yup";
import {
  Autocomplete,
  Divider,
  IconButton,
  Box,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import Swal from "sweetalert2";
import {
  changeActiveStatusRouter,
  deleteDriverData,
  getDriverData,
  updateDriverData,
} from "../../../api-requests/driverRouter";
import { useNavigate } from "react-router-dom";

interface Driver {
  driver_id: number;
  driver_name: string;
  email: string;
  phone: string;
  gender: string;
  active: boolean;
  vehicle_type: string;
  vehicle_number: string;
  documents: string;
  driverSchema: string;
}

const DriverSchema = yup.object({
  driver_name: yup.string().required("Driver name is required *"),
  email: yup.string().email("Email is not valid *")
  .required("Email is required *"),
  phone: yup
    .string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits *")
    .required("Phone number is required *"),
  gender: yup
    .string()
    .oneOf(["male", "female", "other"], "Gender is required *")
    .required("Gender is required *"),
  vehicle_type: yup.string().required("Vehicle type is required *"),
  vehicle_number: yup
    .string()
    .matches(/^[A-Z0-9-]+$/, "Vehicle number is not valid *")
    .required("Vehicle number is required *"),
});


export default function UserTableMaster() {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [rows, setRows] = useState<Driver[]>([]);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const navigate = useNavigate();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const driverRecords = await getDriverData();
      if (Array.isArray(driverRecords)) {
        setRows(driverRecords);
      } else {
        console.error("Data fetched is not an array:", driverRecords);
      }
    } catch (error) {
      console.error("Error fetching driver data:", error);
    }
  };

  const filterData = (driver: Driver | null) => {
    if (driver) {
      setRows([driver]);
    } else {
      getData();
    }
  };

  const deleteDriver = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to retrive this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteApi(id)
;
      }
    });
  };

  const deleteApi = async (id: number) => {
    await deleteDriverData(id)
;
    Swal.fire("Deleted!", "Your Driver has been deleted.", "success");
    getData();
  };
  const handleStatusChange = (id: number, currentStatus: boolean) => {
    const action = currentStatus ? "Deactivate" : "Activate";
    Swal.fire({
      title: "Are you sure?",
      text: `You Want To ${action} this Driver?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${action} it!`,
    }).then((result) => {
      if (result.isConfirmed) {
        driverStatusChange(id, currentStatus);
      }
    });
  };

  const driverStatusChange = async (id: number, currentStatus: boolean) => {
    try {
      await changeActiveStatusRouter(id, !currentStatus);
      getData();
      Swal.fire(
        "Status Changed!",
        `Your Driver Status has been changed to ${!currentStatus}.`,
        "success"
      );
    } catch (error) {
      console.error("Error updating driver status:", error);
    }
  };

  const handleViewDocuments = (id: number) => {
    navigate(`/driver/docs/${id}`, { state: { id } });
  };

  const handleEditClick = (driver: Driver) => {
    setSelectedDriver(driver);
    setOpenEditDialog(true);
  };

  const handleEditClose = () => {
    setOpenEditDialog(false);
    setSelectedDriver(null);
  };

  const handleUpdate = async () => {
    if (selectedDriver) {
        const response = await updateDriverData(selectedDriver.driver_id, selectedDriver);
        console.log(response);
        // Swal.fire("Updated!", "Driver details have been updated.", "success");
        getData(); // Refresh data after the update
        // Close the edit modal/dialog
    }
    handleEditClose(); 
};


  return (
    <>
      {rows.length > 0 && (
        <Paper sx={{ width: "100%", overflow: "hidden", padding: "5px" }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{
              padding: "10px",
              justifyContent: { sm: "space-between" },
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{ width: { xs: "100%", sm: "150px" }, ml: "16px" }}
            >
              Drivers List
            </Typography>
            <Autocomplete
              disablePortal
              options={rows}
              sx={{ width: { xs: "100%", sm: 250 } }}
              onChange={(e, v) => filterData(v)}
              getOptionLabel={(row) => row.driver_name || ""}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Search By Driver" />
              )}
            />
          </Stack>

          <Divider />

          <TableContainer sx={{ maxHeight: 450 }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#37505C" }}>
                <TableRow>
                  <TableCell sx={{ color: "white" }}>ID</TableCell>
                  <TableCell align="center" sx={{ color: "white",whiteSpace: "nowrap" }}>
                    Driver Name
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    Email
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white",whiteSpace: "nowrap"}}>
                    Phone Number
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    Gender
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white",whiteSpace: "nowrap" }}>
                    Vehicle Type
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white",whiteSpace: "nowrap" }}>
                    Vehicle Number
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    Status
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    Actions
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    Documents
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow hover key={row.driver_id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell align="center">{row.driver_name}</TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="center">{row.phone}</TableCell>
                      <TableCell align="center">{row.gender}</TableCell>
                      <TableCell align="center">{row.vehicle_type}</TableCell>
                      <TableCell align="center">{row.vehicle_number}</TableCell>
                      <TableCell align="center">
                        <Switch
                          checked={row.active}
                          onChange={() =>
                            handleStatusChange(row.driver_id, row.active)
                          }
                          sx={{
                            "& .MuiSwitch-switchBase.Mui-checked": {
                              color: "success.main",
                            },
                            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                              {
                                backgroundColor: "success.main",
                              },
                            "& .MuiSwitch-switchBase": {
                              color: "error.main",
                            },
                            "& .MuiSwitch-switchBase + .MuiSwitch-track": {
                              backgroundColor: "error.main",
                            },
                          }}                        />

                      </TableCell>

                      <TableCell align="center" sx={{ display: "inline-flex" }}>
                        <IconButton
                          onClick={() => handleEditClick(row)}
                          color="primary"
                          sx={{ color: "blue" }}
                          aria-label="edit"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => deleteDriver(row.driver_id)}
                          color="error"
                          aria-label="delete"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          // color=" "
                          onClick={() => handleViewDocuments(row.driver_id)}
                        >
                          <DescriptionIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={rows.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}

      {selectedDriver && (
        <Dialog
          open={openEditDialog}
          onClose={handleEditClose}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle style={{fontWeight: "bold", marginLeft: "8%",}}>Edit Driver Details</DialogTitle>
          <DialogContent
            style={{
              width: "100%",
              height: "300px",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "15px",
              marginLeft: "8%",
              // rowGap: "20px",

            }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} md={5}>
                <TextField
                  fullWidth
                  label="Driver Name"
                  value={selectedDriver.driver_name}
                  onChange={(e) =>
                    setSelectedDriver({
                      ...selectedDriver,
                      driver_name: e.target.value,
                    })
                  }
                  error={!selectedDriver.driver_name}
                  helperText={
                    !selectedDriver.driver_name && "Driver Name is required"
                  }
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <TextField
                  fullWidth
                  label="Email"
                  value={selectedDriver.email}
                  onChange={(e) =>
                    setSelectedDriver({ ...selectedDriver, email: e.target.value })
                  }
                  error={!selectedDriver.email}
                  helperText={!selectedDriver.email && "Email is required"}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={selectedDriver.phone}
                  onChange={(e) =>
                    setSelectedDriver({ ...selectedDriver, phone: e.target.value })
                  }
                  error={!selectedDriver.phone}
                  helperText={!selectedDriver.phone && "Phone number is required"}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                             
                <TextField
                  fullWidth
                  label="Gender"
                  value={selectedDriver.gender}
                  onChange={(e) =>
                    setSelectedDriver({ ...selectedDriver, gender: e.target.value })
                  }
                  error={!selectedDriver.gender}
                  helperText={!selectedDriver.gender && "Gender is required"}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <TextField
                  fullWidth
                  label="Vehicle Type"
                  value={selectedDriver.vehicle_type}
                  onChange={(e) =>
                    setSelectedDriver({
                      ...selectedDriver,
                      vehicle_type: e.target.value,
                    })
                  }
                  error={!selectedDriver.vehicle_type}
                  helperText={
                    !selectedDriver.vehicle_type && "Vehicle type is required"
                  }
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <TextField
                  fullWidth
                  label="Vehicle Number"
                  value={selectedDriver.vehicle_number}
                  onChange={(e) =>
                    setSelectedDriver({
                      ...selectedDriver,
                      vehicle_number: e.target.value,
                    })
                  }
                  error={!selectedDriver.vehicle_number}
                  helperText={
                    !selectedDriver.vehicle_number && "Vehicle number is required"
                  }
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions style={{justifyContent:"center",gap:7}}>
          <Button 
    onClick={handleUpdate} 
    sx={{ 
      width: '100px',  // Adjust the button width
      backgroundColor: '#b30213', 
      color: 'white', 
      gap:4,
      '&:hover': { backgroundColor: '' } 
    }}
  >
    Cancel
  </Button>
  <Button 
    onClick={handleUpdate} 
    sx={{ 
      width: '100px',  // Adjust the button width
      backgroundColor: 'green', 
      color: 'white', 
      '&:hover': { backgroundColor: '' } 
    }}
  >
    Save
  </Button>

          </DialogActions>
        </Dialog>
      )}
    </>
  );
}