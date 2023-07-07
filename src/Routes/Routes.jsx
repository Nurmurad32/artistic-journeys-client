import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Instructor from "../Pages/Instructor/Instructor";
import Classes from "../Pages/Classes/Classes";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Dashboard from "../Layout/Dashboard";
import AllUsers from "../Pages/Dashboard/AdminPage/AllUsers/AllUsers";
import AdminHome from "../Pages/Dashboard/AdminPage/AdminHome/AdminHome";
import InstructorHome from "../Pages/Dashboard/InstructorPage/InstructorHome/InstructorHome";
import StudentHome from "../Pages/Dashboard/StudentPage/StudentHome/StudentHome";
import AddClass from "../Pages/Dashboard/InstructorPage/AddClass/AddClass";
import ManageClasses from "../Pages/Dashboard/AdminPage/ManageClasses/ManageClasses";
import InstructorClasses from "../Pages/Dashboard/InstructorPage/InstructorClasses/InstructorClasses";
import PendingClasses from "../Pages/Dashboard/InstructorPage/PendingClasses/PendingClasses";
import SelectedClass from "../Pages/Dashboard/StudentPage/SelectedClass/SelectedClass";
import Payment from "../Pages/Dashboard/Payment/Payment";
import EnrolledClass from "../Pages/Dashboard/StudentPage/EnrolledClass/EnrolledClass";
import AdminRoute from "./AdminRoute";
import InstructorRoute from './InstructorRoute'
import NotFound from "../Pages/404Page/NotFound";

export const router = createBrowserRouter([
        {
          path: "/",
          element: <Main></Main>,
          children:[
            {
              path: "/",
              element: <Home></Home>
            },
            {
              path: "instructors",
              element: <Instructor></Instructor>
            },
            {
              path: "classes",
              element: <Classes></Classes>
            },
            {
              path: "login",
              element: <Login></Login>
            },
            {
              path: "register",
              element: <SignUp></SignUp>
            },
          ]
        },
        {
          path: "dashboard",
          element: <Dashboard></Dashboard>,
          children:[
            {
              path: "payment",
              element: <Payment></Payment>,
            },
            // Admin Routes
            {
              path: "adminhome",
              element: <AdminRoute><AdminHome></AdminHome></AdminRoute>,
            },
            {
              path: "allusers",
              element: <AdminRoute><AllUsers></AllUsers></AdminRoute>,
            },
            {
              path: "manageclasses",
              element: <AdminRoute><ManageClasses></ManageClasses></AdminRoute>,
            },
            // Instructor Routes
            {
              path: "instructorhome",
              element: <InstructorRoute><InstructorHome></InstructorHome></InstructorRoute>,
            },
            {
              path: "addclass",
              element: <InstructorRoute><AddClass></AddClass></InstructorRoute>,
            },
            {
              path: "instructorclasses",
              element: <InstructorRoute><InstructorClasses></InstructorClasses></InstructorRoute>,
            },
            {
              path: "instructorpendingclasses",
              element: <InstructorRoute><PendingClasses></PendingClasses></InstructorRoute>,
            },
            // Student Routes
            {
              path: "studenthome",
              element: <StudentHome></StudentHome>,
            },
            {
              path: "selectedclasses",
              element: <SelectedClass></SelectedClass>,
            },
            {
              path: "enrolledclasses",
              element: <EnrolledClass></EnrolledClass>,
            },
          ]
        },
        {
          path: '*',
          element: <NotFound></NotFound>
        }
      ]); 
