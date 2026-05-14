# BioSecuregate - Biometric Authentication Engine

A comprehensive biometric authentication and verification system supporting fingerprint recognition, facial recognition, and secure identity verification. Built with FastAPI backend, Next.js frontend, and advanced ML models for biometric processing.

## 🎯 Features

- **Fingerprint Recognition**: Advanced fingerprint matching and enrollment using state-of-the-art algorithms
- **Facial Recognition**: Real-time face detection, recognition, and verification
- **Multi-Modal Biometrics**: Combined fingerprint and facial authentication
- **Secure Authentication**: OAuth integration with Supabase
- **Admin Dashboard**: Comprehensive management interface for officers and users
- **RESTful API**: Complete API endpoints for biometric operations
- **Real-time Camera Capture**: Live camera integration for biometric enrollment
- **Enrollment Management**: User enrollment, updates, and deletion workflows
- **Audit Logging**: Complete audit trail for security and compliance

## 📋 Project Structure

```
biometric-engine-staging/
├── app/                          # FastAPI Backend
│   ├── api/                      # API route handlers
│   │   ├── fingerprint_routes.py    # Fingerprint V1 endpoints
│   │   ├── fingerprint_v2_routes.py # Fingerprint V2 endpoints
│   │   ├── auth_routes.py          # Authentication endpoints
│   │   └── admin_routes.py         # Admin management endpoints
│   ├── engines/                  # Biometric processing engines
│   │   ├── fingerprint_engine.py    # Fingerprint matching engine
│   │   ├── fingerprint_engine_v2.py # Advanced fingerprint engine
│   │   └── face_engine.py          # Facial recognition engine
│   ├── auth/                     # Authentication services
│   │   ├── service.py              # Core auth logic
│   │   ├── supabase_service.py     # Supabase integration
│   │   └── dependencies.py         # FastAPI dependencies
│   ├── schemas/                  # Pydantic data models
│   ├── storage/                  # Storage backends
│   └── core/                     # Core configuration
│
├── model_service/                # ML Model Service
│   └── main.py                   # Model serving service
│
├── scanner_agent/                # Scanner Agent Service
│   ├── backends.py               # Backend implementations
│   └── server.py                 # Agent server
│
├── bio-secure-gate-ui-build/     # Next.js Frontend
│   ├── app/                      # Next.js app directory
│   ├── components/               # React components
│   ├── hooks/                    # Custom React hooks
│   └── lib/                      # Utility functions
│
├── scripts/                      # Utility scripts
│   ├── init_db.py               # Database initialization
│   ├── seed_admin.py            # Admin user seeding
│   └── smoke_test.py            # Integration tests
│
├── supabase/                     # Database migrations
│   └── schema.sql               # Database schema
│
└── static/                       # Static assets
```

## 🚀 Quick Start

### Prerequisites

- Python 3.9+
- Node.js 18+
- Docker & Docker Compose
- Supabase account

### Backend Setup

1. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Configure environment variables:**
   Create a `.env` file in the root directory:
   ```env
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   JWT_SECRET=your_jwt_secret
   SMTP_SERVER=your_smtp_server
   SMTP_PORT=587
   SMTP_USERNAME=your_email
   SMTP_PASSWORD=your_app_password
   ```

3. **Initialize the database:**
   ```bash
   python scripts/init_db.py
   ```

4. **Run the backend server:**
   ```bash
   python app/main.py
   ```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd bio-secure-gate-ui-build
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Configure API endpoint:**
   Update `lib/api-config.ts` with your backend URL

4. **Run the development server:**
   ```bash
   npm run dev
   ```

The UI will be available at `http://localhost:3000`

### Docker Compose

Run the entire stack with Docker Compose:

```bash
docker-compose up -d
```

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh token

### Fingerprint Endpoints (V2)

- `POST /api/v2/fingerprint/enroll` - Enroll fingerprint
- `POST /api/v2/fingerprint/match` - Verify fingerprint
- `GET /api/v2/fingerprint/match-score` - Get match score
- `DELETE /api/v2/fingerprint/{user_id}` - Delete fingerprint

### Face Recognition Endpoints

- `POST /api/face/enroll` - Enroll face
- `POST /api/face/match` - Verify face
- `DELETE /api/face/{user_id}` - Delete face data

### Admin Endpoints

- `GET /api/admin/users` - List all users
- `GET /api/admin/officers` - List all officers
- `POST /api/admin/officers` - Create officer
- `DELETE /api/admin/users/{user_id}` - Delete user
- `PUT /api/admin/users/{user_id}` - Update user

## 🔐 Security Features

- **OAuth 2.0** authentication via Supabase
- **JWT token** based session management
- **Encrypted storage** for biometric templates
- **Role-based access control** (RBAC) for admin functions
- **Audit logging** for all biometric operations
- **HTTPS/TLS** for secure communications
- **CSRF protection** on all state-changing operations

## 🧠 ML Models

The system supports multiple biometric matching algorithms:

### Fingerprint Matching
- Advanced fingerprint template matching (V2)
- Minutiae-based matching
- Configurable matching thresholds
- ROC curve analysis support

### Facial Recognition
- Deep learning-based face detection
- Face embedding generation
- Multi-face handling
- Real-time processing

## 📊 Configuration

Key configuration files:

- `app/core/config.py` - Application settings
- `cloudbuild.yaml` - Cloud Build pipeline
- `docker-compose.yml` - Service orchestration
- `.env` - Environment variables

## 🧪 Testing

Run smoke tests:

```bash
python scripts/smoke_test.py
```

Test fingerprint matching:

```bash
python scripts/test_fp_match.py
```

## 🐳 Docker Images

- `Dockerfile` - Backend service
- `Dockerfile.model` - ML model service

## 📦 Dependencies

### Backend
- FastAPI - Web framework
- SQLAlchemy - ORM
- Pydantic - Data validation
- Supabase - Database & auth
- numpy/scipy - Scientific computing

### Frontend
- Next.js 14+ - React framework
- TypeScript - Type safety
- Tailwind CSS - Styling
- shadcn/ui - Component library

## 🔄 CI/CD

- Cloud Build integration (`cloudbuild.yaml`)
- Automated testing on PR
- Staging environment deployment
- Production deployment triggers

## 📝 Database Schema

Database is managed through Supabase with migrations in `supabase/` directory:

- `schema.sql` - Base schema
- `migration_add_fingerprint_v2.sql` - Fingerprint V2 support
- `migration_add_capture_method.sql` - Capture method tracking

## 🤝 Contributing

1. Create a feature branch
2. Commit your changes
3. Push to the branch
4. Create a Pull Request

## 📄 License

[Add your license information here]

## 📧 Support

For issues and questions, please open an issue on GitHub or contact the development team.

## 🎓 References

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)

---

**Last Updated**: May 2026
**Version**: 1.0.0
