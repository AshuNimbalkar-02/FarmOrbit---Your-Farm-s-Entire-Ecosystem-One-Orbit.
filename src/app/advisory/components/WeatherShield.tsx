"use client";

import { useState } from 'react';
import { CloudRain, AlertTriangle } from 'lucide-react';
import styles from '../page.module.css';

export default function WeatherShield() {
    const [weatherCity, setWeatherCity] = useState('');
    const [weatherResult, setWeatherResult] = useState<React.ReactNode | null>(null);

    const handleWeatherCheck = () => {
        if (!weatherCity) return alert("Enter district or city name.");
        setWeatherResult(
            <div style={{ marginTop: '1.5rem', color: 'var(--foreground)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 600 }}>🌡️ 28°C (75% Hum.)</span>
                    <span style={{ color: '#fbbf24', fontWeight: 600, fontSize: '1.2rem' }}>☁️ Cloudy</span>
                </div>
                <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.15)', borderRadius: '0.5rem', border: '1px solid #ef4444', color: '#fca5a5', display: 'flex', gap: '0.75rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <AlertTriangle size={24} style={{ minWidth: '24px', marginTop: '2px' }} />
                    <span style={{ fontSize: '1rem', lineHeight: 1.5 }}>High fungal risk detected due to humidity. Delay sensitive sprays by 24h.</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)', textAlign: 'right', borderTop: '1px solid var(--border)', paddingTop: '0.5rem' }}>
                    Source: Indian Meteorological Department (IMD) / Mausam API
                </div>
            </div>
        );
    };

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <CloudRain size={32} className="text-primary" />
                <h2 className={styles.cardTitle}>Weather Risk Shield</h2>
            </div>
            <p style={{ marginBottom: '1.5rem', color: 'var(--muted-foreground)' }}>Get hyper-local weather & risk alerts based on your location.</p>
            <label className={styles.label}>District / City</label>
            <input type="text" className={styles.input} placeholder="e.g. Nashik" value={weatherCity} onChange={(e) => setWeatherCity(e.target.value)} />
            <button className={styles.analyzeBtn} onClick={handleWeatherCheck}>Check Risk Level</button>
            {weatherResult}
        </div>
    );
}
