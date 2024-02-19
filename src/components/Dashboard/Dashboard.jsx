import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DashboardNav from "../DashboardNav/Nav";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function AdminDashboard() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const appointments = useSelector((store) => store.appointments);
  console.log(appointments);
  const dispatch = useDispatch();
  // const profile = useSelector((store) => store.profile);
  useEffect(() => {
    if (user?.id) {
      dispatch({
        type: "GET_ALL_APPOINTMENTS",
      });
    }
  }, [dispatch, user]);

  useEffect(() => {
    dispatch({ type: "GET_PATIENT_PROFILE" });
  }, [dispatch]);

  const [showPopup, setShowPopup] = useState(false);
  const [isEdit, setIsEdit] = useState(null);

  const approveOrDeny = (id, status) => {
    dispatch({
      type: "APPROVE_OR_DENY_APPOINTMENT",
      payload: { id, is_approved: status },
    });
  };

  const location = useLocation();
  const { search } = location;

  return (
    <div className="container appointments-page">
      <DashboardNav />
      <div className="appointment-header"></div>
      <div className="appointments">
        {appointments?.length &&
          appointments
            ?.filter(
              (x) => x.is_approved === search.split("=")[1] || search === ""
            )
            .map((appointment) => (
              <div className="one-appointment" key={appointment?.id}>
                <div className="appointment-title">
                  <h2>
                    Appointment On{" "}
                    {processDate(new Date(appointment?.appointment_time))}
                  </h2>
                  <span
                    style={{
                      color:
                        appointment?.is_approved === "approved"
                          ? "green"
                          : appointment?.is_approved === "pending"
                          ? "gray"
                          : "red",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-info"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4" />
                      <path d="M12 8h.01" />
                    </svg>
                    {appointment?.is_approved}
                  </span>
                </div>

                <p>{appointment?.reason}</p>
                <div className="appointment-details">
                  <p>Language Preference: {appointment?.language_preference}</p>
                  <p>
                    Feeling Pain: {appointment?.feeling_pain ? "Yes" : "No"}
                  </p>
                  <p>
                    Has Family History Headache:{" "}
                    {appointment?.has_family_history_headache ? "Yes" : "No"}{" "}
                  </p>
                  <p>
                    Has Migraine: {appointment?.has_migraine ? "Yes" : "No"}
                  </p>
                </div>

                {
                  // only show the buttons if the appointment is pending
                }
                {appointment?.is_approved === "pending" && (
                  <div className="appointment-btns">
                    <button
                      className="delete-btn"
                      onClick={() => {
                        approveOrDeny(appointment.id, "denied");
                      }}
                    >
                      Decline{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-x"
                      >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                    </button>
                    <button
                      className="edit-btn"
                      onClick={() => {
                        approveOrDeny(appointment.id, "approved");
                      }}
                    >
                      Approve
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-check"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            ))}
      </div>
    </div>
  );
}

// this allows us to useLocation <App /> in index.js
export default AdminDashboard;

const processDate = (date) => {
  const dateObj = new Date(date);
  // generate date in format of March 21st, 2022 from date object
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = dateObj.getDate();
  const monthIndex = dateObj.getMonth();
  const year = dateObj.getFullYear();

  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  return `${monthNames[monthIndex]} ${day}, ${year} at ${
    hours < 10 ? `0${hours}` : hours
  }${minutes < 10 ? `:0${minutes}` : `:${minutes}`}`;
};
