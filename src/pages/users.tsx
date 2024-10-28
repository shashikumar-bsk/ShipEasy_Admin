import React from "react";
import Sidenavbar from "../components/sidenvbar";
import Navbar from "../components/navbar";
import { Box } from "@mui/material";
import UserTableMaster from "../components/Dashboard/users";

const Users = () => {
  return (
    <>
      <div className="bg-color">
        <Navbar />
        <Box height={65}  />
        <Box sx={{ display: "flex" }}>
          <Sidenavbar />
          <Box component="main" sx={{ flexGrow: 1, p: 1,  overflow:"hidden"}}>
            <UserTableMaster />
          </Box>
        </Box>
      </div>
    </>
  );
};

export default Users;
