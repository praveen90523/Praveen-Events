# Praveen Events - Full-Stack MERN Event Management Platform

This project is a complete, production-ready MERN stack application converted from a frontend-only React + Vite project. It features user authentication, event booking management, client message handling, dynamic service packages, custom blogs, and gallery uploads.

---

## 📂 Project Architecture

```text
PraveenEvents/
│
├── Frontend/                 # React + Vite + Tailwind CSS Frontend
│   ├── public/               # Static assets
│   ├── src/                  # React source files
│   │   ├── services/
│   │   │   └── api.js        # Axios instance configured for API requests
│   │   ├── Form/
│   │   │   ├── Form.jsx      # Dynamic event booking form
│   │   │   └── Contact.jsx   # Dedicated Contact Us form
│   │   └── ...
│   ├── package.json
│   ├── vite.config.js
│   └── .env                  # Frontend environment settings (API URL)
│
├── Backend/                  # Node.js + Express + Mongoose Backend
│   ├── server.js             # Main server entry point
│   ├── package.json          # Backend dependencies & scripts
│   ├── .env                  # Port, MongoDB URI, JWT and SMTP credentials
│   ├── config/
│   │   └── db.js             # MongoDB connection helper
│   ├── controllers/
│   │   ├── authController.js     # Signup, Login, Logout handlers
│   │   ├── bookingController.js  # Booking CRUD & Notifications
│   │   ├── contactController.js  # Contact Submissions & Notifications
│   │   ├── serviceController.js  # Service Packages CRUD
│   │   ├── blogController.js     # Blog posts CRUD
│   │   ├── galleryController.js  # Multer upload & photo deletion
│   │   └── statsController.js    # Statistics aggregator
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT Verification guard
│   │   ├── adminMiddleware.js    # Admin role guard
│   │   └── errorHandler.js       # Global exception handler
│   ├── models/
│   │   ├── User.js               # Mongoose User Model (Bcrypt pre-save)
│   │   ├── Booking.js            # Mongoose Booking Model
│   │   ├── Contact.js            # Mongoose Contact Model
│   │   ├── Service.js            # Mongoose Service Model
│   │   ├── Blog.js               # Mongoose Blog Model
│   │   ├── Gallery.js            # Mongoose Gallery Model
│   │   └── Testimonial.js        # Mongoose Testimonial Model
│   ├── routes/                   # Router configs for all resources
│   ├── utils/
│   │   └── sendEmail.js          # Nodemailer SMTP transporter helper
│   └── uploads/                  # Local folder for Multer uploaded images
│
└── README.md
```

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16+) installed
- MongoDB installed locally or a MongoDB Atlas connection URI

### 1. Backend Setup
1. Open the backend directory:
   ```bash
   cd Backend
   ```
2. Create/update the `.env` file with your credentials (see example template below).
3. Start the backend in development mode (with Nodemon):
   ```bash
   npm run dev
   ```
   *The server runs by default on `http://localhost:5000`.*

### 2. Frontend Setup
1. Open the frontend directory:
   ```bash
   cd Frontend
   ```
2. Check/create a `.env` file to set the API endpoint:
   ```env
   VITE_API_URL=https://praveen-events.onrender.com
   ```
3. Run the Vite development server:
   ```bash
   npm run dev
   ```
   *The client runs by default on `http://localhost:5173`.*

---

## 🔑 Environment Variables Configuration (`Backend/.env`)

Configure the following fields in `Backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/praveenevents  # Or your MongoDB Atlas connection string
JWT_SECRET=super_secret_praveen_events_jwt_key_123456
JWT_EXPIRES_IN=7d

# SMTP Configuration (Used for sending booking & contact notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=d.praveen2026@gmail.com
SMTP_PASS=your_gmail_app_password
SMTP_FROM=d.praveen2026@gmail.com
SMTP_FROM_NAME="Praveen Events"

# CORS Setup
FRONTEND_URL=http://localhost:5173
```

---

## 📡 API Reference Endpoints

### 🔒 Authentication
- `POST /api/auth/register` - Create user account (Admin role supported via `role: "admin"`)
- `POST /api/auth/login` - Verify credentials and return JWT cookie/json
- `POST /api/auth/logout` - Clear JWT authentication cookie

### 📅 Booking Management
- `POST /api/bookings` - Submit an event booking (triggers confirmation email to client)
- `GET /api/bookings` - Get all bookings list (Admin only)
- `GET /api/bookings/:id` - Fetch single booking details
- `PUT /api/bookings/:id/status` - Accept or reject booking (triggers alert email to client; Admin only)
- `DELETE /api/bookings/:id` - Delete booking record (Admin only)

### 📬 Contact Submissions
- `POST /api/contact` - Submit a message (triggers notification email to admin)
- `GET /api/contact` - View all contact inquiries list (Admin only)

### 🎨 Service Packages
- `GET /api/services` - Get active event categories list
- `POST /api/services` - Create event category (Admin only)
- `DELETE /api/services/:id` - Remove service package (Admin only)

### ✍️ Blogs Management
- `GET /api/blogs` - Read all blog articles
- `POST /api/blogs` - Create new blog article (Admin only)
- `DELETE /api/blogs/:id` - Remove blog post (Admin only)

### 📸 Gallery Management
- `GET /api/gallery` - Retrieve all gallery images
- `POST /api/gallery` - Upload local file (multipart/form-data) or submit web image URL (Admin only)
- `DELETE /api/gallery/:id` - Delete photo record and remove local file from disk (Admin only)

### 📊 Statistics
- `GET /api/stats` - Fetch total counts and aggregated chart data (Admin only)

---

## 🚀 Deployment Instructions

### Database
1. Create a free cluster on **MongoDB Atlas**.
2. Add your server's IP address (or `0.0.0.0/0` for any IP) to the Atlas IP access list.
3. Copy the connection string and use it as `MONGO_URI` in production.

### Backend (Render)
1. Link your GitHub repository to **Render.com**.
2. Create a new **Web Service**, choosing the node engine.
3. Set the **Build Command** to: `cd Backend && npm install`
4. Set the **Start Command** to: `cd Backend && node server.js`
5. In the **Environment Variables** tab, define all keys matching `Backend/.env` (e.g. `MONGO_URI`, `JWT_SECRET`, `SMTP_PASS`, etc.).

### Frontend (Vercel)
1. Import your repository into **Vercel**.
2. Set the **Build Command** to: `vite build`
3. Set the **Output Directory** to: `dist`
4. Define the Environment Variable `VITE_API_URL` pointing to your deployed Render URL (e.g., `https://your-backend.onrender.com/api`).
