import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchAppointmentHistory(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const response = yield axios.get("/api/appointment/history/" + action.payload.id, config);
    console.log(response.data);
    yield put({ type: "SET_APPOINTMENT_HISTORY", payload: response?.data ?? [] });
  } catch (error) {
    console.log("User get request failed", error);
  }
  
}
function* scheduleAppointment(action) {
  try {

    // passes the username and password from the payload to the server
    yield axios.post('/api/appointment', action.payload);

    // automatically log a user in after registration
    yield put({ type: 'GET_APPOINTMENT_HISTORY', payload: { id: action.payload.patient_id } });


  } catch (error) {
    console.log('Error with user registration:', error);
    yield put({ type: 'REGISTRATION_FAILED' });
  }
}

function* editAppointment(action) {
  try {

    // passes the username and password from the payload to the server
    yield axios.put('/api/appointment/' + action.payload.id, action.payload);

    // automatically log a user in after registration
    yield put({ type: 'GET_APPOINTMENT_HISTORY', payload: { id: action.payload.patient_id } });


  } catch (error) {
    console.log('Error with user registration:', error);
    yield put({ type: 'REGISTRATION_FAILED' });
  }
}
function* deleteAppointment(action) {
  try {

    // passes the username and password from the payload to the server
    yield axios.delete('/api/appointment/' + action.payload.id);

    // automatically log a user in after registration
    yield put({ type: 'GET_APPOINTMENT_HISTORY', payload: { id: action.payload.patient_id } });


  } catch (error) {
    console.log('Error with user registration:', error);
    yield put({ type: 'REGISTRATION_FAILED' });
  }
}

function* appointmentSaga() {
  yield takeLatest("GET_APPOINTMENT_HISTORY", fetchAppointmentHistory);
  yield takeLatest("SCHEDULE_APPOINTMENT", scheduleAppointment);
  yield takeLatest("EDIT_APPOINTMENT", editAppointment);
  yield takeLatest("DELETE_APPOINTMENT", deleteAppointment);
}

export default appointmentSaga;
