# Coming Soon V2

A modern, responsive "Coming Soon" landing page featuring a dynamic background, countdown timer, and email subscription functionality.

## Features

-   **Modern Design**: Glassmorphism UI with dynamic particle background.
-   **Responsive**: Fully optimized for desktop and mobile devices.
-   **Countdown Timer**: Real-time countdown to the launch date.
-   **Email Subscription**: Users can subscribe to get notified.
-   **Backend Integration**: Simple Node.js server to save subscribed emails to a JSON file.

## Prerequisites

-   [Node.js](https://nodejs.org/) (v14 or higher recommended)
-   npm (Node Package Manager)

## Installation

1.  Clone the repository or navigate to the project directory:
    ```bash
    cd comming-soon-v2
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

## Usage

1.  Start the server:
    ```bash
    npm start
    ```
    The server will start at `http://localhost:3000`.

2.  Open your browser and visit `http://localhost:3000`.

3.  **To Subscribe**:
    -   Click the "Notify me when live" button.
    -   Enter your email address in the modal.
    -   Click "Subscribe".
    -   The email will be saved to `emails.json`.

## Project Structure

-   `index.html`: The main HTML file.
-   `style.css`: Stylesheet for the landing page and modal.
-   `script.js`: Frontend logic for countdown, particles, and modal interactions.
-   `server.js`: Node.js Express server to handle API requests.
-   `emails.json`: JSON file where subscribed emails are stored.
