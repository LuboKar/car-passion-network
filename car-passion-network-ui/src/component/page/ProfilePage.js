import React from "react";
import Navbar from "../pageUtils/Navbar";
import VerticalNavbar from "../pageUtils/VerticalNavbar";
import RightVerticalNabvar from "../pageUtils/RightVerticalNavbar";
import Profile from "../pageUtils/Profile";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await fetch(`http://localhost:8080/users/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const userData = await response.json();
      setUser(userData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="test">
      <Navbar />
      <VerticalNavbar />
      <RightVerticalNabvar className="right-navbar" />
      {!loading && <Profile user={user} />}
    </div>
  );
}
