#!/bin/bash

# Function to kill background processes on exit
cleanup() {
    echo "Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit
}

trap cleanup SIGINT SIGTERM

echo "Starting Backend (main.py)..."
python3 main.py &
BACKEND_PID=$!

echo "Waiting for backend to initialize (this might take a moment if downloading models)..."
sleep 5

echo "Starting Frontend (frontend/server.py)..."
python3 frontend/server.py &
FRONTEND_PID=$!

echo "App is running!"
echo "Frontend: http://localhost:3000"
echo "Backend: http://localhost:5000"
echo "Press Ctrl+C to stop."

wait
