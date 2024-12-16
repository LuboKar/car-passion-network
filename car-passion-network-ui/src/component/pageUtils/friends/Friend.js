import React, { useContext } from "react";
import "./Friend.css";
import useNavigation from "../../service/NavigateService";
import { getId } from "../../service/TokenService";
import { removeFriend } from "../../service/UserService";
import { addFriend } from "../../service/UserService";
import ProfilePicture from "../user/ProfilePicture";
import FriendActionButton from "../user/FriendActionButton";
import { useParams } from "react-router-dom";
import { ProfileFriendsContext } from "../../context/ProfileFriendsProvider";

export default function Friend({ friend, index }) {
  const { id } = useParams();
  const { navigateToProfile } = useNavigation();
  const currentUserId = getId();

  const { setFriends } = useContext(ProfileFriendsContext);

  const handleRemoveFriend = async () => {
    const response = await removeFriend(friend.id);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    setFriends((prevFriends) => [
      ...prevFriends.slice(0, index),
      ...prevFriends.slice(index + 1),
    ]);
  };

  const handleAddFriend = async () => {
    const response = await addFriend(friend.id);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    setFriends((prevFriends) => {
      const newFriends = [...prevFriends];

      newFriends[index].friend = true;

      return newFriends;
    });
  };

  return (
    <div key={index} className="friend-container">
      <div className="friend-profile-picture-container">
        <ProfilePicture
          profilePicture={friend.profilePicture}
          navigateToProfile={() => navigateToProfile(friend.id)}
        />
      </div>

      <label
        className="friend-name"
        onClick={() => navigateToProfile(friend.id)}
      >
        {friend.firstName} {friend.lastName}
      </label>

      {id === currentUserId && (
        <div className="friend-remove-friend-button">
          <FriendActionButton
            buttonText="Remove Friend"
            handleAction={handleRemoveFriend}
          />
        </div>
      )}

      {id !== currentUserId &&
        !friend.friend &&
        friend.id !== currentUserId && (
          <div className="friend-add-friend-button">
            <FriendActionButton
              buttonText="Add Friend"
              handleAction={handleAddFriend}
            />
          </div>
        )}
    </div>
  );
}
