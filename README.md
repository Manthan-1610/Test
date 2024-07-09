# Interactive Map Web Application for Real-Time Crime Reporting

## Core Features

1. **User Authentication and Authorization**
   - User Registration/Login: Secure login for users (citizens, police, admin) with different access levels.
   - OAuth Integration: Allow users to log in using social media accounts (e.g., Google, Facebook).

2. **Real-Time Crime Reporting**
   - Report Submission: Users can submit crime reports with details such as type of crime, location, time, description, and optional media (photos/videos).
   - Geolocation: Automatically fetch user's location for accurate reporting.
   - Anonymous Reporting: Option for users to report crimes anonymously.

3. **Interactive Map**
   - Map Display: Display a real-time, interactive map showing crime reports.
   - Clustering: Group nearby crime reports to prevent map clutter.
   - Heatmaps: Show intensity of crime in different areas using heatmaps.

4. **Search and Filter**
   - Search Functionality: Users can search for reports by location, type of crime, date, etc.
   - Filter Options: Allow users to filter crime reports based on categories like type, date range, severity, etc.

## Project Structure

### Backend (Python/Flask)
- **app.py**: Backend application logic for handling API requests, user authentication, and serving static files.
- **crime_reports.csv**: Example data file for crime reports.
- **uploads/**: Directory for storing uploaded media files related to crime reports.

### Frontend (React)
- **App.js**: Main React application file.
- **index.js**: Entry point for the React application.
- **components/**: Directory containing React components.
  - **Dashboard.jsx**: Component for displaying the dashboard.
  - **Header.jsx**: Component for the header.
  - **Layout.jsx**: Layout component.
  - **NoMatch.jsx**: Component for handling non-matching routes.
  - **ReportForm.jsx**: Form component for submitting crime reports.
- **styles/**: Directory containing CSS files for styling components.
  - **App.css**
  - **Dashboard.css**
  - **Header.css**
  - **ReportForm.css**
  - **index.css**

## Installation

1. Clone the repository:
   ```sh
   git clone <repository_url>
   cd <repository_name>
    ```

2. Set up the backend:
  ```sh
  cd 'Main Page with sign in/backend'
  pip install -r requirements.txt
  python app.py
  ```

3. Set up the frontend:
  ```sh
  cd 'Main Page with sign in/react'
  npm install
  npm start
  ```

4. Set up the map functionality
  ```sh
  cd 'map functionality'
  pip install -r requirements.txt
  python app.py
  ```
