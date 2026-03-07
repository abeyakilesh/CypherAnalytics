# CypherAnalytics: System Execution Workflow

This document outlines the operational flow and data sequence of the CypherAnalytics platform, from synthetic generation to frontend visualization.

## 1. Data Generation (Pipeline Entry)
**Component:** `backend/services/syntheticTransactionGenerator.js`
- Operates as a background Node process.
- Produces realistic financial transactions (Accounts, Amounts, Vendors, Geographic locations).
- 90% configured for "Normal" vectors.
- 10% configured for "Suspicious" vectors (high amount anomalies, impossible IP bounds).
- Injects raw JSON directly into the MongoDB instance (`fintechDB` -> `transactions` collection) at intervals (1.0s - 2.0s).

## 2. API Aggregation & Risk Engine Computation
**Component:** `backend/controllers/transactionController.js` and `backend/services/riskEngine.js`
- **REST Pipeline (`/api/analytics`):** The dashboard polls this endpoint to fetch aggregated, system-wide metrics.
  - Groups incoming live transactions using MongoDB `$aggregate` pipelines.
  - Re-formats `timestamp` metrics by seconds (`%H:%M:%S`) to generate high-resolution "heartbeat" volume traces.
- **WebSocket Streaming (`Server.io`):** Establishes an active tunnel immediately upon the client's login success. Pushes new individual transactions as they arrive.

## 3. Data Privacy & Classification Interception
**Component:** `backend/services/privacyService.js` and Security Models
- Before data reaches the analyst interface, it is intercepted.
- **System Guard:** Examines payload fields.
- **Role-Based Masking:** Actively mutates the payload dependent strictly on the authenticated JWT constraints of the calling user.
  - Analysts receive `********4829`.
  - External endpoints receive K-Anonymized Hashes.
- This creates quantifiable the **"Privacy Confidence Score"**, assuring SecOps that data is isolated.

## 4. SECURE Authentication Layer (JWT)
**Component:** `backend/controllers/authController.js`
1. Client generates credentials via `/api/auth/signup`.
2. Server salts and hashes the payload string via `bcryptjs`.
3. Server commits secure hash to MongoDB `users` collection.
4. On `/api/auth/login`, verification succeeds -> issues a signed JSON Web Token (JWT).
5. Expiration and refresh windows guarantee token rotations.

## 5. UI Visualization & Interaction (React Matrix)
**Component:** `frontend/src/*` (The Dashboard)
- Consumes the processed, masked, and scored JSON payloads.
- Routes data into responsive Recharts visualization pipelines (Monochrome thematic scaling).
- Exposes "Click-to-Explain" modal features where "Black-Box" risk scores are broken down into transparent logical reasons.
- The `Settings` UI enables simulated interaction with the RBAC matrix to view live-data transformation.

---
**Deployment Finalization:** 
The application guarantees execution isolation between the transaction generator, the REST analytics APIs, and the UI React host. Continuous integrations update this sequence diagram on GitHub as features expand.
