#!/bin/bash

# Function to check if a process is running
function is_running() {
    pgrep "$1" > /dev/null 2>&1
}

# Function to start DynamoDB Local
start_dynamodb() {
    if is_running "DynamoDBLocal"; then
        echo "DynamoDB Local is already running."
    else
        echo "Starting DynamoDB Local..."
        cd ../../infra/dynamodb_local || exit
        java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb &
        cd -
        echo "DynamoDB Local started."
    fi
}

# Function to start the backend service
start_backend() {
    if is_running "backend"; then
        echo "Backend service is already running."
    else
        echo "Starting backend service..."
        cd ../../apps/backend || exit
        npm run dev &
        cd -
        echo "Backend service started."
    fi
}

# Function to start the mini-app service
start_mini_app() {
    if is_running "mini-app"; then
        echo "Mini-app service is already running."
    else
        echo "Starting mini-app service..."
        cd ../../apps/mini-app || exit
        nohup npm start &
        cd -
        echo "Mini-app service started."
    fi
}

# Start all services
start_dynamodb
start_backend
start_mini_app

echo "All services have been started."
