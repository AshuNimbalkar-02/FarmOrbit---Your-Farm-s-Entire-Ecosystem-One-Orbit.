"use client";

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import { TrendingUp, TrendingDown, Filter, Loader2 } from 'lucide-react';

interface MarketItem {
    id: number;
    crop: string;
    location: string;
    price: string;
    change: string;
    isUp: boolean;
}

export default function Market() {
    const [data, setData] = useState<MarketItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [cropFilter, setCropFilter] = useState('All Crops');
    const [locFilter, setLocFilter] = useState('All Locations');

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const query = new URLSearchParams({
                    crop: cropFilter,
                    location: locFilter
                });
                const res = await fetch(`/api/market?${query.toString()}`);
                if (res.ok) {
                    const json = await res.json();
                    setData(json);
                }
            } catch (error) {
                console.error("Failed to fetch market data", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [cropFilter, locFilter]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Live Market Prices</h1>
                <p style={{ color: 'var(--muted-foreground)' }}>Real-time updates from major mandis across India.</p>
            </div>

            <div className={styles.filters}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--muted-foreground)' }}>
                    <Filter size={20} />
                    <span>Filter by:</span>
                </div>
                <select
                    className={styles.select}
                    value={cropFilter}
                    onChange={(e) => setCropFilter(e.target.value)}
                >
                    <option>All Crops</option>
                    <option>Cereals</option>
                    <option>Vegetables</option>
                    <option>Oilseeds</option>
                </select>
                <select
                    className={styles.select}
                    value={locFilter}
                    onChange={(e) => setLocFilter(e.target.value)}
                >
                    <option>All Locations</option>
                    <option>Delhi</option>
                    <option>Maharashtra</option>
                    <option>Punjab</option>
                    <option>Gujarat</option>
                    <option>Rajasthan</option>
                    <option>UP</option>
                </select>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.th}>Crop Name</th>
                            <th className={styles.th}>Market / Mandi</th>
                            <th className={styles.th}>Current Price</th>
                            <th className={styles.th}>24h Change</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={4} style={{ textAlign: 'center', padding: '3rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', color: 'var(--muted-foreground)' }}>
                                        <Loader2 className={styles.spin} size={24} /> Loading live prices...
                                    </div>
                                </td>
                            </tr>
                        ) : data.length === 0 ? (
                            <tr>
                                <td colSpan={4} style={{ textAlign: 'center', padding: '3rem', color: 'var(--muted-foreground)' }}>
                                    No market data found for current filters.
                                </td>
                            </tr>
                        ) : (
                            data.map((item) => (
                                <tr key={item.id} className={styles.tr}>
                                    <td className={styles.td} style={{ fontWeight: 600 }}>{item.crop}</td>
                                    <td className={styles.td}>{item.location}</td>
                                    <td className={styles.td}>{item.price}</td>
                                    <td className={styles.td}>
                                        <span className={item.isUp ? styles.trendUp : styles.trendDown}>
                                            {item.isUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                                            {item.change}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
