// ─── Mock Weather Data ────────────────────────────────────────
export const weatherData = {
  location: "Pune, Maharashtra",
  temperature: 32,
  humidity: 68,
  rainfall: 12,
  windSpeed: 14,
  condition: "Partly Cloudy",
  forecast: [
    { day: "Mon", temp: 33, icon: "☀️" },
    { day: "Tue", temp: 30, icon: "⛅" },
    { day: "Wed", temp: 28, icon: "🌧️" },
    { day: "Thu", temp: 31, icon: "⛅" },
    { day: "Fri", temp: 34, icon: "☀️" },
  ],
};

// ─── Crop Recommendations ─────────────────────────────────────
export const cropRecommendations = [
  {
    id: 1,
    name: "Rice (Basmati)",
    confidence: 94,
    season: "Kharif",
    waterReq: "High",
    soilType: "Alluvial / Clay",
    expectedYield: "4.2 tons/hectare",
    icon: "🌾",
    color: "#f59e0b",
  },
  {
    id: 2,
    name: "Soybean",
    confidence: 89,
    season: "Kharif",
    waterReq: "Medium",
    soilType: "Black / Loamy",
    expectedYield: "2.8 tons/hectare",
    icon: "🫘",
    color: "#10b981",
  },
  {
    id: 3,
    name: "Wheat (HD-2967)",
    confidence: 85,
    season: "Rabi",
    waterReq: "Medium",
    soilType: "Loamy / Sandy Loam",
    expectedYield: "5.1 tons/hectare",
    icon: "🌿",
    color: "#3b82f6",
  },
  {
    id: 4,
    name: "Maize (Hybrid)",
    confidence: 78,
    season: "Kharif",
    waterReq: "Medium",
    soilType: "Well-drained Loamy",
    expectedYield: "6.5 tons/hectare",
    icon: "🌽",
    color: "#8b5cf6",
  },
];

// ─── Disease Detection Results (mock) ─────────────────────────
export const diseaseDatabase = [
  {
    name: "Bacterial Leaf Blight",
    crop: "Rice",
    confidence: 92,
    severity: "High",
    symptoms: ["Yellow-orange lesions on leaf edges", "Wilting of seedlings", "White/grey ooze on leaves"],
    treatment: [
      "Apply copper-based bactericide (Copper Oxychloride 50% WP @ 2.5g/L)",
      "Use resistant varieties like IR-64 or Pusa Basmati",
      "Drain excess water from fields",
      "Avoid high nitrogen fertilization",
    ],
    prevention: [
      "Use certified disease-free seeds",
      "Practice crop rotation with non-host plants",
      "Maintain proper plant spacing for air circulation",
    ],
  },
  {
    name: "Late Blight",
    crop: "Tomato / Potato",
    confidence: 88,
    severity: "Critical",
    symptoms: ["Dark water-soaked lesions on leaves", "White fungal growth on underside", "Brown spots on fruit"],
    treatment: [
      "Apply Mancozeb 75% WP @ 2.5g/L immediately",
      "Use systemic fungicide (Metalaxyl + Mancozeb)",
      "Remove and destroy infected plant parts",
    ],
    prevention: [
      "Plant resistant varieties",
      "Avoid overhead irrigation",
      "Ensure good air circulation between plants",
    ],
  },
  {
    name: "Powdery Mildew",
    crop: "Wheat / Pea",
    confidence: 95,
    severity: "Medium",
    symptoms: ["White powdery spots on leaves", "Yellowing and curling of leaves", "Stunted growth"],
    treatment: [
      "Apply Sulphur dust @ 25 kg/hectare",
      "Use Karathane (Dinocap) @ 1ml/L",
      "Spray Neem oil solution (5ml/L)",
    ],
    prevention: [
      "Grow resistant varieties",
      "Avoid dense planting",
      "Remove volunteer plants and crop debris",
    ],
  },
];

// ─── Market Prices ────────────────────────────────────────────
export const marketPrices = [
  { crop: "Rice (Basmati)", msp: 2183, market: 2650, trend: "up", change: "+8.2%", unit: "₹/quintal" },
  { crop: "Wheat (PBW-550)", msp: 2275, market: 2410, trend: "up", change: "+3.1%", unit: "₹/quintal" },
  { crop: "Soybean", msp: 4600, market: 4320, trend: "down", change: "-2.4%", unit: "₹/quintal" },
  { crop: "Maize", msp: 2090, market: 2180, trend: "up", change: "+1.5%", unit: "₹/quintal" },
  { crop: "Cotton (Medium)", msp: 6620, market: 7100, trend: "up", change: "+5.8%", unit: "₹/quintal" },
  { crop: "Sugarcane", msp: 315, market: 340, trend: "up", change: "+4.2%", unit: "₹/quintal" },
  { crop: "Groundnut", msp: 6377, market: 5890, trend: "down", change: "-3.7%", unit: "₹/quintal" },
  { crop: "Mustard", msp: 5650, market: 5920, trend: "up", change: "+2.9%", unit: "₹/quintal" },
];

// ─── Soil Analysis (mock sensor data) ─────────────────────────
export const soilData = {
  nitrogen: 42,
  phosphorus: 28,
  potassium: 55,
  ph: 6.8,
  organic_carbon: 0.72,
  moisture: 38,
  temperature: 27,
};

// ─── Quick Stats for Dashboard ────────────────────────────────
export const dashboardStats = [
  { label: "Active Farms", value: "2,847", icon: "🌱", change: "+12%", color: "#10b981" },
  { label: "Scans Today", value: "1,293", icon: "📸", change: "+28%", color: "#3b82f6" },
  { label: "Accuracy Rate", value: "94.7%", icon: "🎯", change: "+2.1%", color: "#8b5cf6" },
  { label: "Farmers Helped", value: "18.4K", icon: "👨‍🌾", change: "+340", color: "#f59e0b" },
];

// ─── Voice Assistant Responses ────────────────────────────────
export const voiceResponses = {
  greetings: [
    "Namaste! I'm AgriVision, your farming assistant. How can I help you today?",
    "Hello farmer! Ask me about crops, weather, or diseases.",
  ],
  weather: `Currently in ${weatherData.location}: ${weatherData.temperature}°C, ${weatherData.condition}. Humidity is ${weatherData.humidity}%. Light rainfall of ${weatherData.rainfall}mm expected.`,
  crop: "Based on your soil and weather data, I recommend Rice (Basmati) with 94% confidence, Soybean with 89% confidence, and Wheat with 85% confidence for next season.",
  price: "Rice Basmati is trading at ₹2,650 per quintal, which is ₹467 above MSP. Wheat is at ₹2,410, also above MSP. Soybean is slightly below MSP at ₹4,320.",
  disease: "Upload a photo of the affected leaf using the Disease Detection tab. I'll analyze it and give you treatment recommendations.",
  fertilizer: "Based on your soil data: Nitrogen is low at 42 kg/ha, Phosphorus is adequate at 28 kg/ha. I recommend applying Urea @ 130 kg/ha and DAP @ 60 kg/ha before sowing.",
  fallback: "I can help with weather forecasts, crop recommendations, market prices, disease detection, and fertilizer advice. What would you like to know?",
};
