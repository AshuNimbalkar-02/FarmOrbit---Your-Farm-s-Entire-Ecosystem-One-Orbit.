"use client";

import { useState } from 'react';
import { Sprout, Volume2, Beaker, Leaf, CheckCircle2, FlaskConical, AlertCircle, Droplets, Share2, MessageCircle, MessageSquare } from 'lucide-react';
import styles from '../page.module.css'; // Make sure this path is correct relative to the file
import { speak } from '../utils';

// Types for the fertilizer and guidance plans
type FertilizerItem = {
    name: string;
    dosePerAcre: number | string; // number for calculation, string for non-calc items like '2L'
    unit?: string;
};

type PlanStage = {
    stage: string;
    timing: string;
    items: FertilizerItem[];
    // NEW: General crop guidance (agronomy) for this stage
    guidance: string[];
    tip?: string;
};

type CropPlan = {
    chemical: PlanStage[];
    organic: PlanStage[];
};

const FERTILIZER_PLANS: Record<string, CropPlan> = {
    'Wheat': {
        chemical: [
            {
                stage: "Basal Application",
                timing: "At sowing",
                items: [
                    { name: "Urea (N)", dosePerAcre: 25, unit: "kg" },
                    { name: "DAP (P)", dosePerAcre: 55, unit: "kg" },
                    { name: "MOP (K)", dosePerAcre: 25, unit: "kg" }
                ],
                guidance: [
                    "Treat seeds with Carbendazim (2g/kg) to prevent fungal diseases.",
                    "Ensure adequate soil moisture before sowing for better germination.",
                    "Row spacing should be maintained at 20-22.5 cm."
                ],
                tip: "Apply full dose of P and K, and 50% of N at sowing."
            },
            {
                stage: "CRI Stage (Crown Root Initiation)",
                timing: "21-25 Days After Sowing",
                items: [
                    { name: "Urea (N)", dosePerAcre: 25, unit: "kg" },
                    { name: "Zinc Sulphate", dosePerAcre: 5, unit: "kg" }
                ],
                guidance: [
                    "Critical stage for irrigation; moisture stress here reduces yield significantly.",
                    "Weed aggressively; checking for Phalaris minor (Gulli Danda)."
                ],
                tip: "Apply Urea just before irrigation."
            },
            {
                stage: "Tillering / Booting",
                timing: "40-45 Days After Sowing",
                items: [
                    { name: "Urea (N)", dosePerAcre: 25, unit: "kg" }
                ],
                guidance: [
                    "Monitor for termite attack; use Chlorpyriphos if needed.",
                    "Ensure fields are not waterlogged."
                ],
                tip: "Final dose of Nitrogen for grain filling."
            },
            {
                stage: "Flowering & Milking",
                timing: "80-90 Days After Sowing",
                items: [],
                guidance: [
                    "Maintain soil moisture for grain filling.",
                    "Look out for yellow rust on leaves."
                ],
                tip: "No heavy fertilizer needed, just water management."
            }
        ],
        organic: [
            {
                stage: "Soil Preparation",
                timing: "15 days before sowing",
                items: [
                    { name: "Well Decomposed FYM", dosePerAcre: 4000, unit: "kg" },
                    { name: "Trichoderma", dosePerAcre: 2, unit: "kg" }
                ],
                guidance: [
                    "Deep ploughing in summer to kill soil-borne pathogens.",
                    "Green manuring with Dhaincha is highly beneficial."
                ],
                tip: "Mix Trichoderma with FYM for better efficacy."
            },
            {
                stage: "Sowing / Basal",
                timing: "At sowing",
                items: [
                    { name: "Azospirillum", dosePerAcre: 2, unit: "kg" },
                    { name: "PSB", dosePerAcre: 2, unit: "kg" }
                ],
                guidance: [
                    "Seed treatment with Beejamrut is recommended.",
                    "Line sowing is preferred over broadcasting."
                ],
                tip: "Seed treatment is recommended."
            },
            {
                stage: "Growth Stage",
                timing: "30 & 60 Days After Sowing",
                items: [
                    { name: "Jeevamrut (Soil drenching)", dosePerAcre: 200, unit: "Liters" },
                    { name: "Panchagavya (Spray)", dosePerAcre: "3-5%", unit: "solution" }
                ],
                guidance: [
                    "Mulching with crop residue helps conserve moisture.",
                    "Use Dashparni Ark for pest repellent."
                ]
            }
        ]
    },
    'Rice': {
        chemical: [
            {
                stage: "Nursery & Main Field Prep",
                timing: "Pre-planting",
                items: [
                    { name: "Urea (Basal)", dosePerAcre: 35, unit: "kg" },
                    { name: "SSP", dosePerAcre: 150, unit: "kg" },
                    { name: "MOP", dosePerAcre: 25, unit: "kg" }
                ],
                guidance: [
                    "Puddle the field well to minimize water percolation.",
                    "Maintain thin film of water in nursery."
                ]
            },
            {
                stage: "Active Tillering",
                timing: "25-30 DAT",
                items: [
                    { name: "Urea", dosePerAcre: 35, unit: "kg" }
                ],
                guidance: [
                    "Maintain 2-3 cm water level.",
                    "Weed control is essential at this stage."
                ]
            },
            {
                stage: "Panicle Initiation",
                timing: "45-50 DAT",
                items: [
                    { name: "Urea", dosePerAcre: 30, unit: "kg" },
                    { name: "MOP", dosePerAcre: 10, unit: "kg" }
                ],
                guidance: [
                    "Drain out excess water before top dressing urea.",
                    "Monitor for Stem Borer and Leaf Folder."
                ]
            }
        ],
        organic: [
            {
                stage: "Basal",
                timing: "Before Transplanting",
                items: [
                    { name: "Green Manure (Dhaincha)", dosePerAcre: "In-situ", unit: "plough" },
                    { name: "FYM/Compost", dosePerAcre: 3000, unit: "kg" }
                ],
                guidance: [
                    "Incorporate green manure 10 days before transplanting.",
                    "Use salt water selection for healthy seeds."
                ]
            },
            {
                stage: "Tillering",
                timing: "20 DAT",
                items: [
                    { name: "Azolla", dosePerAcre: 100, unit: "kg (fresh)" },
                    { name: "Blue Green Algae", dosePerAcre: 4, unit: "kg" }
                ],
                guidance: [
                    "Use Cono-weeder for weeding and aeration.",
                    "Duck farming integration helps in pest control."
                ]
            },
            {
                stage: "Growth",
                timing: "Every 15 days",
                items: [
                    { name: "Jeevamrut", dosePerAcre: 200, unit: "Liters" }
                ],
                guidance: [
                    "Install pheromone traps to monitor pests.",
                    "Bird perches can help reduce caterpillar population."
                ]
            }
        ]
    },
    'Corn': {
        chemical: [
            {
                stage: "Basal",
                timing: "At Sowing",
                items: [
                    { name: "DAP", dosePerAcre: 50, unit: "kg" },
                    { name: "MOP", dosePerAcre: 25, unit: "kg" },
                    { name: "Zinc Sulphate", dosePerAcre: 10, unit: "kg" }
                ],
                guidance: [
                    "Ensure proper drainage; Maize is sensitive to waterlogging.",
                    "Treat seeds with Imidacloprid."
                ]
            },
            {
                stage: "Knee High Stage",
                timing: "25-30 DAS",
                items: [
                    { name: "Urea", dosePerAcre: 40, unit: "kg" }
                ],
                guidance: [
                    "Earthing up (soil mounding) should be done.",
                    "Remove weeds completely before fertilizer application."
                ]
            },
            {
                stage: "Tasseling Stage",
                timing: "45-50 DAS",
                items: [
                    { name: "Urea", dosePerAcre: 35, unit: "kg" }
                ],
                guidance: [
                    "Critical irrigation stage.",
                    "Watch for Fall Armyworm infestations."
                ]
            }
        ],
        organic: [
            {
                stage: "Basal",
                timing: "Land Prep",
                items: [
                    { name: "FYM", dosePerAcre: 5000, unit: "kg" },
                    { name: "Neem Cake", dosePerAcre: 100, unit: "kg" }
                ],
                guidance: [
                    "Ridge and furrow method is best.",
                    "Intercrop with legumes for nitrogen fix."
                ]
            },
            {
                stage: "Growth",
                timing: "30 DAS",
                items: [
                    { name: "Vermiwash Spray", dosePerAcre: "10%", unit: "solution" }
                ],
                guidance: [
                    "Release Trichogramma for borer control.",
                    "Apply Neem oil spray for general pest repellent."
                ]
            }
        ]
    },
    'Cotton': {
        chemical: [
            {
                stage: "Basal",
                timing: "Sowing",
                items: [
                    { name: "DAP", dosePerAcre: 50, unit: "kg" },
                    { name: "MOP", dosePerAcre: 25, unit: "kg" }
                ],
                guidance: [
                    "Sow on ridges for better root development.",
                    "Gap filling should be done within 10 days."
                ]
            },
            {
                stage: "Vegetative",
                timing: "30 DAS",
                items: [{ name: "Urea", dosePerAcre: 25, unit: "kg" }],
                guidance: ["Thinning: Keep only 1 healthy plant per hill."]
            },
            {
                stage: "Square Formation",
                timing: "50-60 DAS",
                items: [{ name: "Urea", dosePerAcre: 25, unit: "kg" }, { name: "MOP", dosePerAcre: 15, unit: "kg" }],
                guidance: ["Monitor for sucking pests like Jassids and Thrips.", "Topping (terminal bud removal) at 90 days."]
            }
        ],
        organic: [
            {
                stage: "Basal",
                timing: "Prep",
                items: [{ name: "FYM", dosePerAcre: 4000, unit: "kg" }],
                guidance: ["Trap crops: Castor or Marigold around the border."]
            },
            {
                stage: "Pest Mgmt",
                timing: "Need based",
                items: [{ name: "Neem Oil", dosePerAcre: "500ml", unit: "spray" }],
                guidance: ["Use sticky traps (Yellow/Blue)."]
            }
        ]
    },
    'Tomato': {
        chemical: [
            {
                stage: "Basal",
                timing: "Transplanting",
                items: [
                    { name: "DAP", dosePerAcre: 100, unit: "kg" },
                    { name: "MOP", dosePerAcre: 60, unit: "kg" }
                ],
                guidance: ["Staking is important for indeterminate varieties.", "Drip irrigation is highly recommended."]
            },
            {
                stage: "Vegetative",
                timing: "25 DAT",
                items: [
                    { name: "Calcium Nitrate", dosePerAcre: 10, unit: "kg" },
                    { name: "Boron", dosePerAcre: 2, unit: "kg" }
                ],
                guidance: ["Leaf curl virus is common; control whitefly vector."]
            }
        ],
        organic: [
            {
                stage: "Basal",
                timing: "Land Prep",
                items: [
                    { name: "Vermicompost", dosePerAcre: 1000, unit: "kg" },
                    { name: "Trichoderma", dosePerAcre: 2, unit: "kg" }
                ],
                guidance: ["Solarize soil in nursery to kill pathogens."]
            },
            {
                stage: "Flowering",
                timing: "40 DAT",
                items: [
                    { name: "Sour Buttermilk (Spray)", dosePerAcre: "5L", unit: "in 100L water" },
                    { name: "Panchagavya", dosePerAcre: "300ml", unit: "per 10L tank" }
                ],
                tip: "Prevents viral diseases and boosts flowering.",
                guidance: ["Regular pruning of side suckers.", "Fruit borer monitoring with pheromone traps."]
            }
        ]
    },
    'Soybean': {
        chemical: [
            {
                stage: "Basal", timing: "Sowing", items: [
                    { name: "Urea", dosePerAcre: 12, unit: "kg" },
                    { name: "SSP", dosePerAcre: 150, unit: "kg" },
                    { name: "MOP", dosePerAcre: 20, unit: "kg" }
                ], guidance: ["Seed inoculation with Rhizobium culture is a must.", "Broad bed furrow (BBF) method is efficient."]
            }
        ],
        organic: [
            { stage: "Basal", timing: "Sowing", items: [{ name: "Rhizobium", dosePerAcre: "Packet", unit: "seed treatment" }, { name: "PSB", dosePerAcre: "Packet", unit: "seed treatment" }], guidance: ["Mulch with wheat straw.", "Bird perches for pest control."] }
        ]
    },
    'Sugarcane': {
        chemical: [
            { stage: "Basal", timing: "Planting", items: [{ name: "Urea", dosePerAcre: 50, unit: "kg" }, { name: "DAP", dosePerAcre: 80, unit: "kg" }, { name: "MOP", dosePerAcre: 50, unit: "kg" }], guidance: ["Set treatment with Carbendazim.", "Deep furrow planting."] },
            { stage: "Earthing Up", timing: "90-120 DAP", items: [{ name: "Urea", dosePerAcre: 100, unit: "kg" }], guidance: ["Crucial for preventing lodging.", "Detrashing (removing dried leaves)."] }
        ],
        organic: [
            { stage: "Basal", timing: "Planting", items: [{ name: "Press Mud", dosePerAcre: 4, unit: "Tons" }], guidance: ["Trash mulching preserves moisture."] },
            { stage: "Growth", timing: "Monthly", items: [{ name: "Jeevamrut", dosePerAcre: 400, unit: "Liters" }], guidance: ["Release Trichogramma chilonis for borer control."] }
        ]
    },
    'Potato': {
        chemical: [
            { stage: "Basal", timing: "Planting", items: [{ name: "NPK 12:32:16", dosePerAcre: 150, unit: "kg" }], guidance: ["Use whole or cut tubers treated with Mancozeb."] },
            { stage: "Earthing Up", timing: "30 DAP", items: [{ name: "Urea", dosePerAcre: 50, unit: "kg" }], guidance: ["Cover tubers completely to prevent greening.", "Spray for Late Blight prevention."] }
        ],
        organic: [
            { stage: "Basal", timing: "Planting", items: [{ name: "FYM", dosePerAcre: 8, unit: "Tons" }], guidance: ["Select virus-free seed tubers."] }
        ]
    }
};

export default function FertilizerExpert() {
    const [cropType, setCropType] = useState('Wheat');
    const [soilType, setSoilType] = useState('Loamy');
    const [landSize, setLandSize] = useState('');
    const [planType, setPlanType] = useState<'chemical' | 'organic'>('chemical');
    const [showPlan, setShowPlan] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleFertilizerCalculate = () => {
        if (!landSize) return alert("Please enter land size in acres.");
        setShowPlan(true);
    };

    const getCalculatedPlan = () => {
        const cropPlan = FERTILIZER_PLANS[cropType];
        if (!cropPlan) return null;

        const currentPlan = cropPlan[planType];
        const acres = parseFloat(landSize) || 0;

        return currentPlan.map(stage => ({
            ...stage,
            items: stage.items.map(item => ({
                ...item,
                calculatedAmount: typeof item.dosePerAcre === 'number'
                    ? (item.dosePerAcre * acres).toFixed(1)
                    : item.dosePerAcre
            }))
        }));
    };

    const computedPlan = showPlan ? getCalculatedPlan() : null;

    const readPlan = () => {
        if (!computedPlan) return;
        const text = `Here is the ${planType} plan for ${landSize} acres of ${cropType}. ` +
            computedPlan.map(s => `At ${s.stage}, apply ${s.items.map(i => `${i.calculatedAmount} ${i.unit} of ${i.name}`).join(' and ')}.`).join(' ');
        speak(text);
    };

    const [isSending, setIsSending] = useState(false);
    const [sendStatus, setSendStatus] = useState<{ success: boolean, msg: string } | null>(null);

    const generateSharedMessage = () => {
        if (!computedPlan) return '';
        let msg = `*Smart Advisory Plan*\n`;
        msg += `Crop: ${cropType} (${planType.toUpperCase()})\n`;
        msg += `Land: ${landSize} acres\n\n`;

        computedPlan.forEach(p => {
            msg += `🌱 *${p.stage}* (${p.timing})\n`;
            p.items.forEach(i => {
                msg += `- ${i.name}: ${i.calculatedAmount} ${i.unit}\n`;
            });
            if (p.guidance && p.guidance.length > 0) {
                msg += `💡 Tip: ${p.guidance[0]}\n`;
            }
            msg += `\n`;
        });

        msg += `Generated by Smart Agri App`;
        return msg;
    };

    const handleSend = async (type: 'whatsapp' | 'sms') => {
        if (!phoneNumber || phoneNumber.length < 10) return alert("Please enter valid 10-digit number");

        setIsSending(true);
        setSendStatus(null);
        const msg = generateSharedMessage();

        try {
            // Priority 1: Try Server-Side Sending (Automatic)
            const response = await fetch('/api/notify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    phoneNumber,
                    message: msg,
                    type
                })
            });
            const data = await response.json();

            if (data.success) {
                setSendStatus({ success: true, msg: `Sent via ${type}!` });
            } else {
                throw new Error("Failed");
            }
        } catch (error) {
            console.error(error);
            setSendStatus({ success: false, msg: "Opening app..." });
            // Fallback to manual
            const encodedMsg = encodeURIComponent(msg);
            if (type === 'whatsapp') {
                window.open(`https://wa.me/91${phoneNumber}?text=${encodedMsg}`, '_blank');
            } else {
                window.open(`sms:${phoneNumber}?body=${encodedMsg}`, '_self');
            }
        } finally {
            setIsSending(false);
        }
    };

    const handleWhatsApp = () => handleSend('whatsapp');
    const handleSMS = () => handleSend('sms');

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ padding: '0.5rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '0.5rem' }}>
                        <Sprout size={32} className="text-primary" style={{ color: '#3b82f6' }} />
                    </div>
                    <div>
                        <h2 className={styles.cardTitle}>Fertilizer & Crop Guide</h2>
                        <p style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
                            Precision nutrients and stage-wise care
                        </p>
                    </div>
                </div>
            </div>

            <div className={styles.grid2}>
                <div>
                    <label className={styles.label}>Crop Selection</label>
                    <select className={styles.input} value={cropType} onChange={(e) => { setCropType(e.target.value); setShowPlan(false); }}>
                        {Object.keys(FERTILIZER_PLANS).map(crop => (
                            <option key={crop} value={crop}>{crop}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className={styles.label}>Soil Type</label>
                    <select className={styles.input} value={soilType} onChange={(e) => setSoilType(e.target.value)}>
                        <option>Loamy (Balanced)</option>
                        <option>Clay (Heavy)</option>
                        <option>Sandy (Light)</option>
                        <option>Red Soil</option>
                        <option>Black Cotton Soil</option>
                    </select>
                </div>
            </div>

            <label className={styles.label}>Land Size (Acres)</label>
            <div style={{ position: 'relative' }}>
                <input
                    type="number"
                    className={styles.input}
                    placeholder="e.g. 5"
                    value={landSize}
                    onChange={(e) => { setLandSize(e.target.value); setShowPlan(false); }}
                />
                <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }}>
                    Acres
                </span>
            </div>

            <button className={styles.analyzeBtn} onClick={handleFertilizerCalculate}>
                <FlaskConical size={20} style={{ display: 'inline', marginRight: '0.5rem' }} />
                Generate Schedule
            </button>

            {showPlan && (
                <div className={styles.resultCard}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                Recommended Scedule
                                {planType === 'chemical' ?
                                    <span className={styles.chemicalBadge}>Chemical</span> :
                                    <span className={styles.organicBadge}>Organic / Natural</span>
                                }
                            </h3>
                        </div>
                        <button onClick={readPlan} style={{ background: 'var(--card)', border: '1px solid var(--border)', padding: '0.5rem', borderRadius: '50%', cursor: 'pointer', color: 'var(--primary)' }} title="Listen">
                            <Volume2 size={20} />
                        </button>
                    </div>

                    <div className={styles.tabContainer}>
                        <button
                            className={`${styles.tab} ${planType === 'chemical' ? styles.activeTab : ''}`}
                            onClick={() => setPlanType('chemical')}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                <Beaker size={18} />
                                Chemical Plan
                            </div>
                        </button>
                        <button
                            className={`${styles.tab} ${planType === 'organic' ? styles.activeTab : ''}`}
                            onClick={() => setPlanType('organic')}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                <Leaf size={18} />
                                Organic / Natural
                            </div>
                        </button>
                    </div>

                    <div style={{ marginTop: '1.5rem' }}>
                        {computedPlan?.map((stage, index) => (
                            <div key={index} className={styles.timelineItem}>
                                <div className={styles.timelineDot} />
                                <div className={styles.timelineContent}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                        <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>{stage.stage}</span>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', background: 'var(--background)', padding: '2px 8px', borderRadius: '4px', border: '1px solid var(--border)' }}>
                                            {stage.timing}
                                        </span>
                                    </div>
                                    <div style={{ background: 'var(--background)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}>
                                        {/* Inputs Section */}
                                        <div style={{ marginBottom: '1rem' }}>
                                            <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--muted-foreground)', marginBottom: '0.5rem' }}>Inputs</div>
                                            {stage.items.length > 0 ? stage.items.map((item, idx) => (
                                                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.25rem 0', borderBottom: idx !== stage.items.length - 1 ? '1px dashed var(--border)' : 'none' }}>
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                        <CheckCircle2 size={14} className="text-secondary" color={planType === 'organic' ? '#10b981' : '#3b82f6'} />
                                                        {item.name}
                                                    </span>
                                                    <span style={{ fontWeight: 600 }}>
                                                        {item.calculatedAmount} {item.unit}
                                                    </span>
                                                </div>
                                            )) : <div style={{ fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--muted-foreground)' }}>No inputs required.</div>}
                                        </div>

                                        {/* Advisory Section */}
                                        {stage.guidance && stage.guidance.length > 0 && (
                                            <div style={{ background: 'rgba(0,0,0,0.03)', padding: '0.75rem', borderRadius: '0.5rem' }}>
                                                <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--muted-foreground)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                    <AlertCircle size={12} /> Key Operations
                                                </div>
                                                <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.95rem', color: 'var(--foreground)' }}>
                                                    {stage.guidance.map((g, i) => (
                                                        <li key={i} style={{ marginBottom: '0.25rem' }}>{g}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {stage.tip && (
                                            <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--muted-foreground)', fontStyle: 'italic', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                                <Droplets size={14} />
                                                <span>{stage.tip}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Alerts / Share Section */}
                    <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Share2 size={18} /> Get this report on Mobile
                        </h4>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                            <div style={{ flex: 1, minWidth: '200px' }}>
                                <label className={styles.label} style={{ marginTop: 0 }}>Mobile Number</label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <input
                                        type="tel"
                                        className={styles.input}
                                        placeholder="Enter 10-digit number"
                                        maxLength={10}
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <button
                                    onClick={handleWhatsApp}
                                    disabled={isSending}
                                    className={styles.analyzeBtn}
                                    style={{ marginTop: 0, background: '#25D366', color: 'white', whiteSpace: 'nowrap', width: 'auto', padding: '0.85rem 1.25rem', opacity: isSending ? 0.7 : 1, cursor: isSending ? 'not-allowed' : 'pointer' }}
                                >
                                    <MessageCircle size={18} style={{ marginRight: '0.5rem' }} />
                                    {isSending ? 'Sending...' : 'WhatsApp'}
                                </button>
                                <button
                                    onClick={handleSMS}
                                    disabled={isSending}
                                    className={styles.analyzeBtn}
                                    style={{ marginTop: 0, background: 'var(--secondary)', color: 'var(--secondary-foreground)', whiteSpace: 'nowrap', width: 'auto', padding: '0.85rem 1.25rem', opacity: isSending ? 0.7 : 1, cursor: isSending ? 'not-allowed' : 'pointer' }}
                                >
                                    <MessageSquare size={18} style={{ marginRight: '0.5rem' }} />
                                    {isSending ? 'Sending...' : 'SMS'}
                                </button>
                            </div>
                        </div>
                        {sendStatus && (
                            <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: sendStatus.success ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', borderRadius: '0.5rem', border: `1px solid ${sendStatus.success ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                {sendStatus.success ? <CheckCircle2 size={16} color="#10b981" /> : <AlertCircle size={16} color="#ef4444" />}
                                <span style={{ fontSize: '0.9rem', color: sendStatus.success ? '#10b981' : '#ef4444', fontWeight: 600 }}>{sendStatus.msg}</span>
                            </div>
                        )}
                        <p style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)', marginTop: '0.5rem' }}>
                            *Automatic Simulation Mode (Backend Integration Point)
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
