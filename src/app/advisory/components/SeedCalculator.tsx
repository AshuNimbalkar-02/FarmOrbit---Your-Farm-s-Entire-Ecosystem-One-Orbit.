"use client";

import { useState } from 'react';
import { Scale, Volume2 } from 'lucide-react';
import styles from '../page.module.css';
import { speak } from '../utils';

export default function SeedCalculator() {
    const [seedCrop, setSeedCrop] = useState('Wheat');
    const [seedArea, setSeedArea] = useState('');
    const [seedResult, setSeedResult] = useState<string | null>(null);

    const handleSeedCalculate = () => {
        if (!seedArea) return alert("Please enter area in acres.");
        const acres = parseFloat(seedArea);
        let rate = 0;
        if (seedCrop === 'Wheat') rate = 40;
        else if (seedCrop === 'Rice') rate = 25;
        else if (seedCrop === 'Corn') rate = 8;
        else if (seedCrop === 'Soybean') rate = 30;
        setSeedResult(`Total Seed Required: ${rate * acres} kg\n(Approx. Rate: ${rate} kg/acre)`);
    };

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <Scale size={32} className="text-primary" />
                <h2 className={styles.cardTitle}>Seed Rate Calculator</h2>
            </div>
            <div className={styles.grid2}>
                <div>
                    <label className={styles.label}>Crop</label>
                    <select className={styles.input} value={seedCrop} onChange={(e) => setSeedCrop(e.target.value)}>
                        <option>Wheat</option><option>Rice</option><option>Corn</option><option>Soybean</option>
                    </select>
                </div>
                <div>
                    <label className={styles.label}>Area (Acres)</label>
                    <input type="number" className={styles.input} placeholder="e.g. 2.5" value={seedArea} onChange={(e) => setSeedArea(e.target.value)} />
                </div>
            </div>
            <button className={styles.analyzeBtn} onClick={handleSeedCalculate}>Calculate Seeds</button>
            {seedResult && (
                <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: 'rgba(245, 158, 11, 0.1)', borderRadius: '0.75rem', border: '1px solid #f59e0b', animation: 'fadeIn 0.5s ease-out' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <h3 style={{ color: '#fbbf24', fontSize: '1.25rem' }}>Seed Requirement</h3>
                        <button onClick={() => speak(seedResult)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fbbf24' }}>
                            <Volume2 size={24} />
                        </button>
                    </div>
                    <p style={{ whiteSpace: 'pre-line', lineHeight: 1.6, fontSize: '1.1rem' }}>{seedResult}</p>
                </div>
            )}
        </div>
    );
}
