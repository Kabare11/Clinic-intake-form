import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchEmergencyContact() {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const response = yield axios.get("/api/emergency", config);
    console.log(response.data);
    if (response.data.length > 0) { yield put({ type: "SET_EMERGENCY_CONTACT", payload: response.data[0] }) };
  } catch (error) {
    console.log("Emergency Contact get request failed", error);
  }
}
function* createEmergencyContact(action) {
  try {

    // passes the username and password from the payload to the server
    yield axios.post('/api/emergency', action.payload);

    // automatically log a user in after registration
    yield put({ type: 'GET_EMERGENCY_CONTACT' });


  } catch (error) {
    console.log('Error with user registration:', error);
    yield put({ type: 'REGISTRATION_FAILED' });
  }
}

function* editEmergencyContact(action) {
  try {

    // passes the username and password from the payload to the server
    yield axios.put('/api/emergency', action.payload);

    // automatically log a user in after registration
    yield put({ type: 'GET_EMERGENCY_CONTACT' });


  } catch (error) {
    console.log('Error with user registration:', error);
    yield put({ type: 'REGISTRATION_FAILED' });
  }
}

function* emergencySaga() {
  yield takeLatest("GET_EMERGENCY_CONTACT", fetchEmergencyContact);
  yield takeLatest("CREATE_EMERGENCY_CONTACT", createEmergencyContact);
  yield takeLatest("EDIT_EMERGENCY_CONTACT", editEmergencyContact);
}

export default emergencySaga;
