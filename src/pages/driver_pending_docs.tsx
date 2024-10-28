import React from 'react'
import Sidenavbar from '../components/sidenvbar'
import { Box } from '@mui/material'
import Navbar from '../components/navbar'
import DriverPendingDocs from '../components/Dashboard/drivers_documents'

const DriversPendingDocs = () => {
  return (
   <>
      <div className="bg-color">
        <Navbar />
        <Box height={65}  />
        <Box sx={{ display: "flex" }}>
          <Sidenavbar />
          <Box component="main" sx={{ flexGrow: 1, p: 1,  overflow:"hidden"}}>
          <DriverPendingDocs />
          </Box>
        </Box>
      </div>
   </>
  
  )
}

export default DriversPendingDocs