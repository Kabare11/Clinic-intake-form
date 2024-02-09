import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchProfile() {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const response = yield axios.get("/api/patient", config);
    console.log(response.data);
    yield put({ type: "SET_PROFILE", payload: response.data[0] });
  } catch (error) {
    console.log("User get request failed", error);
  }
}
function* createPatientProfile(action) {
  try {

    // passes the username and password from the payload to the server
    yield axios.post('/api/patient', action.payload);

    // automatically log a user in after registration
    yield put({ type: 'GET_PATIENT_PROFILE' });


  } catch (error) {
    console.log('Error with user registration:', error);
    yield put({ type: 'REGISTRATION_FAILED' });
  }
}

function* editPatientProfile(action) {
  try {

    // passes the username and password from the payload to the server
    yield axios.put('/api/patient', action.payload);

    // automatically log a user in after registration
    yield put({ type: 'GET_PATIENT_PROFILE' });


  } catch (error) {
    console.log('Error with user registration:', error);
    yield put({ type: 'REGISTRATION_FAILED' });
  }
}

function* profileSaga() {
  yield takeLatest("GET_PATIENT_PROFILE", fetchProfile);
  yield takeLatest("CREATE_PATIENT_PROFILE", createPatientProfile);
  yield takeLatest("EDIT_PATIENT_PROFILE", editPatientProfile);
}

export default profileSaga;
