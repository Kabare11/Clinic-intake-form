import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchInsuranceInfo() {
   try {
      const config = {
         headers: { "Content-Type": "application/json" },
         withCredentials: true,
      };
      const response = yield axios.get("/api/insurance", config);
      console.log(response.data);
      if (response.data.length > 0) { yield put({ type: "SET_INSURANCE_INFO", payload: response.data[0] }) };
   } catch (error) {
      console.log("Insurance Information get request failed", error);
   }
}
function* createInsuranceInfo(action) {
   try {

      // passes the username and password from the payload to the server
      yield axios.post('/api/insurance', action.payload);

      // automatically log a user in after registration
      yield put({ type: 'GET_INSURANCE_INFO' });


   } catch (error) {
      console.log('Error with user registration:', error);
      yield put({ type: 'REGISTRATION_FAILED' });
   }
}

function* editInsuranceInfo(action) {
   try {

      // passes the username and password from the payload to the server
      yield axios.put('/api/emergency', action.payload);

      // automatically log a user in after registration
      yield put({ type: 'GET_INSURANCE_INFO' });


   } catch (error) {
      console.log('Error with user registration:', error);
      yield put({ type: 'REGISTRATION_FAILED' });
   }
}

function* insuranceSaga() {
   yield takeLatest("GET_INSURANCE_INFO", fetchInsuranceInfo);
   yield takeLatest("CREATE_INSURANCE_INFO", createInsuranceInfo);
   yield takeLatest("EDIT_INSURANCE_INFO", editInsuranceInfo);
}

export default insuranceSaga;
