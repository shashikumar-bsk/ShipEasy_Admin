// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Checkbox,
//   Grid,
//   IconButton,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Snackbar,
//   InputAdornment,
//   Button,
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   DialogContentText,
//   DialogActions,
//   Pagination,
// } from '@mui/material';
// import { Delete as DeleteIcon, Search as SearchIcon } from '@mui/icons-material';
// import MuiAlert, { AlertProps } from '@mui/material/Alert';
// import { getUserData, deleteUserData, changeActiveStatusRouter } from '../../../api-requests/userRouter'; // Adjust path to your API request file
// import Dashboard from '../Dashboard';
// import '../menu.css';
// import Sidenavbar from '../../sidenvbar';

// interface User {
//   id: number;
//   username: string;
//   email: string;
//   phone: string;
//   gender: string;
//   active: boolean;
// }

// function Alert(props: AlertProps) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

// export default function UserTableMaster() {
//   const [rows, setRows] = useState<User[]>([]);
//   const [filteredRows, setFilteredRows] = useState<User[]>([]);
//   const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
//   const [deletingUserId, setDeletingUserId] = useState<number | null>(null);
//   const [page, setPage] = useState(1);
//   const rowsPerPage = 4;

//   useEffect(() => {
//     getData();
//   }, []);

//   const getData = async () => {
//     try {
//       const userRecords = await getUserData();
//       console.log('Full API response:', userRecords);

//       if (Array.isArray(userRecords)) {
//         setRows(userRecords);
//         setFilteredRows(userRecords);
//       } else {
//         console.error('Data fetched is not an array:', userRecords);
//       }
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//     }
//   };

//   const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.checked) {
//       const newSelectedRows: Set<number> = new Set(filteredRows.map((row: User) => row.id));

//       setSelectedRows(newSelectedRows);
//     } else {
//       setSelectedRows(new Set());
//     }
//   };

//   const handleSelectClick = (id: number) => {
//     const newSelectedRows = new Set(selectedRows);
//     if (newSelectedRows.has(id)) {
//       newSelectedRows.delete(id);
//     } else {
//       newSelectedRows.add(id);
//     }
//     setSelectedRows(newSelectedRows);
//   };

//   const handleDelete = (id: number) => {
//     setDeletingUserId(id);
//     setConfirmDeleteOpen(true);
//   };

//   const handleDeleteConfirmed = async (id: number) => {
//     try {
//       await deleteUserData(id);
//       getData();
//       setSnackbarMessage('User deleted successfully');
//       setSnackbarOpen(true);
//     } catch (error) {
//       console.error('Error deleting user:', error);
//     } finally {
//       setConfirmDeleteOpen(false);
//     }
//   };

//   const handleDeleteSelected = async () => {
//     for (const id of selectedRows) {
//       await deleteUserData(id);
//     }
//     getData();
//     setSelectedRows(new Set());
//     setSnackbarMessage('Selected users deleted successfully');
//     setSnackbarOpen(true);
//   };

//   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const searchQuery = event.target.value.toLowerCase();
//     const filtered = rows.filter(
//       (row) =>
//         row.username.toLowerCase().includes(searchQuery) ||
//         row.email.toLowerCase().includes(searchQuery) ||
//         row.phone.toLowerCase().includes(searchQuery)
//     );
//     setFilteredRows(filtered);
//   };

//   const handleSetActive = async (id: number, active: boolean) => {
//     try {
//       await changeActiveStatusRouter(id, { active });
//       const updatedRows = rows.map((user) =>
//         user.id === id ? { ...user, active } : user
//       );
//       setRows(updatedRows);
//       setFilteredRows(updatedRows);
//     } catch (error) {
//       console.error('Error toggling active status:', error);
//     }
//   };

//   const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
//     setPage(newPage);
//   };

//   const displayedRows = filteredRows.slice((page - 1)*  rowsPerPage, page * rowsPerPage);

//   return (
//     <Box sx={{ backgroundColor: 'white' }}>
//       <Box>
//        <Sidenavbar />
//       </Box>
//       <Box sx={{ marginLeft: '10%', width: '80%' }}>
//         <Box sx={{ marginLeft: '10%', width: '100%' }}>
//           <Box
//             sx={{
//               display: 'flex',
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'center',
//               padding: '10px',
//             }}
//           >
//             <Grid container spacing={2} alignItems="center" justifyContent="space-between">
//               <Grid item>
//                 <h5 style={{ margin: 0, color: 'black', fontSize: '24px', fontWeight: 'bold' }}>
//                   User Table
//                 </h5>
//               </Grid>
//               <Grid item>
//                 <TextField
//                   sx={{
//                     height: '35px',
//                     width: '300px',
//                     '& .MuiOutlinedInput-root': {
//                       height: '100%',
//                       display: 'flex',
//                       alignItems: 'center',
//                       paddingRight: '8px',
//                     },
//                     '& .MuiInputBase-input': {
//                       fontSize: '0.800rem',
//                       textAlign: 'center',
//                     },
//                     '& .MuiInputLabel-root': {
//                       fontSize: '0.875rem',
//                       top: '-6px',
//                     },
//                   }}
//                   label="Search By Username, Email or Phone Number"
//                   variant="outlined"
//                   onChange={handleSearch}
//                   InputProps={{
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <SearchIcon />
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               </Grid>
//             </Grid>
//           </Box>
//           {selectedRows.size > 0 && (
//             <IconButton onClick={handleDeleteSelected} aria-label="delete">
//               <DeleteIcon />
//             </IconButton>
//           )}
//           <TableContainer component={Paper}>
//             <Table sx={{ minWidth: 700 }} aria-label="simple table">
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: 'lightgray' }}>
//                   <TableCell align="center">
//                     <Checkbox
//                       indeterminate={
//                         selectedRows.size > 0 && selectedRows.size < filteredRows.length
//                       }
//                       checked={filteredRows.length > 0 && selectedRows.size === filteredRows.length}
//                       onChange={handleSelectAllClick}
//                     />
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
//                   <TableCell align="center" sx={{ fontWeight: 'bold' }}>Username</TableCell>
//                   <TableCell align="center" sx={{ fontWeight: 'bold' }}>Email</TableCell>
//                   <TableCell align="center" sx={{ fontWeight: 'bold' }}>phone_number</TableCell>
//                   <TableCell align="center" sx={{ fontWeight: 'bold' }}>Gender</TableCell>
//                   <TableCell align="center" sx={{ fontWeight: 'bold' }}>Active</TableCell>
//                   <TableCell align="center" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {displayedRows.map((row) => (
//                   <TableRow key={row.id}>
//                     <TableCell align="center">
//                       <Checkbox
//                         checked={selectedRows.has(row.id)}
//                         onChange={() => handleSelectClick(row.id)}
//                       />
//                     </TableCell>
//                     <TableCell>{row.id}</TableCell>
//                     <TableCell align="center">{row.username}</TableCell>
//                     <TableCell align="center">{row.email}</TableCell>
//                     <TableCell align="center">{row.phone}</TableCell>
//                     <TableCell align="center">{row.gender}</TableCell>
//                     <TableCell align="center">
//                       <Button
//                         variant="contained"
//                         color={row.active ? 'success' : 'error'}
//                         onClick={() => handleSetActive(row.id, !row.active)}
//                       >
//                         {row.active ? 'Active' : 'Inactive'}
//                       </Button>
//                     </TableCell>
//                     <TableCell align="center">
//                       <IconButton onClick={() => handleDelete(row.id)} aria-label="delete">
//                         <DeleteIcon />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <Box sx={{ display: 'flex', justifyContent: 'center', }}>
//             <Pagination
//               count={Math.ceil(filteredRows.length / rowsPerPage)}
//               page={page}
//               onChange={handleChangePage}
//               color="primary"
//             />
//           </Box>
//         </Box>
//       </Box>
//       <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
//         <Alert onClose={() => setSnackbarOpen(false)} severity="success">
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>

//       <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
//         <DialogTitle>Confirm Deletion</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Are you sure you want to delete this user?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => handleDeleteConfirmed(deletingUserId!)} color="primary">
//             Confirm
//           </Button>
//           <Button onClick={() => setConfirmDeleteOpen(false)} color="primary">
//             Cancel
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }

import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { changeActiveStatusRouter, deleteUserData, getUserData } from "../../../api-requests/userRouter";
import {
  Delete as DeleteIcon,
  Padding,
  Search as SearchIcon,
} from "@mui/icons-material";
import Swal from "sweetalert2";
import Skeleton from "@mui/material/Skeleton";

interface User {
  id: number;
  username: string;
  email: string;
  phone: string;
  gender: string;
  active: boolean;
}

export default function UserTableMaster() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState<User[]>([]);

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
      const userRecords = await getUserData();
      console.log("Full API response:", userRecords);

      if (Array.isArray(userRecords)) {
        setRows(userRecords);
      } else {
        console.error("Data fetched is not an array:", userRecords);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const filterData = (v) => {
    if (v) {
      setRows([v]);
    } else {
      getData();
    }
  };
  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        deleteApi(id);
      }
    });
  };
  const deleteApi = async (id) => {
    await deleteUserData(id);
    Swal.fire("Deleted!", "Your file has been deleted.", "success");
    getData();
  };
  const handleStatusChange = async (id: number, active: boolean) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to ${active ? "Deactivate" : "Activate"} this User?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${active ? "Deactivate" : "Activate"} it!`,
    }).then((result) => {
      if (result.value) {
        userStatusChange(id, active);
      }
    });
};

const userStatusChange = async (id: number, active: boolean) => {
    try {
      console.log("Updating user with ID:", id);
      // Update the local state immediately
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id === id ? { ...row, active: !active } : row
        )
      );

      // Call API to change the status
      const response = await changeActiveStatusRouter(id, !active);
      console.log("API response for status change:", response);

      Swal.fire(
        "Status Changed!",
        `The user has been ${!active ? "activated" : "deactivated"}.`,
        "success"
      );
    } catch (error) {
      console.error("Error updating user status:", error);
      Swal.fire("Error", "Could not update user status. Please try again.", "error");
      // Revert the state if the API call fails
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id === id ? { ...row, active } : row
        )
      );
    }
};

  return (
    <>
      {rows.length > 0 && (
        <Paper sx={{ Width: "100%", overflow: "hidden", padding: "12px" }}>
          <Stack direction="row" spacing={65} className="my-2 mb-2" sx={{padding:"10px"}}>
            <Stack >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{width: " 150px", ml:"16px"}}
          >
            Users List
          </Typography>
          </Stack>
          <Stack>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={rows}
              sx={{ width: 250 }}
              onChange={(e, v) => filterData(v)}
              getOptionLabel={(rows) => rows.username || ""}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Search By User" />
              )}
            />
            </Stack>
          </Stack>
          <Divider />
          <Box height={10} />
          
          <Box height={10} />

          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Username
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Email
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    phone_number
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Gender
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Active
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1}>
                        <TableCell>{row.id}</TableCell>
                        <TableCell align="center">{row.username}</TableCell>
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="center">{row.phone}</TableCell>
                        <TableCell align="center">{row.gender}</TableCell>
                        <TableCell align="center">
                        <Switch
                          checked={row.active}
                          onChange={() => handleStatusChange(row.id, row.active)}
                          color={row.active ? "success" : "error"}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      </TableCell>
                
                        <TableCell align="center">
                          <IconButton aria-label="delete">
                            <DeleteIcon
                              onClick={() => {
                                deleteUser(row.id);
                              }}
                            />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
      {rows.length == 0 && (
        <>
          <Paper sx={{ width: "100%", overflow: "hidden", padding: "12px" }}>
            <Box height={20} />
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={"100%"}
              height={80}
            />
            <Box height={20} />
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={"100%"}
              height={50}
            />
            <Box height={20} />
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={"100%"}
              height={50}
            />
            <Box height={20} />
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={"100%"}
              height={50}
            />
            <Box height={20} />
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={"100%"}
              height={50}
            />
            <Box height={20} />
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={"100%"}
              height={50}
            />
          </Paper>
        </>
      )}
    </>
  );
}




