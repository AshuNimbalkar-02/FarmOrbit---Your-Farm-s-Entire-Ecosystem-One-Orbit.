"use client";

import { useState } from 'react';
import { Wrench } from 'lucide-react';
import styles from '../page.module.css';

export default function RentTool() {
    const [rentType, setRentType] = useState('Drone Spraying');
    const [rentDate, setRentDate] = useState('');
    const [rentStatus, setRentStatus] = useState<string | null>(null);

    const handleRentBook = () => {
        if (!rentDate) return alert("Select a date.");
        setRentStatus(`Booking Confirmed! \nProvider: "AgriMech Solutions"\nEquipment: ${rentType}\nDate: ${rentDate}\nEst. Cost: ₹1200/acre`);
    };

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <Wrench size={32} className="text-primary" />
                <h2 className={styles.cardTitle}>Rent-a-Farm-Tool</h2>
            </div>
            <p style={{ marginBottom: '1.5rem', color: 'var(--muted-foreground)' }}>Book advanced machinery and drones. Integrated with <strong>FARMS (Farm Machinery Solutions) App & CHC Centers</strong>.</p>

            <div className={styles.grid2}>
                <div>
                    <label className={styles.label}>Equipment</label>
                    <select className={styles.input} value={rentType} onChange={(e) => setRentType(e.target.value)}>
                        <option>Drone Spraying</option><option>Rotavator</option><option>Harvester</option><option>Laser Leveler</option>
                    </select>
                </div>
                <div>
                    <label className={styles.label}>Date Required</label>
                    <input type="date" className={styles.input} value={rentDate} onChange={(e) => setRentDate(e.target.value)} />
                </div>
            </div>

            <button className={styles.analyzeBtn} onClick={handleRentBook}>Check Availability & Book</button>

            {rentStatus && (
                <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', borderRadius: '0.75rem', border: '1px solid #3b82f6', animation: 'fadeIn 0.5s ease-out' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <h3 style={{ color: '#60a5fa', fontSize: '1.25rem' }}>Status: Confirmed</h3>
                    </div>
                    <p style={{ whiteSpace: 'pre-line', lineHeight: 1.6, fontSize: '1.1rem' }}>{rentStatus}</p>
                </div>
            )}
        </div>
    );
}
