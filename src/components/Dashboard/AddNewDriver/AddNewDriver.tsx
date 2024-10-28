
// import React, { useState } from 'react';
// import {
//   Box,
//   TextField,
//   Button,
//   FormControl,
//   MenuItem,
//   Select,
//   InputLabel,
//   SelectChangeEvent,
//   CircularProgress,
//   Snackbar,
//   Alert,
//   IconButton,
//   InputAdornment,
//   Avatar,
// } from '@mui/material';
// import { Visibility, VisibilityOff, Edit as EditIcon } from '@mui/icons-material';
// import axios from 'axios';
// import Sidenavbar from '../../sidenvbar';
// import { AlertColor } from '@mui/material/Alert'; // Import AlertColor

// // Define an interface for the driver details
// interface DriverDetails {
//   first_name: string;
//   last_name: string;
//   email: string;
//   password: string;
//   gender: string;
//   dob: string;
//   vehicle_type: string;
//   vehicle_number: string;
//   phone: string;
//   profile_image: File | null; // Updated to File for image uploading
// }

// // Define an interface for the errors
// interface Errors {
//   first_name?: string;
//   last_name?: string;
//   email?: string;
//   password?: string;
//   gender?: string;
//   dob?: string;
//   vehicle_type?: string;
//   vehicle_number?: string;
//   phone?: string;
//   profile_image?: File;
// }

// // Define an interface for the notification state
// interface Notification {
//   open: boolean;
//   message: string;
//   severity: AlertColor; // Use AlertColor type for severity
// }

// const AddNewDriver = () => {
//   const [driverDetails, setDriverDetails] = useState<DriverDetails>({
//     first_name: '',
//     last_name: '',
//     email: '',
//     password: '',
//     gender: '',
//     dob: '',
//     vehicle_type: '',
//     vehicle_number: '',
//     phone: '',
//     profile_image: null, // Image can be null initially
//   });

//   const [errors, setErrors] = useState<Errors>({});
//   const [loading, setLoading] = useState(false);
//   const [notification, setNotification] = useState<Notification>({
//     open: false,
//     message: '',
//     severity: 'success', // Default to 'success'
//   });
//   const [showPassword, setShowPassword] = useState(false);

//   // Validation logic
//   const validateFields = () => {
//     const newErrors: Errors = {};
//     if (!driverDetails.first_name) newErrors.first_name = 'First name is required';
//     if (!driverDetails.last_name) newErrors.last_name = 'Last name is required';
//     if (!driverDetails.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(driverDetails.email))
//       newErrors.email = 'Valid email is required';
//     if (!driverDetails.password || driverDetails.password.length < 6)
//       newErrors.password = 'Password must be at least 6 characters long';
//     if (!driverDetails.gender) newErrors.gender = 'Gender is required';
//     if (!driverDetails.dob) newErrors.dob = 'Date of birth is required';
//     if (!driverDetails.vehicle_type) newErrors.vehicle_type = 'Vehicle type is required';
//     if (!driverDetails.vehicle_number) newErrors.vehicle_number = 'Vehicle number is required';
//     if (!driverDetails.phone || !/^\d{10}$/.test(driverDetails.phone))
//       newErrors.phone = 'Valid phone number is required';

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setDriverDetails({ ...driverDetails, [name]: value });
//   };

//   const handleSelectChange = (e: SelectChangeEvent) => {
//     const { name, value } = e.target;
//     setDriverDetails({ ...driverDetails, [name]: value });
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setDriverDetails((prev) => ({ ...prev, profile_image: file }));
//     }
//   };
  
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!validateFields()) return;
  
//     setLoading(true);
  
//     const formData = new FormData();
//     formData.append('first_name', driverDetails.first_name);
//     formData.append('last_name', driverDetails.last_name);
//     formData.append('email', driverDetails.email);
//     formData.append('password', driverDetails.password);
//     formData.append('gender', driverDetails.gender);
//     formData.append('dob', driverDetails.dob);
//     formData.append('vehicle_type', driverDetails.vehicle_type);
//     formData.append('vehicle_number', driverDetails.vehicle_number);
//     formData.append('phone', driverDetails.phone);
//     formData.append('profile_image', driverDetails.profile_image as any); // Ensure correct type
  
//     try {
//       const response = await axios.post('http://localhost:3000/api/v1/driverimage/', formData, {
//         headers: { 
//           'Content-Type': 'multipart/form-data',
//         },
//       });
      
//       console.log('Driver added successfully:', response.data);
//       setNotification({ open: true, message: 'Driver added successfully', severity: 'success' });
//       setDriverDetails({
//         first_name: '',
//         last_name: '',
//         email: '',
//         password: '',
//         gender: '',
//         dob: '',
//         vehicle_type: '',
//         vehicle_number: '',
//         phone: '',
//         profile_image: null,
//       });
//     } catch (error) {
//       console.error('Error adding driver:', error);
//       setNotification({ open: true, message: 'Error adding driver', severity: 'error' });
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   const handleCloseNotification = () => {
//     setNotification({ open: false, message: '', severity: 'success' });
//   };

//   return (
//     <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
//       <Sidenavbar />
//       <Box sx={{ maxWidth: '900px', width: '100%'}}>
//         <h3> Add New Driver</h3>
//         <form onSubmit={handleSubmit}>
//           <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
            
//             <Box sx={{ position: 'relative'}}>
//               <Avatar
//             src={driverDetails.profile_image ? URL.createObjectURL(driverDetails.profile_image) : 'defaultAvatarImage'}  
//               sx={{
//                   width: { xs: 130, md: 170 },
//                   height: { xs: 130, md: 170 },
//                   fontSize: { xs: 40, md: 50 },
//                   backgroundColor: '#3f51b5',
//                   marginRight: 7,
//                   marginTop: 7,
//                 }}
//               />
              // <IconButton
              //   sx={{
              //     position: 'absolute',
              //     top: '63%', // Center the button vertically
              //     left: '67%', // Center the button horizontally
              //     transform: 'translate(-50%, -50%)', // Offset the position to center the button
              //     backgroundColor: 'rgba(255, 255, 255, 0.7)', // Optional: semi-transparent background
              //     borderRadius: '50%',
              //     padding: '6px', // Adjust padding if needed
                  
              //   }}
              //   component="label"
              // >
              //   <EditIcon sx={{ fontSize: 24 }} /> {/* Adjust the size of the icon */}
              //   <input type="file" accept="image/*" onChange={handleImageChange} hidden />
              // </IconButton>
//             </Box>

//             {/* Input Fields */}
//             <Box sx={{ flex: '1 1 100%', display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              // <TextField
              //   label="First Name"
              //   variant="standard"
              //   name="first_name"
              //   value={driverDetails.first_name}
              //   onChange={handleInputChange}
              //   error={!!errors.first_name}
              //   helperText={errors.first_name}
              //   fullWidth
              //   sx={{ flex: '1 1 40%' }}
              // />
              // <TextField
              //   label="Last Name"
              //   variant="standard"
              //   name="last_name"
              //   value={driverDetails.last_name}
              //   onChange={handleInputChange}
              //   error={!!errors.last_name}
              //   helperText={errors.last_name}
              //   fullWidth
              //   sx={{ flex: '1 1 40%' }}
              // />
              // <TextField
              //   label="Email"
              //   variant="standard"
              //   name="email"
              //   value={driverDetails.email}
              //   onChange={handleInputChange}
              //   error={!!errors.email}
              //   helperText={errors.email}
              //   fullWidth
              //   sx={{ flex: '1 1 40%' }}
              // />
//               <TextField
//                 label="Password"
//                 variant="standard"
//                 type={showPassword ? 'text' : 'password'}
//                 name="password"
//                 value={driverDetails.password}
//                 onChange={handleInputChange}
//                 error={!!errors.password}
//                 helperText={errors.password}
//                 fullWidth
//                 sx={{ flex: '1 1 40%' }}
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
//                         {showPassword ? <VisibilityOff /> : <Visibility />}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//               <FormControl variant="standard" fullWidth sx={{ flex: '1 1 40%' }}>
//                 <InputLabel>Gender</InputLabel>
//                 <Select
//                   name="gender"
//                   value={driverDetails.gender}
//                   onChange={handleSelectChange}
//                 >
//                   <MenuItem value="">Select Gender</MenuItem>
//                   <MenuItem value="male">Male</MenuItem>
//                   <MenuItem value="female">Female</MenuItem>
//                   <MenuItem value="other">Other</MenuItem>
//                 </Select>
//               </FormControl>
              // <TextField
              //   label="Date of Birth"
              //   type="date"
              //   variant="standard"
              //   name="dob"
              //   value={driverDetails.dob}
              //   onChange={handleInputChange}
              //   error={!!errors.dob}
              //   helperText={errors.dob}
              //   fullWidth
              //   sx={{ flex: '1 1 40%' }}
              //   InputLabelProps={{ shrink: true }}
              // />

            //   <FormControl fullWidth variant="standard" sx={{ flex: '1 1 40%' }} error={!!errors.vehicle_type}>
            //   <InputLabel>Vehicle Type</InputLabel>
            //   <Select
            //     name="vehicle_type"
            //     value={driverDetails.vehicle_type}
            //     onChange={handleSelectChange}
            //   >
            //     <MenuItem value="Car">Car</MenuItem>
            //     <MenuItem value="Bike">Bike</MenuItem>
            //     <MenuItem value="Van">Van</MenuItem>
            //     <MenuItem value="Truck">Truck</MenuItem>
            //   </Select>
            // </FormControl>

              // <TextField
              //   label="Vehicle Number"
              //   variant="standard"
              //   name="vehicle_number"
              //   value={driverDetails.vehicle_number}
              //   onChange={handleInputChange}
              //   error={!!errors.vehicle_number}
              //   helperText={errors.vehicle_number}
              //   fullWidth
              //   sx={{ flex: '1 1 40%' }}
              // />
//               <TextField
//                 label="Phone Number"
//                 variant="standard"
//                 name="phone"
//                 value={driverDetails.phone}
//                 onChange={handleInputChange}
//                 error={!!errors.phone}
//                 helperText={errors.phone}
//                 fullWidth
//                 sx={{ width:'49%'  }}
//               />
//             </Box>
//           </Box>
          // <Button
          //     type="submit"
          //     variant="contained"
          //     disabled={loading}
          //     sx={{ backgroundColor: "green",
          //       color: "white",
          //       "&:hover": {
          //         backgroundColor: "#585d64",
          //       },
          //        marginTop:5, 
          //        marginLeft:50 
          //       }} // Adding hover color for better UX
          //   >
          //     {loading ? <CircularProgress size={24} /> : 'Add Driver'}
          // </Button>
//         </form>
//       </Box>

//       {/* Notification Snackbar */}
//       <Snackbar
//         open={notification.open}
//         autoHideDuration={6000}
//         onClose={handleCloseNotification}
//       >
//         <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
//           {notification.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default AddNewDriver;




import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  SelectChangeEvent,
  CircularProgress,
  Snackbar,
  Alert,
  IconButton,
  InputAdornment,
  Avatar,
  Grid,
} from '@mui/material';
import { Visibility, VisibilityOff, Edit as EditIcon } from '@mui/icons-material';
import axios from 'axios';
import Sidenavbar from '../../sidenvbar';
import { AlertColor } from '@mui/material/Alert'; // Import AlertColor

// Define an interface for the driver details
interface DriverDetails {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  gender: string;
  dob: string;
  vehicle_type: string;
  vehicle_number: string;
  phone: string;
  profile_image: File | null; // Updated to File for image uploading
}

// Define an interface for the errors
interface Errors {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  gender?: string;
  dob?: string;
  vehicle_type?: string;
  vehicle_number?: string;
  phone?: string;
  profile_image?: File;
}

// Define an interface for the notification state
interface Notification {
  open: boolean;
  message: string;
  severity: AlertColor; // Use AlertColor type for severity
}

const AddNewDriver = () => {
  const [driverDetails, setDriverDetails] = useState<DriverDetails>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    gender: '',
    dob: '',
    vehicle_type: '',
    vehicle_number: '',
    phone: '',
    profile_image: null, // Image can be null initially
  });

  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<Notification>({
    open: false,
    message: '',
    severity: 'success', // Default to 'success'
  });
  const [showPassword, setShowPassword] = useState(false);

  // Validation logic
  const validateFields = () => {
    const newErrors: Errors = {};
    if (!driverDetails.first_name) newErrors.first_name = 'First name is required';
    if (!driverDetails.last_name) newErrors.last_name = 'Last name is required';
    if (!driverDetails.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(driverDetails.email))
      newErrors.email = 'Valid email is required';
    if (!driverDetails.password || driverDetails.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters long';
    if (!driverDetails.gender) newErrors.gender = 'Gender is required';
    if (!driverDetails.dob) newErrors.dob = 'Date of birth is required';
    if (!driverDetails.vehicle_type) newErrors.vehicle_type = 'Vehicle type is required';
    if (!driverDetails.vehicle_number) newErrors.vehicle_number = 'Vehicle number is required';
    if (!driverDetails.phone || !/^\d{10}$/.test(driverDetails.phone))
      newErrors.phone = 'Valid phone number is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDriverDetails({ ...driverDetails, [name]: value });
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setDriverDetails({ ...driverDetails, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDriverDetails((prev) => ({ ...prev, profile_image: file }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateFields()) return;
  
    setLoading(true);
  
    const formData = new FormData();
    formData.append('first_name', driverDetails.first_name);
    formData.append('last_name', driverDetails.last_name);
    formData.append('email', driverDetails.email);
    formData.append('password', driverDetails.password);
    formData.append('gender', driverDetails.gender);
    formData.append('dob', driverDetails.dob);
    formData.append('vehicle_type', driverDetails.vehicle_type);
    formData.append('vehicle_number', driverDetails.vehicle_number);
    formData.append('phone', driverDetails.phone);
    formData.append('profile_image', driverDetails.profile_image as any); // Ensure correct type
  
    try {
      const response = await axios.post('http://localhost:3000/api/v1/driverimage/', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('Driver added successfully:', response.data);
      setNotification({ open: true, message: 'Driver added successfully', severity: 'success' });
      setDriverDetails({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        gender: '',
        dob: '',
        vehicle_type: '',
        vehicle_number: '',
        phone: '',
        profile_image: null,
      });
    } catch (error) {
      console.error('Error adding driver:', error);
      setNotification({ open: true, message: 'Error adding driver', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };
  
  const handleCloseNotification = () => {
    setNotification({ open: false, message: '', severity: 'success' });
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Sidenavbar />
      <Box sx={{ maxWidth: '960px', width: '100%' }}>
        <h3> Add New Driver</h3>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Avatar Section */}
            <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Box sx={{ position: 'relative' }}>
                <Avatar
                  src={driverDetails.profile_image ? URL.createObjectURL(driverDetails.profile_image) : 'defaultAvatarImage'}  
                  sx={{
                    width: { xs: 130, md: 160 },
                    height: { xs: 130, md: 160 },
                    fontSize: { xs: 40, md: 60 },
                    backgroundColor: '#3f51b5',
                  }}
                />
                <IconButton
                sx={{
                  position: 'absolute',
                  top: '85%', // Center the button vertically
                  left: '85%', // Center the button horizontally
                  transform: 'translate(-50%, -50%)', // Offset the position to center the button
                  backgroundColor: '#37505C', // Optional: semi-transparent background
                  borderRadius: '50%',
                  padding: '6px', // Adjust padding if needed
                  color:'white'
                  
                }}
                component="label"
              >
                <EditIcon sx={{ fontSize: 24 }} /> {/* Adjust the size of the icon */}
                <input type="file" accept="image/*" onChange={handleImageChange} hidden />
              </IconButton>
              </Box>
            </Grid>

            {/* Input Fields Section */}
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                <TextField
                label="First Name"
                variant="standard"
                name="first_name"
                value={driverDetails.first_name}
                onChange={handleInputChange}
                error={!!errors.first_name}
                helperText={errors.first_name}
                fullWidth
                sx={{ flex: '1 1 40%' }}
              />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                label="Last Name"
                variant="standard"
                name="last_name"
                value={driverDetails.last_name}
                onChange={handleInputChange}
                error={!!errors.last_name}
                helperText={errors.last_name}
                fullWidth
                sx={{ flex: '1 1 40%' }}
              />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                label="Email"
                variant="standard"
                name="email"
                value={driverDetails.email}
                onChange={handleInputChange}
                error={!!errors.email}
                helperText={errors.email}
                fullWidth
                sx={{ flex: '1 1 40%' }}
              />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Password"
                    variant="standard"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={driverDetails.password}
                    onChange={handleInputChange}
                    error={!!errors.password}
                    helperText={errors.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="standard">
                    <InputLabel>Gender</InputLabel>
                    <Select
                      name="gender"
                      value={driverDetails.gender}
                      onChange={handleSelectChange}
                      error={!!errors.gender}
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                label="Date of Birth"
                type="date"
                variant="standard"
                name="dob"
                value={driverDetails.dob}
                onChange={handleInputChange}
                error={!!errors.dob}
                helperText={errors.dob}
                fullWidth
                sx={{ flex: '1 1 40%' }}
                InputLabelProps={{ shrink: true }}
              />
                </Grid>
                <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="standard" sx={{ flex: '1 1 40%' }} error={!!errors.vehicle_type}>
              <InputLabel>Vehicle Type</InputLabel>
              <Select
                name="vehicle_type"
                value={driverDetails.vehicle_type}
                onChange={handleSelectChange}
              >
                <MenuItem value="Car">Car</MenuItem>
                <MenuItem value="Bike">Bike</MenuItem>
                <MenuItem value="Van">Van</MenuItem>
                <MenuItem value="Truck">Truck</MenuItem>
              </Select>
            </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                label="Vehicle Number"
                variant="standard"
                name="vehicle_number"
                value={driverDetails.vehicle_number}
                onChange={handleInputChange}
                error={!!errors.vehicle_number}
                helperText={errors.vehicle_number}
                fullWidth
                sx={{ flex: '1 1 40%' }}             
              />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                 label="Phone Number"
                 variant="standard"
                 name="phone"
                 value={driverDetails.phone}
                 onChange={handleInputChange}
                 error={!!errors.phone}
                 helperText={errors.phone}
                 fullWidth
                 sx={{ width:'100%'  }}
               />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{ backgroundColor: "green",
                color: "white",
                "&:hover": {
                  backgroundColor: "#585d64",
                },
                 marginTop:5, 
                 marginLeft:50 
                }} // Adding hover color for better UX
            >
              {loading ? <CircularProgress size={24} /> : 'Add Driver'}
          </Button>
        </form>

        <Snackbar
          open={notification.open}
          autoHideDuration={6000}
          onClose={handleCloseNotification}
        >
          <Alert
            onClose={handleCloseNotification}
            severity={notification.severity}
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default AddNewDriver;

