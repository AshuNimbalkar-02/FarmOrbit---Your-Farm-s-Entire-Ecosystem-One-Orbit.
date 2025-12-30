export const APMC_RATES: Record<string, Record<string, number>> = {
    Nashik: {
        Onion: 1850,
        Wheat: 2000,
        Rice: 2100,
        Tomato: 1500,
    },
    "Chh. Sambhajinagar": {
        Onion: 1800,
        Wheat: 1950,
        Rice: 2050,
        Tomato: 1450,
    },
    Pune: {
        Onion: 1900,
        Wheat: 2050,
        Rice: 2150,
        Tomato: 1520,
    },
    // Add more APMC locations as needed
};

export const WEATHER_MOCK: Record<string, { temp: number; humidity: number; condition: string }> = {
    Nashik: { temp: 32, humidity: 60, condition: "Sunny" },
    "Chh. Sambhajinagar": { temp: 30, humidity: 55, condition: "Partly Cloudy" },
    Pune: { temp: 33, humidity: 65, condition: "Sunny" },
    Nagpur: { temp: 34, humidity: 70, condition: "Hot" },
};

export const CLIMATE_FORECAST: Record<string, { trend: string; rain: string }> = {
    Nashik: { trend: "Warming", rain: "Above Average" },
    Pune: { trend: "Stable", rain: "Average" },
    "Chh. Sambhajinagar": { trend: "Dry Spell Expected", rain: "Below Average" },
    Nagpur: { trend: "Heat Wave", rain: "Low" },
};
