"use client";

import { useState } from 'react';
import { Calculator, Volume2 } from 'lucide-react';
import styles from '../page.module.css';
import { speak } from '../utils';

export default function ROICalculator() {
    const [expectedYield, setExpectedYield] = useState('');
    const [marketPrice, setMarketPrice] = useState('');
    const [inputCost, setInputCost] = useState('');
    const [profitResult, setProfitResult] = useState<string | null>(null);

    const handleProfitCalculate = () => {
        if (!expectedYield || !marketPrice || !inputCost) return alert("Please fill all fields.");
        const revenue = parseFloat(expectedYield) * parseFloat(marketPrice);
        const profit = revenue - parseFloat(inputCost);
        setProfitResult(`Est. Revenue: ₹${revenue.toLocaleString()}\nNet Profit: ₹${profit.toLocaleString()}\nROI: ${((profit / parseFloat(inputCost)) * 100).toFixed(1)}%`);
    };

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <Calculator size={32} className="text-primary" />
                <h2 className={styles.cardTitle}>ROI Calculator</h2>
            </div>
            <div className={styles.grid2}>
                <div><label className={styles.label}>Exp. Yield (Qt)</label><input type="number" className={styles.input} value={expectedYield} onChange={(e) => setExpectedYield(e.target.value)} /></div>
                <div><label className={styles.label}>Price (₹/Qt)</label><input type="number" className={styles.input} value={marketPrice} onChange={(e) => setMarketPrice(e.target.value)} /></div>
            </div>
            <label className={styles.label}>Total Input Cost (₹)</label>
            <input type="number" className={styles.input} value={inputCost} onChange={(e) => setInputCost(e.target.value)} />
            <button className={styles.analyzeBtn} onClick={handleProfitCalculate}>Calculate Profit</button>
            {profitResult && (
                <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '0.75rem', border: '1px solid #10b981', animation: 'fadeIn 0.5s ease-out' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <h3 style={{ color: '#34d399', fontSize: '1.25rem' }}>Financial Projection</h3>
                        <button onClick={() => speak(profitResult)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#34d399' }}>
                            <Volume2 size={24} />
                        </button>
                    </div>
                    <p style={{ whiteSpace: 'pre-line', lineHeight: 1.6, fontSize: '1.1rem' }}>{profitResult}</p>
                </div>
            )}
        </div>
    );
}
