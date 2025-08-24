# E-Commerce MERN Project

A full-stack e-commerce application built with **React (Vite)**, **Node.js/Express**, **MongoDB**, and **Cloudinary** for image storage.  
The project supports user authentication, product management, shopping cart, checkout, and profile management.

---

## Features

- User authentication (register, login, JWT auth, protected routes).
- Role-based access (admin can create/update/delete products).
- Product listing with search & filtering.
- Shopping cart with add/remove/update quantity.
- Order history & profile page (user can update profile).
- Image upload with **Cloudinary**.
- Responsive UI (mobile + desktop).

---

## Tech Stack

**Frontend**

- React (Vite)
- React Router DOM
- Axios
- Chakra UI / TailwindCSS (for styling)

**Backend**

- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Multer + Cloudinary for image uploads

**Deployment**

- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

---

## Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/azbab-eng/ecommerce-hi.git
cd ecommerce-hi

2. Backend Setup

cd backend
npm install

Create a .env file inside /backend:

PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx

Run the backend:

npm run dev

3. Frontend Setup

cd frontend
npm install

Create a .env file inside /frontend:

VITE_API_URL=http://localhost:8000

Run the frontend:

npm run dev


---

Deployment Notes

In production, set NODE_ENV=production in backend (Render dashboard).

For frontend (Vercel), set:

VITE_API_URL=Backend Url


Ensure images are uploaded to Cloudinary (so they don’t disappear after deployment).



---

Challenges & Solutions

1. Image Disappearing after Deployment

Cause: Initially storing only local file paths (/uploads/...), which worked on localhost but not on Render.

Solution: Integrated Cloudinary to permanently store and serve images. Now images are always accessible.


2. Environment Variables Exposed

Cause: Forgot to add .env to .gitignore at first, exposing secrets.

Solution: Added .env to .gitignore, reset secrets, and used Vercel/Render environment settings.


3. Cart Update Bug

Cause: Updating one cart item affected all items due to wrong state update (map logic).

Solution: Fixed reducer logic to properly update only the targeted product by productId.


4. API URL Issues (//users/login)

Cause: Double slashes in API requests when switching between localhost and production.

Solution: Used VITE_API_URL in .env and ensured no trailing slash in the URL.


5. React Error: “Objects are not valid as a React child”

Cause: Accidentally rendered an object instead of values.

Solution: Passed only strings/numbers (e.g., product.name instead of whole product object).


6. Responsiveness Issues

Cause: CSS not mobile-friendly by default.

Solution: Added media queries for mobile devices (iPhone, Android) and tested across screens.



---

For Developers

Fork the repo and create a new branch for your feature:

git checkout -b feature/your-feature

Follow commit convention (feat:, fix:, docs:, etc.).

Run ESLint/Prettier before pushing.

Submit a pull request.



---

Contact

Babalola Abdulazeez

GitHub: @azbab-eng

Portfolio: https://azbab-eng.github.io/React_potfolio/
```
