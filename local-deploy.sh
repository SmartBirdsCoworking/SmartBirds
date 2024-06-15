#!/bin/bash

# Function to check if a process is running
function is_running() {
    pgrep -f "$1" > /dev/null 2>&1
}

# Function to start DynamoDB Local
start_dynamodb() {
    if is_running "DynamoDBLocal"; then
        echo "DynamoDB Local is already running."
    else
        echo "Starting DynamoDB Local..."
        cd infra/dynamodb_local || exit
        java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb &
        cd -
        echo "DynamoDB Local started."
    fi
}

# Function to create tables in DynamoDB Local
create_dynamodb_tables() {
    if is_running "DynamoDBLocal"; then
        echo "Creating tables in DynamoDB Local..."
        cd apps/backend || exit
        node createTable.js
        cd -
        echo "Tables created in DynamoDB Local."
    else
        echo "DynamoDB Local is not running."
    fi
}

# Function to stop DynamoDB Local
stop_dynamodb() {
    if is_running "DynamoDBLocal"; then
        echo "Stopping DynamoDB Local..."
        pkill -f "DynamoDBLocal"
        echo "DynamoDB Local stopped."
    else
        echo "DynamoDB Local is not running."
    fi
}

# Function to start the backend service
start_backend() {
    if is_running "backend"; then
        echo "Backend service is already running."
    else
        echo "Starting backend service..."
        cd apps/backend || exit
        npm run dev &
        cd -
        echo "Backend service started."
    fi
}

# Function to stop the backend service
stop_backend() {
    if is_running "backend"; then
        echo "Stopping backend service..."
        pkill -f "backend"
        echo "Backend service stopped."
    else
        echo "Backend service is not running."
    fi
}

# Function to start the mini-app service
start_mini_app() {
    if is_running "mini-app"; then
        echo "Mini-app service is already running."
    else
        echo "Starting mini-app service..."
        cd apps/mini-app || exit
        nohup npm start &
        cd -
        echo "Mini-app service started."
    fi
}

# Function to stop the mini-app service
stop_mini_app() {
    if is_running "mini-app"; then
        echo "Stopping mini-app service..."
        pkill -f "mini-app"
        echo "Mini-app service stopped."
    else
        echo "Mini-app service is not running."
    fi
}

# Function to test the backend service
test_backend() {
    echo "Testing backend service..."
    response=$(timeout 10s curl --write-out %{http_code} --output /dev/null http://localhost:3000/api/health)
    if [ "$response" -eq 200 ]; then
        echo "Backend service is running successfully."
    else
        echo "Backend service test failed. HTTP status code: $response"
    fi
}

# Function to test the mini-app service
test_mini_app() {
    echo "Testing mini-app service..."
    response=$(curl --write-out %{http_code} --output /dev/null http://localhost:3001)
    if [ "$response" -eq 200 ]; then
        echo "Mini-app service is running successfully."
    else
        echo "Mini-app service test failed. HTTP status code: $response"
    fi
}

# Function to stop all services
stop_all_services() {
    stop_dynamodb
    stop_backend
    stop_mini_app
}

# Main script logic
if [ "$1" == "stop" ]; then
    stop_all_services
else
    # Start all services
    start_dynamodb
    start_backend
    start_mini_app

    # Wait for a few seconds to let the services start
    sleep 10
    create_dynamodb_tables

    # Test all services
    test_backend
    test_mini_app

    echo "All services have been started and tested."
fi
