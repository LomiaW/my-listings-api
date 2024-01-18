/********************************************************************************
*  WEB422 – Assignment 1
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: __LOMIA WU___ Student ID: ___116492182___ Date: ____2024-01-17__________
*
*  Published URL:   https://dull-jade-rhinoceros-slip.cyclic.app/
*
********************************************************************************/


const express = require("express");
const app = express();
const HTTP_PORT = process.env.PORT || 8080;
const cors = require("cors");
const ListingsDB = require("./modules/listingsDB.js");
const db = new ListingsDB();
require("dotenv").config();

// Setup MongoDB connection
db.initialize(process.env.MONGODB_CONN_STRING)
   .then(() => {
      app.listen(HTTP_PORT, () => {
         console.log(`server listening on: ${HTTP_PORT}`);
      });
   })
   .catch((err) => {
      console.log(err);
   });

app.use(cors());
app.use(express.json());

// setup a 'route' to listen on the default url path (http://localhost)
app.get("/", (req, res) => {
   res.json({ message: "API Listening" });
});


// POST /api/listings
app.post("/api/listings", (req, res) => {
   db.addNewListing(req.body)
      .then((msg) => {
         res.status(201).json(msg);
      })
      .catch((err) => {
         res.status(400).json({ message: err.message });
      });
});

// GET /api/listings
app.get("/api/listings", (req, res) => {
   db.getAllListings(req.query.page, req.query.perPage, req.query.name)
      .then((listings) => {
         res.status(200).json(listings);
      })
      .catch((err) => {
         res.status(400).json({ message: err.message });
      });
});

// GET /api/listings/:id
app.get("/api/listings/:id", (req, res) => {
   db.getListingById(req.params.id)
      .then((listing) => {
         res.status(200).json(listing);
      })
      .catch((err) => {
         res.status(400).json({ message: err.message });
      });
});

// PUT /api/listings/:id
app.put("/api/listings/:id", (req, res) => {
   db.updateListingById(req.body, req.params.id)
      .then((msg) => {
         res.status(200).json(msg);
      })
      .catch((err) => {
         res.status(400).json({ message: err.message });
      });
});

// DELETE /api/listings/:id
app.delete("/api/listings/:id", (req, res) => {
   db.deleteListingById(req.params.id)
      .then((msg) => {
         res.status(200).json(msg);
      })
      .catch((err) => {
         res.status(400).json({ message: err.message });
      });
});
