export const weatherData = {
  location: 'Pune, Maharashtra',
  temperature: 32,
  humidity: 68,
  rainfall: 12,
  windSpeed: 14,
  condition: 'Partly Cloudy',
  forecast: [
    { day: 'Mon', temp: 33, icon: 'Sunny' },
    { day: 'Tue', temp: 30, icon: 'Cloudy' },
    { day: 'Wed', temp: 28, icon: 'Rain' },
    { day: 'Thu', temp: 31, icon: 'Cloudy' },
    { day: 'Fri', temp: 34, icon: 'Sunny' },
  ],
};

export const soilData = {
  nitrogen: 42,
  phosphorus: 28,
  potassium: 55,
  ph: 6.8,
  organic_carbon: 0.72,
  moisture: 38,
  temperature: 27,
};

export const cropRecommendations = [
  {
    id: 1,
    name: 'Rice (Basmati)',
    confidence: 94,
    season: 'Kharif',
    waterReq: 'High',
    soilType: 'Alluvial / Clay',
    expectedYield: '4.2 tons/hectare',
    color: '#f59e0b',
    icon: 'Rice',
  },
  {
    id: 2,
    name: 'Soybean',
    confidence: 89,
    season: 'Kharif',
    waterReq: 'Medium',
    soilType: 'Black / Loamy',
    expectedYield: '2.8 tons/hectare',
    color: '#10b981',
    icon: 'Soy',
  },
  {
    id: 3,
    name: 'Wheat (HD-2967)',
    confidence: 85,
    season: 'Rabi',
    waterReq: 'Medium',
    soilType: 'Loamy / Sandy Loam',
    expectedYield: '5.1 tons/hectare',
    color: '#3b82f6',
    icon: 'Wheat',
  },
];

export const diseaseDatabase = [
  {
    name: 'Bacterial Leaf Blight',
    crop: 'Rice',
    confidence: 92,
    severity: 'High',
    symptoms: ['Yellow-orange lesions on leaf edges', 'Wilting of seedlings', 'White/grey ooze on leaves'],
    treatment: [
      'Apply copper-based bactericide (Copper Oxychloride 50% WP @ 2.5g/L)',
      'Use resistant varieties like IR-64 or Pusa Basmati',
      'Drain excess water from fields',
      'Avoid high nitrogen fertilization',
    ],
    prevention: [
      'Use certified disease-free seeds',
      'Practice crop rotation with non-host plants',
      'Maintain proper plant spacing for air circulation',
    ],
  },
  {
    name: 'Late Blight',
    crop: 'Tomato / Potato',
    confidence: 88,
    severity: 'Critical',
    symptoms: ['Dark water-soaked lesions on leaves', 'White fungal growth on underside', 'Brown spots on fruit'],
    treatment: [
      'Apply Mancozeb 75% WP @ 2.5g/L immediately',
      'Use systemic fungicide (Metalaxyl + Mancozeb)',
      'Remove and destroy infected plant parts',
    ],
    prevention: ['Plant resistant varieties', 'Avoid overhead irrigation', 'Ensure good air circulation between plants'],
  },
  {
    name: 'Powdery Mildew',
    crop: 'Wheat / Pea',
    confidence: 95,
    severity: 'Medium',
    symptoms: ['White powdery spots on leaves', 'Yellowing and curling of leaves', 'Stunted growth'],
    treatment: [
      'Apply Sulphur dust @ 25 kg/hectare',
      'Use Karathane (Dinocap) @ 1ml/L',
      'Spray Neem oil solution (5ml/L)',
    ],
    prevention: ['Grow resistant varieties', 'Avoid dense planting', 'Remove volunteer plants and crop debris'],
  },
];

export const marketPrices = [
  { crop: 'Rice (Basmati)', msp: 2183, market: 2650, trend: 'up', change: '+8.2%', unit: 'INR/quintal' },
  { crop: 'Wheat (PBW-550)', msp: 2275, market: 2410, trend: 'up', change: '+3.1%', unit: 'INR/quintal' },
  { crop: 'Soybean', msp: 4600, market: 4320, trend: 'down', change: '-2.4%', unit: 'INR/quintal' },
  { crop: 'Maize', msp: 2090, market: 2180, trend: 'up', change: '+1.5%', unit: 'INR/quintal' },
  { crop: 'Cotton (Medium)', msp: 6620, market: 7100, trend: 'up', change: '+5.8%', unit: 'INR/quintal' },
  { crop: 'Mustard', msp: 5650, market: 5920, trend: 'up', change: '+2.9%', unit: 'INR/quintal' },
];
