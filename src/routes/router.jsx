import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import AuthLayout from "../layouts/AuthLayout";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import Profile from "../dashboard/Profile";
import DashboardHome from "../dashboard/DashboardHome";
import DonationRequests from "../dashboard/DonationRequests";
import CreateDonationRequest from "../dashboard/CreateDonationRequest";
import EditDonationRequest from "../dashboard/EditDonationRequest";
import DonationRequestDetails from "../dashboard/DonationRequestDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      }
    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: '/login',
        Component: Login
      },
      {
        path: '/register',
        Component: Register
      },
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        path: 'profile',
        Component: Profile
      },
      {
        path: 'dhome',
        Component: DashboardHome
      },
      {
        path: 'donation-requests',
        Component: DonationRequests
      },
      {
        path: 'create-donation-request',
        Component: CreateDonationRequest
      },
      {
        path: "donation-request/:id",
        Component: DonationRequestDetails,
      },
      {
        path: "donation-request/edit/:id",
        Component: EditDonationRequest,
      }
    ]
  }
])