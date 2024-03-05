const express = require("express");
const app = express();
const HTTP_PORT = process.env.PORT || 8080;
const cors = require("cors");
const ListingsDB = require("./modules/listingsDB.js");
const db = new ListingsDB();
const path = require("path");
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
app.use(express.static("public"));

// setup a 'route' to listen on the default url path (http://localhost:8080/)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
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
