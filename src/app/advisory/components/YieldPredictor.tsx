"use client";

import { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import styles from '../page.module.css';

export default function YieldPredictor() {
    const [yieldCrop, setYieldCrop] = useState('Wheat');
    const [yieldArea, setYieldArea] = useState('');
    const [yieldSoil, setYieldSoil] = useState('Loamy');
    const [yieldIrrigation, setYieldIrrigation] = useState('Irrigated');
    const [yieldResult, setYieldResult] = useState<any>(null);
    const [yieldLoading, setYieldLoading] = useState(false);

    const handleYieldPredict = async () => {
        if (!yieldArea) return alert("Please enter field area.");
        setYieldLoading(true);
        try {
            const res = await fetch('/api/yield', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    crop: yieldCrop,
                    area: yieldArea,
                    soil: yieldSoil,
                    irrigation: yieldIrrigation
                })
            });
            const data = await res.json();
            if (data.success) {
                setYieldResult(data);
            } else {
                alert("Failed to predict yield");
            }
        } catch (e) {
            console.error(e);
            alert("Prediction failed. Please try again.");
        } finally {
            setYieldLoading(false);
        }
    };

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <BarChart3 size={32} className="text-primary" />
                <h2 className={styles.cardTitle}>AI Yield Predictor</h2>
            </div>
            <p style={{ marginBottom: '1.5rem', color: 'var(--muted-foreground)' }}>Predict your crop yield using historical data from <strong>PMFBY & State Agri Depts</strong>.</p>

            <div className={styles.grid2}>
                <div>
                    <label className={styles.label}>Crop</label>
                    <select className={styles.input} value={yieldCrop} onChange={(e) => setYieldCrop(e.target.value)}>
                        <option>Wheat</option><option>Rice</option><option>Corn</option><option>Soybean</option>
                        <option>Cotton</option><option>Sugarcane</option><option>Tomato</option><option>Onion</option>
                    </select>
                </div>
                <div>
                    <label className={styles.label}>Field Area (Acres)</label>
                    <input type="number" className={styles.input} placeholder="e.g. 5" value={yieldArea} onChange={(e) => setYieldArea(e.target.value)} />
                </div>
                <div>
                    <label className={styles.label}>Soil Type</label>
                    <select className={styles.input} value={yieldSoil} onChange={(e) => setYieldSoil(e.target.value)}>
                        <option>Loamy</option><option>Black</option><option>Red</option><option>Alluvial</option><option>Clay</option><option>Sandy</option>
                    </select>
                </div>
                <div>
                    <label className={styles.label}>Irrigation</label>
                    <select className={styles.input} value={yieldIrrigation} onChange={(e) => setYieldIrrigation(e.target.value)}>
                        <option>Irrigated</option><option>Rainfed</option>
                    </select>
                </div>
            </div>

            <button className={styles.analyzeBtn} onClick={handleYieldPredict} disabled={yieldLoading}>
                {yieldLoading ? 'Predicting...' : 'Predict Yield'}
            </button>

            {yieldResult && (
                <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', animation: 'fadeIn 0.5s ease-out' }}>
                    <div style={{
                        padding: '1.5rem',
                        borderRadius: '0.75rem',
                        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
                        border: '1px solid var(--primary)'
                    }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--foreground)', marginBottom: '1rem' }}>Prediction Results</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)' }}>Expected Yield</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>{yieldResult.predictedYield} Qt</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)' }}>Est. Revenue</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#10b981' }}>₹{yieldResult.estimatedRevenue}</div>
                            </div>
                        </div>
                        <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--muted-foreground)', textAlign: 'right' }}>Model data calibrated with PMFBY cluster yields.</div>
                    </div>
                </div>
            )}
        </div>
    );
}
