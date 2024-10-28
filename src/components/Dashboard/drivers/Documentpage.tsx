// import React, { useEffect, useState } from 'react';
// import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Snackbar, InputAdornment, Pagination, IconButton, Dialog, DialogContent } from '@mui/material';
// import { Search as SearchIcon, CheckCircle as CheckCircleIcon, Cancel as CancelIcon } from '@mui/icons-material';
// import MuiAlert, { AlertProps } from '@mui/material/Alert';
// import { getDriverDocs, acceptDocument, deleteDriverDocumentData } from '../../../api-requests/diver-documentsRouter'; // Adjust path to your API request file
// import Dashboard from '../Dashboard';
// import '../menu.css';
// import { useParams } from 'react-router-dom';
// import Sidenavbar from '../../sidenvbar';

// interface Document {
//   doc_id: number;
//   doc_number: string;
//   doc_type: string;
//   driver_id: number;
//   front_image: string;
//   back_image: string;
//   status: boolean;
// }

// function Alert(props: AlertProps) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

// export default function DocumentTable() {
// const { id } = useParams<{ id: string }>();

// const [rows, setRows] = useState<Document[]>([]);
// const [filteredRows, setFilteredRows] = useState<Document[]>([]);
// const [snackbarOpen, setSnackbarOpen] = useState(false);
// const [snackbarMessage, setSnackbarMessage] = useState('');
// const [page, setPage] = useState(1);
// const [initialUpload, setInitialUpload] = useState(false);
// const [openImage, setOpenImage] = useState<string | undefined>(undefined);
// const rowsPerPage = 5;

//   useEffect(() => {
//     getData();
//   }, []);

//   const getData = async () => {
//     try {
//       const documentRecords = await getDriverDocs(id);
//       console.log('Full API response:', documentRecords.Data);

//       // Ensure the data is an array before setting state
//       if (Array.isArray(documentRecords)) {
//         setRows(documentRecords);
//         setFilteredRows(documentRecords);
//         setInitialUpload(documentRecords.length > 0); // Set initialUpload based on whether documents are present
//       } else {
//         console.error('Data fetched is not an array:', documentRecords);
//       }
//     } catch (error) {
//       console.error('Error fetching document data:', error);
//     }
//   };

//   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const searchQuery = event.target.value.toLowerCase();
//     const filtered = rows.filter(
//       (row) =>
//         row.doc_number.toLowerCase().includes(searchQuery) ||
//         row.doc_type.toLowerCase().includes(searchQuery)
//     );
//     setFilteredRows(filtered);
//   };

// const handleAccept = async (id: number) => {
//   try {
//     await acceptDocument(id);
//     setSnackbarMessage('Document accepted successfully');
//     setSnackbarOpen(true);
//     setInitialUpload(true); // Set initialUpload to true after the first action

//     // Update the status of the accepted document
//     setRows(prevRows =>
//       prevRows.map(row =>
//         row.doc_id === id ? { ...row, status: true } : row
//       )
//     );
//     setFilteredRows(prevRows =>
//       prevRows.map(row =>
//         row.doc_id === id ? { ...row, status: true } : row
//       )
//     );
//   } catch (error) {
//     console.error('Error accepting document:', error);
//   }
// };

// const handleReject = async (id: number) => {
//   try {
//     await deleteDriverDocumentData(id);
//     setSnackbarMessage('Document rejected and deleted successfully');
//     setSnackbarOpen(true);
//     setInitialUpload(true); // Set initialUpload to true after the first action

//     // Remove the rejected document from the state
//     setRows(prevRows => prevRows.filter(row => row.doc_id !== id));
//     setFilteredRows(prevRows => prevRows.filter(row => row.doc_id !== id));
//   } catch (error) {
//     console.error('Error rejecting document:', error);
//   }
// };

//   const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
//     setPage(newPage);
//   };

//   const displayedRows = filteredRows.slice((page - 1) * rowsPerPage, page * rowsPerPage);

// const handleCloseImage = () => {
//   setOpenImage(undefined);
// };

//   return (
//     <Box sx={{ backgroundColor: 'white' }}>
//       <Box>
//         <Sidenavbar />
//         {/* <Dashboard /> */}
//       </Box>
//       <Box sx={{ marginLeft: '13%', width: '75%' }}>
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
//                   Document Table
//                 </h5>
//               </Grid>
//               <Grid item>
//                 <TextField
//                   sx={{
//                     height: '40px',
//                     width: '350px',
//                     '& .MuiOutlinedInput-root': {
//                       height: '100%',
//                       display: 'flex',
//                       alignItems: 'center',
//                       paddingRight: '8px',
//                     },
//                     '& .MuiInputBase-input': {
//                       fontSize: '0.875rem',
//                       textAlign: 'center',
//                     },
//                     '& .MuiInputLabel-root': {
//                       fontSize: '0.875rem',
//                       top: '-6px',
//                     },
//                   }}
//                   label="Search By Document Number or Type"
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
//           <TableContainer component={Paper}>
//             <Table sx={{ minWidth: 700 }} aria-label="simple table">
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: 'lightgray' }}>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Document ID</TableCell>
//                   <TableCell align="center" sx={{ fontWeight: 'bold' }}>Document Number</TableCell>
//                   <TableCell align="center" sx={{ fontWeight: 'bold' }}>Document Type</TableCell>
//                   <TableCell align="center" sx={{ fontWeight: 'bold' }}>Driver ID</TableCell>
//                   <TableCell align="center" sx={{ fontWeight: 'bold' }}>Front Image</TableCell>
//                   <TableCell align="center" sx={{ fontWeight: 'bold' }}>Back Image</TableCell>
//                   <TableCell align="center" sx={{ fontWeight: 'bold' }}>Status</TableCell>
//                   {!initialUpload && <TableCell align="center" sx={{ fontWeight: 'bold' }}>Actions</TableCell>}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {displayedRows.map((row) => (
//                   <TableRow key={row.doc_id}>
// <TableCell>{row.doc_id}</TableCell>
// <TableCell align="center">{row.doc_number}</TableCell>
// <TableCell align="center">{row.doc_type}</TableCell>
// <TableCell align="center">{row.driver_id}</TableCell>
// <TableCell align="center">
//   <img
//     src={row.front_image}
//     alt="Front"
//     style={{ maxWidth: '100px', cursor: 'pointer' }}
//     onClick={() => setOpenImage(row.front_image)}
//   />
// </TableCell>
// <TableCell align="center">
//   <img
//     src={row.back_image}
//     alt="Back"
//     style={{ maxWidth: '100px', cursor: 'pointer' }}
//     onClick={() => setOpenImage(row.back_image)}
//   />
// </TableCell>
// <TableCell align="center">{row.status ? 'Accepted' : 'Pending'}</TableCell>
// {!initialUpload && (
//   <TableCell align="center">
//     <IconButton
//       color="primary"
//       onClick={() => handleAccept(row.doc_id)}
//       sx={{ marginRight: '10px' }}
//     >
//       <CheckCircleIcon />
//     </IconButton>
//     <IconButton
//       color="secondary"
//       onClick={() => handleReject(row.doc_id)}
//     >
//       <CancelIcon />
//     </IconButton>
//   </TableCell>
//                     )}
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <Box sx={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
//             <Pagination
//               count={Math.ceil(filteredRows.length / rowsPerPage)}
//               page={page}
//               onChange={handleChangePage}
//             />
//           </Box>
//         </Box>
//       </Box>
//       <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
//         <Alert onClose={() => setSnackbarOpen(false)} severity="success">
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//       <Dialog open={!!openImage} onClose={handleCloseImage} maxWidth="md" fullWidth>
//         <DialogContent sx={{ display: 'flex', justifyContent: 'center' }}>
//           <img src={openImage || ''} alt="Document" style={{ width: '90%', margin:'30px' }} />
//         </DialogContent>
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
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { deleteUserData, getUserData } from "../../../api-requests/userRouter";
import {
  Delete as DeleteIcon,
  Padding,
  Search as SearchIcon,
} from "@mui/icons-material";
import Swal from "sweetalert2";
import Skeleton from "@mui/material/Skeleton";
import { useParams } from "react-router-dom";
import {
  acceptDocument,
  deleteDriverDocumentData,
  getDriverDocs,
} from "../../../api-requests/diver-documentsRouter";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
interface Document {
  doc_id: number;
  doc_number: string;
  doc_type: string;
  driver_id: number;
  front_image: string;
  back_image: string;
  status: boolean;
}

export default function DocumentTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState<Document[]>([]);
  const { id } = useParams<{ id: string }>();
  const [initialUpload, setInitialUpload] = useState(false);
  const [openImage, setOpenImage] = useState<string | undefined>(undefined);

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
      const documentRecords = await getDriverDocs(id);

      console.log("Full API response:", documentRecords);

      if (Array.isArray(documentRecords)) {
        setRows(documentRecords);
      } else {
        console.error("Data fetched is not an array:", documentRecords);
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
  const handleAccept = async (id: number) => {
    try {
      await acceptDocument(id);

      setInitialUpload(true); // Set initialUpload to true after the first action

      // Update the status of the accepted document
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.doc_id === id ? { ...row, status: true } : row
        )
      );
    } catch (error) {
      console.error("Error accepting document:", error);
    }
  };
  const handleCloseImage = () => {
    setOpenImage(undefined);
  };
  const handleReject = async (id: number) => {
    try {
      await deleteDriverDocumentData(id);

      setInitialUpload(true); // Set initialUpload to true after the first action

      // Remove the rejected document from the state
      setRows((prevRows) => prevRows.filter((row) => row.doc_id !== id));
    } catch (error) {
      console.error("Error rejecting document:", error);
    }
  };
  return (
    <>
      {rows.length > 0 && (
        <Paper sx={{ Width: "100%", overflow: "hidden", padding: "12px" }}>
          <Stack
            direction="row"
            spacing={65}
            className="my-2 mb-2"
            sx={{ padding: "10px" }}
          >
            <Stack>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ width: " 150px", ml: "16px" }}
              >
                Documents List
              </Typography>
            </Stack>
            <Stack>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={rows}
                sx={{ width: 250 }}
                onChange={(e, v) => filterData(v)}
                getOptionLabel={(rows) => rows.doc_number || ""}
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
                <TableRow sx={{ backgroundColor: "lightgray" }}>
                  <TableCell sx={{ fontWeight: "bold" }}>Document ID</TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Document Number
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Document Type
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Driver ID
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Front Image
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Back Image
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Status
                  </TableCell>
                  {!initialUpload && (
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      Actions
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.doc_id}
                      >
                        <TableCell>{row.doc_id}</TableCell>
                        <TableCell align="center">{row.doc_number}</TableCell>
                        <TableCell align="center">{row.doc_type}</TableCell>
                        <TableCell align="center">{row.driver_id}</TableCell>
                        <TableCell align="center">
                          <img
                            src={row.front_image}
                            alt="Front"
                            style={{ maxWidth: "100px", cursor: "pointer" }}
                            onClick={() => setOpenImage(row.front_image)}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <img
                            src={row.back_image}
                            alt="Back"
                            style={{ maxWidth: "100px", cursor: "pointer" }}
                            onClick={() => setOpenImage(row.back_image)}
                          />
                        </TableCell>
                        <TableCell align="center">
                          {row.status ? "Accepted" : "Pending"}
                        </TableCell>
                        {!initialUpload && (
                          <TableCell align="center">
                            <IconButton
                              color="primary"
                              onClick={() => handleAccept(row.doc_id)}
                              sx={{ marginRight: "10px" }}
                            >
                              <CheckCircleIcon />
                            </IconButton>
                            <IconButton
                              color="secondary"
                              onClick={() => handleReject(row.doc_id)}
                            >
                              <CancelIcon />
                            </IconButton>
                          </TableCell>
                        )}
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
