import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Customers from "./views/Customer/Customers.jsx";
import CustomerView from "./views/Customer/CustomerView.jsx";
import ApartmentView from "./views/Apartment/ApartmentView.jsx";
import Apartments from "./views/Apartment/Apartments.jsx";
import JobCards from "./views/JobCard/JobCards.jsx";
import JobCardView from "./views/JobCard/JobCardView.jsx";
import Jobs from "./views/Job/Jobs.jsx";
import JobView from "./views/Job/JobView.jsx";
import Users from "./views/Users/Users.jsx";
import UserView from "./views/Users/UserView.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import EngineerJobCards from "./views/JobCard/EngineerJobCard/EngineerJobCards.jsx";
import EngineerJobCardView from "./views/JobCard//EngineerJobCard/EngineerJobCardView.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Navigate to="/" />
      },
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/apartments",
        element: <ProtectedRoute requiredLevel={2}><Apartments /></ProtectedRoute>, // Level 1 & 2 access
      },
      {
        path: "/apartments/create",
        element: <ProtectedRoute requiredLevel={1}><ApartmentView /></ProtectedRoute>, // Level 1 can create
      },
      {
        path: "/apartments/:id",
        element: <ProtectedRoute requiredLevel={1}><ApartmentView /></ProtectedRoute>, // Level 1 can view/edit
      },
      {
        path: "/users",
        element: <ProtectedRoute requiredLevel={1}><Users /></ProtectedRoute>, // Only Level 1 (super user) can access
      },
      {
        path: "/users/create",
        element: <ProtectedRoute requiredLevel={1}><UserView /></ProtectedRoute>, // Only Level 1 can create users
      },
      {
        path: "/users/:id",
        element: <ProtectedRoute requiredLevel={1}><UserView /></ProtectedRoute>,
      },
      {
        path: "/customers",
        element: <ProtectedRoute requiredLevel={2}><Customers /></ProtectedRoute>, // Level 1 & 2 access
      },
      {
        path: "/customers/create",
        element: <ProtectedRoute requiredLevel={2}><CustomerView /></ProtectedRoute>, // Level 1 & 2 can create
      },
      {
        path: "/customers/:id",
        element: <ProtectedRoute requiredLevel={2}><CustomerView /></ProtectedRoute>, // Level 1 & 2 can view/edit
      },
      {
        path: "/job_cards",
        element: <ProtectedRoute requiredLevel={3}><JobCards /></ProtectedRoute>, // Level 1, 2 & 3 access
      },
      {
        path: "/job_card/create",
        element: <ProtectedRoute requiredLevel={2}><JobCardView /></ProtectedRoute>, // Level 1 & 2 can create
      },
      {
        path: "/job_card/:id",
        element: <ProtectedRoute requiredLevel={2}><JobCardView /></ProtectedRoute>, // Level 1 & 2 can view/edit
      },
      {
        path: "/engineer_job_cards",
        element: <ProtectedRoute requiredLevel={3}><EngineerJobCards /></ProtectedRoute>, // Level 1 & 2 can view/edit
      },
      {
        path: "/engineer_job_card/create/:id",
        element: <ProtectedRoute requiredLevel={3}><EngineerJobCardView /></ProtectedRoute>, // Level 1 & 2 can view/edit
      },
      {
        path: "/jobs",
        element: <ProtectedRoute requiredLevel={3}><Jobs /></ProtectedRoute>, // Level 1, 2 & 3 access
      },
      {
        path: "/job/create",
        element: <ProtectedRoute requiredLevel={2}><JobView /></ProtectedRoute>, // Level 1 & 2 can create
      },
      {
        path: "/job/:id",
        element: <ProtectedRoute requiredLevel={3}><JobView /></ProtectedRoute>, // Level 1, 2 & 3 can view/edit
      }
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);

export default router;
