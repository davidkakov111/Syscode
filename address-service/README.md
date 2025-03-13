# Address Service

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

**Base URL:** `http://localhost:3001`

* **Home/Base Endpoint:**
    * `GET /`
    * Description: Returns a basic welcome message.

* **Random Address Endpoint:**
    * `GET /address`
    * Description: Returns a randomly generated address with UUID type id. 

* **OpenAPI Documentation Endpoint:**
    * `GET /api-docs`
    * Description: Serves the Swagger UI for the API documentation.

## For more information, check out the OpenAPI Documentation Endpoint.