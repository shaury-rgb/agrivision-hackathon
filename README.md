# AgriVision

AI-powered smart farming assistant for small and medium farmers.

## 1. Problem Statement
- Farmers struggle with late disease detection, poor crop planning, and low price transparency.
- Target users:
  - Small and medium farmers
  - Farmer Producer Organizations (FPOs)
  - Agri field officers
- Why current solutions fail:
  - Tools are fragmented (weather app, mandi app, advisory app are separate)
  - Most apps are data-heavy but decision-light
  - Advisory is often generic, not field-context aware
  - Rural users need fast and simple interfaces, not complex dashboards

## 2. Idea Title + Proposed Solution
- Product name: AgriVision
- One-line pitch: Unified AI co-pilot for crop health, market timing, and irrigation decisions.
- Proposed solution:
  - Single dashboard with weather, soil, and crop recommendations
  - Instant disease diagnosis workflow with treatment + prevention steps
  - Real-time market intelligence with MSP gap visibility
  - Farmer assistant chat for natural-language guidance
- Innovation and uniqueness:
  - Decision-first UI (actionable outputs, not just raw data)
  - WOW feature: Auto-Irrigation Copilot that simulates water/fuel/yield outcomes
  - Full-stack MVP that works with API mode and mock fallback mode
- How it solves the problem:
  - Reduces time to decision for irrigation, disease response, and crop sale
  - Improves farm outcomes through practical recommendations
  - Keeps interface simple and mobile-friendly

## 3. Technical Approach
### Architecture
- Frontend: React + Vite
- Backend: Node.js + Express
- Database: Designed for MongoDB/Firebase (MVP currently uses in-memory sample data)
- APIs: REST endpoints for weather, soil, disease analysis, market prices, and irrigation plan

### Tech Stack
- UI: React 19, CSS
- API: Express 5, CORS
- Runtime: Node.js
- Dev workflow: Vite + Concurrently (run frontend + backend together)

### System Design Flow
1. User opens dashboard
2. Frontend fetches data from API
3. If API unavailable, frontend falls back to local mock data
4. User triggers action:
   - Disease scan
   - Market lookup
   - Irrigation simulation
5. Backend returns decision-oriented JSON
6. UI renders recommendations instantly

### Flowchart (Text)
```text
[Farmer UI]
   |
   v
[React Frontend]
   |         \
   |          \ (fallback)
   v           v
[Express APIs] [Mock Data Layer]
   |
   v
[Decision Engine Rules]
   |
   v
[Actionable Advice: Disease + Price + Irrigation + Crop]
```

### API Structure
- GET /api/health
- POST /api/auth/demo-login
- GET /api/weather
- GET /api/soil
- GET /api/crops/recommendations
- GET /api/market-prices?crop=<name>
- POST /api/disease/analyze
- POST /api/wow/irrigation-plan

### Example API Contracts
```json
POST /api/disease/analyze
{
  "crop": "Rice",
  "imageName": "leaf-01.jpg"
}
```

```json
Response
{
  "requestId": "scan-1712671000000",
  "input": {
    "crop": "Rice",
    "imageName": "leaf-01.jpg"
  },
  "diagnosis": {
    "name": "Bacterial Leaf Blight",
    "confidence": 92,
    "severity": "High"
  }
}
```

```json
POST /api/wow/irrigation-plan
{
  "waterStress": 62,
  "rainProbability": 20
}
```

```json
Response
{
  "decision": "Irrigate tonight",
  "litersPerAcre": 3318,
  "dieselSaved": 16,
  "yieldUplift": 8
}
```

### Database Schema (MongoDB-ready)
```text
users
- _id
- name
- mobile
- region
- preferredLanguage
- createdAt

fields
- _id
- userId
- location
- acreage
- soilProfile { nitrogen, phosphorus, potassium, ph, moisture }
- cropHistory []

disease_scans
- _id
- userId
- fieldId
- crop
- imageUrl
- diagnosis
- confidence
- severity
- createdAt

market_snapshots
- _id
- crop
- msp
- market
- trend
- source
- capturedAt
```

## 4. Full Project Implementation
### Folder Structure
```text
hackathon/
  public/
  server/
    data.js
    index.js
  src/
    api/
      client.js
    components/
      Dashboard.jsx
      DiseaseDetection.jsx
      MarketPrices.jsx
      Sidebar.jsx
      VoiceAssistant.jsx
    data/
      mockData.js
    App.jsx
    App.css
    index.css
    main.jsx
  index.html
  package.json
  README.md
```

### Setup Instructions
1. Install dependencies
```bash
npm install
```

2. Run full stack (frontend + backend)
```bash
npm run dev:full
```

3. Run frontend only
```bash
npm run dev
```

4. Run backend only
```bash
npm run server
```

5. Build production frontend
```bash
npm run build
```

### Sample Data
- Weather: Pune forecast + humidity/rain/wind
- Soil: NPK + moisture + pH
- Disease KB: Blight, late blight, powdery mildew
- Market: MSP vs market values for major crops

## 5. Feasibility & Viability
### Technical Feasibility
- Practical in 24-48 hours:
  - Rule-based AI logic
  - Preloaded data
  - Simple REST APIs
  - Responsive UI
- Can later plug into real ML and live data APIs

### Cost Estimation (Student-Friendly)
- Hosting (frontend): free tier (Vercel/Netlify)
- Hosting (backend): free tier (Render/Railway)
- Database: MongoDB Atlas free tier
- Total MVP infra cost: near zero to low monthly cost

### Challenges + Solutions
- Challenge: Poor internet in rural areas
- Solution: Caching + fallback data mode
- Challenge: User trust in AI recommendation
- Solution: Show confidence, severity, and clear treatment rationale
- Challenge: Diverse language needs
- Solution: Add multilingual prompt templates and voice support in next sprint

## 6. Impact & Benefits
### Social Impact
- Faster disease response can reduce crop losses
- Better decision support for first-generation digital farmers

### Economic Impact
- Better market timing can improve farmer earnings
- Smarter irrigation can reduce water and fuel cost

### Scalability
- Add more crops and region-specific advisories
- Integrate district-level mandi APIs and weather stations

### Future Scope
- Real image model for disease classification
- IoT sensor ingestion pipeline
- WhatsApp bot and IVR assistant
- Multilingual speech interaction

## 7. References
- India Meteorological Department (IMD)
- Agmarknet mandi price portal
- ICAR crop and disease advisories
- FAO digital agriculture reports
- NABARD and Ministry of Agriculture publications

## 8. Bonus WOW Feature
### Feature
- Auto-Irrigation Copilot
- Inputs: Water stress + rain probability
- Output: Irrigation decision, liters/acre, fuel savings, expected yield uplift

### Demo Presentation Script
- Step 1: Open Dashboard and move stress/rain sliders
- Step 2: Show instant decision change (Irrigate vs Delay)
- Step 3: Explain resource optimization numbers
- Step 4: Link to real-world value: lower water use + better yield

## Hackathon PPT Slide Mapping
1. Problem Statement
2. Why Current Solutions Fail
3. AgriVision Product Introduction
4. Core Features
5. Architecture + Flowchart
6. API + DB Schema
7. Live Product Demo
8. Feasibility + Cost
9. Impact + Scale
10. WOW Feature + Future Roadmap
