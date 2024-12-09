import React, { useState, useEffect } from "react";
import "./Friends.css";
import Friend from "./Friend";
import searchIcon from "../../../images/search.png";
import SearchBar from "../navbar/SearchBar";

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
        <div className="friends-search-bar-container">
          <SearchBar
            searchTerm={searchTerm}
            handleSearchChange={handleSearchChange}
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

      {filteredFriends.length < 1 && friends.length > 0 && (
        <label className="friends-no-results">
          No results for: {searchTerm}
        </label>
      )}
    </div>
  );
}
