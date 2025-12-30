"use client";

import { useState } from 'react';
import { Truck } from 'lucide-react';
import styles from '../page.module.css';

export default function SmartSell() {
    const [sellCrop, setSellCrop] = useState('Onion');
    const [sellQty, setSellQty] = useState('');
    const [sellResult, setSellResult] = useState<any[] | null>(null);

    const handleSmartSellCalc = () => {
        if (!sellQty) return alert("Please enter quantity.");
        const qty = parseFloat(sellQty);
        // Mock Logic: Compare 3 markets
        // Logic: Net Profit = (Price * Qty) - (Distance * TransportCost)
        const markets = [
            { name: "Local Mandi (10km)", price: 1800, dist: 10, transport: 200, net: (1800 * qty) - 200 },
            { name: "District APMC (45km)", price: 2100, dist: 45, transport: 1200, net: (2100 * qty) - 1200 },
            { name: "Metro Market (120km)", price: 2600, dist: 120, transport: 4000, net: (2600 * qty) - 4000 },
        ];
        // Sort by Net Profit desc
        markets.sort((a, b) => b.net - a.net);
        setSellResult(markets);
    };

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <Truck size={32} className="text-primary" />
                <h2 className={styles.cardTitle}>Smart Sell Optimizer</h2>
            </div>
            <p style={{ marginBottom: '1.5rem', color: 'var(--muted-foreground)' }}>Find the best market to sell your produce. Live prices linked to <strong>e-NAM (National Agriculture Market)</strong>.</p>

            <div className={styles.grid2}>
                <div>
                    <label className={styles.label}>Crop</label>
                    <select className={styles.input} value={sellCrop} onChange={(e) => setSellCrop(e.target.value)}>
                        <option>Onion</option><option>Tomato</option><option>Soybean</option><option>Cotton</option>
                    </select>
                </div>
                <div>
                    <label className={styles.label}>Quantity (Quintals)</label>
                    <input type="number" className={styles.input} placeholder="e.g. 50" value={sellQty} onChange={(e) => setSellQty(e.target.value)} />
                </div>
            </div>

            <button className={styles.analyzeBtn} onClick={handleSmartSellCalc}>Find Best Market</button>

            {sellResult && (
                <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {sellResult.map((m, idx) => (
                        <div key={idx} style={{
                            padding: '1rem',
                            borderRadius: '0.75rem',
                            border: idx === 0 ? '2px solid var(--primary)' : '1px solid var(--border)',
                            background: idx === 0 ? 'rgba(16, 185, 129, 0.1)' : 'var(--background)',
                            position: 'relative'
                        }}>
                            {idx === 0 && <span style={{ position: 'absolute', top: -10, right: 10, background: 'var(--primary)', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>BEST OPTION</span>}
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{m.name}</h3>
                                <span style={{ fontSize: '1.2rem', fontWeight: 700, color: idx === 0 ? 'var(--primary)' : 'var(--foreground)' }}>₹{m.net.toLocaleString()}</span>
                            </div>
                            <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem', color: 'var(--muted-foreground)' }}>
                                <span>Price: ₹{m.price}/Qt</span>
                                <span>Distance: {m.dist}km</span>
                                <span>Transport: -₹{m.transport}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
