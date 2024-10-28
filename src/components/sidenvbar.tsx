import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MailIcon from '@mui/icons-material/Mail';
import { useLocation, useNavigate } from 'react-router-dom';
import Home from '../pages/home';
import { useAppStore } from './appStore';
import HouseSharpIcon from '@mui/icons-material/HouseSharp';
import GroupIcon from '@mui/icons-material/Group';
import HailIcon from '@mui/icons-material/Hail';
import SettingsIcon from '@mui/icons-material/Settings';

import { PiSteeringWheelFill, PiPlusCircleFill } from "react-icons/pi";

import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'; // for Rides
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import Navbar from './navbar';

const drawerWidth = 210;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: 'calc(${theme.spacing(7)}px + 1px)',
  [theme.breakpoints.up('sm')]: {
    width:' calc(${theme.spacing(8)}px + 1px)',
  },
});


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

export default function Sidenavbar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const open = useAppStore((state) => state.dopen);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  // State to manage the visibility of the Add New Driver component
  const [addNewDriverOpen, setAddNewDriverOpen] = React.useState(false);

  // Function to handle the dropdown icon click
  const handleDropdownToggle = () => {
    setAddNewDriverOpen(!addNewDriverOpen); // Toggle the visibility of Add New Driver
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar />
      <Drawer variant="permanent" open={open} sx={{
        color: "#ffff",
        "& .MuiDrawer-paper": {
          backgroundColor: "#fff",
          color: "#35404A",
        },
      }}>
        <DrawerHeader>
          <IconButton >
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate('/home') }}>
            <ListItemButton
              sx={[
                {
                  minHeight: 48,
                  px: 2.5,
                  backgroundColor: isActive('/home') ? '#37505C' : "",
                  color: isActive("/home") ? "#fff" : "",
                },
                open
                  ? {
                    justifyContent: 'initial',
                  }
                  : {
                    justifyContent: 'center',
                  },
              ]}
            >
              <ListItemIcon
                sx={[
                  {
                    minWidth: 0,
                    justifyContent: 'center',
                    color: isActive("/home") ? "#fff" : "",
                  },
                  open
                    ? {
                      mr: 3,
                    }
                    : {
                      mr: 'auto',
                    },
                ]}
              >
                <HouseSharpIcon />
              </ListItemIcon>
              <ListItemText
                primary='Home'
                sx={[open ? { opacity: 1 } : { opacity: 0 }]}
              />
            </ListItemButton>
          </ListItem>

          <ListItem  disablePadding sx={{ display: 'block' }} onClick={()=>{navigate('/users')}}>
              <ListItemButton
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                    backgroundColor: isActive('/users')?'#37505C':"",
                    color: isActive("/users") ? "#fff" : "",
                    "&:hover": {
                      backgroundColor: "", 
                      color: "black",
                    },
                  },
                  open
                    ? {
                        justifyContent: 'initial',
                      }
                    : {
                        justifyContent: 'center',
                      },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: 'center',
                      color: isActive("/users") ? "#fff" : "",
                      "&:hover": {
                      backgroundColor: "", 
                      color: "black",
                    },
                    },
                    open
                      ? {
                          mr: 3,
                        }
                      : {
                          mr: 'auto',
                        },
                  ]}
                >
                   <HailIcon />
               
                </ListItemIcon>
                <ListItemText
                  primary='Users'
                  sx={[
                    open
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                        },
                  ]}
                />
              </ListItemButton>
            </ListItem>
            

<ListItem disablePadding sx={{ display: 'block' }}>
  <ListItemButton onClick={() => navigate('/drivers')} sx={[
    {
      minHeight: 48,
      px: 2.5,
      backgroundColor: isActive('/drivers') ? '#37505C' : "",
      color: isActive("/drivers") ? "#fff" : "",
    },
    open ? { justifyContent: 'initial' } : { justifyContent: 'center' },
  ]}>
    <ListItemIcon sx={[
      {
        minWidth: 0,
        justifyContent: 'center',
        color: isActive("/drivers") ? "#fff" : "",
      },
      open ? { mr: 3 } : { mr: 'auto' },
    ]}>
      <PiSteeringWheelFill size={23} />
    </ListItemIcon>
    <ListItemText primary='Drivers' sx={[open ? { opacity: 1 } : { opacity: 0 }]} />
    <IconButton onClick={handleDropdownToggle}>
      {addNewDriverOpen ? <ExpandLess /> : <ExpandMore />}
    </IconButton>
  </ListItemButton>
</ListItem>


<Collapse in={addNewDriverOpen} timeout="auto" unmountOnExit>
  <ListItem key="AddNewDriver" disablePadding sx={{ display: 'block' }} onClick={() => navigate('/AddNewDriver')}>
    <ListItemButton
      sx={[
        {
          minHeight: 48,
          px: 2.5,
          backgroundColor: isActive('/AddNewDriver') ? '#37505C' : "",
          color: isActive("/AddNewDriver") ? "#fff" : "",
          "&:hover": {
            backgroundColor: "",
            color: "black",
          }
        },
        open ? { justifyContent: 'initial' } : { justifyContent: 'center' },
      ]}
    >
      <ListItemIcon
        sx={[
          {
            minWidth: 0,
            justifyContent: 'center',
            color: isActive("/AddNewDriver") ? "#fff" : "",
          },
          open ? { mr: 3 } : { mr: 'auto' },
        ]}
      >
        <PiPlusCircleFill size={23} />
      </ListItemIcon>
      <ListItemText primary='Add New Driver' sx={[open ? { opacity: 1 } : { opacity: 0 }]} />
    </ListItemButton>
  </ListItem>

  
  <ListItem key="PendingDocs" disablePadding sx={{ display: 'block' }} onClick={() => navigate('/DriverPendingDocs')}>
    <ListItemButton
      sx={[
        {
          minHeight: 48,
          px: 2.5,
          backgroundColor: isActive('/DriverPendingDocs') ? '#37505C' : '',
          color: isActive('/DriverPendingDocs') ? '#fff' : '',
          "&:hover": { backgroundColor: '', color: 'black' },
        },
        open ? { justifyContent: 'initial' } : { justifyContent: 'center' },
      ]}
    >
      <ListItemIcon
        sx={[
          { minWidth: 0, justifyContent: 'center', color: isActive('/DriverPendingDocs') ? '#fff' : '' },
          open ? { mr: 3 } : { mr: 'auto' },
        ]}
      >
        <MailIcon />
      </ListItemIcon>
      <ListItemText primary="Pending Documents" sx={[open ? { opacity: 1 } : { opacity: 0 }]} />
    </ListItemButton>
  </ListItem>

</Collapse>

          
           
          <ListItem disablePadding sx={{ display: 'block' }} onClick={()=>{navigate('/driverrides')}}>
              <ListItemButton
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                    backgroundColor: isActive('/driverrides')?'#37505C':"",
                    color: isActive("/driverrides") ? "#fff" : "",
                    "&:hover": {
                      backgroundColor: "", 
                      color: "black",
                    },
                    
                  },
                  open
                    ? {
                        justifyContent: 'initial',
                      }
                    : {
                        justifyContent: 'center',
                      },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: 'center',
                      color: isActive("/driverrides") ? "#fff" : "",
                      "&:hover": {
                        backgroundColor: "", 
                        color: "black",
                      },
                    },
                    open
                      ? {
                          mr: 3,
                        }
                      : {
                          mr: 'auto',
                        },
                  ]}
                >
                  <DirectionsCarIcon />
                 
                </ListItemIcon>
                <ListItemText
                  primary='Rides'
                  sx={[
                    open
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                        },
                  ]}
                />
              </ListItemButton>
            </ListItem>

         
            <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('/Vehicle')}>
            <ListItemButton
    sx={[
      {
        minHeight: 48,
        px: 2.5,
        backgroundColor: isActive('/Vehicle') ? '#37505C' : '',
        color: isActive('/Vehicle') ? '#fff' : '',
        '&:hover': {
          backgroundColor: '',
          color: 'black',
        },
      },
      open ? { justifyContent: 'initial' } : { justifyContent: 'center' },
    ]}
  >
    <ListItemIcon
      sx={[
        {
          minWidth: 0,
          justifyContent: 'center',
          color: isActive('/Vehicle') ? '#fff' : '',
          '&:hover': {
            backgroundColor: '',
            color: 'black',
          },
        },
        open ? { mr: 3 } : { mr: 'auto' },
      ]}
    >
      <TwoWheelerIcon />
    </ListItemIcon>
    <ListItemText
      primary="Vehicles"
      sx={[open ? { opacity: 1 } : { opacity: 0 }]}
    />
  </ListItemButton>
</ListItem>
            <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate('/heatmap') }}>
              <ListItemButton
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                    backgroundColor: isActive('/heatmap') ? '#37505C' : '',
                    color: isActive("/heatmap") ? "#fff" : "",
                    "&:hover": {
                      backgroundColor: "",
                      color: "black",
                    },
                  },
                  open
                    ? {
                        justifyContent: 'initial',
                      }
                    : {
                        justifyContent: 'center',
                      },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: 'center',
                      color: isActive("/heatmap") ? "#fff" : "",
                      "&:hover": {
                        backgroundColor: "",
                        color: "black",
                      },
                    },
                    open
                      ? {
                          mr: 3,
                        }
                      : {
                          mr: 'auto',
                        },
                  ]}
                >
                  
                  <MailIcon /> 
                </ListItemIcon>
                <ListItemText
                  primary='Heatmap'
                  sx={[
                    open
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                        },
                  ]}
                />
              </ListItemButton>
            </ListItem>
            <ListItem  disablePadding sx={{ display: 'block' }} onClick={()=>{navigate('/settings')}}>
              <ListItemButton
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                    backgroundColor: isActive('/settings')?'#37505C':"",
                    color: isActive("/settings") ? "#fff" : "",
                  },
                  open
                    ? {
                        justifyContent: 'initial',
                      }
                    : {
                        justifyContent: 'center',
                      },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: 'center',
                      color: isActive("/settings") ? "#fff" : "",
                    },
                    open
                      ? {
                          mr: 3,
                        }
                      : {
                          mr: 'auto',
                        },
                  ]}
                >
                   <SettingsIcon />
             
                </ListItemIcon>
                <ListItemText
                  primary='Settings'
                  sx={[
                    open
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                        },
                  ]}
                />
              </ListItemButton>
            </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}