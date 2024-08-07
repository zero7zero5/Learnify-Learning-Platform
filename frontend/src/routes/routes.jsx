import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import App from "../App";
import Courses from "../pages/Courses";
import { CourseContent } from "../pages/CourseContent";
import CreateCourse from "../pages/CreateCourse";
import AddSections from "../pages/AddSections";
import DemoAddSection from "../pages/AddSections";
import { UserDashboard } from "../pages/UserDashboard";
import UserProtectedRoute from "../utils/UserProtectedRoute";
import InstructorProtectedRoute from "../utils/InstructorProtectedRoute";
import InstructorRegister from "../pages/InstructorRegister";
import InstructorLogin from "../pages/InstructorLogin";
import AdminProtectedRoute from "../utils/AdminProtectedRoute";
import AdminDashBoard from "../pages/AdminDashboard";
import AdminLogin from "../pages/AdminLogin";
import CoursePreview from "../pages/CoursePreview";
import UDCart from "../components/UDCart";
import { UDPurchasedCourses } from "../components/UDPurchasedCourses";
import { UDCompletedCourses } from "../components/UDCompletedCourses";
import UDMainContent from "../components/UDMainContent";
import IDCreatedCourse from "../components/IDCreatedCourse";
import Payment from "../pages/Payment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/instructor-register",
        element: <InstructorRegister />,
      },
      {
        path: "/instructor-login",
        element: <InstructorLogin />,
      },
      {
        path: "/admin-login",
        element: <AdminLogin />,
      },
      {
        path: "/courses",
        element: <Courses />,
      },
      {
        path: "/courses/:id",
        element: <Courses />,
      },
      {
        path: "/course-preview/:id",
        element: <CoursePreview />,
      },
      {
        path: "/payment/:total",
        element: <Payment />,
      },
      {
        path: "/add-sections/:courseId",
        element: <AddSections />,
      },

      {
        element: <AdminProtectedRoute />,
        children: [
          {
            path: "/admin-dashboard",
            element: <AdminDashBoard />,
          },
        ],
      },

      {
        element: <UserProtectedRoute />,
        children: [
          {
            path: "/course-content/:courseId",
            element: <CourseContent />,
          },
          {
            path: "/dashboard",
            element: <UserDashboard />,
            children: [
              {
                path: "user-profile",
                element: <UDMainContent />,
              },
              {
                path: "cart",
                element: <UDCart />,
              },
              {
                path: "purchased-courses",
                element: <UDPurchasedCourses />,
              },
              {
                path: "completed-courses",
                element: <UDCompletedCourses />,
              },
            ],
          },
        ],
      },
      {
        element: <InstructorProtectedRoute />,
        children: [
          {
            path: "/create-course",
            element: <CreateCourse />,
          },
          {
            path: "/add-sections/:courseId",
            element: <AddSections />,
          },
          {
            path: "/instructor-dashboard",
            element: <UserDashboard />,
            children: [
              {
                path: "instructor-profile",
                element: <UDMainContent />,
              },
              {
                path: "created-courses",
                element: <IDCreatedCourse />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
