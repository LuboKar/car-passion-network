import React from "react";
import "./Information.css";
import nameIcon from "../../../images/name.png";
import dateOfBirth from "../../../images/dateOfBirth.png";
import email from "../../../images/email.png";
import gender from "../../../images/gender.png";
import creationDate from "../../../images/creationDate.png";
import InformationData from "./InformationData";

export default function Information({ user }) {
  return (
    <div className="information-container">
      <InformationData
        icon={nameIcon}
        header="Full name:"
        content={`${user.firstName} ${user.lastName}`}
      />

      <InformationData
        icon={dateOfBirth}
        header="Date of birth:"
        content={user.dateOfBirth}
      />

      <InformationData icon={email} header="Email:" content={user.email} />

      <InformationData icon={gender} header="Gender:" content={user.gender} />

      <InformationData
        icon={creationDate}
        header="Created at:"
        content={user.createdDate}
      />
    </div>
  );
}
