import { createBrowserRouter } from "react-router-dom";
import ProtectedHome from "../Authentication/ProtectedHome";
import ProtectedRoute from "../Authentication/ProtectedRoute";
import HomePage from "../page/HomePage";
import FeedPage from "../page/FeedPage";
import ProfilePage from "../page/ProfilePage";
import PostPage from "../page/PostPage";
import { PostsProvider } from "../context/PostsProvider";
import { PostProvider } from "../context/PostProvider";
import SettingsPage from "../page/SettingsPage";
import GroupPage from "../page/GroupPage";
import ProfileGroupPage from "../page/ProfileGroupPage";
import ProfileFriendsPage from "../page/ProfileFriendsPage";
import ProfileInformationPage from "../page/ProfileInformationPage";
import { ProfileFriendsProvider } from "../context/ProfileFriendsProvider";
import GroupsFeedPage from "../page/GroupsFeedPage";
import GroupMembersPage from "../page/GroupMembersPage";
import { GroupProfileProvider } from "../context/GroupProfileProvider";
import { GroupMembersProvider } from "../context/GroupMembersProvider";
import Layout from "../pageUtils/navbar/Layout";
import SettingsDeletePage from "../page/SettingsDeletePage";
import ProfileLayout from "../pageUtils/user/ProfileLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedHome element={HomePage} />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        element: <ProfileLayout />,
        children: [
          {
            path: ":id",
            element: (
              <PostsProvider>
                <ProtectedRoute element={ProfilePage} />
              </PostsProvider>
            ),
          },
          {
            path: ":id/information",
            element: <ProtectedRoute element={ProfileInformationPage} />,
          },
          {
            path: ":id/friends",
            element: (
              <ProfileFriendsProvider>
                <ProtectedRoute element={ProfileFriendsPage} />
              </ProfileFriendsProvider>
            ),
          },
          {
            path: ":id/groups",
            element: <ProtectedRoute element={ProfileGroupPage} />,
          },
        ],
      },
      {
        path: "feed",
        element: (
          <PostsProvider>
            <ProtectedRoute element={FeedPage} />
          </PostsProvider>
        ),
      },
      {
        path: "feed/groups",
        element: <ProtectedRoute element={GroupsFeedPage} />,
      },
      {
        path: "group/:id",
        element: (
          <GroupProfileProvider>
            <PostsProvider>
              <ProtectedRoute element={GroupPage} />
            </PostsProvider>
          </GroupProfileProvider>
        ),
      },
      {
        path: "group/:id/members",
        element: (
          <GroupProfileProvider>
            <GroupMembersProvider>
              <ProtectedRoute element={GroupMembersPage} />
            </GroupMembersProvider>
          </GroupProfileProvider>
        ),
      },
      {
        path: "settings",
        element: <ProtectedRoute element={SettingsPage} />,
      },
      {
        path: "settings/delete",
        element: <ProtectedRoute element={SettingsDeletePage} />,
      },
    ],
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
    path: "*",
    element: <ProtectedRoute element={FeedPage} />,
  },
]);

export default router;
