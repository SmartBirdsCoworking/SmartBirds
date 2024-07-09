# SmartBirds

<image width=600 src="/Screenshot 2024-07-09 at 13.44.39.png" alt="Image description">


## Project Structure

The project is organized into several main directories:

- `apps/`: This directory contains the frontend applications.
  - `mini-app/`: A mini-app telegram application for users to observe discount opportunities and generate QR-codes.
  - `mobile-app/`: A mobile app offering similar functionalities as the web dashboard for on-the-go access.

- `microservices/`: This directory contains all the microservices used in the application. Each microservice has its own subdirectory, which includes a Dockerfile for containerization (or Lambda function code) and a `terraform/` directory for infrastructure setup. The microservices include:
  - `qr-code-generator/`: Get a request with a URL and generate a QR code. Response with the URL of the QR code.
  - `qr-code-checker/`: Get a request with a QR code URL and check if the QR code is valid.
  - `notification-service/`: Dispatches real-time alerts to users based on their preferences.

- `infra/`: This directory contains the Terraform modules used to manage the infrastructure of the application. It includes a `lambda/` module for setting up AWS Lambda functions.

The project uses Python as the main programming language. Each microservice is developed, deployed, and scaled independently, allowing for greater agility and flexibility. The microservices communicate with each other via well-defined APIs.

For more detailed information about each microservice, please refer to the README file in the respective microservice directory.
