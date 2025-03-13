# Syscode Project

This is the main README file for the Syscode project.

This project consists of the following components:

* **Address Service:** A microservice for managing address data.
* **Profile Service:** A microservice for managing student profile data.
* **Angular UI:** A client to interact with the services easily.

## Project Structure

The repository contains the following top-level directories:

* `address-service/`: Contains the code and related files for the Address Service.
* `profile-service/`: Contains the code and related files for the Profile Service.
* `SyscodeCli/`: Contains the code and related files for the CLI.

## Running the Project

The services can be run independently. However, it is recommended to have both services running if you intend to use the CLI, as the CLI is designed to interact with both.

To run each component, please refer to the `README.md` file located in the respective component's directory. Each of these README files provides specific instructions on how to start, configure, and use that particular part of the project.

* `address-service/README.md`
* `profile-service/README.md`
* `SyscodeCli/README.md`

## Key Considerations

* **Service Interdependence:** While the services can be run independently, the CLI tool relies on both services to function fully.
* **Detailed Instructions:** Detailed instructions for each component, including dependencies, configuration, and run commands, are provided in their respective README files.