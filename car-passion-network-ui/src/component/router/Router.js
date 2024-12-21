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
import { ProfileProvider } from "../context/ProfileProvider";
import { ProfileFriendsProvider } from "../context/ProfileFriendsProvider";
import GroupsFeedPage from "../page/GroupsFeedPage";
import GroupMembersPage from "../page/GroupMembersPage";
import { GroupProfileProvider } from "../context/GroupProfileProvider";
import { GroupMembersProvider } from "../context/GroupMembersProvider";
import Layout from "../pageUtils/navbar/Layout";

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
        path: ":id",
        element: (
          <ProfileProvider>
            <PostsProvider>
              <ProtectedRoute element={ProfilePage} />
            </PostsProvider>
          </ProfileProvider>
        ),
      },
      {
        path: ":id/information",
        element: (
          <ProfileProvider>
            <ProtectedRoute element={ProfileInformationPage} />
          </ProfileProvider>
        ),
      },
      {
        path: "/:id/friends",
        element: (
          <ProfileProvider>
            <ProfileFriendsProvider>
              <ProtectedRoute element={ProfileFriendsPage} />
            </ProfileFriendsProvider>
          </ProfileProvider>
        ),
      },
      {
        path: "/:id/groups",
        element: (
          <ProfileProvider>
            <ProtectedRoute element={ProfileGroupPage} />
          </ProfileProvider>
        ),
      },
      {
        path: "/feed",
        element: (
          <PostsProvider>
            <ProtectedRoute element={FeedPage} />
          </PostsProvider>
        ),
      },
      {
        path: "/feed/groups",
        element: <ProtectedRoute element={GroupsFeedPage} />,
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
    path: "/settings",
    element: <ProtectedRoute element={SettingsPage} />,
  },
  {
    path: "/group/:id",
    element: (
      <GroupProfileProvider>
        <PostsProvider>
          <ProtectedRoute element={GroupPage} />
        </PostsProvider>
      </GroupProfileProvider>
    ),
  },
  {
    path: "/group/:id/members",
    element: (
      <GroupProfileProvider>
        <GroupMembersProvider>
          <ProtectedRoute element={GroupMembersPage} />
        </GroupMembersProvider>
      </GroupProfileProvider>
    ),
  },
  {
    path: "*",
    element: <ProtectedRoute element={FeedPage} />,
  },
]);

export default router;
