import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import CreatePost from "./CreatePost";

export default function Posts({ user, setUser }) {
  const [loggedUser, setLoggedUser] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const decodedToken = jwtDecode(token);
    const id = decodedToken.userId;
    setLoggedUser(id);
  }, []);
  return (
    <div>{loggedUser === user.id && <CreatePost setUser={setUser} />}</div>
  );
}
