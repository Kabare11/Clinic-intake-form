const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

const {
   rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * ! Endpoints for getting the patient appointment.
 */

router.get("/history/:id", rejectUnauthenticated, (req, res) => {
   // GET route code here
   const queryText = `SELECT * FROM "appointment" WHERE "patient_id" = $1`;
   pool
      .query(queryText, [req.params.id])
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
   const queryText = `INSERT INTO "appointment" ( "patient_id","appointment_time", "reason", "language_preference", "feeling_pain", "has_family_history_headache","has_migraine")
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`;

   queryParams = [
      newAppointment.patient_id,
      newAppointment.appointment_time,
      newAppointment.reason,
      newAppointment.language_preference,
      newAppointment.feeling_pain,
      newAppointment.has_family_history_headache,
      newAppointment.has_migraine,
   ]
   pool
      .query(queryText, queryParams)
      .then(() => res.sendStatus(201))
      .catch((err) => {
         console.log("new Appointment patient failed: ", err);
         res.sendStatus(500);
      });
});

router.put("/:id", rejectUnauthenticated, (req, res) => {
   const updateAppointment = req.body;
   let updateQuery = `
     UPDATE "appointment"
  SET appointment_time = $1,
  reason = $2,
  language_preference = $3,
  feeling_pain = $4,
  has_family_history_headache = $5,
  has_migraine = $6


  WHERE id = $7;

     `;
   pool
      .query(updateQuery, [
         updateAppointment.appointment_time,
         updateAppointment.reason,
         updateAppointment.language_preference,
         updateAppointment.feeling_pain,
         updateAppointment.has_family_history_headache,
         updateAppointment.has_migraine,

         req.params.id,
      ])
      .then(() => res.sendStatus(201))
      .catch((err) => {
         console.log("Put new appointment failed: ", err);
         res.sendStatus(500);
      });
});

router.delete("/:id", rejectUnauthenticated, (req, res) => {
   let deleteQuery = `
    DELETE FROM "appointment"
  WHERE id = $1;
     `;
   pool
      .query(deleteQuery, [req.params.id])
      .then(() => res.sendStatus(201))
      .catch((err) => {
         console.log("Delete new appointment profile failed: ", err);
         res.sendStatus(500);
      });
});


// ADMIN endpoints, we check if admin by checking username = "Admin"

// fetch all appointments
router.get("/admin", rejectUnauthenticated, (req, res) => {
   const queryText = `SELECT * FROM "appointment" ORDER BY "appointment_time" DESC`;
   pool
      .query(queryText)
      .then((result) => res.send(result.rows))
      .catch((err) => {
         console.log("Get Request Of patient appointment failed ", err);
         res.sendStatus(500);
      });
});


// approve or deny appointment
router.put("/admin/:id", rejectUnauthenticated, (req, res) => {
   const updateAppointment = req.body;
   let updateQuery = `
     UPDATE "appointment"
  SET is_approved = $1
  WHERE id = $2;
     `;
   pool
      .query(updateQuery, [
         updateAppointment.is_approved,
         req.params.id,
      ])
      .then(() => res.sendStatus(201))
      .catch((err) => {
         console.log("Put new appointment failed: ", err);
         res.sendStatus(500);
      });
});



module.exports = router