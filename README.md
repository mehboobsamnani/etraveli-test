# Swap API for Star wars and IMDB 

> a web application that enables users to search for GitHub repositories based on their input.
## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mehboobsamnani/etraveli-test.git
2. Install Dependencies:
    ```bash
    cd etraveli-test
    npm install
## Running Project
```bash
npm run start
```
open http://localhost:3000 in your browser
## Running Project through docker.
1. Build the Docker image:
   ```bash
   docker build -t my-react-app .
2. Run the Docker container:
    ```bash
    docker run -p 3000:3000 my-react-app
open http://localhost:3000 in your browser    
## Unit Test
```bash
npm run test
```
To run test coverage
```bash
npm run test:cover
```
## Cypress Testing
Cypress is used for end-to-end testing. To run the Cypress tests, follow these steps:
1. Start the development server:
   ```bash
   npm run start
2. In a separate terminal, run the Cypress tests:
    ```bash
    cd graphql-react
    npm run cy:run
