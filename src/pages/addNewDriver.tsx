import React from 'react';
import Sidenavbar from '../components/sidenvbar';
import { Box } from '@mui/material';
import Navbar from '../components/navbar';
import AddNewDriver from '../components/Dashboard/AddNewDriver/AddNewDriver';

const AddNewDriverPage = () => {
  return (
    <>
      <div className="bg-color">
        { <Navbar/> }
        <Box height={65} />
        <Box sx={{ display: "flex" }}>
          <Sidenavbar />
          <Box component="main" sx={{ flexGrow: 1, p: 1, overflow: "hidden" }}>
            <AddNewDriver />
          </Box>
        </Box>
      </div>
    </>
  );
};

export default AddNewDriverPage;
