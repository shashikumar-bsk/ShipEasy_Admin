import React, { useEffect, useState } from 'react';
import {
  Box,
  Checkbox,
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
  DialogContent,
  DialogTitle,
  DialogActions,
  Alert as MuiAlert,
  AlertProps,
  Pagination,
  DialogContentText,
  Grid,
} from '@mui/material';
import { Delete as DeleteIcon, Search as SearchIcon, Edit as EditIcon } from '@mui/icons-material';
import Dashboard from '../Dashboard';
import { getRestaurantData, deleteRestaurantData, postRestaurantData, updateRestaurantData } from '../../../../src/api-requests/Restuarent';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import RatingStars from 'react-rating-stars-component'; // Import the star rating component
import './restaurantmgt.css';

interface Restaurant {
  id: number;
  name: string;
  location: string;
  phone: string;
  rating: number;
  opening_time: string;
  closing_time: string;
}

const schema = yup.object({
  name: yup.string().required('Name is required'),
  location: yup.string().required('Location is required'),
  phone: yup.string()
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
    .required('Phone number is required'),
  rating: yup.number()
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating must be at most 5')
    .required('Rating is required'),
  opening_time: yup.string().required('Opening time is required'),
  closing_time: yup.string().required('Closing time is required'),
});

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function RestaurantManagement() {
  const [rows, setRows] = useState<Restaurant[]>([]);
  const [filteredRows, setFilteredRows] = useState<Restaurant[]>([]);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deletingRestaurantId, setDeletingRestaurantId] = useState<number | null>(null);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(null);
  const [page, setPage] = useState(1);
  const rowsPerPage = 4;
  const [formOpen, setFormOpen] = useState(false);

  const { control, handleSubmit, reset, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      location: '',
      phone: '',
      rating: 1,
      opening_time: '',
      closing_time: '',
    },
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const data = await getRestaurantData();
      if (Array.isArray(data)) {
        setRows(data);
        setFilteredRows(data);
      } else {
        console.error('Data fetched is not an array:', data);
      }
    } catch (error) {
      console.error('Error fetching restaurant data:', error);
    }
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRows(event.target.checked ? new Set(filteredRows.map(row => row.id)) : new Set());
  };

  const handleSelectClick = (id: number) => {
    const newSelectedRows = new Set(selectedRows);
    newSelectedRows.has(id) ? newSelectedRows.delete(id) : newSelectedRows.add(id);
    setSelectedRows(newSelectedRows);
  };

  const handleDelete = (id: number) => {
    setDeletingRestaurantId(id);
    setConfirmDeleteOpen(true);
  };

  const handleDeleteConfirmed = async (id: number) => {
    try {
      await deleteRestaurantData(id);
      await getData();
      setSnackbarMessage('Restaurant deleted successfully');
    } catch (error) {
      console.error('Error deleting restaurant:', error);
      setSnackbarMessage('Error deleting restaurant');
    } finally {
      setConfirmDeleteOpen(false);
      setSnackbarOpen(true);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value.toLowerCase();
    setFilteredRows(rows.filter(row =>
      row.name.toLowerCase().includes(searchQuery) ||
      row.location.toLowerCase().includes(searchQuery) ||
      row.phone.toLowerCase().includes(searchQuery)
    ));
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setValue('phone', value);
    }
  };

  const handleRatingChange = (newRating: number) => {
    setValue('rating', newRating);
  };

  const onSubmit = async (data: unknown) => {
    try {
      if (editingRestaurant) {
        await updateRestaurantData(editingRestaurant.id, data);
        setSnackbarMessage('Restaurant updated successfully');
        setEditFormOpen(false);
      } else {
        await postRestaurantData(data);
        setSnackbarMessage('Restaurant added successfully');
        setFormOpen(false);
      }
      reset();
      await getData();
    } catch (error) {
      console.error('Error saving restaurant:', error);
      setSnackbarMessage('Error saving restaurant');
    } finally {
      setSnackbarOpen(true);
    }
    window.location.reload();

  };

  const handleEdit = (restaurant: Restaurant) => {
    setEditingRestaurant(restaurant);
    setValue('name', restaurant.name);
    setValue('location', restaurant.location);
    setValue('phone', restaurant.phone);
    setValue('rating', restaurant.rating);
    setValue('opening_time', restaurant.opening_time);
    setValue('closing_time', restaurant.closing_time);
    setEditFormOpen(true);
  

  };

  const displayedRows = filteredRows.slice((page - 1)*  rowsPerPage, page  *rowsPerPage);

  return (
    <Box sx={{ backgroundColor: 'white', padding: '20px' }}>
      <Box sx={{ marginLeft: '15%', width: '75%' }}>
        <Box sx={{ marginLeft: '10%', width: '100%' }}>
          <h5 style={{ margin: 0, color: 'black', fontSize: '24px' }}>
            Restaurant Management
          </h5>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px',
            }}
          >
            <Dashboard />
          </Box>
          <Box
            sx={{
              marginTop: '0',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              boxSizing: 'border-box',
            }}
          >
            <div className='rest-button'>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setFormOpen(true)}
                sx={{
                  width: '100%',
                  padding: '6px 12px',
                  backgroundColor: '#686d76',
                  marginTop: '10px',
                  '&:hover': {
                    backgroundColor: '#54575c',
                  },
                }}
              >
                Add Restaurant
              </Button>
            </div>
            <TextField
              label="Search By Name, Location or Phone"
              variant="outlined"
              onChange={handleSearch}
              sx={{ marginLeft: 'auto', width: '40%' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={filteredRows.length > 0 && selectedRows.size === filteredRows.length}
                      onChange={handleSelectAllClick}
                    />
                  </TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Opening Time</TableCell>
                  <TableCell>Closing Time</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedRows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedRows.has(row.id)}
                        onChange={() => handleSelectClick(row.id)}
                      />
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.location}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>
                      <RatingStars
                        count={5}
                        value={row.rating}
                        onChange={(newRating) => handleRatingChange(newRating)}
                        size={24}
                      />
                      <div>{row.rating}</div>
                    </TableCell>
                    <TableCell>{row.opening_time}</TableCell>
                    <TableCell>{row.closing_time}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(row)} color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(row.id)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            count={Math.ceil(filteredRows.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            sx={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}
          />
        </Box>
      </Box>

      <Dialog open={formOpen} onClose={() => setFormOpen(false)}>
        <DialogTitle>Add Restaurant</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Name"
                      variant="outlined"
                      fullWidth
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="location"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Location"
                      variant="outlined"
                      fullWidth
                      error={!!errors.location}
                      helperText={errors.location?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Phone"
                      variant="outlined"
                      fullWidth
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                      onChange={handlePhoneChange}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="rating"
                  control={control}
                  render={({ field }) => (
                    <Box>
                      <RatingStars
                        count={5}
                        value={field.value}
                        onChange={handleRatingChange}
                        size={24}
                      />
                      <TextField
                        {...field}
                        type="number"
                        inputProps={{ min: 1, max: 5 }}
                        fullWidth
                        error={!!errors.rating}
                        helperText={errors.rating?.message}
                      />
                    </Box>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="opening_time"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Opening Time"
                      type="time"
                      variant="outlined"
                      fullWidth
                      error={!!errors.opening_time}
                      helperText={errors.opening_time?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="closing_time"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Closing Time"
                      type="time"
                      variant="outlined"
                      fullWidth
                      error={!!errors.closing_time}
                      helperText={errors.closing_time?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <DialogActions>
              <Button onClick={() => setFormOpen(false)} color="primary">Cancel</Button>
              <Button type="submit" color="primary">Submit</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={editFormOpen} onClose={() => setEditFormOpen(false)}>
        <DialogTitle>Edit Restaurant</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Name"
                      variant="outlined"
                      fullWidth
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="location"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Location"
                      variant="outlined"
                      fullWidth
                      error={!!errors.location}
                      helperText={errors.location?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Phone"
                      variant="outlined"
                      fullWidth
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                      onChange={handlePhoneChange}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="rating"
                  control={control}
                  render={({ field }) => (
                    <Box>
                      <RatingStars
                        count={5}
                        value={field.value}
                        onChange={handleRatingChange}
                        size={24}
                      />
                      <TextField
                        {...field}
                        type="number"
                        inputProps={{ min: 1, max: 5 }}
                        fullWidth
                        error={!!errors.rating}
                        helperText={errors.rating?.message}
                      />
                    </Box>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="opening_time"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Opening Time"
                      type="time"
                      variant="outlined"
                      fullWidth
                      error={!!errors.opening_time}
                      helperText={errors.opening_time?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="closing_time"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Closing Time"
                      type="time"
                      variant="outlined"
                      fullWidth
                      error={!!errors.closing_time}
                      helperText={errors.closing_time?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <DialogActions>
              <Button onClick={() => setEditFormOpen(false)} color="primary">Cancel</Button>
              <Button type="submit" color="primary">Save</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this restaurant?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)} color="primary">Cancel</Button>
          <Button
            onClick={() => {
              if (deletingRestaurantId !== null) {
                handleDeleteConfirmed(deletingRestaurantId);
              }
            }}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
