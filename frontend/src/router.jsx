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

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: '/dashboard',
        element: <Navigate to="/" />
      },
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/apartments",
        element: <Apartments />,
      },
      {
        path: "/apartments/create",
        element: <ApartmentView />,
      },
      {
        path: "/apartments/:id",
        element: <ApartmentView />,
      },
      {
        path: "/customers",
        element: <Customers />,
      },
      {
        path: "/customers/create",
        element: <CustomerView />,
      },
      {
        path: "/customers/:id",
        element: <CustomerView />,
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
