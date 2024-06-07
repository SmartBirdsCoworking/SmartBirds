# Microservices

## Overview
Backend services powering the application, including qr-code generation, qr-code verification,

## Structure


## Development
Microservice could be containerized with Docker or be a Lambda function. Refer to individual service READMEs for setup instructions.

## Deployment
Microservices can be deployed by Terraform using ECS or AWS Lambda. Refer to individual service READMEs for deployment instructions.



## Notes
* **Focused Functionality**: Microservices are a style of architecture where the application is structured as a collection of loosely coupled services. Each microservice focuses on a single business capability, runs in its own process, and communicates with other services via well-defined APIs.
* **Independence**: Microservices are developed, deployed, and scaled independently. This allows for greater agility and flexibility in development and deployment, as changes can be made to a single service without impacting the rest of the system.
* **Interoperability and Scalability**: This architectural style supports better scalability and interoperability among different parts of a software system. Because each microservice is independent, different microservices can be written in different programming languages, use different data storage technologies, and be scaled independently based on demand.