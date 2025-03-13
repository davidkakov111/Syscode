# Profile Service

## Prerequisites

* Docker and Docker Compose installed.

## Getting Started

* First create your .env file in the project root based on .env.example.

* **Start the project:**
    ```bash
    docker compose up
    ```
    
## Running Tests

* **Integration & Unit Tests:**
    ```bash
    docker compose run --rm test npm test
    ```
    
* **Load Test:**
    ```bash
    docker compose run --rm test npm run load-test
    ```
    
## API Endpoints

**Base URL:** `http://localhost:3000`

* **Home/Base Endpoint:**
    * `GET /`
    * Description: Returns a basic welcome message.

* **Read Endpoint (Listázás):**
    * `GET /read`
    * Description: Retrieves all students.

* **Create Endpoint (Új felvitel):**
    * `POST /create`
    * Description: Creates a new student.
    * Request Body: JSON object containing email and name {"email": "email@gmail.com", "name": "John"}.

* **Update Endpoint (Módosítás):**
    * `PUT /update/:id`
    * Description: Updates an existing student with the given `id`.
    * Request Body: JSON object containing at least the name or email. Ex.: {"email": "email@gmail.com", "name": "John"}

* **Delete Endpoint (Törlés):**
    * `DELETE /delete/:id`
    * Description: Deletes the student with the given `id`. 

* **OpenAPI Documentation Endpoint:**
    * `GET /api-docs`
    * Description: Serves the Swagger UI for the API documentation.

## For more information, check out the OpenAPI Documentation Endpoint.
