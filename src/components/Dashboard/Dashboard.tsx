import React, { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Collapse,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import {
  ExpandLess,
  ExpandMore,
  HomeOutlined,
  Logout as LogoutIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import GroupSharpIcon from '@mui/icons-material/GroupSharp';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { countDriverData, countTotalDrivers } from '../../api-requests/driverRouter';
import { countUserData, countTotalusers } from '../../api-requests/userRouter';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import Eblue from '../../assets/Eblue.png';
import { useMediaQuery } from '@mui/material';
import './menu.css';

const Dashboard = () => {
  const [activeDrivers, setActiveDrivers] = useState<number>(0);
  const [activeUsers, setActiveUsers] = useState<number>(0);
  const [totalDrivers, setTotalDrivers] = useState<number>(0);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [openSideBar, setOpenSideBar] = useState<boolean>(false);
  const [openSubItems, setOpenSubItems] = useState<{ [key: number]: boolean }>({});
  const [openNestedSubItems, setOpenNestedSubItems] = useState<{ [key: string]: boolean }>({});

  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');
  const currentPath = window.location.pathname;

  const fetchActiveData = async () => {
    try {
      const usersResponse = await countUserData();
      const driversResponse = await countDriverData();
      setActiveUsers(usersResponse.count ? usersResponse.count : 0);
      setActiveDrivers(driversResponse.count ? driversResponse.count : 0);
    } catch (error) {
      console.error('Error fetching active users/drivers:', error.message);
    }
  };

  const fetchTotalData = async () => {
    try {
      const usersResponse = await countTotalusers();
      const driversResponse = await countTotalDrivers();
      setTotalUsers(usersResponse.count ? usersResponse.count : 0);
      setTotalDrivers(driversResponse.count ? driversResponse.count : 0);
    } catch (error) {
      console.error('Error fetching total users/drivers:', error.message);
    }
  };

  useEffect(() => {
    fetchActiveData();
    fetchTotalData();
  }, []);

  const handleLogout = () => {
    Cookies.remove('admintoken');
    navigate('/');
  };

  const tabsData = [
    {
      id: 1,
      text: 'Dashboard',
      icon: <HomeOutlined />,
      path: '/admin/dashboard',
    },
    {
      id: 2,
      text: 'Restaurants',
      icon: <RamenDiningIcon />,
      path: '/admin/Rurantmanagement',
    },
    // {
    //   id: 3,
    //   text: 'Instamart',
    //   icon: <RestaurantMenuIcon />,
    //   subItems: [
    //     { id: 1, text: 'Orders', path: '/ridedetails/history' },
    //     { id: 2, text: 'Payments' },
    //   ],
    // },
    {
      id: 3,
      text: 'Users',
      icon: <PeopleAltIcon />,
      subItems: [
        { id: 1, text: 'All Users List', path: '/admin/users' },
      ],
    },
    {
      id: 4,
      text: 'Drivers',
      icon: <TwoWheelerIcon />,
      subItems: [
        { id: 2, text: 'Total Drivers List', path: '/admin/driver' },
      ],
    },
    {
      id: 5,
      text: 'Services',
      icon: <RestaurantMenuIcon />,
      subItems: [
        {
          id: 1,
          text: 'Food',
          subItems: [
            { id: 1, text: 'Orders',path:'/orders ' },
            { id: 2, text: 'Payments' },
          ],
        },
        {
          id: 2,
          text: 'Instamart',
          subItems: [
            { id: 1, text: 'Orders', path: '/ridedetails/history' },
            { id: 2, text: 'Payments' },
          ],
        },
        {
          id: 3,
          text: 'Pickup & Drop',
          subItems: [
            { id: 1, text: 'Orders', path: '/ridedetails' },
            { id: 2, text: 'Payments' },
          ],
        },
      ],
    },
    {
      id: 6,
      text: 'Settings',
      icon: <SettingsIcon />,
      subItems: [
        { id: 1, text: 'Profile', path: '/admin/adminprofile' },
      ],
    },
    {
      id: 7,
      text: 'Logout',
      icon: <LogoutIcon />,
      path: null,
      onClick: handleLogout,
    },
  ];

  const handleSubItemClick = (id: number) => {
    setOpenSubItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleNestedSubItemClick = (parentId: number, id: number) => {
    setOpenNestedSubItems((prev) => ({ ...prev, [`${parentId}-${id}`]: !prev[`${parentId}-${id}`] }));
  };

  return (
    <div className="headerContainer">
      <Box sx={{ display: 'flex', backgroundColor: 'white', width: '100%' }}>
        {isMobile && (
          <IconButton onClick={() => setOpenSideBar(!openSideBar)} sx={{ position: 'absolute', top: 10, left: 10 }}>
            <MenuIcon />
          </IconButton>
        )}
        <Drawer
          open={isMobile ? openSideBar : true}
          onClose={() => setOpenSideBar(false)}
          variant={isMobile ? 'temporary' : 'persistent'}
          anchor="left"
          className="left-main-navigation"
          sx={{
            width: isMobile ? '240px' : '240px',
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: '240px',
              boxSizing: 'border-box',
              backgroundColor: '#686d76',
              color: '#fff',
            },
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', color: '#fff', backgroundColor: '#686d76', minHeight: '100vh' }}>
            <Box sx={{ width: '100%', color: '#fff', backgroundColor: '#686d76', height: '100%', border: 'none' }}>
              <Box m="1rem">
                <Box display="flex">
                  {/* Logo */}
                  <Box
                    component="img"
                    src={Eblue}
                    alt="Eblue Logo"
                    sx={{ width: 50, height: 50 }}
                  />
                  {/* Text */}
                  <Typography sx={{ fontWeight: 'bold', fontSize: '30px', marginRight: 20 }}>
                    ShipEase
                  </Typography>
                </Box>
              </Box>
              <List>
                {tabsData.map((item) => (
                  <div key={item.id}>
                    <ListItem
                      sx={{ height: '100%' }}
                      onClick={() => {
                        if (item.subItems) handleSubItemClick(item.id);
                        else if (item.onClick) item.onClick();
                      }}
                      disablePadding
                    >
                      <ListItemButton
                        sx={{
                          backgroundColor: item.subItems
                            ? '#686D76'
                            : item.path === currentPath
                            ? 'white'
                            : '#686D76',
                          color: item.subItems
                            ? 'white'
                            : item.path === currentPath
                            ? 'black'
                            : 'white',
                        }}
                        href={item.path || '#'}
                      >
                        <ListItemIcon
                          sx={{
                            color: item.subItems
                              ? 'white'
                              : item.path === currentPath
                              ? 'black'
                              : 'white',
                          }}
                        >
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                        {item.subItems ? (openSubItems[item.id] ? <ExpandLess /> : <ExpandMore />) : null}
                      </ListItemButton>
                    </ListItem>
                    {item.subItems && (
                      <Collapse in={openSubItems[item.id]} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          {item.subItems.map((subItem) => (
                            <div key={subItem.id}>
                              <ListItem
                                sx={{ pl: 4 }}
                                onClick={() => {
                                  if (subItem.subItems) handleNestedSubItemClick(item.id, subItem.id);
                                }}
                                disablePadding
                              >
                                <ListItemButton
                                  sx={{
                                    backgroundColor: subItem.subItems
                                      ? '#686D76'
                                      : subItem.path === currentPath
                                      ? 'white'
                                      : '#686D76',
                                    color: subItem.subItems
                                      ? 'white'
                                      : subItem.path === currentPath
                                      ? 'black'
                                      : 'white',
                                  }}
                                  href={subItem.path || '#'}
                                >
                                  <ListItemText primary={subItem.text} />
                                  {subItem.subItems ? (openNestedSubItems[`${item.id}-${subItem.id}`] ? <ExpandLess /> : <ExpandMore />) : null}
                                </ListItemButton>
                              </ListItem>
                              {subItem.subItems && (
                                <Collapse in={openNestedSubItems[`${item.id}-${subItem.id}`]} timeout="auto" unmountOnExit>
                                  <List component="div" disablePadding>
                                    {subItem.subItems.map((nestedSubItem) => (
                                      <ListItem key={nestedSubItem.id} sx={{ pl: 8 }}>
                                        <ListItemButton
                                          sx={{
                                            backgroundColor: nestedSubItem.path === currentPath ? 'white' : '#686D76',
                                            color: nestedSubItem.path === currentPath ? 'black' : 'white',
                                          }}
                                          href={nestedSubItem.path || '#'}
                                        >
                                          <ListItemText primary={nestedSubItem.text} />
                                        </ListItemButton>
                                      </ListItem>
                                    ))}
                                  </List>
                                </Collapse>
                              )}
                            </div>
                          ))}
                        </List>
                      </Collapse>
                    )}
                  </div>
                ))}
              </List>
            </Box>
          </Box>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: '100%',
          }}
        >
          {currentPath === '/admin/dashboard' && (
            <div className='cards-container'>
              <Card className='card-item-container'>
                <CardContent sx={{ color: 'black' }}>
                  <Typography sx={{ fontSize: '20px', color: 'black' }} gutterBottom>
                    <GroupSharpIcon /> <b>Active Drivers</b>
                  </Typography>
                  <Typography variant="h5" component="div" sx={{ color: 'black' }}>
                    {activeDrivers}
                  </Typography>
                </CardContent>
              </Card>
              <Card className='card-item-container'>
                <CardContent sx={{ color: 'black' }}>
                  <Typography sx={{ fontSize: '20px', color: 'black' }} gutterBottom>
                    <GroupSharpIcon /> Active Users
                  </Typography>
                  <Typography variant="h5" component="div" sx={{ color: 'black' }}>
                    {activeUsers}
                  </Typography>
                </CardContent>
              </Card>
              <Card className='card-item-container'>
                <CardContent sx={{ color: 'black' }}>
                  <Typography sx={{ fontSize: '20px', color: 'black' }} gutterBottom>
                    <GroupSharpIcon /> <b>Total Drivers</b>
                  </Typography>
                  <Typography variant="h5" component="div" sx={{ color: 'black' }}>
                    {totalDrivers}
                  </Typography>
                </CardContent>
              </Card>
              <Card className='card-item-container'>
                <CardContent sx={{ color: 'black' }}>
                  <Typography sx={{ fontSize: '20px', color: 'black' }} gutterBottom>
                    <GroupSharpIcon /> <b>Total Users</b>
                  </Typography>
                  <Typography variant="h5" component="div" sx={{ color: 'black' }}>
                    {totalUsers}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          )}
        </Box>
      </Box>
    </div>
  );
};



export default Dashboard;
