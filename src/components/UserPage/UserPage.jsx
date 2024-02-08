import React from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";
import DashboardNav from "../DashboardNav/Nav";

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <DashboardNav />
      <form>
        <div>
          <label htmlFor="img">Upload Patient Image</label>
          <input type="file" name="img" id="img" />
        </div>
        <div>
          <label htmlFor="address"></label>
          <input type="text" name="address" id = "address" />
        </div>
      </form>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
