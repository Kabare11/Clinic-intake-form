const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * ! Endpoints for getting the  patient insurance info.
 */
router.get("/", rejectUnauthenticated, (req, res) => {
  // GET route code here
  const queryText = `SELECT * FROM "insurance" WHERE "user_id" = $1`;
  pool
    .query(queryText, [req.user.id])
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log("Get Request Of patient insurance info failed ", err);
      res.sendStatus(500);
    });
});

/**
 * * Endpoints for getting the  patient insurance info
 */
router.post("/", rejectUnauthenticated, (req, res) => {
  // POST route code here
  const newInsurance = req.body;
  const queryText = `INSERT INTO "insurance" ( "user_id", "insurance_provider", "policy_number","group_number", "subscriber_date_of_birth")
    VALUES ($1, $2, $3, $4, $5) RETURNING id`;
  pool
    .query(queryText, [
      req.user.id,
      newInsurance.insurance_provider,
      newInsurance.policy_number,
      newInsurance.group_number,
      newInsurance.subscriber_date_of_birth,
    ])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log("newEmergencyContact registration failed: ", err);
      res.sendStatus(500);
    });
});

router.put("/", rejectUnauthenticated, (req, res) => {
  const updateInsurance = req.body;
  let updateQuery = `
   UPDATE "insurance"
SET insurance_provider = $1,
policy_number = $2,
group_number = $3,
subscriber_date_of_birth = $4

WHERE user_id = $5;

   `;
  pool
    .query(updateQuery, [
      updateInsurance.insurance_provider,
      updateInsurance.policy_number,
      updateInsurance.group_number,
      updateInsurance.subscriber_date_of_birth,
      req.user.id,
    ])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log("Put new insurance info failed: ", err);
      res.sendStatus(500);
    });
});

router.delete("/", rejectUnauthenticated, (req, res) => {
  let deleteQuery = `
  DELETE FROM "insurance" 
WHERE user_id = $1;
   `;
  pool
    .query(deleteQuery, [req.user.id])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log("Delete insurance info failed: ", err);
      res.sendStatus(500);
    });
});

module.exports = router;
