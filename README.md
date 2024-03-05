# Listings App

## Description

This is a simple web API server to work with the data of Airbnb listings.


## Endpoints

-	POST /api/listings
  
    This will request to add a new listing to MongoDB.

-	GET /api/listings

    This will accept 2 query parameters "page" and "perPage" as well as (optional) a string "name",

 	  ie: /api/listings?page=1&perPage=5&name=Volcanoes National Park.

 	  It will use these values to return all "Listings" objects for a specific "page" to the client as well as optionally filtering by "name", if provided.

-	GET /api/listings/[:_id]

    This will accept a route parameter that represents the _id of the desired listing object and return the specified listing.

-	PUT /api/listings/[:_id]

    This route must accept a route parameter that represents the _id of the desired listing object, ie: /api/listings/9696653, as well as read the contents of the request body.

 	  It will use these values to update a specific "Listing" document in the collection and return a success / fail message to the client.

-	DELETE /api/listings/[:_id]

    This route must accept a route parameter that represents the _id of the desired listing object, ie: /api/listings/9696653.

 	  It will use this value to delete a specific "Listing" document from the collection and return a success / fail message to the client.

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- Bootstrap
- REST API


## Installation

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm start` to start the server


## Deployment URL

https://dull-jade-rhinoceros-slip.cyclic.app/


## Demo


https://github.com/LomiaW/web422-assignments/assets/97309404/70c9dc55-2c0b-415d-9ef4-5dd626b80f39

