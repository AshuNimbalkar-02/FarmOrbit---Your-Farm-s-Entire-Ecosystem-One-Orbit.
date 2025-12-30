"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './page.module.css';
import {
    LayoutDashboard, Activity, CloudRain, BarChart3, Sprout, ShieldCheck,
    Truck, Scale, Calculator, Wrench, Recycle, Droplets, Wifi, Mic, Lightbulb
} from 'lucide-react';

import CropDoctor from './components/CropDoctor';
import WeatherShield from './components/WeatherShield';
import YieldPredictor from './components/YieldPredictor';
import FertilizerExpert from './components/FertilizerExpert';
import SchemeMatcher from './components/SchemeMatcher';
import SmartSell from './components/SmartSell';
import SeedCalculator from './components/SeedCalculator';
import ROICalculator from './components/ROICalculator';
import RentTool from './components/RentTool';
import SustainableRotation from './components/SustainableRotation';
import SmartIrrigation from './components/SmartIrrigation';
import PrecisionNutrient from './components/PrecisionNutrient';
import AgriBot from './components/AgriBot';
import FarmBusinessIdeas from './components/FarmBusinessIdeas';

function AdvisoryContent() {
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState('crop-doctor');

    useEffect(() => {
        const toolParam = searchParams.get('tool');
        if (toolParam) {
            setActiveTab(toolParam);
        }
    }, [searchParams]);

    const tools = [
        { id: 'crop-doctor', name: 'Crop Doctor', icon: Activity },
        { id: 'weather-shield', name: 'Weather Shield', icon: CloudRain },
        { id: 'yield-predictor', name: 'Yield Predictor', icon: BarChart3 },
        { id: 'fertilizer', name: 'Fertilizer Expert', icon: Sprout },
        { id: 'scheme-finder', name: 'Scheme Matcher', icon: ShieldCheck },
        { id: 'smart-sell', name: 'Smart Sell (Profit)', icon: Truck },
        { id: 'seed-calc', name: 'Seed Rate Calc', icon: Scale },
        { id: 'roi-calc', name: 'ROI Calculator', icon: Calculator },
        { id: 'rent-tool', name: 'Rent Machinery', icon: Wrench },
        { id: 'sustainable-rotation', name: 'Sustain. Rotation', icon: Recycle },
        { id: 'smart-irrigation', name: 'Smart Irrigation', icon: Droplets },
        { id: 'iot-nutrient', name: 'Precision Nutrient', icon: Wifi },
        { id: 'voice-assist', name: 'Smart Agri-Bot', icon: Mic },
        { id: 'farm-business', name: 'Business Ideas', icon: Lightbulb },
    ];

    const ActiveTool = () => {
        switch (activeTab) {
            case 'smart-irrigation': return <SmartIrrigation />;
            case 'iot-nutrient': return <PrecisionNutrient />;
            case 'sustainable-rotation': return <SustainableRotation />;
            case 'yield-predictor': return <YieldPredictor />;
            case 'smart-sell': return <SmartSell />;
            case 'rent-tool': return <RentTool />;
            case 'crop-doctor': return <CropDoctor />;
            case 'weather-shield': return <WeatherShield />;
            case 'fertilizer': return <FertilizerExpert />;
            case 'scheme-finder': return <SchemeMatcher />;
            case 'seed-calc': return <SeedCalculator />;
            case 'roi-calc': return <ROICalculator />;
            case 'voice-assist': return <AgriBot />;
            case 'farm-business': return <FarmBusinessIdeas />;
            default: return null;
        }
    };

    return (
        <div className={styles.dashboardLayout}>
            {/* Left Sidebar */}
            <div className={styles.sidebar}>
                <div className={styles.sidebarTitle}>
                    <LayoutDashboard size={20} /> Toolbox
                </div>
                {tools.map((tool) => (
                    <div
                        key={tool.id}
                        className={`${styles.navItem} ${activeTab === tool.id ? styles.activeNav : ''}`}
                        onClick={() => setActiveTab(tool.id)}
                    >
                        <tool.icon size={18} />
                        <span>{tool.name}</span>
                    </div>
                ))}
            </div>

            {/* Main Content Area */}
            <div className={styles.mainContent}>
                {ActiveTool()}
            </div>
        </div>
    );
}

export default function Advisory() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AdvisoryContent />
        </Suspense>
    );
}
