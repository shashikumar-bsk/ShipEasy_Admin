import React from 'react'
import Navbar from '../components/navbar'
import { Box } from '@mui/material'
import Sidenavbar from '../components/sidenvbar'
import DocumentTable from '../components/Dashboard/drivers/Documentpage'

const Driverdocs = () => {
  return (
    <>
    <div className="bg-color">
        <Navbar />
        <Box height={65} />
        <Box sx={{ display: "flex" }}>
          <Sidenavbar />
          <Box component="main" sx={{ flexGrow: 1, p: 1}}>
          <DocumentTable />
          </Box>
        </Box>
      </div>
    </>
  )
}

export default Driverdocs
