import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Information from "../pageUtils/user/Information";
import { getUser } from "../service/UserService";

export default function ProfileInformationPage() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [loadingUser, setLoadingUser] = useState(true);

  const fetchUser = async () => {
    const response = await getUser(id);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const userData = await response.json();
    setUser(userData);
    setLoadingUser(false);
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="profile-information-page-container">
      {!loadingUser && <Information user={user} />}
    </div>
  );
}
