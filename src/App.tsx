import React, { Suspense,  } from "react";
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import "./components/Dashboard/menu.css";
import CircularProgress from "@mui/material/CircularProgress";
import Heatmap from "./pages/heatmap";


// Lazy loading components
const Login = React.lazy(() => import("./components/Adminlogin/login"))
const Adminsignup = React.lazy(() => import("./components/adminsignup/signup"));
const Forgotpass = React.lazy(() => import("./components/Adminforgetpassword/forgotpass"));
const Adminconfirmpass = React.lazy(() => import("./components/Adminconfirmpsw/adminconfirmpass"));
const Verifypass = React.lazy(() => import("./components/Verifypassword/verifypass"));
const Restaurantmanagement = React.lazy(() => import("./components/Dashboard/restaurantmgt/restaurantmgt"));
const Dashboard = React.lazy(() => import("./components/Dashboard/Dashboard"));
const UserTableMaster = React.lazy(() => import("./components/Dashboard/users"));
const DriverTableMaster = React.lazy(() => import("./components/Dashboard/drivers"));
const RideRequestTable = React.lazy(() => import("./components/Dashboard/Riderequest"));
const TableHistory = React.lazy(() => import("./components/Dashboard/Riderequest/Orderhistory"));
const AdminDetails = React.lazy(() => import("./components/Dashboard/Adminprofile/Adminprofile"));
const DocumentsPage = React.lazy(() => import("./components/Dashboard/drivers/Documentpage"));
const AdminHeader = React.lazy(() => import("./components/Adminheader/Adminheader"));
const Orders = React.lazy(() => import("./components/Dashboard/Food/orders"));
const Sidenavbar = React.lazy(() => import("./components/sidenvbar"));
const Homepage = React.lazy(() => import("./pages/home"));
const Users = React.lazy(() => import("./pages/users"));
const Drivers = React.lazy(() => import("./pages/drivers"));
const Settings = React.lazy(() => import("./pages/settings"));
const Basictabs = React.lazy(() => import("./components/basictabs"));
const PageNotFound = React.lazy(() => import("./components/404ErroePage/404Page"));
const ProtectedRoute = React.lazy(() => import("./components/protectedRoute"));
const Driverdocs = React.lazy(() => import("./pages/driverdocs"))

const DriverPendingDocs= React.lazy(() => import("./pages/driver_pending_docs"));

const DriverRides= React.lazy(() => import("./pages/driverrides"));


const AddNewDriver = React.lazy(() => import("./components/Dashboard/AddNewDriver/AddNewDriver"))
const Vehicle=React.lazy(() => import("./pages/Vehicale"));


const App: React.FC = () => {

  const routes = createBrowserRouter([
    {
      path: "/admin/home",
      element: <Suspense fallback={<CircularProgress />}>
        <ProtectedRoute>
        <Homepage />
        </ProtectedRoute>
      </Suspense>
    },
    {
      path: "/",
      element: <Suspense fallback={<CircularProgress />}>
        <Login />
      </Suspense>
    },
    {
      path: "/signup",
      element: <Suspense fallback={<CircularProgress />}>
        <Adminsignup />
      </Suspense>
    },
    {
      path: "/reset-password/forgot",
      element: <Suspense fallback={<CircularProgress />}>
        <Forgotpass />
      </Suspense>
    },
    {
      path: "/admin-create-passwords",
      element: <Suspense fallback={<CircularProgress />}>
        <Adminconfirmpass />
      </Suspense>
    },
    {
      path: "/admin/verificationpages",
      element: <Suspense fallback={<CircularProgress />}>
        <Verifypass />
      </Suspense>
    },
    {
      path: "/admin/Rurantmanagement",
      element: <Suspense fallback={<CircularProgress />}>
        <Restaurantmanagement />
      </Suspense>
    },
    {
      path: "/admin/dashboard",
      element: <Suspense fallback={<CircularProgress />}>
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </Suspense>
    },
    {
      path: "/admin/users",
      element: <Suspense fallback={<CircularProgress />}>
        <ProtectedRoute>
          <UserTableMaster />
        </ProtectedRoute>
      </Suspense>
    },
    {
      path: "/admin/driver",
      element: <Suspense fallback={<CircularProgress />}>
        <ProtectedRoute>
          <DriverTableMaster />
        </ProtectedRoute>
      </Suspense>
    },
    {
      path: "/admin/adminprofile",
      element: <Suspense fallback={<CircularProgress />}>
        <ProtectedRoute>
          <AdminDetails />
        </ProtectedRoute>
      </Suspense>
    },
    {
      path: `/driver/docs/:id`,
      element: <Suspense fallback={<CircularProgress />}>
        <ProtectedRoute>
          <Driverdocs />
        </ProtectedRoute>
      </Suspense>
    },
    {
      path: "/ridedetails",
      element: <Suspense fallback={<CircularProgress />}>
        <ProtectedRoute>
          <RideRequestTable />
        </ProtectedRoute>
      </Suspense>
    },
    {
      path: "/ridedetails/history",
      element: <Suspense fallback={<CircularProgress />}>
        <ProtectedRoute>
          <TableHistory />
        </ProtectedRoute>
      </Suspense>
    },
    {
      path: "/documents/:id",
      element: <Suspense fallback={<CircularProgress />}>
        <ProtectedRoute>
          <DocumentsPage />
        </ProtectedRoute>
      </Suspense>
    },
    {
      path: "/admin/Header",
      element: <Suspense fallback={<CircularProgress />}>
        <ProtectedRoute>
          <AdminHeader showLoginButton={true} />
        </ProtectedRoute>
      </Suspense>
    },
    {
      path: "/Orders",
      element: <Suspense fallback={<CircularProgress />}>
        <ProtectedRoute>
          <Orders />
        </ProtectedRoute>
      </Suspense>
    },
    {
      path: "/navbar",
      element: <Suspense fallback={<CircularProgress />}>
        <ProtectedRoute>
        <Sidenavbar />
        </ProtectedRoute>
      
      </Suspense>
    },
    {
      path: "/home",
      element: <Suspense fallback={<CircularProgress />}>
        <ProtectedRoute>
        <Homepage />
        </ProtectedRoute>
        
      </Suspense>
    },
    {
      path: "/users",
      element: <Suspense fallback={<CircularProgress />}>
        <ProtectedRoute>
        <Users />
        </ProtectedRoute>
      
      </Suspense>
    },
    {
      path: "/drivers",
      element: <Suspense fallback={<CircularProgress />}>
               <ProtectedRoute>
        <Drivers />
        </ProtectedRoute>
      </Suspense>
    },

    {
      path: "/AddNewDriver", 
      element: <Suspense fallback={<CircularProgress />}>
        <ProtectedRoute>
          <AddNewDriver />
        </ProtectedRoute>
      </Suspense>
    },

    {
      path: "/driverrides",
      element: <Suspense fallback={<CircularProgress />}>
               <ProtectedRoute>
        <DriverRides/>
        </ProtectedRoute>
      </Suspense>
    },

    {
      path: "/Vehicle", 
        element: <Suspense fallback={<CircularProgress />}>
          <ProtectedRoute>
            <Vehicle/>
          </ProtectedRoute>
        </Suspense>
      },
    
    {
      path: "/settings",
      element: <Suspense fallback={<CircularProgress />}>
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      </Suspense>
    },
    {
      path: "/tabs",
      element: <Suspense fallback={<CircularProgress />}>
        <ProtectedRoute>
          <Basictabs />
        </ProtectedRoute>
      </Suspense>
    },
    {
      path: "/heatmap",  // Add this route for the Heatmap page
      element: (
        <Suspense fallback={<CircularProgress />}>
          <ProtectedRoute>
            <Heatmap />
          </ProtectedRoute>
        </Suspense>
      ),
    },
    {
      path: "/DriverPendingDocs",  // Add this route for the Heatmap page
      element: (
        <Suspense fallback={<CircularProgress />}>
          <ProtectedRoute>
            <DriverPendingDocs />
          </ProtectedRoute>
        </Suspense>
      ),
    },

    {
      path: "/heatmap",  // Add this route for the Heatmap page
      element: (
        <Suspense fallback={<CircularProgress />}>
          <ProtectedRoute>
            <Heatmap />
          </ProtectedRoute>
        </Suspense>
      ),
    },
    {
      path: "*",
      element: <Suspense fallback={<CircularProgress />}>
        <PageNotFound />
      </Suspense>
    }

  ]);

  return (
    <RouterProvider router={routes} />
  );
};

export default App;
