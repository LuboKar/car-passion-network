import React, { useState, useEffect } from "react";
import "./Friends.css";
import Friend from "./Friend";
import searchIcon from "../../../images/search.png";

export default function Friends({ friends, setFriends, userId }) {
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
        <div className="search-friends-container">
          <img src={searchIcon} alt="pic" className="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-friends-input"
          />
        </div>
      )}

      {filteredFriends.map((friend, index) => (
        <Friend
          friend={friend}
          index={index}
          userId={userId}
          setFriends={setFriends}
        />
      ))}

      {filteredFriends.length < 1 && friends.length > 1 && (
        <label className="no-results">No results for: {searchTerm}</label>
      )}
    </div>
  );
}
