const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

const {
   rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * ! Endpoints for getting the full patient emergency contact.
 */
router.get("/", rejectUnauthenticated, (req, res) => {
   // GET route code here
   const queryText = `SELECT * FROM "emergency" WHERE "user_id" = $1`;
   pool
      .query(queryText, [req.user.id])
      .then((result) => res.send(result.rows))
      .catch((err) => {
         console.log("Get Request Of patient emergency contact failed ", err);
         res.sendStatus(500);
      });
});

/**
 * * endpoint for creating a new patient emergency contact.
 */
router.post("/", rejectUnauthenticated, (req, res) => {
   // POST route code here
   const newEmergencyContact = req.body;
   const queryText = `INSERT INTO "emergency" ( "user_id", "name", "relationship","email", "address", "phone_number")
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;
   pool
      .query(queryText, [
         req.user.id,
         newEmergencyContact.name,
         newEmergencyContact.relationship,
         newEmergencyContact.email,
         newEmergencyContact.address,
         newEmergencyContact.phone_number,
      ])
      .then(() => res.sendStatus(201))
      .catch((err) => {
         console.log("newEmergencyContact registration failed: ", err);
         res.sendStatus(500);
      });
});

router.put("/", rejectUnauthenticated, (req, res) => {
   const updateEmergency = req.body;
   let updateQuery = `
   UPDATE "emergency"
SET name = $1,
    relationship = $2,
    email = $3,
    address = $4,
    phone_number = $5
WHERE user_id = $6;

   `;
   pool
      .query(updateQuery, [
         updateEmergency.name,
         updateEmergency.relationship,
         updateEmergency.email,
         updateEmergency.address,
         updateEmergency.phone_number,
         req.user.id,
      ])
      .then(() => res.sendStatus(201))
      .catch((err) => {
         console.log("Put new emergency contact failed: ", err);
         res.sendStatus(500);
      });
});

router.delete("/", rejectUnauthenticated, (req, res) => {
   let deleteQuery = `
  DELETE FROM "emergency" 
WHERE user_id = $1;
   `;
   pool
      .query(deleteQuery, [req.user.id])
      .then(() => res.sendStatus(201))
      .catch((err) => {
         console.log("Delete emergency contact failed: ", err);
         res.sendStatus(500);
      });
});

module.exports = router;
