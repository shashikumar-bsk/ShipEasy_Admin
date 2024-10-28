import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Box,
  Typography,
  Skeleton,
  TextField,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Snackbar,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Autocomplete from '@mui/material/Autocomplete';
import { getVehicleData, updateVehicleData, deleteVehicleData } from '../../../api-requests/VehicleRouter'; // Adjust the import path as necessary
import './Vehicale.css';

interface Vehicle {
  id: number;
  name: string;
  capacity: string;
  price: number;
  baseFare: number;
  ratePerKm: number;
  estimatedTimePerKm: number;
  image: { image_url: string } | null;
}

const Vehicle: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [editVehicle, setEditVehicle] = useState<Vehicle | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const vehicleRecords = await getVehicleData();
      if (Array.isArray(vehicleRecords)) {
        setVehicles(vehicleRecords);
        setFilteredVehicles(vehicleRecords);
      } else {
        console.error('Data fetched is not an array:', vehicleRecords);
      }
    } catch (error) {
      console.error('Error fetching vehicle data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filterData = (name: string | null) => {
    if (name) {
      const filtered = vehicles.filter(vehicle =>
        vehicle.name.toLowerCase().includes(name.toLowerCase())
      );
      setFilteredVehicles(filtered);
    } else {
      setFilteredVehicles(vehicles);
    }
  };

  const handleEditClick = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setEditVehicle(vehicle); // Set editable fields to the selected vehicle data
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedVehicle(null);
    setEditVehicle(null);
  };

  const handleInputChange = (field: keyof Vehicle, value: any) => {
    setEditVehicle((prev) => prev ? { ...prev, [field]: value } : null);
  };

  const handleUpdate = async () => {
    if (editVehicle) {
      const updatedData = {
        name: editVehicle.name,
        capacity: editVehicle.capacity,
        price: editVehicle.price,
        baseFare: editVehicle.baseFare,
        ratePerKm: editVehicle.ratePerKm,
        estimatedTimePerKm: editVehicle.estimatedTimePerKm,
      };

      try {
        const response = await updateVehicleData(editVehicle.id, updatedData);

        if (response) {
          setVehicles((prevVehicles) =>
            prevVehicles.map((vehicle) =>
              vehicle.id === editVehicle.id ? { ...vehicle, ...updatedData } : vehicle
            )
          );
          setSuccessMessage("Vehicle updated successfully"); // Show success message
          handleCloseDialog(); // Close the dialog after successful update
        } else {
          console.error('Failed to update vehicle data');
        }
      } catch (error) {
        console.error('Error updating vehicle:', error);
      }
    }
  };

  const handleDeleteClick = async (id: number) => {
    try {
      await deleteVehicleData(id);
      setVehicles((prevVehicles) => prevVehicles.filter((vehicle) => vehicle.id !== id));
      setSuccessMessage('Vehicle deleted successfully!');
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };
  return (
    <Paper sx={{ width: "100%", overflow: "hidden", padding: "5px" }}>
      <Box className="vehicle-header">
        <Typography variant="h4" gutterBottom>Vehicle List</Typography>
        <Autocomplete
          disablePortal
          id="vehicle-search"
          className="vehicle-search"
          options={vehicles}
          onChange={(e, value) => filterData(value?.name || null)}
          getOptionLabel={(vehicle) => vehicle.name || ""}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              label="Search by Vehicle Name"
              variant="outlined"
            />
          )}
        />
      </Box>
      <TableContainer style={{ maxHeight: 440 }}>
        {loading ? (
          <Skeleton variant="rectangular" width="100%" height={400} />
        ) : (
          <Table className="vehicle-table" stickyHeader aria-label="vehicle list">
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Capacity</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Base Fare</TableCell>
                <TableCell align="center">Rate/km</TableCell>
                <TableCell align="center">Estimated Time/km</TableCell>
                <TableCell align="center">Image</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredVehicles
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((vehicle) => (
                  <TableRow hover role="checkbox" key={vehicle.id}>
                    <TableCell align="center">{vehicle.id}</TableCell>
                    <TableCell align="center">{vehicle.name}</TableCell>
                    <TableCell align="center">{vehicle.capacity}</TableCell>
                    <TableCell align="center">{vehicle.price}</TableCell>
                    <TableCell align="center">{vehicle.baseFare}</TableCell>
                    <TableCell align="center">{vehicle.ratePerKm}</TableCell>
                    <TableCell align="center">{vehicle.estimatedTimePerKm}</TableCell>
                    <TableCell align="center">
                      {vehicle.image ? (
                        <img src={vehicle.image.image_url} alt={vehicle.name} className="vehicle-image" />
                      ) : (
                        'No Image'
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => handleEditClick(vehicle)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteClick(vehicle.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredVehicles.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Vehicle</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit details for {selectedVehicle?.name}</DialogContentText>
          <TextField
            margin="dense"
            label="ID"
            type="number"
            fullWidth
            value={editVehicle?.id || ''}
            onChange={(e) => handleInputChange('id', parseInt(e.target.value))}
          />
          <TextField
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={editVehicle?.name || ''}
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
          <TextField
            margin="dense"
            label="Capacity"
            type="text"
            fullWidth
            value={editVehicle?.capacity || ''}
            onChange={(e) => handleInputChange('capacity', e.target.value)}
          />
          <TextField
            margin="dense"
            label="Price"
            type="number"
            fullWidth
            value={editVehicle?.price || ''}
            onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
          />
          <TextField
            margin="dense"
            label="Base Fare"
            type="number"
            fullWidth
            value={editVehicle?.baseFare || ''}
            onChange={(e) => handleInputChange('baseFare', parseFloat(e.target.value))}
          />
          <TextField
            margin="dense"
            label="Rate/km"
            type="number"
            fullWidth
            value={editVehicle?.ratePerKm || ''}
            onChange={(e) => handleInputChange('ratePerKm', parseFloat(e.target.value))}
          />
          <TextField
            margin="dense"
            label="Estimated Time/km"
            type="number"
            fullWidth
            value={editVehicle?.estimatedTimePerKm || ''}
            onChange={(e) => handleInputChange('estimatedTimePerKm', parseFloat(e.target.value))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
          <Button onClick={handleUpdate} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default Vehicle;
function setDialogOpen(arg0: boolean) {
  throw new Error('Function not implemented.');
}

