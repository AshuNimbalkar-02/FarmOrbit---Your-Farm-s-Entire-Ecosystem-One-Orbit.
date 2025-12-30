# Project Implementation Guide: Smart Crop Advisory System

## 1. Project Overview
**Name**: FarmOrbit
**Goal**: To provide an integrated AI-driven platform for farmers that offers crop health diagnosis, yield prediction, market insights, and sustainable farming advice.
**Core Philosophy**: "Technology for the Soil" - Making advanced agricultural data accessible and actionable for every farmer.

---

## 2. Technology Stack

| Component | Technology/Library | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | **Next.js 14** (App Router) | Main application structure, routing, and SSR. |
| **Language** | **TypeScript** | Type-safe development for fewer bugs. |
| **Styling** | **CSS Modules** (`.module.css`) | Scoped, component-level styling (avoiding global conflicts). |
| **UI Icons** | **Lucide React** | Modern, clean SVGs for the interface. |
| **API/Backend** | **Next.js API Routes** | handling server-side logic (e.g., Yield Prediction, Market Data). |
| **Speech APIs** | **Web Speech API** | Native browser API for Speech-to-Text and Text-to-Speech (Agri-Bot). |
| **State Management** | **React Hooks** (`useState`, `useEffect`) | Managing local component state. |

---

## 3. Directory Structure & File Map

Here is exactly where every file is located and what it does in your workspace: `c:\Users\Lenovo\OneDrive\Desktop\smart_advisory_dipex`

```
smart_advisory_dipex/
├── src/
│   ├── app/
│   │   ├── advisory/
│   │   │   ├── components/            # <--- ALL Feature Components live here
│   │   │   │   ├── AgriBot.tsx        # Voice-activated AI Assistant
│   │   │   │   ├── CropDoctor.tsx     # Image upload & disease diagnosis
│   │   │   │   ├── FertilizerExpert.tsx # Fertilizer schedule calculator
│   │   │   │   ├── PrecisionNutrient.tsx # IoT Sensor visualization & ML analysis
│   │   │   │   ├── RentTool.tsx       # Machinery booking interface
│   │   │   │   ├── ROICalculator.tsx  # Profit & ROI financial tool
│   │   │   │   ├── SchemeMatcher.tsx  # Government scheme finder
│   │   │   │   ├── SeedCalculator.tsx # Seed rate estimator
│   │   │   │   ├── SmartIrrigation.tsx # ET-based water scheduler
│   │   │   │   ├── SmartSell.tsx      # Market price comparison calculator
│   │   │   │   ├── SustainableRotation.tsx # Crop rotation planner
│   │   │   │   ├── WeatherShield.tsx  # Hyper-local weather alerts
│   │   │   │   └── YieldPredictor.tsx # Yield prediction UI
│   │   │   ├── data.ts                # Shared constants (APMC Rates, Weather Data)
│   │   │   ├── utils.ts               # Shared utility functions (Text-to-Speech)
│   │   │   └── page.tsx               # Main container that loads components based on tabs
│   │   ├── api/
│   │   │   ├── market/
│   │   │   │   └── route.ts           # API Endpoint for Market Prices (GET)
│   │   │   └── yield/
│   │   │       └── route.ts           # API Endpoint for Yield Prediction (POST)
│   │   └── globals.css                # Global CSS variables & resets
│   └── components/                    # Shared Layout Components
│       ├── ClientLayout.tsx           # Wraps pages (Navbar/Footer handling)
│       └── Footer.tsx                 # Site-wide Footer
└── public/                            # Static assets (images, icons)
```

---

## 4. Feature Implementation Details & Government API Integration

This section maps each feature to its code location, its internal logic, and the **Real Government API** that should be used in a production environment.

### A. Smart Sell Optimizer (Market Prices)
*   **File Path**: `src/app/advisory/components/SmartSell.tsx`
*   **Internal Logic**: Calculates Net Profit: `(Market Price * Qty) - (Distance * Transport Cost)`. Currently uses mock data from `data.ts`.
*   **Real Government API**: **e-NAM (National Agriculture Market) / Open Government Data (OGD) Platform**
    *   **API URL**: `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070` (Mandi Prices)
    *   **Function**: Fetches real-time daily arrivals and prices of commodities from Mandis across India.

### B. Weather Shield (Risk Alerts)
*   **File Path**: `src/app/advisory/components/WeatherShield.tsx`
*   **Internal Logic**: Displays simulated weather conditions and calculates fungal risk based on Humidity (>70%) and Temperature.
*   **Real Government API**: **IMD (India Meteorological Department) / Mausam API**
    *   **API URL**: `https://mausam.imd.gov.in/api`
    *   **Function**: Provides Nowcast (3-hour), City Forecast (7-day), and Agromet Advisories (District-wise).

### C. Scheme Matcher
*   **File Path**: `src/app/advisory/components/SchemeMatcher.tsx`
*   **Internal Logic**: Filters a static list of schemes based on Farmer Category (Small/Marginal) and State.
*   **Real Government API**: **myScheme (Platform by MeitY)**
    *   **Portal**: `https://www.myscheme.gov.in`
    *   **Function**: A unified platform to find government schemes based on eligibility criteria like caste, income, and occupation.

### D. Soil Health & Fertilizer Expert
*   **File Path**: `src/app/advisory/components/FertilizerExpert.tsx`
*   **Internal Logic**: Calculates Urea/DAP dosage based on general NPK recommendations per crop (e.g., Wheat requires more N).
*   **Real Government API**: **Soil Health Card (SHC) Portal**
    *   **Portal**: `https://soilhealth.dac.gov.in/`
    *   **Function**: Provides soil nutrient status (Macro & Micro nutrients) for specific farm survey numbers and recommends fertilizer dosage.

### E. Crop Doctor (Disease Diagnosis)
*   **File Path**: `src/app/advisory/components/CropDoctor.tsx`
*   **Internal Logic**: Simulates image upload and waits 2.5 seconds before returning a hardcoded "Early Blight" result.
*   **Model Implementation**:
    *   **Model**: **ResNet50** or **MobileNetV2** (Convolutional Neural Networks).
    *   **Training Dataset**: **PlantVillage Dataset** (Open source dataset with 50k+ images of healthy and diseased leaves).
    *   **Deployment**: In production, this model would be hosted on a Python backend (FastAPI) or TensorFlow.js in the browser.

### F. Smart Irrigation Engine
*   **File Path**: `src/app/advisory/components/SmartIrrigation.tsx`
*   **Internal Logic**: Uses the **Penman-Monteith Equation** (simplified).
    *   Formula: `ETc = ETo (Reference Evapotranspiration) * Kc (Crop Coefficient)`
    *   Data Source: `ETo` is derived from temperature/humidity (IMD Data); `Kc` varies by crop growth stage.
*   **Government Standard**: Aligns with **PMKSY (Pradhan Mantri Krishi Sinchayee Yojana)** guidelines for "Per Drop More Crop".

### G. Yield Predictor
*   **File Path**: `src/app/advisory/components/YieldPredictor.tsx`
*   **API Route**: `src/app/api/yield/route.ts`
*   **Internal Logic**:
    1.  Frontend sends `crop`, `soil`, `area` to Backend.
    2.  Backend lookup table applies multipliers (e.g., `Irrigated = 1.3x yield`).
    3.  Returns predicted Quintals.
*   **Real Data Source**: **DES (Directorate of Economics and Statistics)**
    *   **Data**: Crop production statistics (APY - Area, Production, Yield) provided by the Ministry of Agriculture.

---

## 5. Backend Implementation (Next.js API Routes)

These files handle data processing securely on the server side.

### 1. Market Data API
*   **File**: `src/app/api/market/route.ts`
*   **How it works**:
    *   Receives `GET` request.
    *   Filters internal data array based on query parameters `?location=Nashik` or `?crop=Onion`.
    *   Returns JSON response.

### 2. Yield Prediction API
*   **File**: `src/app/api/yield/route.ts`
*   **How it works**:
    *   Receives `POST` request with JSON body.
    *   Accesses the `baseYields` object to find the average yield for the requested crop.
    *   Multiplies this by the `soilModifiers` (e.g., Black Soil = 1.2x).
    *   Returns the calculation `totalYield` and `estimatedRevenue`.

---

## 6. How to Run & Build

1.  **Install Dependencies**:
    ```bash
    npm install
    # Installs react, next, typescript, lucide-react
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    # Starts server at http://localhost:3000
    ```

3.  **Build for Production**:
    ```bash
    npm run build
    # Creates an optimized production build in .next folder
    ```

4.  **Start Production Server**:
    ```bash
    npm start
    ```

---

## 7. Future Roadmap & Scaling
*   **Database**: Integrate **MongoDB** or **PostgreSQL** to save user farm data (e.g., "Field A - Wheat").
*   **Auth**: Add **OTP Login** for farmers using **Firebase Auth** or **NextAuth**.
*   **Regional Languages**: Expand `utils.ts` to support full translation files (`en.json`, `hi.json`, `mr.json`) instead of hardcoded strings.
