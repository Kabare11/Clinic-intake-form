import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector } from "react-redux";

function DashboardNav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link className="" to="/user">
        Patient Profile
      </Link>
      <Link className="" to="/appointments">
        Appointments
      </Link>
      <Link className="" to="/insurance">
        Insurance
      </Link>
      <Link className="" to="/emergency_contact">
        Emergency Contact
      </Link>
    </div>
  );
}

export default DashboardNav;
