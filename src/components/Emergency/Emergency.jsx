import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import DashboardNav from "../DashboardNav/Nav";
import { useHistory } from "react-router-dom";

function EmergencyContact() {
  //! Create useState for all form field
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  //* Fetch the currenct emergency contact from the store.
  const emergency = useSelector((store) => store.emergency);

  const dispatch = useDispatch();
  const history = useHistory();

  //! The submit function is called as soon as the save button is clicked.
  //! it is used to create a new emergency contact or edit an existing one.
  const submit = (event) => {
    event.preventDefault();

    //* Create an object for the emergency contact data.
    const newEmergencyContact = {
      name: name,
      relationship: relationship,
      email: email,
      address: address,
      phone_number: phoneNumber,
    };

    //! Check if we have an existing emergency contact.
    if (emergency?.id) {
      dispatch({
        type: "EDIT_EMERGENCY_CONTACT",
        payload: newEmergencyContact,
      });
    } else {
      dispatch({
        type: "CREATE_EMERGENCY_CONTACT",
        payload: newEmergencyContact,
      });
    }
    history.push("/appointments");
  };

  useEffect(() => {
    dispatch({ type: "GET_EMERGENCY_CONTACT" });
  }, [dispatch]);

  //* Use these useEffects to prefill the emergency details
  //* if we have an existing emergency contact.
  useEffect(() => {
    if (emergency?.id) {
      setName(emergency?.name);
      setRelationship(emergency?.relationship);
      setEmail(emergency?.email);
      setAddress(emergency?.address);
      setPhoneNumber(emergency?.phone_number);
    }
  }, [emergency]);

  return (
    <div className="container">
      <DashboardNav />
      <form className="patient_profile">
        <div className="group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="group">
          <label htmlFor="relationship">Relationship</label>
          <input
            type="text"
            name="relationship"
            id="relationship"
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
          />
        </div>
        <div className="group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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
          <label htmlFor="phone_number">Phone Number</label>
          <input
            type="text"
            name="phone_number"
            id="phone_number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <button className="save-btn" onClick={submit}>
          Save
        </button>
      </form>
    </div>
  );
}
export default EmergencyContact;
