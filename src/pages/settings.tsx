import React from "react";
import Navbar from "../components/navbar";
import { Box } from "@mui/material";
import Sidenavbar from "../components/sidenvbar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Basictabs from "../components/basictabs";

const Settings = () => {
  return (
    <>
      <div className="bg-color">
        <Navbar />
        <Box height={65} />
        <Box sx={{ display: "flex" }}>
          <Sidenavbar />
          <Box component="main" sx={{ flexGrow: 1, p: 1}}>
            <Basictabs />
          </Box>
        </Box>
      </div>  
    </>
  );
};

export default Settings;
