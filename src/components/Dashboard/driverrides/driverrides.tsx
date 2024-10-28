import React, { useEffect, useState } from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Typography,
    Box,
    Button,
    IconButton,
    TextField,
    Autocomplete,
} from '@mui/material';
// import { Delete as DeleteIcon } from '@mui/icons-material';
import Swal from 'sweetalert2';

interface User {
  username: string;
  phone: string;
}

interface Driver {
  driver_name: string;
}

interface Booking {
  booking_id: string;
  pickup_address: string;
  dropoff_address: string;
}

interface ReceiverDetail {
  receiver_id: string;
  receiver_name: string;
  receiver_phone_number: string;
}

interface Ride {
  request_id: string;
  status: string;
  User: User | null;
  Driver: Driver | null;
  Booking: Booking | null;
  ReceiverDetail: ReceiverDetail | null;
}

const DriverRides: React.FC = () => {
  const [completedRides, setCompletedRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  const fetchCompletedRides = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/v1/riderequest/ride-requests/completed');
      if (!response.ok) {
        throw new Error('Failed to fetch completed rides');
      }
      const data: Ride[] = await response.json();
      setCompletedRides(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompletedRides();
  }, []);

  const handleRetry = () => {
    setError(null);
    fetchCompletedRides();
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filterData = (searchTerm: string | null) => {
    setSearchTerm(searchTerm);
  };

  const filteredRides = completedRides.filter(ride =>
    searchTerm ? ride.request_id.toLowerCase().includes(searchTerm.toLowerCase()) : true
  );

//   const deleteRide = (request_id: string) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         // Call the API to delete the ride here
//         Swal.fire("Deleted!", "The ride has been deleted.", "success");
//         fetchCompletedRides(); // Re-fetch rides after deletion
//       }
//     });
//   };

  return (
    <div style={{ padding: '20px' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center"  mb={2}>
        <Typography variant="h4" gutterBottom>Completed Rides</Typography>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={completedRides}
          sx={{
            width: { xs: "100%", sm: 250 },
          }} // Full width on mobile
          onChange={(e, value) => filterData(value?.request_id || null)}
          getOptionLabel={(ride) => ride.request_id || ""}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              label="Search by Request ID"
              variant="outlined"
            />
          )}
        />
      </Box>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>
          <p>Error: {error}</p>
          <Button onClick={handleRetry}>Retry</Button>
        </div>
      ) : (
        <Paper className="driver-table-container">
          <TableContainer style={{ maxHeight: 440 }}> {/* Apply max height here */}
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={{ backgroundColor: '#37505C', color: 'white' }}>Request ID</TableCell>
                  <TableCell align="center" style={{ backgroundColor: '#37505C', color: 'white' }}>User</TableCell>
                  <TableCell align="center" style={{ backgroundColor: '#37505C', color: 'white' }}>Driver</TableCell>
                  <TableCell align="center" style={{ backgroundColor: '#37505C', color: 'white' }}>pickup_address</TableCell>
                  <TableCell align="center" style={{ backgroundColor: '#37505C', color: 'white' }}>dropoff_address</TableCell>

                  <TableCell align="center" style={{ backgroundColor: '#37505C', color: 'white' }}>Receiver</TableCell>
                  <TableCell align="center" style={{ backgroundColor: '#37505C', color: 'white' }}>Status</TableCell>
                  {/* <TableCell align="center" style={{ backgroundColor: '#37505C', color: 'white' }}>Actions</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRides
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((ride) => (
                    <TableRow hover role="checkbox" key={ride.request_id}  >
                      <TableCell  align="center"> {ride.request_id || 'Not available'} </TableCell>                        <TableCell align="center">{ride.User ? ride.User.username : 'Not available'}</TableCell>
                      <TableCell align="center">{ride.Driver ? ride.Driver.driver_name : 'Not available'}</TableCell>
                      <TableCell align="center">
                        {ride.Booking ? `${ride.Booking.pickup_address}` : 'Not available'}
                      </TableCell>
                      <TableCell align="center">
                        {ride.Booking ? `${ride.Booking.dropoff_address}` : 'Not available'}
                      </TableCell>
                      <TableCell align="center">{ride.ReceiverDetail ? ride.ReceiverDetail.receiver_name : 'Not available'}</TableCell>
                         <TableCell  align="center"> {ride.status || 'Not available'}</TableCell>
                      {/* <TableCell align="center">
                        <IconButton   aria-label="delete" onClick={() => deleteRide(ride.request_id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell> */}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={filteredRides.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </div>
  );
};
export default DriverRides;
