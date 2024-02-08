
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const {
   rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * ! Endpoints for getting the full patient profile.
 */
router.get('/', rejectUnauthenticated, (req, res) => {
   // GET route code here
   const queryText = `SELECT * FROM "patient_profile" WHERE "user_id" = $1`
   pool
      .query(queryText, [req.user.id])
      .then((result) => res.send(result.rows))
      .catch((err) => {
         console.log('Get Request Of patient profile failed ', err);
         res.sendStatus(500);
      });

});

/**
 * * endpoint for creating a new patient profile.
 */
router.post('/', rejectUnauthenticated, (req, res) => {
   // POST route code here
   const newPatient = req.body
   const queryText = `INSERT INTO "patient_profile" ( "user_id", "img", "address","has_covid", "has_left_country_recently", "date_of_birth")
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;
   pool
      .query(queryText, [req.user.id, newPatient.img, newPatient.address, newPatient.has_covid, newPatient.has_left_country_recently, newPatient.date_of_birth])
      .then(() => res.sendStatus(201))
      .catch((err) => {
         console.log('patient profile registration failed: ', err);
         res.sendStatus(500);
      });
});

module.exports = router;
