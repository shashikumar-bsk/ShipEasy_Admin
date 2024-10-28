import {
  Box,
  Button,
  FormControl,
  TextField,
  IconButton,
  InputAdornment,
  CircularProgress,
  Avatar,
} from "@mui/material";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; // For decoding JWT
import { getAdminById, updateAdmin } from "../../../api-requests/adminRouter";
import Dashboard from "../Dashboard";
import EditIcon from "@mui/icons-material/Edit";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import config, { adminToken } from "../../../api-requests/config";
import Sidenavbar from "../../sidenvbar";

// Default image URL (you can replace this with any default avatar image URL you prefer)
const defaultAvatarImage =
  "https://cdn-icons-png.flaticon.com/512/219/219983.png";

interface AdminDetails {
  admin_name: string;
  email: string;
  mobile_number: string;
  admin_image: string;
}

interface DecodedToken {
  id: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // Add other properties as needed
}

interface Errors {
  admin_name?: string;
  email?: string;
  password?: string;
  phone?: string;
}

const AdminDetails: React.FC = () => {
  const [adminDetails, setAdminDetails] = useState<AdminDetails | null>(null);
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState<boolean>(false); // Add loading state

  // useEffect(() => {
  //   const token = Cookies.get(adminToken);
  //   if (token) {
  //     const decoded: DecodedToken = jwtDecode(token);
  //     setDecodedToken(decoded);

  //     const fetchAdminDetails = async () => {
  //       try {
  //         if (decoded.id) {
  //           const response = await getAdminById(decoded.id);
  //           setAdminDetails(response);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching admin details:", error);
  //       }
  //     };

  //     fetchAdminDetails();
  //   } else {
  //     console.error("No token found in cookies.");
  //   }
  // }, []);

  useEffect(() => {
    const token = Cookies.get(adminToken);
    if (token) {
      const decoded: DecodedToken = jwtDecode(token);
      setDecodedToken(decoded);
      fetchAdminDetails(decoded.id); // Call the function to fetch admin details
    } else {
      console.error("No token found in cookies.");
    }
  }, []);

  const fetchAdminDetails = async (adminId: number) => {
    try {
      const response = await getAdminById(adminId);
      setAdminDetails(response);
    } catch (error) {
      console.error("Error fetching admin details:", error);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminDetails((prevDetails) => ({
      ...prevDetails!,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setAdminDetails((prevDetails) => ({
          ...prevDetails!,
          admin_image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Validation logic
  const validateFields = () => {
    const newErrors: Errors = {};
    if (!adminDetails?.admin_name) newErrors.admin_name = "Admin name is required";

    if (
      !adminDetails?.email ||
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(adminDetails.email)
    )
      newErrors.email = "Valid email is required";

    if (password && password.length < 6)
      newErrors.password = "Password must be at least 6 characters long";

    if (!adminDetails?.mobile_number || !/^\d{10}$/.test(adminDetails.mobile_number)) {
  newErrors.phone = "Mobile number must be exactly 10 digits long and contain only numbers";
}


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  // // // const handleSubmit = async () => {
  // // //   try {
  // // //     if (adminDetails) {
  // // //       const data = {
  // // //         admin_name: adminDetails.admin_name,
  // // //         email: adminDetails.email,
  // // //         mobile_number: adminDetails.mobile_number,
  // // //         admin_image: adminDetails.admin_image,
  // // //         password: password || undefined,
  // // //       };
  
  // // //       if (decodedToken?.id) {
  // // //         const response = await updateAdmin(decodedToken.id, data);
  
  // // //         if (response.message === "Admin updated successfully") {
  // // //           alert("Admin details updated successfully");
  
  // // //           // Force re-render to update the image on the page
  // // //           setAdminDetails((prevDetails) => ({
  // // //             ...prevDetails!,
  // // //             admin_image: data.admin_image, // Explicitly set the updated image
  // // //           }));
  // // //         } else {
  // // //           console.error("Failed to update admin:", response);
  // // //         }
  // // //       }
  // // //     }
  // // //   } catch (error) {
  // // //     console.error("Error updating admin details:", error);
  // // //   }
  // // // };

  // // const handleSubmit = async () => {
  // //   try {
  // //     if (adminDetails && decodedToken?.id) {
  // //       const formData = new FormData();
  // //       formData.append("admin_name", adminDetails.admin_name);
  // //       formData.append("email", adminDetails.email);
  // //       formData.append("mobile_number", adminDetails.mobile_number);
  // //       formData.append("password", password || ""); // Add password if provided
  // //       if (selectedFile) {
  // //         formData.append("admin_image", selectedFile); // Append image file
  // //       }
  
  // //       // Send the PATCH request to update admin details and image
  // //       const response = await fetch(
  // //         `${config}/api/v1/admin/${decodedToken.id}/admin_image`,
  // //         {
  // //           method: "PATCH",
  // //           headers: {
  // //             Authorization: `Bearer ${Cookies.get(adminToken)}`, // Add token for authentication
  // //           },
  // //           body: formData, // Use formData for file and data
  // //         }
  // //       );
  
  // //       const result = await response.json();
  
  // //       if (response.ok) {
  // //         alert("Admin details and image updated successfully");
  // //         // Optionally, update state to reflect new data
  // //         setAdminDetails((prevDetails) => ({
  // //           ...prevDetails!,
  // //           admin_image: URL.createObjectURL(selectedFile!), // Update the displayed image
  // //         }));
  // //       } else {
  // //         console.error("Failed to update admin:", result);
  // //       }
  // //     }
  // //   } catch (error) {
  // //     console.error("Error updating admin details:", error);
  // //   }
  // // };

  // const handleSubmit = async () => {
  //   try {
  //     let isAdminUpdated = false;
  //     let isImageUpdated = false;
  
  //     if (adminDetails && decodedToken?.id) {
  //       // First, update admin details
  //       const adminUpdateResponse = await updateAdmin(decodedToken.id, {
  //         admin_name: adminDetails.admin_name,
  //         email: adminDetails.email,
  //         mobile_number: adminDetails.mobile_number,
  //         password: password || "", // Include password only if provided
  //       });
  
  //       // Check if admin details were updated successfully
  //       if (adminUpdateResponse) {
  //         isAdminUpdated = true;
  //         // Immediately update local state to reflect the updated details
  //         setAdminDetails((prevDetails) => ({
  //           ...prevDetails!,
  //           admin_name: adminUpdateResponse.admin_name,
  //           email: adminUpdateResponse.email,
  //           mobile_number: adminUpdateResponse.mobile_number,
  //         }));
  //       } else {
  //         console.error("Failed to update admin details");
  //         return;
  //       }
  
  //       // Now, handle image update if there is a new image
  //       if (selectedFile) {
  //         const formData = new FormData();
  //         formData.append("admin_image", selectedFile); // Append image file
  
  //         // Send the PATCH request to update the admin image
  //         const imageResponse = await fetch(
  //           `${config}/api/v1/admin/${decodedToken.id}/admin_image`,
  //           {
  //             method: "PATCH",
  //             headers: {
  //               Authorization: `Bearer ${Cookies.get(adminToken)}`, // Add token for authentication
  //             },
  //             body: formData, // Use formData for file
  //           }
  //         );
  
  //         if (imageResponse.ok) {
  //           isImageUpdated = true;
  //           // Update state to reflect new image immediately
  //           setAdminDetails((prevDetails) => ({
  //             ...prevDetails!,
  //             admin_image: URL.createObjectURL(selectedFile!), // Update the displayed image
  //           }));
  //         } else {
  //           const result = await imageResponse.json();
  //           console.error("Failed to update admin image:", result);
  //         }
  //       }
  
  //       // Trigger alert only once if both the details and image were successfully updated
  //       if (isAdminUpdated || isImageUpdated) {
  //         alert("Admin details updated successfully");
  
  //         // Optionally re-fetch the admin details after submission to ensure accuracy
  //         fetchAdminDetails(decodedToken.id);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error updating admin details:", error);
  //   }
  // };
  
  // const handleSubmit = async () => {

  //   if (!validateFields()) {
  //     return; // Return early if validation fails
  //   }

  //   setLoading(true);
  //   try {
  //     let isAdminUpdated = false;
  //     let isImageUpdated = false;
  
  //     if (adminDetails && decodedToken?.id) {
  //       // Create a copy of the updated admin details
  //       const updatedAdminDetails = {
  //         ...adminDetails,
  //         password: password || "", // Include password only if provided
  //       };
  
  //       // First, update admin details
  //       const adminUpdateResponse = await updateAdmin(decodedToken.id, updatedAdminDetails);
  
  //       // Check if admin details were updated successfully
  //       if (adminUpdateResponse) {
  //         isAdminUpdated = true;
  //         // Immediately update the state to reflect the new details
  //         setAdminDetails(updatedAdminDetails);
  //       } else {
  //         console.error("Failed to update admin details");
  //         return;
  //       }
  
  //       // Now, handle image update if there is a new image
  //       if (selectedFile) {
  //         const formData = new FormData();
  //         formData.append("admin_image", selectedFile); // Append image file
  
  //         // Send the PATCH request to update the admin image
  //         const imageResponse = await fetch(
  //           `${config}/api/v1/admin/${decodedToken.id}/admin_image`,
  //           {
  //             method: "PATCH",
  //             headers: {
  //               Authorization: `Bearer ${Cookies.get(adminToken)}`, // Add token for authentication
  //             },
  //             body: formData, // Use formData for file
  //           }
  //         );
  
  //         if (imageResponse.ok) {
  //           isImageUpdated = true;
  //           // Immediately update the state to reflect the new image
  //           setAdminDetails((prevDetails) => ({
  //             ...prevDetails!,
  //             admin_image: URL.createObjectURL(selectedFile!), // Update the displayed image
  //           }));
  //         } else {
  //           const result = await imageResponse.json();
  //           console.error("Failed to update admin image:", result);
  //         }
  //       }
  
  //       // Trigger alert only once if both the details and image were successfully updated
  //       if (isAdminUpdated || isImageUpdated) {
  //         alert("Admin details updated successfully");
  //         // Fetch updated admin details again if necessary
  //         fetchAdminDetails(decodedToken.id); // Optional, in case you want to ensure DB consistency
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error updating admin details:", error);
  //   }
  //   finally {
  //     setLoading(false); // Reset loading state after the request completes
  //   }
  // };

  const handleSubmit = async () => {
    if (!validateFields()) {
      return; // Return early if validation fails
    }
  
    setLoading(true);
    try {
      let isAdminUpdated = false;
      let isImageUpdated = false;
  
      if (adminDetails && decodedToken?.id) {
        // Create a copy of the updated admin details
        const updatedAdminDetails = {
          ...adminDetails,
          password: password || "", // Include password only if provided
        };
  
        // First, update admin details
        const adminUpdateResponse = await updateAdmin(decodedToken.id, updatedAdminDetails);
  
        // Check if admin details were updated successfully
        if (adminUpdateResponse) {
          isAdminUpdated = true;
          // Immediately update the state to reflect the new details
          setAdminDetails(updatedAdminDetails);
        } else {
          console.error("Failed to update admin details");
          return;
        }
  
        // Now, handle image update if there is a new image
        if (selectedFile) {
          const formData = new FormData();
          formData.append("admin_image", selectedFile); // Append image file
  
          // Send the PATCH request to update the admin image
          const imageResponse = await fetch(
            `${config}/api/v1/admin/${decodedToken.id}/admin_image`,
            {
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${Cookies.get(adminToken)}`, // Add token for authentication
              },
              body: formData, // Use formData for file
            }
          );
  
          if (imageResponse.ok) {
            isImageUpdated = true;
            // Immediately update the state to reflect the new image
            setAdminDetails((prevDetails) => ({
              ...prevDetails!,
              admin_image: URL.createObjectURL(selectedFile!), // Update the displayed image
            }));
          } else {
            const result = await imageResponse.json();
            console.error("Failed to update admin image:", result);
          }
        }
  
        // Trigger alert only once if both the details and image were successfully updated
        if (isAdminUpdated || isImageUpdated) {
          alert("Admin details updated successfully");
          // You can choose to refetch data or just rely on local state
          // fetchAdminDetails(decodedToken.id); // Uncomment if you want to ensure DB consistency
        }
      }
    } catch (error) {
      console.error("Error updating admin details:", error);
    } finally {
      setLoading(false); // Reset loading state after the request completes
    }
  };
  
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (!adminDetails) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <Box>
      <Sidenavbar />
      </Box>
      <Box
        sx={{
        
          width: { xs: "100%", md: "75%" },
          marginTop: "0px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            mb: 2,
          }}
        >
          {/* <h1
            style={{
              fontSize: "1.5rem", // Adjust font size for mobile
              margin: 0,
            }}
          >
            Admin Profile Details
          </h1> */}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box
            sx={{
              position: "relative",
              m: 1,
              textAlign: { xs: "center", md: "left" },
              width: { xs: "100%", md: "auto" },
            }}
          >
            <Avatar
              src={adminDetails.admin_image || defaultAvatarImage}
              sx={{
                width: { xs: 100, md: 150 },
                height: { xs: 100, md: 150 },
                fontSize: { xs: 40, md: 50 },
                backgroundColor: "#3f51b5",
                margin: "auto",
                
              }}
            />
            <IconButton
              sx={{
                position: "absolute",
                bottom: -10,
                right: "calc(20% - 20px)",
                backgroundColor: "lightgray",
                "&:hover": { backgroundColor: "gray" },
                borderRadius: "50%",
              }}
              component="label"
            >
              <EditIcon />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                hidden
              />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              ml: { md: 3 },
              mt: { xs: 5, md: 0 },
              alignItems: { xs: "center", md: "flex-start" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                width: "100%",
              }}
            >
              <FormControl
                variant="standard"
                sx={{
                  m: 1,
                  width: { xs: "100%", md: 240 },
                }}
              >
                <TextField
                  label="Admin Name"
                  name="admin_name"
                  value={adminDetails.admin_name}
                  onChange={handleChange}
                  variant="standard"
                  error={!!errors.admin_name}
                  helperText={errors.admin_name}
                />
              </FormControl>
              <FormControl
                variant="standard"
                sx={{
                  m: 1,
                  width: { xs: "100%", md: 240 },
                }}
              >
                <TextField
                  label="Email"
                  name="email"
                  value={adminDetails.email}
                  onChange={handleChange}
                  variant="standard"
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </FormControl>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                width: "100%",
              }}
            >
              <FormControl
                variant="standard"
                sx={{
                  m: 1,
                  width: { xs: "100%", md: 240 },
                }}
              >
                <TextField
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  variant="standard"
                  error={!!errors.password}
                  helperText={errors.password}

                  placeholder="Enter new password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={togglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
              <FormControl
                variant="standard"
                sx={{
                  m: 1,
                  width: { xs: "100%", md: 240 },
                }}
              >
                <TextField
                  label="Mobile Number"
                  name="mobile_number"
                  value={adminDetails.mobile_number}
                  onChange={handleChange}
                  variant="standard"
                  error={!!errors.phone}
                  helperText={errors.phone}
                />
              </FormControl>
            </Box>
            <Button
              onClick={handleSubmit}
              disabled={loading}
              sx={{
                backgroundColor: "green",
                color: "white",
                "&:hover": {
                  backgroundColor: "#585d64",
                },
                mt: 5,
                width: 100,
                ml: { md: 20, xs: 0 },
              }}
            >
              {loading ? <CircularProgress size={25} /> : 'submit'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDetails;