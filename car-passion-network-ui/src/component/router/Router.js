import { createBrowserRouter } from "react-router-dom";
import ProtectedHome from "../Authentication/ProtectedHome";
import ProtectedRoute from "../Authentication/ProtectedRoute";
import HomePage from "../page/HomePage";
import DashboardPage from "../page/DashboardPage";
import ProfilePage from "../page/ProfilePage";
import PostPage from "../page/PostPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedHome element={HomePage} />,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute element={DashboardPage} />,
  },
  {
    path: "/profile/:id",
    element: <ProtectedRoute element={ProfilePage} />,
  },
  {
    path: "/post/:id",
    element: <PostPage />,
  },
  {
    path: "*",
    element: <ProtectedRoute element={DashboardPage} />,
  },
]);

export default router;
