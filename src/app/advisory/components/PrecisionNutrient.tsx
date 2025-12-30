"use client";

import { useState } from 'react';
import { Wifi } from 'lucide-react';
import styles from '../page.module.css';

export default function PrecisionNutrient() {
    const [iotN, setIotN] = useState('');
    const [iotP, setIotP] = useState('');
    const [iotK, setIotK] = useState('');
    const [iotPh, setIotPh] = useState('');
    const [iotMoisture, setIotMoisture] = useState('');
    const [iotLoading, setIotLoading] = useState(false);
    const [iotResult, setIotResult] = useState<any>(null);

    const handleSimulateSensors = () => {
        // Simulate reading from IoT Cloud
        setIotLoading(true);
        setTimeout(() => {
            setIotN((Math.random() * (400 - 150) + 150).toFixed(0)); // Range 150-400
            setIotP((Math.random() * (40 - 5) + 5).toFixed(0));      // Range 5-40
            setIotK((Math.random() * (300 - 100) + 100).toFixed(0)); // Range 100-300
            setIotPh((Math.random() * (8.5 - 5.5) + 5.5).toFixed(1)); // Range 5.5-8.5
            setIotMoisture((Math.random() * (80 - 20) + 20).toFixed(0)); // Range 20-80
            setIotLoading(false);
        }, 1500);
    };

    const handleNutrientAnalysis = () => {
        if (!iotN || !iotP || !iotK) return alert("Please fetch or enter sensor data.");
        setIotLoading(true);

        // Simulated ML Model simulated processing time
        setTimeout(() => {
            const n = parseFloat(iotN);
            const p = parseFloat(iotP);
            const k = parseFloat(iotK);
            const ph = parseFloat(iotPh);

            let status = "Healthy";
            let deficiencies = [];
            let recommendations = [];
            let vrtMap = [];

            // Logic Simulation
            if (n < 280) {
                deficiencies.push("Nitrogen (N) Critical");
                recommendations.push("Apply Urea @ 50kg/acre immediately.");
            }
            if (p < 10) {
                deficiencies.push("Phosphorus (P) Low");
                recommendations.push("Root zone application of DAP.");
            }
            if (k < 150) {
                deficiencies.push("Potassium (K) Deficiency");
                recommendations.push("Spray MOP or Potash active.");
            }
            if (ph < 6.0) recommendations.push("Soil is Acidic: Apply Lime.");
            if (ph > 7.5) recommendations.push("Soil is Alkaline: Apply Gypsum.");

            if (deficiencies.length === 0 && recommendations.length === 0) {
                status = "Optimal";
                recommendations.push("Continue current fertigation plan.");
            } else {
                status = "Attention Needed";
            }

            // Variable Rate Technology (VRT) Map Mock
            vrtMap = [
                { zone: "Zone A (North)", status: "Low N", action: "Increase Usage by 20%" },
                { zone: "Zone B (Center)", status: "Optimal", action: "Standard Rate" },
                { zone: "Zone C (South)", status: "High pH", action: "Add Gypsum Buffer" }
            ];

            setIotResult({ status, deficiencies, recommendations, vrtMap });
            setIotLoading(false);
        }, 2000);
    };

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <Wifi size={32} className="text-primary" />
                <h2 className={styles.cardTitle}>IoT Precision Nutrient Analyzer</h2>
            </div>
            <p style={{ marginBottom: '1.5rem', color: 'var(--muted-foreground)' }}>Cloud Platform connecting to IoT Soil Sensors. Data syncs with <strong>Soil Health Card Portal</strong>.</p>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'flex-end' }}>
                <button className={styles.analyzeBtn} onClick={handleSimulateSensors} disabled={iotLoading} style={{ background: 'var(--muted)', color: 'var(--foreground)', border: '1px solid var(--border)' }}>
                    {iotLoading ? 'Connecting to Sensors...' : '📡 Sync IoT Sensors'}
                </button>
            </div>

            <div className={styles.grid2}>
                <div><label className={styles.label}>Nitrogen (N) mg/kg</label><input type="number" className={styles.input} value={iotN} onChange={(e) => setIotN(e.target.value)} /></div>
                <div><label className={styles.label}>Phosphorus (P) mg/kg</label><input type="number" className={styles.input} value={iotP} onChange={(e) => setIotP(e.target.value)} /></div>
                <div><label className={styles.label}>Potassium (K) mg/kg</label><input type="number" className={styles.input} value={iotK} onChange={(e) => setIotK(e.target.value)} /></div>
                <div><label className={styles.label}>Soil pH</label><input type="number" className={styles.input} value={iotPh} onChange={(e) => setIotPh(e.target.value)} /></div>
                <div><label className={styles.label}>Moisture (%)</label><input type="number" className={styles.input} value={iotMoisture} onChange={(e) => setIotMoisture(e.target.value)} /></div>
            </div>

            <button className={styles.analyzeBtn} onClick={handleNutrientAnalysis} disabled={iotLoading}>
                {iotLoading ? 'Running ML Models...' : 'Analyze Soil Health'}
            </button>

            {iotResult && (
                <div style={{ marginTop: '2rem', animation: 'fadeIn 0.5s ease-out' }}>
                    <div style={{
                        padding: '1.5rem',
                        borderRadius: '0.75rem',
                        border: '1px solid',
                        borderColor: iotResult.status === 'Optimal' ? '#10b981' : '#ef4444',
                        background: iotResult.status === 'Optimal' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        marginBottom: '1.5rem'
                    }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: iotResult.status === 'Optimal' ? '#10b981' : '#ef4444', marginBottom: '0.5rem' }}>
                            {iotResult.status}
                        </h3>
                        {iotResult.deficiencies.length > 0 && (
                            <div style={{ marginBottom: '1rem' }}>
                                <strong>Deficiencies Detected: </strong>
                                {iotResult.deficiencies.join(", ")}
                            </div>
                        )}
                        <div style={{ whiteSpace: 'pre-line', fontSize: '1.1rem' }}>
                            <strong>Rx: </strong>
                            {iotResult.recommendations.map((r: string, i: number) => <div key={i}>• {r}</div>)}
                        </div>
                    </div>

                    <h4 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1rem' }}>🗺️ Variable Rate Application (VRT) Map</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                        {iotResult.vrtMap.map((zone: any, idx: number) => (
                            <div key={idx} style={{ padding: '1rem', background: 'var(--card)', borderRadius: '0.5rem', border: '1px solid var(--border)' }}>
                                <div style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)' }}>{zone.zone}</div>
                                <div style={{ fontWeight: 600, margin: '0.5rem 0' }}>{zone.status}</div>
                                <div style={{ color: 'var(--primary)', fontSize: '0.9rem' }}>{zone.action}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
