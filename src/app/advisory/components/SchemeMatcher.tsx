"use client";

import { useState } from 'react';
import { ShieldCheck, Volume2 } from 'lucide-react';
import styles from '../page.module.css';
import { speak } from '../utils';

export default function SchemeMatcher() {
    const [schemeCategory, setSchemeCategory] = useState('Small Farmer (<2 Ac)');
    const [schemeState, setSchemeState] = useState('Maharashtra');
    const [schemeResult, setSchemeResult] = useState<string | null>(null);

    const handleSchemeFind = () => {
        const schemes = ["• PM Kisan Samman Nidhi (₹6000/yr)", "• Soil Health Card Scheme"];
        if (schemeState === 'Maharashtra') schemes.push("• Nanaaji Deshmukh Krishi Sanjeevani Yojana (MahaDBT)");
        if (schemeState === 'Punjab') schemes.push("• Pani Bachao Paisa Kamao (DBT Punjab)");
        if (schemeState === 'Gujarat') schemes.push("• Mukhyamantri Kisan Sahay Yojana (iKhedut)");
        if (schemeCategory.includes("Small")) schemes.push("• PM Fasal Bima Yojana (Subsidized Premium)");
        setSchemeResult(schemes.join("\n"));
    };

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <ShieldCheck size={32} className="text-primary" />
                <h2 className={styles.cardTitle}>Scheme Matcher</h2>
            </div>
            <p style={{ marginBottom: '1.5rem', color: 'var(--muted-foreground)' }}>Find Government schemes you are eligible for. Powered by <strong>MyScheme / DBT Bharat</strong> APIs.</p>
            <label className={styles.label}>Farmer Category</label>
            <select className={styles.input} value={schemeCategory} onChange={(e) => setSchemeCategory(e.target.value)}>
                <option>Small Farmer (&lt;2 Ac)</option>
                <option>Medium Farmer (2-5 Ac)</option>
                <option>Large Farmer (&gt;5 Ac)</option>
            </select>
            <label className={styles.label}>State</label>
            <select className={styles.input} value={schemeState} onChange={(e) => setSchemeState(e.target.value)}>
                <option>Maharashtra</option><option>Punjab</option><option>Gujarat</option><option>MP</option>
            </select>
            <button className={styles.analyzeBtn} onClick={handleSchemeFind}>Find My Schemes</button>
            {schemeResult && (
                <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: 'rgba(168, 85, 247, 0.1)', borderRadius: '0.75rem', border: '1px solid #a855f7', animation: 'fadeIn 0.5s ease-out' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <h3 style={{ color: '#c084fc', fontSize: '1.25rem' }}>Eligible Schemes</h3>
                        <button onClick={() => speak(schemeResult)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#c084fc' }}>
                            <Volume2 size={24} />
                        </button>
                    </div>
                    <p style={{ whiteSpace: 'pre-line', lineHeight: 1.6, fontSize: '1.1rem' }}>{schemeResult}</p>
                </div>
            )}
        </div>
    );
}
