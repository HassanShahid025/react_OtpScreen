# OTP Verification System

## Project Overview
This project implements a simple OTP (One-Time Password) verification system using React for the frontend and Express.js for the backend. The system includes:
- A React-based OTP input screen with validation and navigation.
- An Express.js backend with API endpoints for OTP verification.

## Features
### Frontend (React & TypeScript)
- Six individual input fields for entering a 6-digit OTP.
- Automatic navigation between input fields.
- Deletion support: Pressing backspace moves to the previous field.
- Numeric-only restriction on inputs.
- Resend OTP functionality with a 30-second timer.
- Submit button enabled only when all six digits are entered.
- API integration for OTP verification.
- Displays success or failure messages based on API responses.

### Backend (Express.js & Node.js)
- `/api/otp/verifyOtp` (POST) - Verifies the OTP.

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- Node.js (LTS version recommended)
- npm or yarn
- A React development environment (Vite or Create React App)

### Backend Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/HassanShahid025/react_otpScreen
   cd server
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file:
   ```sh
   PORT=3000
   ```
4. Start the backend server:
   ```sh
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend application:
   ```sh
   npm run dev
   ```

## API Endpoints
### Verify OTP
- **URL:** `POST /api/otp/verifyOtp`
- **Request Body:**
  ```json
  {
    "otp": "123456"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "OTP Verified Successfully"
  }
  ```

---
### Author
Developed by Hassan Shahid 🚀

