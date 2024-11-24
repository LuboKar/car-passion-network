import React, { useEffect, useState, useContext } from "react";
import Navbar from "../pageUtils/navbar/Navbar";
import VerticalNavbar from "../pageUtils/navbar/VerticalNavbar";
import RightVerticalNabvar from "../pageUtils/navbar/RightVerticalNavbar";
import Profile from "../pageUtils/user/Profile";
import Posts from "../pageUtils/post/Posts";
import { useParams } from "react-router-dom";
import Information from "../pageUtils/user/Information";
import { getUser } from "../service/UserService";
import { getPosts } from "../service/PostService";
import ProfilePageHeader from "../pageUtils/user/ProfilePageHeader";
import { PostsContext } from "../context/PostsProvider";
import infoIcon from "../../images/info.png";
import postIcon from "../../images/post.png";
import friendIcon from "../../images/friendIcon.png";
import Friends from "../pageUtils/friends/Friends";
import { getFriends } from "../service/UserService";
import FriendsHeader from "../pageUtils/friends/FriendsHeader";
import groups from "../../images/groups.png";
import Groups from "../group/Groups";

export default function ProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [userInformation, setUserInformation] = useState(false);
  const [viewPosts, setViewPosts] = useState(true);
  const [viewFriends, setViewFriends] = useState(false);
  const [viewGroups, setViewGroups] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [friends, setFriends] = useState([]);
  const [loadingFriends, setLoadingFriends] = useState(true);

  const { posts, setPosts } = useContext(PostsContext);

  const fetchUser = async () => {
    const response = await getUser(id);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const userData = await response.json();
    setUser(userData);
    setLoadingUser(false);
  };

  const fetchPosts = async () => {
    const response = await getPosts(id);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const postData = await response.json();
    setPosts(postData);
    setLoadingPosts(false);
  };

  const fetchFriends = async () => {
    const response = await getFriends(id);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const friendsList = await response.json();
    setFriends(friendsList);
    setLoadingFriends(false);
  };

  useEffect(() => {
    fetchUser();
    fetchPosts();
    togglePosts();
    fetchFriends();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const toggleInformation = () => {
    setViewPosts(false);
    setUserInformation(true);
    setViewFriends(false);
    setViewGroups(false);
  };

  const togglePosts = () => {
    setUserInformation(false);
    setViewPosts(true);
    setViewFriends(false);
    setViewGroups(false);
  };

  const toggleFriends = () => {
    setViewFriends(true);
    setViewPosts(false);
    setUserInformation(false);
    setViewGroups(false);
  };

  const toggleGroups = () => {
    setViewGroups(true);
    setViewFriends(false);
    setViewPosts(false);
    setUserInformation(false);
  };

  const topButtons = [
    {
      label: "Posts",
      icon: postIcon,
      onClick: togglePosts,
      isVisible: viewPosts,
    },
    {
      label: "Information",
      icon: infoIcon,
      onClick: toggleInformation,
      isVisible: userInformation,
    },
    {
      label: "Friends",
      icon: friendIcon,
      onClick: toggleFriends,
      isVisible: viewFriends,
    },
    {
      label: "Groups",
      icon: groups,
      onClick: toggleGroups,
      isVisible: viewGroups,
    },
  ];

  return (
    <div className="profile-page-container">
      <Navbar />

      <VerticalNavbar topButtons={topButtons} />
      <RightVerticalNabvar />

      {!loadingUser && !loadingPosts && (
        <Profile user={user} setUser={setUser} />
      )}

      {!loadingUser && !loadingPosts && viewPosts && (
        <Posts ownerId={user.id} />
      )}
      {posts.length < 1 && viewPosts && !loadingUser && !loadingPosts && (
        <ProfilePageHeader />
      )}

      {userInformation && <Information user={user} />}

      {!loadingFriends && viewFriends && (
        <Friends friends={friends} setFriends={setFriends} userId={user.id} />
      )}
      {!loadingFriends && friends.length < 1 && viewFriends && (
        <FriendsHeader />
      )}

      {viewGroups && <Groups userId={user.id} />}
    </div>
  );
}
