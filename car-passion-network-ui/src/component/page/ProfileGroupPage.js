import React from "react";
import { useParams } from "react-router-dom";
import Groups from "../group/Groups";

export default function ProfileGroupPage() {
  const { id } = useParams();

  return (
    <div className="profile-group-page-container">
      <Groups userId={id} />
    </div>
  );
}
