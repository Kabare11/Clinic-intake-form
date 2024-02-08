const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

const {
   rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * ! Endpoints for getting the patient appointment.
 */
router.get("/", rejectUnauthenticated, (req, res) => {
   // GET route code here
   const queryText = `SELECT * FROM "appointment" WHERE "user_id" = $1`;
   pool
      .query(queryText, [req.user.id])
      .then((result) => res.send(result.rows))
      .catch((err) => {
         console.log("Get Request Of patient appointment failed ", err);
         res.sendStatus(500);
      });
});

/**
 * * endpoint for creating the patient appointment.
 */
router.post("/", rejectUnauthenticated, (req, res) => {
   // POST route code here
   const newAppointment = req.body;
   const queryText = `INSERT INTO "appointment" ( "user_id", "patient_id", "appointment_time","reason", "language_preference", "feeling_pain", "has_family_history_of_headache","has_migraine")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`;
   pool
      .query(queryText, [
         req.user.id,
         newAppointment.patient_id,
         newAppointment.appointment_time,
         newAppointment.reason,
         newAppointment.language_preference,
         newAppointment.feeling_pain,
         newAppointment.has_family_history_of_headache,
         newAppointment.has_migraine
      ])
      .then(() => res.sendStatus(201))
      .catch((err) => {
         console.log("new Appointment patient failed: ", err);
         res.sendStatus(500);
      });
});