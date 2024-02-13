import React, { useState } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import DashboardNav from "../DashboardNav/Nav";
import { useEffect } from "react";

function Appointments() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const appointments = useSelector((store) => store.appointments);
  console.log(appointments);
  const dispatch = useDispatch();
  const profile = useSelector((store) => store.profile);
  useEffect(() => {
    if (profile?.id) {
      dispatch({
        type: "GET_APPOINTMENT_HISTORY",
        payload: { id: profile.id },
      });
    }
  }, [dispatch, profile]);

  useEffect(() => {
    dispatch({ type: "GET_PATIENT_PROFILE" });
  }, [dispatch]);

  const [showPopup, setShowPopup] = useState(false);
  const [isEdit, setIsEdit] = useState(null);
  return (
    <div className="container appointments-page">
      <DashboardNav />
      <div className="appointment-header">
        <h1>Appointments</h1>
        <button className="save-btn" onClick={() => setShowPopup(true)}>
          Schedule Appointment
        </button>
      </div>
      <div className="appointments">
        {appointments?.length &&
          appointments?.map((appointment) => (
            <div className="one-appointment" key={appointment?.id}>
              <h2>
                Appointment On{" "}
                {processDate(new Date(appointment?.appointment_time))}
              </h2>
              <p>{appointment?.reason}</p>
              <div className="appointment-details">
                <p>Language Preference: {appointment?.language_preference}</p>
                <p>Feeling Pain: {appointment?.feeling_pain ? "Yes" : "No"}</p>
                <p>
                  Has Family History Headache:{" "}
                  {appointment?.has_family_history_headache ? "Yes" : "No"}{" "}
                </p>
                <p>Has Migraine: {appointment?.has_migraine ? "Yes" : "No"}</p>
              </div>
              <div className="appointment-btns">
                <button
                  className="edit-btn"
                  onClick={() => {
                    setIsEdit(appointment);
                    setShowPopup(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => {
                    dispatch({
                      type: "DELETE_APPOINTMENT",
                      payload: { id: appointment.id, patient_id: profile.id },
                    });
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
      {showPopup && (
        <AppointmentPopUp
          closePopup={() => {
            setIsEdit(null);
            setShowPopup(false);
          }}
          isEdit={isEdit}
        />
      )}
    </div>
  );
}

// this allows us to use <App /> in index.js
export default Appointments;

function AppointmentPopUp({ isEdit, closePopup }) {
  const dispatch = useDispatch();
  const profile = useSelector((store) => store.profile);
  console.log(profile);
  const [appointmentTime, setAppointmentTime] = useState("");
  const [reason, setReason] = useState("");
  const [languagePreference, setLanguagePreference] = useState("English");
  const [feelingPain, setFeelingPain] = useState(true);
  const [historyHeadache, setHistoryHeadache] = useState(false);
  const [hasMigraine, setHasMigraine] = useState(false);

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
    const newAppointment = {
      appointment_time: appointmentTime,
      reason: reason,
      language_preference: languagePreference,
      feeling_pain: feelingPain === "yes" ? true : false,
      has_family_history_headache: historyHeadache === "yes" ? true : false,
      has_migraine: hasMigraine === "yes" ? true : false,
      patient_id: profile?.id ?? "",
      id: isEdit?.id ?? undefined,
    };
    if (isEdit?.id) {
      dispatch({
        type: "EDIT_APPOINTMENT",
        payload: newAppointment,
      });
    } else {
      dispatch({
        type: "SCHEDULE_APPOINTMENT",
        payload: newAppointment,
      });
    }
    closePopup();
  };
  useEffect(() => {
    if (isEdit?.id) {
      setAppointmentTime(formatDate(new Date(isEdit?.appointment_time)));
      setReason(isEdit?.reason);
      setLanguagePreference(isEdit?.language_preference);
      setFeelingPain(isEdit?.feeling_pain ? "yes" : "no");
      setHistoryHeadache(isEdit?.has_family_history_headache ? "yes" : "no");
      setHasMigraine(isEdit?.has_migraine ? "yes" : "no");
    }
  }, [isEdit]);

  return (
    <section className="popup">
      <div className="popup-content">
        <h2>{isEdit ? "Edit Appointment" : "Create New Appointment"}</h2>
        <form className="create-appointment">
          <div className="group">
            <label htmlFor="appointment_time">Appointment Time</label>
            <input
              type="date"
              name="appointment_time"
              id="appointment_time"
              value={formatDate(
                appointmentTime?.length > 0
                  ? new Date(appointmentTime)
                  : undefined
              )}
              onChange={(e) => {
                setAppointmentTime(new Date(e.target.value).toISOString());
              }}
            />
          </div>
          <div className="group">
            <label htmlFor="reason">Reason</label>
            <input
              type="text"
              name="reason"
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
          <div className="group">
            <label htmlFor="Language_preference">Language Preference</label>
            <select
              name="Language_preference"
              id="Language_preference"
              value={languagePreference}
              onChange={(e) => setLanguagePreference(e.target.value)}
            >
              <option value="english">English</option>
              <option value="Somali">Somali</option>
            </select>
          </div>
          <div className="group">
            <label htmlFor="Feeling_pain">Are You Feelin Pain Now?</label>
            <select
              name="Feeling_pain"
              id="Feeling_pain"
              value={feelingPain}
              onChange={(e) => setFeelingPain(e.target.value)}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="group">
            <label htmlFor="Family_history_headache">
              Any Family History Of Headache??
            </label>
            <select
              name="Family_history_headache"
              id="Family_history_headache"
              value={historyHeadache}
              onChange={(e) => setHistoryHeadache(e.target.value)}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="group">
            <label htmlFor="has_migraine">Do You Have a Migraine?</label>
            <select
              name="has_migraine"
              id="has_migraine"
              value={hasMigraine}
              onChange={(e) => setHasMigraine(e.target.value)}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="create-btns">
            <button className="cancel-btn" onClick={() => closePopup()}>
              Cancel
            </button>
            <button className="save-btn" onClick={submit}>
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

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
