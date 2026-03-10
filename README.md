# CypherAnalytics: Next-Gen Fintech Privacy & Anomaly Monitoring

**CypherAnalytics** is a sophisticated full-stack application designed to give Security Operations (SecOps) teams a unified, real-time interface for monitoring high-velocity financial transactions. It bridges the gap between active anomaly detection (Fraud) and rigorous data protection (Privacy), giving teams total observability over how sensitive data is handled in transit.

## Key Features

1. **Real-Time Transaction Feed & Anomaly Detection**
   - Simulated live traffic using a high-throughput Node.js generator.
   - Algorithmic risk scoring (0-100) dynamically evaluates transactions for fraud markers (e.g., suspicious amounts, impossible travel scenarios, high-risk vendors).

2. **Privacy Intelligence & Dynamic Encryption (System Guard)**
   - Protects payloads in transit and at rest using AES-256-CBC encryption and K-anonymization hashing techniques.
   - Live **Privacy Score** and Obfuscation Confidence tracking.
   - Schema field mapping details what properties are classified as "Highly Sensitive", "PII", or "Public".

3. **Role-Based Access Control (RBAC) Simulator**
   - Security configurations built directly into the UI to demonstrate how roles dynamically transform data pipelines.
   - **Admin:** Views true encrypted string representations.
   - **Analyst:** Views partially masked data (e.g., `********4829`) required for compliance investigation.
   - **Viewer:** Views completely hidden PII, permitting only aggregated dashboard utilization.

4. **Interactive Analytics Dashboard**
   - **Transaction Volume:** Live "heartbeat" style data aggregation plotting the flow of traffic over time.
   - **Risk Score Distribution:** Monochromatic charting of standard vs. outlier activities.
   - **Geographic Movement:** Location-based distribution visualization to highlight transaction hot-spots.

## Tech Stack Overview

- **Frontend:** React.js, Vite, Recharts (Dynamic Visualization), Lucide React (Icons).
- **Backend Core:** Node.js, Express.js.
- **Database:** MongoDB (Mongoose Schema mapping).
- **Authentication:** JWT (JSON Web Tokens), bcryptjs for secure password hashing.
- **Microservices:** Inter-process synthetic transaction generation driving real-world financial traffic scenarios.

---

## Getting Started

### 1. Prerequisites
- **Node.js**: v18 or newer
- **MongoDB**: A running local or cloud instance.

### 2. Environment Setup

**Backend Configuration (`backend/.env`)**
```env
PORT=5001
MONGODB_URI=mongodb://127.0.0.1:27017/fintechDB
JWT_SECRET=your_super_secret_key_here
```

### 3. Installation

**Install Backend Dependencies**
```bash
cd backend
npm install
```

**Install Frontend Dependencies**
```bash
cd frontend
npm install
```

### 4. Running the Application

This project runs utilizing three core processes:

1. **Start the API Server**
   ```bash
   cd backend
   node server.js
   ```

2. **Start the Live Transaction Generator** (Feeds live data into the DB)
   ```bash
   cd backend
   node services/syntheticTransactionGenerator.js
   ```

3. **Start the Frontend UI**
   ```bash
   cd frontend
   npm run dev
   ```

Navigate to `http://localhost:5173` to view the CypherAnalytics platform. You can log in using the default setup or sign up for a new analytical account.

---

## Deployment Architecture

CypherAnalytics is structured to scale. The current pipeline supports easy deployment vectors:
- **Frontend Layer:** Vercel or Netlify via direct GitHub integration.
- **API & Compute:** Render or Heroku Web Services handling the Express routes and generator worker loops.
- **Database Layer:** MongoDB Atlas for resilient, globally redundant document storage.

## UI Design Aesthetics
The visual identity of CypherAnalytics utilizes a deep-space monochromatic palette prioritizing a reduction in cognitive load for analysts. Glassmorphism, subtle interactive micro-animations, and synchronized 60FPS charting render a premium, next-generation operational environment.

*This project was developed for advanced study in FinTech architectural design, integrating concepts of complex UI state management, real-time data streaming, and applied cryptography.*
