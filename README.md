# Express-Backend-Dwayne-Pearson

ENDPOINTS -

Endpoints for the "companies" component require the name of the company to be submitted in the request. When searching for a company by it's ID, all of the departments that fall within that company will show.

Endpoints for the "departments" component require the request to include the name of the department, the company ID the department belongs to and the head of that particular department.

Endpoints for the "user" component require a username, password, email and full name be provided. When searching for a user by their ID, the departments for which that particular user is head over are displayed along with the users information. There is also the ability to find all of the requests sent by a specific with the /:id/requests endpoint

Endpoint for the "requests" component require all information to be filled in before a request is processed.

All components have the ability to be searched by the ID provided, updated, and deleted if necessary.