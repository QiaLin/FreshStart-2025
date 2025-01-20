Prerequisites

Ensure the following tools are installed on your machine:

    Python 3.x (for the backend)
    Node.js and npm (for the frontend)
    Git (for cloning the repository)

1. Clone the Repository

First, clone your project repository from GitHub:

git clone https://github.com/QiaLin/FreshStart-2025.git
cd FreshStart-2025

2. Set Up the Backend (Python/Flask)
Step 1: Create and Activate a Virtual Environment

Navigate to the backend folder and create a virtual environment to manage Python dependencies:

cd backend
python3 -m venv venv  # Create a virtual environment
source venv/bin/activate  # Activate the virtual environment (on Windows, use `venv\Scripts\activate`)

Step 2: Install Required Dependencies

You will need to install Flask and other required libraries. Run the following command to install the necessary packages:

pip install flask flask-cors

    flask: The core framework for building your backend.
    flask-cors: A library to handle Cross-Origin Resource Sharing (CORS) if you're running the frontend and backend on different ports.

Step 3: Set Up Flask

run the python file in backend folder using command line in WINDOWS/any system run python.

By default, this will start the server at http://127.0.0.1:5000/.
Step 4: Verify the Backend


3. Set Up the Frontend (React)


Step 1: Install Node.js Dependencies

Navigate to the frontend folder and install the required JavaScript dependencies using npm:

cd ../frontend/freshstart  # Navigate to the frontend folder
npm install  # Install the required npm packages

This will install the necessary React dependencies and any libraries defined in the package.json file.

Step 2: Start the React Development Server

Start the React development server using the following command:

npm start

By default, this will start the React app on http://localhost:3000/.
4. Connect Frontend and Backend/Development Workflow

    Backend:
        To start the backend server, run flask run in the backend folder.
        Any changes to backend code will reflect once the Flask server is restarted.

    Frontend:
        To run the React frontend, use npm start in the frontend folder.
        React will automatically refresh when you save changes to frontend code.
## ONLY ONE COMMAND WINDOW FOR BACKEND PYTHON FLASK AND THE OTHER FOR FRONTEND REACT 

5. Additional Tips

    Virtual Environment: Always activate the virtual environment in the backend by running source venv/bin/activate (or venv\Scripts\activate on Windows) to ensure you’re using the correct dependencies.

    Frontend Proxy: If you are developing locally, set the proxy field in your frontend/package.json to point to the Flask server URL. This simplifies the setup and avoids CORS issues.

    CORS: If you don't want to use the proxy method, enable CORS in your Flask backend using the flask-cors library, which ensures smooth communication between the frontend and backend.

Conclusion

By following these steps, you will have both the backend (Flask) and frontend (React) running locally. The backend will serve API endpoints, and the frontend will handle user interaction, making the FreshStart2025 app fully functional.

You can now iterate on both the backend and frontend to develop features, fix bugs, and improve the user experience.
