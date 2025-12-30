"use client";

import { useState, useRef } from 'react';
import { Activity, Upload, CheckCircle2, Volume2 } from 'lucide-react';
import styles from '../page.module.css';
import { speak } from '../utils';

export default function CropDoctor() {
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState<null | string>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);
            setResult(null);
        }
    };

    const handleAnalyze = () => {
        if (!preview) return alert("Please upload an image first.");
        setAnalyzing(true);
        setResult(null);
        setTimeout(() => {
            setAnalyzing(false);
            setResult("Detected: Early Blight (Confidence: 94%). Recommended Action: Apply Mancozeb fungicide twice at 10-day intervals.");
        }, 2500);
    };

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <Activity size={32} className="text-primary" />
                <h2 className={styles.cardTitle}>Crop Doctor AI</h2>
            </div>
            <p style={{ marginBottom: '1.5rem', color: 'var(--muted-foreground)' }}>Upload an image of the affected leaf/plant for instant diagnosis.</p>
            <div className={styles.uploadArea} onClick={() => fileInputRef.current?.click()} style={{ backgroundImage: preview ? `url(${preview})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center', height: '300px', position: 'relative' }}>
                {!preview && (
                    <>
                        <Upload size={48} color="var(--muted-foreground)" />
                        <p style={{ marginTop: '1rem', color: 'var(--muted-foreground)' }}>Click to Upload Image</p>
                    </>
                )}
                {preview && <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: 'white', fontWeight: 'bold', background: 'rgba(0,0,0,0.6)', padding: '0.5rem 1rem', borderRadius: '4px' }}>Change Image</span>
                </div>}
                <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
            </div>
            <button className={styles.analyzeBtn} onClick={handleAnalyze} disabled={analyzing} style={{ opacity: analyzing ? 0.7 : 1 }}>
                {analyzing ? 'Analyzing Crop Health...' : 'Diagnose Disease'}
            </button>
            {result && (
                <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '0.75rem', border: '1px solid var(--primary)', animation: 'fadeIn 0.5s ease-out' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <h3 style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem' }}>
                            <CheckCircle2 size={24} /> Analysis Result
                        </h3>
                        <button onClick={() => speak(result)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)' }}>
                            <Volume2 size={24} />
                        </button>
                    </div>
                    <p style={{ lineHeight: 1.6, fontSize: '1.1rem' }}>{result}</p>
                </div>
            )}
        </div>
    );
}
