import React from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import DashboardNav from "../DashboardNav/Nav";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"; 

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const profile = useSelector((store) => store.profile);
  console.log(profile);
  const dispatch = useDispatch();

  const [address, setAddress] = useState("");
  const [hasLeftCountry, setHasLeftCountry] = useState(false);
  const [hasCovid, setHasCovid] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState("");
  console.log(dateOfBirth, profile?.date_of_birth);
  useEffect(() => {
    dispatch({ type: "GET_PATIENT_PROFILE" });
  }, [dispatch]);

  function formatDate(date) {
    if (!date) return;
    console.log(date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month starts from 0
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const submit = (event) => {
    event.preventDefault();
    const newProfile = {
      address: address.length > 0 ? address : profile?.address ?? "",
      has_covid: hasCovid === "yes" ? true : false,
      has_left_country_recently: hasLeftCountry === "yes" ? true : false,
      date_of_birth: dateOfBirth ?? profile?.date_of_birth,
      img: "",
    };
    if (profile?.id) {
      dispatch({
        type: "EDIT_PATIENT_PROFILE",
        payload: newProfile,
      });
    } else {
      dispatch({
        type: "CREATE_PATIENT_PROFILE",
        payload: newProfile,
      });
    }
  };
  useEffect(() => {
    if (profile?.id) {
      setAddress(profile?.address);
      setHasCovid(profile?.has_covid ? "yes" : "no");
      setHasLeftCountry(profile?.has_left_country_recently ? "yes" : "no");
      setDateOfBirth(formatDate(new Date(profile?.date_of_birth)));
      console.log(profile?.date_of_birth);
    }
  }, [profile]);
  return (
    <div className="container">
      <DashboardNav />

      <form className="patient_profile">
        <div className="group">
          <label htmlFor="img">Upload Patient Image</label>
          <input type="file" name="img" id="img" />
        </div>
        <div className="group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="group">
          <label htmlFor="has_covid">Do You Have Covid?</label>
          <select
            name="has_covid"
            id="has_covid"
            value={hasCovid}
            onChange={(e) => setHasCovid(e.target.value)}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="group">
          <label htmlFor="has_left_country_recently">
            Did You Leave The Country Recently?
          </label>
          <select
            name="has_left_country_recently"
            id="has_left_country_recently"
            value={hasLeftCountry}
            onChange={(e) => setHasLeftCountry(e.target.value)}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="group">
          <label htmlFor="date_of_birth">Date Of Birth</label>
          <input
            type="date"
            name="date_of_birth"
            id="date_of_birth"
            value={formatDate(
              dateOfBirth?.length > 0 ? new Date(dateOfBirth) : undefined
            )}
            onChange={(e) => {
              console.log(new Date(e.target.value).toISOString());
              setDateOfBirth(new Date(e.target.value).toISOString());
            }}
          />
        </div>
        <button className="save-btn" onClick={submit}>
          Save
        </button>
      </form>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
