import React, { useEffect, useState } from "react";
import Sidenavbar from "../components/sidenvbar";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import Navbar from "../components/navbar";
import Grid from "@mui/material/Grid";
import GroupIcon from "@mui/icons-material/Group";
import "./home.css";
import { countTotalusers, countUserData } from "../api-requests/userRouter";
import {
  countDriverData,
  countTotalDrivers,
} from "../api-requests/driverRouter";
import CountUp from "react-countup";
import Barcharts from "../components/Barcharts";
import PieChart from "../components/Barcharts/pieChart";

const Homepage = () => {
  const [activeDrivers, setActiveDrivers] = useState<number>(0);
  const [activeUsers, setActiveUsers] = useState<number>(0);
  const [totalDrivers, setTotalDrivers] = useState<number>(0);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [openSideBar, setOpenSideBar] = useState<boolean>(false);

  const fetchActiveData = async () => {
    try {
      const usersResponse = await countUserData();
      const driversResponse = await countDriverData();
      setActiveUsers(usersResponse.count ? usersResponse.count : 0);
      setActiveDrivers(driversResponse.count ? driversResponse.count : 0);
    } catch (error) {
      console.error("Error fetching active users/drivers:", error.message);
    }
  };

  const fetchTotalData = async () => {
    try {
      const usersResponse = await countTotalusers();
      const driversResponse = await countTotalDrivers();
      setTotalUsers(usersResponse.count ? usersResponse.count : 0);
      setTotalDrivers(driversResponse.count ? driversResponse.count : 0);
    } catch (error) {
      console.error("Error fetching total users/drivers:", error.message);
    }
  };
  useEffect(() => {
    fetchActiveData();
    fetchTotalData();
  }, []);
  return (
    <>
      <div className="bg-color">
        <Navbar />
        <Box height={70} />
        <Box sx={{ display: "flex" }}>
          <Sidenavbar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                    height: "146px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <CardContent className="gradient-light">
                    <div className="iconic-style">
                      <GroupIcon />
                    </div>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ color: "aliceblue" }}
                    >
                      <CountUp delay={0.3} end={totalDrivers} duration={0.9} />
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="body2"
                      component="div"
                      sx={{ color: "aliceblue" }}
                    >
                      Total Drivers
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                    height: "146px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <CardContent className="gradient">
                    <div className="iconic-style">
                      <GroupIcon />
                    </div>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ color: "aliceblue" }}
                    >
                      <CountUp delay={0.3} end={totalUsers} duration={0.9} />
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="body2"
                      component="div"
                      sx={{ color: "aliceblue" }}
                    >
                      Total Users
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                    height: "146px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <CardContent className="gradient-light">
                    <div className="iconic-style">
                      <GroupIcon />
                    </div>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ color: "aliceblue" }}
                    >
                      <CountUp delay={0.3} end={activeDrivers} duration={0.9} />
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="body2"
                      component="div"
                      sx={{ color: "aliceblue" }}
                    >
                      Active Drivers
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                    height: "146px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <CardContent className="gradient">
                    <div className="iconic-style">
                      <GroupIcon />
                    </div>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ color: "aliceblue" }}
                    >
                      <CountUp delay={0.3} end={activeUsers} duration={0.9} />
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="body2"
                      component="div"
                      sx={{ color: "aliceblue" }}
                    >
                      Active Users
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Box height={20} />

            <Grid container spacing={2}>
              <Grid item xs={12} md={8} lg={7.5}>
                <Card sx={{ height: "60vh" }}>
                  <CardContent>
                    <Barcharts />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4} lg={4.5}>
                <Card sx={{ height: "60vh" }}>
                  <CardContent>
                    <PieChart />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default Homepage;

// export default function Home() {
//   return (
//     <div>
//       home
//     </div>
//   )
// }
