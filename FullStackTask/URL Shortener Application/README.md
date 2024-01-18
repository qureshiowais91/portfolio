
### Backend Endpoints:

1. **Check Email Endpoint:**
   - **Endpoint:** `POST /api/check-email`
   - **Functionality:** Checks if the entered email exists in the database.
   - **Request Payload:** `{ "email": "user@example.com" }`
   - **Response (Success):** `{ "exists": true }` or `{ "exists": false }`

2. **Reset Password Endpoint:**
   - **Endpoint:** `POST /api/reset-password`
   - **Functionality:** Validates the token sent from the email link and resets the password if valid.
   - **Request Payload:** `{ "token": "uniqueToken", "newPassword": "newPassword" }`
   - **Response (Success):** `{ "success": true }` or `{ "error": "Token expired or invalid" }`

### Frontend Routes:

1. **Reset Password Component:**
   - **Route:** `/reset-password`
   - **Component:** Renders the form for users to enter their email.
   - **Form Fields:** Email input and submit button.

2. **Reset Password Link Clicked Component:**
   - **Route:** `/reset-password/:token`
   - **Component:** Handles the verification of the token from the URL and allows users to reset their password.
   - **Displays:** New password input, confirm password input, and submit button.

3. **Success or Error Page:**
   - **Route:** `/reset-password/:token/success` or `/reset-password/:token/error`
   - **Component:** Renders success or error messages based on the response from the backend.
   - **Displays:** Success message if the password reset was successful or an error message if the token is invalid or expired.

### Flow:

- **Reset Password Component:** User enters email and clicks submit.
  - **Success:** Redirects to a success message page if the email exists.
  - **Error:** Redirects to an error message page if the email doesn't exist.

- **Reset Password Link Clicked Component:** User clicks the link in the email.
  - **Success:** Renders a form to reset the password if the token is valid.
  - **Error:** Redirects to an error message page if the token is invalid or expired.

- **Success or Error Page:** Displays the success message or error message based on the outcome of the password reset attempt.
