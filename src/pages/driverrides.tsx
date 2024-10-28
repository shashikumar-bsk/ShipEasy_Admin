import React from 'react'
import Navbar from '../components/navbar'
import { Box } from '@mui/material'
import Sidenavbar from '../components/sidenvbar'
import DriverRides from '../components/Dashboard/driverrides/driverrides';

const  driverrides= () => {
  return (
    <>
    <div className="bg-color">
        <Navbar />
        <Box height={65} />
        <Box sx={{ display: "flex" }}>
          <Sidenavbar/>
          <Box component="main" sx={{ flexGrow: 1, p: 1}}>
          <DriverRides/>
          </Box>
        </Box>
      </div>
    </>
  )
}

export default driverrides;
