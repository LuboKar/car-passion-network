import { createBrowserRouter } from "react-router-dom";
import ProtectedHome from "../Authentication/ProtectedHome";
import ProtectedRoute from "../Authentication/ProtectedRoute";
import HomePage from "../page/HomePage";
import DashboardPage from "../page/DashboardPage";
import ProfilePage from "../page/ProfilePage";
import PostPage from "../page/PostPage";
import { PostsProvider } from "../context/PostsProvider";
import { PostProvider } from "../context/PostProvider";
import SettingsPage from "../page/SettingsPage";
import GroupPage from "../page/GroupPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedHome element={HomePage} />,
  },
  {
    path: "/dashboard",
    element: (
      <PostsProvider>
        <ProtectedRoute element={DashboardPage} />
      </PostsProvider>
    ),
  },
  {
    path: "/profile/:id",
    element: (
      <PostsProvider>
        <ProtectedRoute element={ProfilePage} />
      </PostsProvider>
    ),
  },
  {
    path: "/post/:id",
    element: (
      <PostsProvider>
        <PostProvider>
          <PostPage />
        </PostProvider>
      </PostsProvider>
    ),
  },
  {
    path: "/settings",
    element: <ProtectedRoute element={SettingsPage} />,
  },
  {
    path: "*",
    element: <ProtectedRoute element={DashboardPage} />,
  },
  {
    path: "/group/:id",
    element: (
      <PostsProvider>
        <ProtectedRoute element={GroupPage} />
      </PostsProvider>
    ),
  },
]);

export default router;
