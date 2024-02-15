import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import DashboardNav from "../DashboardNav/Nav";

function InsuranceInfo() {
  //! Create useState for all form field
  const [insuranceProvider, setInsuranceProvider] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");
  const [groupNumber, setGroupNumber] = useState("");
  const [subscriberDateOfBirth, setSubscriberDateOfBirth] = useState("");

  //* Fetch the currenct insurance information from the store.
  const insurance = useSelector((store) => store.insurance);

  const dispatch = useDispatch();

  function formatDate(date) {
    if (!date) return;
    console.log(date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month starts from 0
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  //! The submit function is called as soon as the save button is clicked.
  //! it is used to create a new einsurance information or edit an existing one.
  const submit = (event) => {
    event.preventDefault();

    //* Create an object for the insurance information data.
    const newInsuranceInfo = {
      insurance_provider: insuranceProvider,
      policy_number: policyNumber,
      group_number: groupNumber,
      subscriber_date_of_birth: subscriberDateOfBirth,
    };

    //! Check if we have an existing insurance information.
    if (insurance?.id) {
      dispatch({
        type: "EDIT_INSURANCE_INFO",
        payload: newInsuranceInfo,
      });
    } else {
      dispatch({
        type: "CREATE_INSURANCE_INFO",
        payload: newInsuranceInfo,
      });
    }
  };

  useEffect(() => {
    dispatch({ type: "GET_INSURANCE_INFO" });
  }, [dispatch]);

  //* Use these useEffects to prefill the insurance details
  //* if we have an existing insurance information.
  useEffect(() => {
    if (insurance?.id) {
      setInsuranceProvider(insurance?.insurance_provider);
      setPolicyNumber(insurance?.policy_number);
      setGroupNumber(insurance?.group_number);
      setSubscriberDateOfBirth(
        formatDate(new Date(insurance?.subscriber_date_of_birth))
      );
    }
  }, [insurance]);

  return (
    <div className="container">
      <DashboardNav />
      <form className="insurance">
        <div className="group">
          <label htmlFor="insurance_provider">Insurance Provider</label>
          <input
            type="text"
            name="insurance_provider"
            id="insurance_provider"
            value={insuranceProvider}
            onChange={(e) => setInsuranceProvider(e.target.value)}
          />
        </div>
        <div className="group">
          <label htmlFor="policy_number">Policy Number</label>
          <input
            type="number"
            name="policy_number"
            id="policy_number"
            value={policyNumber}
            onChange={(e) => setPolicyNumber(e.target.value)}
          />
        </div>
        <div className="group">
          <label htmlFor="group_number">Group Number</label>
          <input
            type="number"
            name="group_number"
            id="group_number"
            value={groupNumber}
            onChange={(e) => setGroupNumber(e.target.value)}
          />
        </div>
        <div className="group">
          <label htmlFor="subscriber_date_of_birth">
            Subscriber Date Of Birth
          </label>
          <input
            value={formatDate(
              subscriberDateOfBirth?.length > 0
                ? new Date(subscriberDateOfBirth)
                : undefined
            )}
            type="date"
            name="subscriber_date_of_birth"
            id="subscriber_date_of_birth"
            onChange={(e) => setSubscriberDateOfBirth(e.target.value)}
          />
        </div>

        <button className="save-btn" onClick={submit}>
          Save
        </button>
      </form>
    </div>
  );
}
export default InsuranceInfo;
