/********************************************************************************
*  WEB422 – Assignment 2
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: _____LOMIA WU_______ Student ID: ___116492182___ Date: ___2024-02-01____
*
********************************************************************************/


/* Global Variables */
var page = 1;
var perPage = 10;
var searchName = null;

/* Functions */
function loadListingsData() {

  // check if the global variable "searchName" is null or not
  let url = searchName
						? `/api/listings?page=${page}&perPage=${perPage}&name=${searchName}`
						: `/api/listings?page=${page}&perPage=${perPage}`;

	// make a "fetch" request to listings API using the url
  fetch(url)
		.then((res) => {
			return res.ok ? res.json() : Promise.reject(res.status);
		})
		.then((data) => {
			if (data.length) {

				// create the <tr> elements
				let listingsRows = `
					${data.map((listing) => (
						`<tr data-id="${listing._id}">
							<td>${listing.name}</td>
							<td>${listing.room_type}</td>
							<td>${listing.address.street}</td>
							<td>${listing.summary}<br><br>
							<strong>Accommodates:</strong> ${listing.accommodates}<br>
							<strong>Rating:</strong> ${listing.review_scores.review_scores_rating} (${listing.number_of_reviews} Reviews)
							</td>
						</tr>`
					)).join('')}`;

				// add the <tr> elements to the DOM
				document.querySelector('#listingsTable tbody').innerHTML = listingsRows;

				// update the current page
				document.querySelector('#current-page').textContent = page;

				// add the "click" event listener to each row
				document.querySelectorAll('#listingsTable tbody tr').forEach((row) => {
					row.addEventListener('click', (e) => {

						// get the id of the listing
						let id = e.currentTarget.getAttribute('data-id');

						// make a "fetch" request to the listings API using the id
						fetch(`/api/listings/${id}`)
							.then((res) => {
								return res.ok ? res.json() : Promise.reject(res.status);
							})
							.then((data) => {

								// set the modal title
								document.querySelector('#detailsModal .modal-title').textContent = data.name;

								// create the modal body content
								let modalContent = `
									<img id="photo" onerror="this.onerror=null;this.src='https://placehold.co/600x400?text=Photo+Not+Available'" 
										class="img-fluid w-100" src="${data.images.picture_url}"><br><br>
									${data.neighborhood_overview}<br><br>
									<strong>Price:</strong> $${data.price.toFixed(2)}<br>
									<strong>Room:</strong> ${data.room_type}<br>
									<strong>Bed:</strong> ${data.bed_type} (${data.beds})<br>
								`;

								// add the modal content to the DOM
								document.querySelector('#detailsModal .modal-body').innerHTML = modalContent;

								// show the modal
								let modal = new bootstrap.Modal(document.getElementById('detailsModal'), {
									backdrop: 'static',
									keyboard: false,
								});
								modal.show();

							});
					});
				});
			} else {
				if (page > 1) {
					page--; // prevent the user from paging any further
				} else {
					let msg = `<tr><td colspan="4"><strong>No data available</td></tr>`;
					document.querySelector('#listingsTable tbody').innerHTML = msg;
				}
			}
		})
		.catch((err) => {
			let msg = `<tr><td colspan="4"><strong>No data available</td></tr>`;
			document.querySelector('#listingsTable tbody').innerHTML = msg;
		});
}

// Execute data fetching when the DOM is 'ready'
document.addEventListener('DOMContentLoaded', () => {
	loadListingsData();
	// add the "click" event listener to the previous button
	document.querySelector('#previous-page').addEventListener('click', (e) => {
		if (page > 1) {
			page--;
			loadListingsData();
		}
	});
	// add the "click" event listener to the next button
	document.querySelector('#next-page').addEventListener('click', (e) => {
		page++;
		loadListingsData();
	});
	// add the "submit" event listener to the seartch button
	document.querySelector('#searchForm').addEventListener('submit', (e) => {
		e.preventDefault(); // prevent the default form submission
		searchName = e.target[0].value; // get the search input value
		page = 1;
		loadListingsData();
	});
	// add the "click" event listener to the clear button
	document.querySelector('#clearForm').addEventListener('click', (e) => {
		searchName = null;
		page = 1;
		loadListingsData();
	});
});
