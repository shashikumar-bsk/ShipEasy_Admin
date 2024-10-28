import React from 'react';
import Navbar from '../components/navbar';
import { Box } from '@mui/material';
import Sidenavbar from '../components/sidenvbar';
import Vehicle from '../components/Dashboard/Vehicale/Vehicale'; // Import your specific component

const  VehiclePage: React.FC = () => {
  return (
    <>
      <div className="bg-color">
        <Navbar />
        <Box height={65} />
        <Box sx={{ display: 'flex' }}>
          <Sidenavbar />
          <Box component="main" sx={{ flexGrow: 1, p: 1,  overflow:"hidden" }}>
            <Vehicle />
          </Box>
        </Box>
      </div>
    </>
  );
};

export default VehiclePage;
