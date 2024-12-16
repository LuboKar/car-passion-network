import React, { useState, useEffect, useContext } from "react";
import "./Friends.css";
import Friend from "./Friend";
import SearchBar from "../navbar/SearchBar";
import FriendsHeader from "./FriendsHeader.js";
import { ProfileFriendsContext } from "../../context/ProfileFriendsProvider.js";

export default function Friends() {
  const { friends } = useContext(ProfileFriendsContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFriends, setFilteredFriends] = useState(friends);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const filtered = friends.filter((friend) => {
      const fullName = `${friend.firstName} ${friend.lastName}`.toLowerCase();
      return fullName.startsWith(searchTerm.toLowerCase());
    });

    setFilteredFriends(filtered);
  }, [searchTerm, friends]);

  return (
    <div className="friends-container">
      {friends.length > 0 && (
        <div className="friends-search-bar-container">
          <SearchBar
            searchTerm={searchTerm}
            handleSearchChange={handleSearchChange}
          />
        </div>
      )}

      {filteredFriends.map((friend, index) => (
        <div className="friends-friend">
          <Friend friend={friend} index={index} />
        </div>
      ))}

      {filteredFriends.length < 1 && friends.length > 0 && (
        <label className="friends-no-results">
          No results for: {searchTerm}
        </label>
      )}

      {friends.length < 1 && <FriendsHeader />}
    </div>
  );
}
