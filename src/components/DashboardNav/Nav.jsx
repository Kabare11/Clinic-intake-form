import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function DashboardNav() {
  const user = useSelector((store) => store.user);

  const location = useLocation();
  const { pathname, search } = location;

  console.log("search", search);

  return (
    <div className="dashboardnav">
      {user?.username !== "Admin" && (
        <>
          <Link
            className=""
            to="/user"
            style={{
              backgroundColor: pathname === "/user" ? "#00acb0" : "white",
              color: pathname === "/user" ? "white" : "black",
            }}
          >
            Patient Profile
          </Link>
          <Link
            className=""
            to="/appointments"
            style={{
              backgroundColor:
                pathname === "/appointments" ? "#00acb0" : "white",
              color: pathname === "/appointments" ? "white" : "black",
            }}
          >
            Appointments
          </Link>
          <Link
            className=""
            to="/insurance"
            style={{
              backgroundColor: pathname === "/insurance" ? "#00acb0" : "white",
              color: pathname === "/insurance" ? "white" : "black",
            }}
          >
            Insurance
          </Link>
          <Link
            className=""
            to="/emergency"
            style={{
              backgroundColor: pathname === "/emergency" ? "#00acb0" : "white",
              color: pathname === "/emergency" ? "white" : "black",
            }}
          >
            Emergency Contact
          </Link>
        </>
      )}
      {user?.username === "Admin" && (
        <>
          <Link
            className=""
            to="/dashboard?status=pending"
            style={{
              backgroundColor:
                pathname === "/dashboard" &&
                (search === "?status=pending" || search === "")
                  ? "#00acb0"
                  : "white",
              color:
                pathname === "/dashboard" &&
                (search === "?status=pending" || search === "")
                  ? "white"
                  : "black",
            }}
          >
            Pending Appointments
          </Link>
          <Link
            className=""
            to="/dashboard?status=approved"
            style={{
              backgroundColor:
                pathname === "/dashboard" && search === "?status=approved"
                  ? "#00acb0"
                  : "white",
              color:
                pathname === "/dashboard" && search === "?status=approved"
                  ? "white"
                  : "black",
            }}
          >
            Approved Appointments
          </Link>
          <Link
            className=""
            to="/dashboard?status=denied"
            style={{
              backgroundColor:
                pathname === "/dashboard" && search === "?status=denied"
                  ? "#00acb0"
                  : "white",
              color:
                pathname === "/dashboard" && search === "?status=denied"
                  ? "white"
                  : "black",
            }}
          >
            Declined Appointments
          </Link>
        </>
      )}
    </div>
  );
}

export default DashboardNav;
