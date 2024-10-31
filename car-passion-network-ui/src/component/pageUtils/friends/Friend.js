import React from "react";
import "./Friend.css";
import useNavigation from "../../service/NavigateService";
import { getId } from "../../service/TokenService";
import RemoveFriend from "../user/RemoveFriend";
import AddFriend from "../user/AddFriend";
import { removeFriend } from "../../service/UserService";
import { addFriend } from "../../service/UserService";
import ProfilePicture from "../user/ProfilePicture";

export default function Friend({ friend, index, userId, setFriends }) {
  const { navigateToProfile } = useNavigation();
  const currentUserId = getId();

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

      {userId === currentUserId && (
        <div className="friend-remove-friend-button">
          <RemoveFriend handleRemoveFriend={handleRemoveFriend} />
        </div>
      )}

      {userId !== currentUserId &&
        !friend.friend &&
        friend.id !== currentUserId && (
          <div className="friend-add-friend-button">
            <AddFriend handleAddFriend={handleAddFriend} />
          </div>
        )}
    </div>
  );
}
