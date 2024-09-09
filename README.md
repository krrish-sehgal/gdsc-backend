# **Backend API for File Upload, Authentication, and Socket Pub/Sub**

This project implements a backend API for user authentication, file upload management, and socket-based pub/sub functionality. The API is built with Node.js and deployed on AWS, running with `pm2` for process management.

## **Getting Started**

### **Build Setup**

1. Install all required dependencies:
   ```bash
   npm install
2. Set the environment variables in the .env file:
   MONGO_URI="mongodb://your_mongo_uri"
    JWT_SECRET="your_jwt_secret"
    JWT_LIFETIME="1h"
    PORT=3000
3. Run the application:
   node app.js
4. The application is running on the AWS instance, accessible via the base URL:
   http://3.109.13.175/

Authentication API Routes

POST /auth/register
Description: Register a new user.
Request Body:
{
  "username": "your_username",
  "password": "your_password"
}

POST /auth/login
Description: Log in a user and retrieve a JWT token.
Request Body:

{
  "username": "your_username",
  "password": "your_password"
}

GET /auth/logout
Description: Log out the user.
Request Body:

{
  "username": "your_username",
  "password": "your_password"
}


File CRUD API Routes

POST /files
Description: Uploads a new file.

Request Header:
Authorization: Bearer <token>
Form Data:
file: The file to upload.

Response:

{
  "success": true,
  "message": "File uploaded successfully",
  "file": {
    "id": "file_id",
    "filename": "uploaded_filename"
  }
}

GET /files/
Description: Retrieves a file by its ID.
Request Header:
Authorization: Bearer <token>

Response: The requested file is returned as a binary file download.
PUT /files/
Description: Updates an existing file.
Request Header:

Authorization: Bearer <token>
Form Data:

file: The new file to replace the old one.
Response:

{
  "success": true,
  "message": "File updated successfully",
  "file": {
    "id": "file_id",
    "filename": "updated_filename"
  }
}

DELETE /files/
Description: Deletes a file by its ID.
Request Header:

Authorization: Bearer <token>
Response:

{
  "success": true,
  "message": "File deleted successfully"
}


Socket Pub/Sub

Go to the root URL and interact with the socket-based pub/sub functionality.
