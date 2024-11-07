
import {
  createBrowserRouter,
} from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import Dashboard from "@/pages/Dashboard/Dashboard";
import Attendance from "@/pages/Attendance/Attendance";
import Leave from "@/pages/Leave/Leave";
import Salary from "@/pages/Salary/Salary";
import SalaryDetails from "@/pages/Salary/SalaryDetails";
import Announcement from "@/pages/Announcement/Announcement";
import GeoFencing from "@/pages/GeoFencing/GeoFencing";
import MainPage from "@/pages/Authentications/MainPage";
import Register from "@/pages/Authentications/Register";
import ConfirmRegistration from "@/pages/Authentications/ConfirmRegistration";
import Login from "@/pages/Authentications/Login";
import ForgetPassword from "@/pages/Authentications/ForgetPassword";
import ResetPassword from "@/pages/Authentications/ResetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children: [
        {
            path: "/",
            element: <Dashboard/>
        },
        {
          path:"attendance",
          element: <Attendance/>
        },
        {
          path: "leave",
          element: <Leave/>
        },
        {
          path: "salary",
          element: <Salary/>
        },
        {
          path: "salaryDetails/:id",
          element: <SalaryDetails/>
        },
        {
          path: "announcement",
          element: <Announcement/>
        },
        {
          path: "geo-fencing",
          element: <GeoFencing/>
        },
        {
          path: "mainPage",
          element: <MainPage/>
        },
        {
          path: "register",
          element: <Register/>
        },
        {
          path: "confirmRegister",
          element: <ConfirmRegistration/>
        },
        {
          path: "login",
          element: <Login/>
        },
        {
          path: "forget",
          element: <ForgetPassword/>
        },
        {
          path: "reset",
          element: <ResetPassword/>
        },
    ]
  },
]);

export default router;