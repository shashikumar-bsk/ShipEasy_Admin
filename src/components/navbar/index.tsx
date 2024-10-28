import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useAppStore } from "../appStore";
import LogoutIcon from "@mui/icons-material/Logout";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { getAdminById } from "../../api-requests/adminRouter";
import { useEffect, useState } from "react";
import { adminToken } from "../../api-requests/config";
import { jwtDecode } from "jwt-decode";
import { getNewNotifications, markUserNotificationAsRead, fetchUserNotificationsAll } from '../../api-requests/Notifications'
import { response } from "express";
import { CircularProgress, Dialog, DialogContent, DialogTitle, Divider, List, ListItem, Tooltip } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close'
import CancelIcon from '@mui/icons-material/Cancel';
import useInfiniteScroll from './useInfiniteScroll'; // Import the hook

interface AdminDetails {
  admin_image: string;
  admin_name: string
}

interface DecodedToken {
  id: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // Add other properties as needed
}

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(3),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '20ch',
//     },
//   },
// }));

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const updateOpen = useAppStore((state) => state.updateOpen); // Correct usage of updateOpen
  const dopen = useAppStore((state) => state.dopen); // Correct usage of dopen
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [admin_image, setAdmin_Image] = useState<AdminDetails | null>(null);
  const [admin_name, setAdmin_Name] = useState<AdminDetails | null>(null);
  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);
  const [count, setCount] = useState(0);
  const [notificationAnchor, setNotificationAnchor] = useState<any>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page1, setPage1] = useState<number>(1);
  const [isViewAllDialogOpen, setIsViewAllDialogOpen] = useState(false);
  const [notificationsAll, setNotificationsAll] = useState<any[]>([]);
  const [loadingAll, setLoadingAll] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [hasMoreAll, setHasMoreAll] = useState<boolean>(true);
  const [page2, setPage2] = useState<number>(1);
  const [status, setStatus] = useState([])
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false); // State to control dialog visibility
  const [selectedNotification, setSelectedNotification] = useState<any>(null); // State for selected notification
  const [statusCount, setStatusCount] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [rowsPerPageAll, setRowsPerPageAll] = useState<number>(5);




  const navigate = useNavigate();



  useEffect(() => {
    const token = Cookies.get(adminToken);
    if (token) {
      const decoded: DecodedToken = jwtDecode(token);
      setDecodedToken(decoded);

      const fetchAdminDetails = async () => {
        try {
          if (decoded.id) {
            const response = await getAdminById(decoded.id);
            setAdmin_Image(response.admin_image);
            setAdmin_Name(response.admin_name);
          }
        } catch (error) {
          console.error("Error fetching admin details:", error);
        }
      };

      fetchAdminDetails();
    } else {
      console.error("No token found in cookies.");
    }
  }, []);

  const getnotifications = async (page1: any) => {
    if (loading) return;
    try {
      setLoading(true);
      const response = await getNewNotifications(page1, rowsPerPage);
      console.log("count", response);
      // setCount(response.meta.totalItems);
      if (response.data) {
        console.log("this notification length:", response.data.length)
        // setNotifications((prev) => [...prev, ...response.data]); // Append new notifications
        setNotifications((prev) => {
          const newNotifications = response.data.filter((newItem) => !prev.some((prevItem) => prevItem.id === newItem.id));
          return [...prev, ...newNotifications];
        });

        setStatusCount(response.meta.totalItems);
        setRowsPerPage(response?.meta?.itemsPerPage);
        setHasMore(response.data.length < rowsPerPage ? false : true);

      }
      else {
        setHasMore(false);
      }
    }
    catch (error) {
      console.error("Error fetching notifications:", error);
    }
    finally {
      setLoading(false);
    }
  }


  const getNotificationsAll = async (page2: number) => {
    if (loadingAll) return; // Prevent duplicate fetches
    try {
      setLoadingAll(true);
      const response = await getNewNotifications(page2, rowsPerPageAll); // Fetch notifications with pagination
      console.log('notifications list2:', response);
      if (response.data) {
        setNotificationsAll((prev) => {
          const allNotifications = response.data.filter(
            (newItem) => !prev.some((prevItem) => prevItem.id === newItem.id)
          );
          return [...prev, ...allNotifications];
        });
        // console.log('notifications list2:', response);
        setStatusCount(response.meta.totalItems);
        setRowsPerPageAll(response?.meta?.itemsPerPage);
        setHasMoreAll(response.data.length < rowsPerPageAll ? false : true); // If fewer notifications than rowsPerPage, stop further fetching
      } else {
        setHasMoreAll(false); // No more notifications to fetch
      }
    } catch (error: any) {
      console.log('Error fetching notifications:', error);
    } finally {
      setLoadingAll(false);
    }
  };


  useEffect(() => {
    getnotifications(page1);
  }, [page1])


  useEffect(() => {
    getnotifications(page1);
  }, [])

  useEffect(() => {
    getNotificationsAll(page2);
  }, [page2])



  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);

  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleLogout = () => {
    Cookies.remove("admintoken");
    navigate("/");
  };

  //---------------------------------------------------
  const handleNotificationOpen = (event) => {
    setNotificationAnchor(event.currentTarget);

  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };


  const handleViewAllClick = () => {
    setIsViewAllDialogOpen(true);
  };

  const handleViewAllDialogClose = () => {
    setIsViewAllDialogOpen(false);
  };

  // Infinite Scroll logic
  const loadMoreNotifications = () => {
    if (!loading && hasMore) {
      setPage1((prevPage) => prevPage + 1);
    }
  };

  const loadMoreNotificationsAll = () => {
    if (!loadingAll && hasMoreAll) {
      setPage2((prevPage) => prevPage + 1);
    }
  };

  // const handleDialogClose = () => {
  //   console.log("handledialog close successfully")
  //   getnotifications(page1);
  //   setIsDialogOpen(false);
  //   handleMenuClose;// Close the dialog
  // };


  const handleDialogClose = () => {
    getnotifications(page1); // Refetch the notifications list if necessary
    setIsDialogOpen(false);  // Close the dialog
  };
  // const handleNotificationClick = async(notification: any, id: any) => {
  //   console.log("update notification Not successfully")
  //   const response = await markUserNotificationAsRead(id);
  //   if (response) {
  //     console.log("update notification successfully")
  //     getnotifications(page1)
  //     setNotifications((prevNotifications) =>
  //       prevNotifications.map((notif) =>
  //         notif.id === id ? { ...notif, status: true } : notif
  //       )
  //     );
  //     setSelectedNotification(notification); // Set the selected notification
  //     setIsDialogOpen(true); // Open the dialog
  //   }

  // };
  const handleNotificationClick = async (notification: any, id: any, type: any) => {
    try {
      console.log("this is type:", type);
      console.log("this is id:", id);



      const response = await markUserNotificationAsRead(id, type); // Update the notification status
      if (response) {
        console.log("Notification updated successfully");
        console.log("this is type:", type);
        // Update the notifications state to remove the clicked notification from the list
        // setNotifications((prevNotifications) =>
        //   prevNotifications.filter((notif) => notif.id !== id)
        // );


        // After successful backend update, update the frontend state
        setNotifications((prev) => prev.filter((item) => {
          // Remove the notification from the state after it's marked as read
          return type === "driver" ? item.driver_id !== id : item.id !== id;
        }));
        setNotificationsAll((prevNotifications) =>
          prevNotifications.filter((notif) => {
            return type === "driver" ? notif.driver_id !== id : notif.id !== id
          }));
        // Set the notification as the selected one and open the dialog
        setSelectedNotification(notification);
        setIsDialogOpen(true);
      }
    } catch (error) {
      console.error("Error updating notification status:", error);
    }
  };

  const lastNotificationRef = useInfiniteScroll(loadMoreNotifications);
  const lastNotificationRefAll = useInfiniteScroll(loadMoreNotificationsAll);


  //-----------------------------------------------------



  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {<MenuItem onClick={handleMenuClose}>Profile </MenuItem>}
      <MenuItem onClick={handleLogout}>
        <LogoutIcon sx={{ marginRight: 1.5, color: "red" }} />
        Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem  onClick={handleNotificationOpen}>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={statusCount} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          {admin_image ? (
            <img
              src={admin_image}
              alt="Admin"
              style={{
                width: "32px", // Adjust width to match icon size
                height: "32px", // Adjust height to match icon size
                borderRadius: "50%", // Make the image circular
                objectFit: "cover", // Ensure the image covers the area while maintaining aspect ratio
              }}
            />
          ) : (
            <AccountCircle /> // Ensure icon has the same size
          )}
        </IconButton>

        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "#fff", color: "black" }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => updateOpen(!dopen)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            ShipEase
          </Typography>
          {/* <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search> */}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={handleNotificationOpen}
            >
              <Badge badgeContent={statusCount} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Menu
              anchorEl={notificationAnchor}
              open={Boolean(notificationAnchor)}
              onClose={handleNotificationClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              sx={{
                mt: 5,
                '& .MuiMenu-paper': {
                  backgroundColor: '#f5f5f5',
                  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                  borderRadius: '8px',
                  width: '300px',
                  maxHeight: '400px',
                  overflowY: 'auto',
                  '&::-webkit-scrollbar': {
                    width: '0px',
                    display: 'none',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'transparent',
                  },
                  '-ms-overflow-style': 'none',
                  'scrollbar-width': 'none',
                },
              }}
            >
              {notifications.length > 0 ? (
                <List>
                  {notifications.map((notification, index) => (
                    <MenuItem
                      key={notification.notification_id}
                      onClick={() => handleNotificationClick(notification, notification.type === "user" ? notification.id : notification.driver_id, notification.type)}
                      sx={{
                        color: notification.status ? 'green' : 'gray',
                        backgroundColor: notification.status ? '#ffffff' : '#f0f0f0',
                        '&:hover': {
                          backgroundColor: '#37505C',
                          color: 'white',
                        },
                      }}

                    >
                      <Box
                        className="notification-box"
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          width: '100%',
                          border: '1px solid #ddd',
                          padding: '10px',
                        }}

                      >
                        <Typography variant="body2" sx={{ fontWeight: notification.status ? 'bold' : 'normal' }}>
                          {notification.title}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 0.5, '&:hover': { color: 'white' }, }}>
                          name:{notification.type === "user" ? notification.username : notification.driver_name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, '&:hover': { color: 'white' }, }}>
                          Date:{new Date(notification.createdAt).toLocaleString()}
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
                  {/* View All Button */}


                  {/* Infinite Scroll - Placeholder */}
                  {loading && (
                    <Box display="flex" justifyContent="center" p={2}>
                      <CircularProgress size={24} />
                    </Box>
                  )}

                  <div ref={lastNotificationRef} />

                  {!hasMore && !loading && (
                    <MenuItem>
                      <Typography variant="body2" sx={{ color: 'gray' }}>No more notifications</Typography>
                    </MenuItem>
                  )}

                  <Divider />

                </List>
              ) : (
                <MenuItem onClick={handleNotificationClose}>
                  <Typography variant="body2" sx={{ color: 'gray' }}>No new notifications</Typography>
                </MenuItem>
                
              )
              }
<MenuItem onClick={handleViewAllClick}>
                <Typography variant="body2" sx={{ color: 'blue', textAlign: 'center', width: '100%' }}>
                  View All
                </Typography>
              </MenuItem>
              
              {/* View All Notifications Dialog */}
              <Dialog
                open={isViewAllDialogOpen}
                onClose={handleViewAllDialogClose}
                fullWidth
                maxWidth="sm"
                sx={{
                  '& .MuiDialog-paper': {
                    borderRadius: '10px',
                    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                
                <DialogTitle>
                  All Notifications
                  <Tooltip title="Close" placement="top">
                    <IconButton
                      aria-label="close"
                      onClick={handleViewAllDialogClose}
                      sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Tooltip>

                </DialogTitle>
                <DialogContent dividers>
                  <>
                    {notificationsAll.map((notification) => (
                      <React.Fragment key={notification.id}>
                        <ListItem
                          onClick={() => handleNotificationClick(notification, notification.type === "user" ? notification.id : notification.driver_id, notification.type)}
                          sx={{
                            backgroundColor: notification.notification_status ? '#f0f0f0' : '#ffffff',
                            '&:hover': {
                              backgroundColor: '#37505C',
                              color: 'white',
                            },
                            padding: '10px',
                            borderRadius: '8px',
                            marginBottom: '8px',
                          }}
                        >
                          <Box sx={{ width: '100%' }}>
                            <Typography variant="body1">{notification.title}</Typography>
                            <Typography variant="body2" color="textSecondary">
                              {notification.message}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 0.5, '&:hover': { color: 'white' }, }}>
                              name:{notification.type === "user" ? notification.username : notification.driver_name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                             Date:{new Date(notification.createdAt).toLocaleString()}
                            </Typography>
                          </Box>
                        </ListItem>
                        <Divider />
                      </React.Fragment>
                    ))}

                    {loadingAll && (
                      <Box display="flex" justifyContent="center" p={2}>
                        <CircularProgress size={24} />
                      </Box>
                    )}

                    <div ref={lastNotificationRefAll} />

                    {!hasMoreAll && !loadingAll && (
                      <MenuItem>
                        <Typography variant="body2" sx={{ color: 'gray' }}>No more notifications</Typography>
                      </MenuItem>
                    )}
                  </>
                </DialogContent>
              </Dialog>
              
            </Menu>

            <Dialog
              open={isDialogOpen}
              onClose={handleDialogClose}
              fullWidth
              maxWidth="sm"
              sx={{
                '& .MuiDialog-paper': {
                  borderRadius: '10px',
                  boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              <DialogTitle>
                Notification Details
                <Tooltip title="Close" >
                  <IconButton
                    aria-label="close"
                    onClick={handleDialogClose}
                    sx={{
                      position: 'absolute',
                      right: 8,
                      top: 8,
                      color: 'red'
                      // color: (theme) => theme.palette.grey[500],
                    }}
                  >
                    {/* <CloseIcon /> */}
                    <CancelIcon />
                  </IconButton>
                </Tooltip>

              </DialogTitle>
              <DialogContent dividers>
                {selectedNotification && (
                  <Box>
                    <Typography variant="body1" gutterBottom>
                      <strong>Title:</strong> {selectedNotification.title}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      <strong>Name:</strong> {selectedNotification.type==="driver" ? selectedNotification.driver_name :selectedNotification.username}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      <strong>Date:</strong> {new Date(selectedNotification.createdAt).toLocaleString()}
                    </Typography>

                  </Box>
                )}
              </DialogContent>
            </Dialog>

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >

              {admin_image ? (
                <img
                  src={admin_image}
                  alt="Admin"
                  style={{
                    width: "32px", // Adjust width to match icon size
                    height: "32px", // Adjust height to match icon size
                    borderRadius: "50%", // Make the image circular
                    objectFit: "cover", // Ensure the image covers the area while maintaining aspect ratio
                  }}
                />
              ) : (
                <AccountCircle /> // Ensure icon has the same size
              )}
            </IconButton>

          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
