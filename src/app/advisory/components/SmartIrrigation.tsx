"use client";

import { useState } from 'react';
import { Droplets } from 'lucide-react';
import styles from '../page.module.css';

export default function SmartIrrigation() {
    const [irrCrop, setIrrCrop] = useState('Wheat');
    const [irrStage, setIrrStage] = useState('Mid-Season');
    const [irrSoil, setIrrSoil] = useState('Loam');
    const [irrMethod, setIrrMethod] = useState('Drip');
    const [irrResult, setIrrResult] = useState<any>(null);

    const handleIrrigationPlan = () => {
        // 1. Determine ETo (Reference Evapotranspiration) - Mock based on "Summer/Hot"
        const ETo = 6.5; // mm/day (High for summer)

        // 2. Determine Kc (Crop Coefficient) based on Stage
        let Kc = 0.5;
        if (irrStage === 'Initial') Kc = 0.4;
        if (irrStage === 'Development') Kc = 0.8;
        if (irrStage === 'Mid-Season') Kc = 1.15;
        if (irrStage === 'Late-Season') Kc = 0.7;

        // 3. Calculate ETc (Crop Evapotranspiration)
        const ETc = ETo * Kc;

        // 4. Adjust for Soil Moisture Holding Capacity (Mock)
        // Sandy holds less, Clay holds more. We assume Depletion is 50%.
        // This is a simplified "Need to replenish" logic.
        const waterNeededMm = ETc; // Assuming we need to replace daily loss

        // 5. Calculate Volume per Acre (1 mm = 4047 liters/acre approx? No, 1mm = 1 liter/m2. 1 acre = 4047 m2. So 4047 liters.)
        const litersPerAcre = waterNeededMm * 4047;

        // 6. Adjust for System Efficiency
        let efficiency = 0.9; // Drip
        if (irrMethod === 'Sprinkler') efficiency = 0.75;
        if (irrMethod === 'Flood') efficiency = 0.50;

        const grossWaterLiters = litersPerAcre / efficiency;

        // Pump Runtime (Assuming 10,000 L/hr pump for 1 acre)
        const pumpCapacity = 10000;
        const runTimeHours = grossWaterLiters / pumpCapacity;

        setIrrResult({
            eto: ETo,
            kc: Kc,
            etc: ETc.toFixed(2),
            waterVol: Math.round(grossWaterLiters).toLocaleString(),
            hours: Math.floor(runTimeHours),
            minutes: Math.round((runTimeHours % 1) * 60)
        });
    };

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <Droplets size={32} className="text-primary" />
                <h2 className={styles.cardTitle}>Smart Irrigation Engine</h2>
            </div>
            <p style={{ marginBottom: '1.5rem', color: 'var(--muted-foreground)' }}>Evapotranspiration (ET) model based precision watering schedule. Follows <strong>PMKSY (Per Drop More Crop)</strong> efficiency norms.</p>

            <div className={styles.grid2}>
                <div>
                    <label className={styles.label}>Crop Profile</label>
                    <select className={styles.input} value={irrCrop} onChange={(e) => setIrrCrop(e.target.value)}>
                        <option>Wheat</option><option>Tomato</option><option>Corn</option><option>Cotton</option><option>Sugarcane</option>
                    </select>
                </div>
                <div>
                    <label className={styles.label}>Growth Stage</label>
                    <select className={styles.input} value={irrStage} onChange={(e) => setIrrStage(e.target.value)}>
                        <option value="Initial">Initial / Sprouting</option>
                        <option value="Development">Vegetative / Development</option>
                        <option value="Mid-Season">Mid-Season / Flowering</option>
                        <option value="Late-Season">Late-Season / Ripening</option>
                    </select>
                </div>
                <div>
                    <label className={styles.label}>Soil Type</label>
                    <select className={styles.input} value={irrSoil} onChange={(e) => setIrrSoil(e.target.value)}>
                        <option>Sandy (Fast Draining)</option>
                        <option>Loam (Balanced)</option>
                        <option>Clay (Water Retentive)</option>
                    </select>
                </div>
                <div>
                    <label className={styles.label}>Irrigation Method</label>
                    <select className={styles.input} value={irrMethod} onChange={(e) => setIrrMethod(e.target.value)}>
                        <option value="Drip">Drip Irrigation (90% Eff)</option>
                        <option value="Sprinkler">Sprinkler (75% Eff)</option>
                        <option value="Flood">Flood / Furrow (50% Eff)</option>
                    </select>
                </div>
            </div>

            <button className={styles.analyzeBtn} onClick={handleIrrigationPlan}>Calculate Water Needs</button>

            {irrResult && (
                <div style={{ marginTop: '2rem', animation: 'fadeIn 0.5s ease-out' }}>
                    <div style={{
                        padding: '1.5rem',
                        background: 'linear-gradient(to right, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.1))',
                        borderRadius: '0.75rem',
                        border: '1px solid #3b82f6',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#2563eb' }}>💧 Irrigation Schedule (Daily)</h3>
                            <div style={{ background: '#2563eb', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.85rem' }}>
                                ETc: {irrResult.etc} mm/day
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div style={{ background: 'var(--card)', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                                <div style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)' }}>Total Water Req</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--foreground)' }}>{irrResult.waterVol} L</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>(per acre)</div>
                            </div>
                            <div style={{ background: 'var(--card)', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                                <div style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)' }}>Pump Runtime</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ef4444' }}>
                                    {irrResult.hours}h {irrResult.minutes}m
                                </div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>@ 10k L/hr flow</div>
                            </div>
                        </div>

                        <p style={{ fontSize: '0.95rem', lineHeight: 1.5, color: '#1e40af' }}>
                            <strong>Advice:</strong> Based on the {irrStage} stage (Kc: {irrResult.kc}), user <strong>{irrMethod}</strong> irrigation. Schedule watering in early morning (6 AM) to minimize evaporation.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
