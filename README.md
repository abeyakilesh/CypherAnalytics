# CypherAnalytics

> Privacy-Preserving Real-Time Financial Intelligence Platform

CypherAnalytics is an enterprise-grade platform combining real-time financial transaction monitoring with zero PII (Personally Identifiable Information) exposure analytics. It proves that aggressive fraud detection and strict data privacy are not mutually exclusive.

## Features

- **Real-Time Fraud Detection:** Advanced multi-factor risk engine analyzing live, high-velocity data streams.
- **Zero PII Dashboard:** Uncompromised security ensuring raw sensitive data never reaches the user interface unless authorized.
- **Role-Based Graduated Visibility:** Three-tier access controls (Admin, Analyst, Viewer) offering dynamic data redaction and masking.
- **Multi-Currency Support:** Dynamically formatted currency across all metrics and charts (USD, INR, EUR, GBP).
- **Interactive Alerts:** Assess and escalate high-risk transactions instantly from the dashboard.
- **Explainable Privacy:** Full transparency into field-level classifications, encryption status, and dynamic privacy scoring.

## Tech Stack

- **Frontend:** React, Vite, Lucide React (Icons), Custom CSS (Theming)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with AES-256-CBC encryption for sensitive fields at rest)

## Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB instance (local or Atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/abeyakilesh/CypherAnalytics.git
   cd CypherAnalytics
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ENCRYPTION_KEY=your_32_byte_hex_encryption_key
   ```

4. Start the Application:
   Run the backend and frontend dev servers:
   ```bash
   # Terminal 1: Backend
   cd backend
   npm run dev

   # Terminal 2: Frontend
   cd frontend
   npm run dev
   ```

## Architecture

The platform uses a modular design:
- **Real-Time Layer:** Node.js API with WebSocket for sub-second data broadcasting.
- **Storage Layer:** MongoDB optimized for fast queries with encrypted fields.
- **Decoupled Services:** Independent microservices for encryption, privacy masking, risk detection, and synthetic data generation.

## License

MIT
