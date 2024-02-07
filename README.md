# Amusement Park Backend

This repository contains the code for an Amusement Park, designed to manage and serve data related to parks and rides. Built with Node.js and Express, it features a RESTful API structure, database integration, and a seeding mechanism for initial data setup. It manages CRUD (Create, Read, Update, Delete) operations on a database, enabling dynamic content management and information retrieval.

## Application Structure and Features

The application showcases the MCV (Model-Controller-View) pattern, emphasizing backend operations with a focus on models and controllers to manage data flow and API responses.

### Express App File

Serves as the core of the application, defining endpoints that facilitate CRUD operations:

- **GET**: Retrieves data, enabling the server to provide information upon request.
- **POST**: Adds new data entries into the database, allowing for the dynamic addition of content.
- **PATCH/PUT**: Updates existing data entries, ensuring information is current.
- **DELETE**: Removes data entries, allowing for database management and cleanup.

### Controllers and Models

- **Controllers**: Handle client requests by invoking the appropriate model functions based on the request's details (path, params, queries, and body).
- **Models**: Interact with the SQL PostgreSQL database, performing operations to fetch, update, create, and delete data as instructed by the controllers.

### Database Integration

- **SQL PostgreSQL Database**: Created programmatically from JSON with `node-postgres` and `pg-format`, allowing for flexible and scalable data management.
- **Connection Pooling**: Utilizes the `pg.Pool` class for efficient database connection management, enhancing performance and scalability.


