# BioSecureGate – Biometric Identity Verification System

![BioSecureGate](https://img.shields.io/badge/Status-Active-brightgreen) ![License](https://img.shields.io/badge/License-MIT-blue) ![Version](https://img.shields.io/badge/Version-1.0.0-orange)

## 📋 Project Overview

**BioSecureGate** is a comprehensive web-based biometric identity verification system designed for airport and roadside security environments. The system provides facial and fingerprint-based verification to improve identification accuracy and reduce manual processing delays.

This is a **full-stack application** with separate frontend UI and backend biometric processing engine.

**Final Year Computing Project (PUSL3190)**  
BSc (Hons) Software Engineering  
Plymouth University (Delivered via NSBM Green University)

**Project Author:** Pulindu Nadil  
**Plymouth Index Number:** 10952727

---

## 🏗️ Project Structure

```
BioSecuregate/
├── frontend-ui/          # Next.js React Frontend Application
│   ├── app/              # Next.js app directory
│   ├── components/       # Reusable React components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions and API configuration
│   └── public/           # Static assets
│
├── backend/              # Python Flask Backend (Biometric Engine)
│   ├── app/
│   │   ├── api/          # API routes (fingerprint, facial recognition)
│   │   ├── engines/      # Biometric processing engines
│   │   ├── db/           # Database models and CRUD operations
│   │   ├── schemas/      # Request/response schemas
│   │   └── core/         # Configuration
│   ├── scripts/          # Helper scripts
│   └── requirements.txt  # Python dependencies
│
└── README.md             # This file
```

---

## 🎯 Key Features

### Frontend
- ✅ **Role-Based Access Control** - Admin and Officer interfaces
- ✅ **Biometric Enrollment** - Facial and fingerprint enrollment screens
- ✅ **Live Verification** - Real-time identity verification
- ✅ **Match & Comparison** - Side-by-side biometric matching
- ✅ **Responsive Design** - Mobile-friendly UI
- ✅ **Dark Mode Support** - Theme toggle capability
- ✅ **Real-time Results** - Instant verification feedback

### Backend
- ✅ **Facial Recognition Engine** - Face detection and verification
- ✅ **Fingerprint Recognition Engine** - Fingerprint matching and verification
- ✅ **RESTful API** - Clean API endpoints for integration
- ✅ **Database Integration** - Persistent storage of biometric data
- ✅ **Security** - Secure biometric data handling

---

## 🛠️ Technology Stack

### Frontend
- **Framework:** Next.js 14+ (React)
- **Language:** TypeScript
- **Styling:** CSS3 & Tailwind CSS
- **Package Manager:** npm/yarn
- **UI Components:** Custom + shadcn/ui
- **Features:** Dark mode, responsive design, form handling

### Backend
- **Framework:** Flask (Python)
- **Database:** SQLAlchemy ORM
- **Biometric Libraries:** OpenCV, face_recognition, fingerprint matching
- **API Format:** RESTful JSON
- **Python Version:** 3.8+

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 16+ (for frontend)
- **Python** 3.8+ (for backend)
- **Git** for version control
- **npm** or **yarn** (for Node dependencies)

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend-ui

# Install dependencies
npm install
# or
yarn install

# Run development server
npm run dev
# or
yarn dev

# Build for production
npm run build

# Start production server
npm start
```

The frontend will be available at: **http://localhost:3000**

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Initialize database
python scripts/init_db.py

# Run the backend server
python -m app.main
# or
flask run
```

The backend API will be available at: **http://localhost:8000**

---

## 📁 Frontend Structure

```
frontend-ui/
├── app/
│   ├── (auth)/              # Authentication pages (login)
│   │   └── login/
│   ├── dashboard/           # Main dashboard
│   │   ├── admin/           # Admin dashboard
│   │   ├── enroll/          # Biometric enrollment
│   │   ├── verify/          # Single verification
│   │   ├── combined-verify/ # Combined facial & fingerprint
│   │   ├── match/           # Biometric matching
│   │   └── persons/         # Manage persons
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/              # Reusable React components
│   ├── auth-form.tsx
│   ├── camera-capture.tsx
│   ├── enroll-form.tsx
│   ├── match-form.tsx
│   └── ui/                  # UI components (buttons, cards, dialogs, etc.)
├── lib/                     # Utilities
│   ├── api.ts               # API client
│   ├── api-config.ts        # API configuration
│   ├── auth.ts              # Authentication logic
│   └── utils.ts             # Helper functions
└── public/                  # Static files
```

---

## 📁 Backend Structure

```
backend/
├── app/
│   ├── api/
│   │   ├── routes.py            # Main API routes
│   │   └── fingerprint_routes.py # Fingerprint-specific routes
│   ├── engines/
│   │   ├── face_engine.py        # Facial recognition logic
│   │   └── fingerprint_engine.py # Fingerprint matching logic
│   ├── db/
│   │   ├── models.py             # Database models
│   │   ├── crud.py               # CRUD operations
│   │   └── session.py            # Database session
│   ├── schemas/
│   │   ├── biometric.py          # Facial data schema
│   │   ├── fingerprint.py        # Fingerprint data schema
│   │   └── verify.py             # Verification schema
│   ├── core/
│   │   └── config.py             # Configuration
│   └── main.py                   # Application entry point
├── scripts/
│   └── init_db.py                # Database initialization
└── requirements.txt              # Python dependencies
```

---

## 🔌 API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user

### Facial Recognition
- `POST /api/enroll` - Enroll a face
- `POST /api/verify` - Verify a face
- `POST /api/match` - Match two faces
- `GET /api/persons` - List all enrolled persons
- `DELETE /api/persons/{id}` - Delete a person

### Fingerprint Recognition
- `POST /api/fingerprint/enroll` - Enroll fingerprint
- `POST /api/fingerprint/verify` - Verify fingerprint
- `POST /api/fingerprint/match` - Match fingerprints

---

## 👥 User Roles

### Admin
- Manage enrollment/verification processes
- View system statistics
- Manage officers
- Access reports

### Officer
- Perform identity verification
- Enroll new biometric data
- View personal verification history
- Search persons database

---

## 🔐 Security Features

- ✅ **Role-Based Access Control** - Different permissions for roles
- ✅ **Session Management** - Secure user sessions
- ✅ **Data Encryption** - Biometric data encryption
- ✅ **API Authentication** - JWT token-based auth
- ✅ **Input Validation** - Server-side input validation
- ✅ **CORS Protection** - Cross-origin request handling

---

## 🧪 Testing

### Frontend Testing
```bash
cd frontend-ui
npm run test      # Run tests
npm run lint      # Run linter
npm run type-check # TypeScript check
```

### Backend Testing
```bash
cd backend
pytest            # Run pytest suite
python -m coverage run -m pytest  # Coverage report
```

---

## 📝 Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_API_TIMEOUT=30000
```

### Backend (.env)
```
DATABASE_URL=sqlite:///./test.db
SECRET_KEY=your-secret-key-here
DEBUG=True
FLASK_ENV=development
```

---

## 🤝 Contributing

1. Create a new branch for your feature
2. Commit your changes with clear messages
3. Push to the branch
4. Submit a pull request

---

## 📚 Documentation

- **Frontend Components:** See [frontend-ui/README.md](./frontend-ui/README.md)
- **Backend API:** See [backend/README..md](./backend/README..md)
- **Setup Guide:** See Getting Started section above

---

## 🐛 Known Issues & TODO

- [ ] Complete fingerprint matching algorithm
- [ ] Add real-time dashboard analytics
- [ ] Implement audit logging
- [ ] Add multi-language support
- [ ] Performance optimization for large datasets

---

## 📞 Support & Contact

For issues, questions, or contributions:
- **GitHub Issues:** [Open an issue](https://github.com/pngurusinghe/BioSecuregate/issues)
- **Author:** Pulindu Nadil
- **Email:** [Add your contact email]

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- Plymouth University (NSBM Green University)
- Open-source biometric libraries (OpenCV, face_recognition)
- React and Next.js communities
- All contributors and supporters

---

## 📊 Project Status

| Component | Status | Last Updated |
|-----------|--------|--------------|
| Frontend UI | ✅ Active Development | March 2026 |
| Backend Engine | ✅ Active Development | March 2026 |
| Documentation | 📝 In Progress | March 2026 |
| Testing | 🔄 Planned | Q2 2026 |

---

**Made with ❤️ for security and innovation**
