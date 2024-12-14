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
import ProfileGroupPage from "../page/ProfileGroupPage";
import ProfileFriendsPage from "../page/ProfileFriendsPage";
import ProfileInformationPage from "../page/ProfileInformationPage";

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
    path: "/:id",
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
    path: "/group/:id",
    element: (
      <PostsProvider>
        <ProtectedRoute element={GroupPage} />
      </PostsProvider>
    ),
  },
  {
    path: "/:id/groups",
    element: <ProtectedRoute element={ProfileGroupPage} />,
  },
  {
    path: "/:id/friends",
    element: <ProtectedRoute element={ProfileFriendsPage} />,
  },
  {
    path: "/:id/information",
    element: <ProtectedRoute element={ProfileInformationPage} />,
  },
  {
    path: "*",
    element: <ProtectedRoute element={DashboardPage} />,
  },
]);

export default router;
