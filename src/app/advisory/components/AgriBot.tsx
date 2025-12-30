"use client";

import { useState } from 'react';
import { Mic, Volume2 } from 'lucide-react';
import styles from '../page.module.css';
import { speak } from '../utils';
import { APMC_RATES, WEATHER_MOCK } from '../data';

export default function AgriBot() {
    const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
        { role: 'bot', text: 'Namaste! I am your AI Agri-Advisor. Ask me about weather, market prices, or crop health.' }
    ]);
    const [isListening, setIsListening] = useState(false);
    const [lang, setLang] = useState<'en' | 'hi' | 'mr'>('en');
    const [inputText, setInputText] = useState('');

    const processText = (text: string) => {
        // Add User Message
        setMessages(prev => [...prev, { role: 'user', text: text }]);

        let botResponse = "";
        const lowerText = text.toLowerCase();

        // Keywords for English, Hindi, and Marathi
        const priceKeywords = ["price", "rate", "bhav", "भाव", "किंमत", "bajar", "बाजार"];
        const weatherKeywords = ["rain", "weather", "paus", "paaus", "पाऊस", "हवामान", "barish", "मौसम"];
        const diseaseKeywords = ["disease", "cure", "rog", "kida", "कीड", "रोग", "उपाय", "aajar", "bimari"];
        const schemeKeywords = ["scheme", "subsidy", "yojana", "योजना", "अनुदान"];
        const greetingKeywords = ["hello", "namaste", "namaskar", "नमस्कार", "ram ram", "राम राम"];

        // Simple City Detection (Mock)
        const isNashik = lowerText.includes("nashik") || lowerText.includes("नाशिक");
        const isPune = lowerText.includes("pune") || lowerText.includes("पुणे");
        const isNagpur = lowerText.includes("nagpur") || lowerText.includes("नागपूर");
        const city = isNashik ? "Nashik" : (isPune ? "Pune" : (isNagpur ? "Nagpur" : "Nashik")); // Default to Nashik if unknown

        if (priceKeywords.some(k => lowerText.includes(k))) {
            // Detect crop keyword
            const crops = ['onion', 'wheat', 'rice', 'tomato'];
            const detectedCrop = crops.find(c => lowerText.includes(c)) || 'onion';
            const cropKey = detectedCrop.charAt(0).toUpperCase() + detectedCrop.slice(1);
            const price = APMC_RATES[city]?.[cropKey] ?? 'N/A';
            botResponse = lang === 'en'
                ? `Today's ${cropKey} price in ${city} is ₹${price}/Qtl.`
                : (lang === 'hi'
                    ? `आज ${city} में ${cropKey} का भाव ₹${price}/क्विंटल है।`
                    : `आज ${city} मध्ये ${cropKey} चा भाव ₹${price}/क्विंटल आहे.`);
        } else if (weatherKeywords.some(k => lowerText.includes(k))) {
            const weather = WEATHER_MOCK[city];
            if (weather) {
                botResponse = lang === 'en'
                    ? `Weather in ${city}: ${weather.condition}, ${weather.temp}°C, Humidity ${weather.humidity}%.`
                    : (lang === 'hi'
                        ? `${city} में मौसम: ${weather.condition}, ${weather.temp}°C, आर्द्रता ${weather.humidity}%।`
                        : `${city} हवामान: ${weather.condition}, ${weather.temp}°C, आर्द्रता ${weather.humidity}%।`);
            } else {
                // Fallback generic response
                botResponse = lang === 'en'
                    ? `Weather data for ${city} is unavailable.`
                    : (lang === 'hi'
                        ? `${city} के लिए मौसम डेटा उपलब्ध नहीं है।`
                        : `${city} साठी हवामान डेटा उपलब्ध नाही.`);
            }
        } else if (diseaseKeywords.some(k => lowerText.includes(k))) {
            botResponse = lang === 'en'
                ? "For the symptoms described, apply Copper Oxychloride (50WP) @ 2.5g/liter. Ensure good drainage."
                : (lang === 'hi'
                    ? "इन लक्षणों के लिए, कॉपर ऑक्सीक्लोराइड (50WP) @ 2.5 ग्राम/लीटर का छिड़काव करें। जल निकासी सुनिश्चित करें।"
                    : "वर्णन केलेल्या लक्षणांसाठी, कॉपर ऑक्सिक्लोराईड (50WP) @ 2.5g/लिटर फवारा. पाण्याचा निचरा व्यवस्थित करा.");
        } else if (schemeKeywords.some(k => lowerText.includes(k))) {
            botResponse = lang === 'en'
                ? "You might be eligible for 'PM Kisan Samman Nidhi'. Check the Scheme Matcher tool for full details."
                : (lang === 'hi'
                    ? "आप 'प्रधानमंत्री किसान सम्मान निधि' के लिए पात्र हो सकते हैं। अधिक जानकारी के लिए 'Scheme Matcher' देखें।"
                    : "तुम्ही 'प्रधानमंत्री किसान सन्मान निधी' साठी पात्र असू शकता. अधिक माहितीसाठी 'Scheme Matcher' टूल्स पहा.");
        } else if (greetingKeywords.some(k => lowerText.includes(k))) {
            botResponse = lang === 'en'
                ? "Namaste! How can I help you with your farming today?"
                : (lang === 'hi'
                    ? "नमस्ते! आज मैं आपकी खेती में कैसे मदद कर सकता हूँ?"
                    : "नमस्कार! आज मी तुमच्या शेतीविषयी कशी मदत करू शकतो?");
        } else {
            botResponse = lang === 'en'
                ? "I didn't quite catch that context. Try asking about 'Market Prices', 'Weather', or 'Crop Diseases'."
                : (lang === 'hi'
                    ? "मुझे संदर्भ समझ नहीं आया। कृपया 'बाजार भाव', 'मौसम', या 'फसल रोगों' के बारे में पूछें।"
                    : "मला प्रश्न समजला नाही. कृपया 'बाजार भाव', 'हवामान', किंवा 'पीक रोग' याबद्दल विचारा.");
        }
        setTimeout(() => {
            setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
        }, 500);
    };

    const handleTextSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim()) return;
        processText(inputText);
        setInputText('');
    };

    const handleVoiceQuery = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert("Voice input is not supported in this browser. Please use Chrome or Edge.");
            return;
        }

        const recognition = new (window as any).webkitSpeechRecognition();
        // Set language based on selection
        recognition.lang = lang === 'hi' ? 'hi-IN' : lang === 'mr' ? 'mr-IN' : 'en-US';
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => setIsListening(true);

        recognition.onresult = (event: any) => {
            const userText = event.results[0][0].transcript;
            setIsListening(false);
            processText(userText);
        };

        recognition.onerror = (event: any) => {
            console.error("Speech Error:", event.error);
            setIsListening(false);
            if (event.error === 'not-allowed') {
                alert("Microphone access blocked. Please allow microphone permissions in browser settings.");
            } else {
                alert("Error accessing microphone: " + event.error);
            }
        };

        recognition.onend = () => setIsListening(false);

        try {
            recognition.start();
        } catch (e) {
            console.error("Recognition start error", e);
        }
    };

    return (
        <div className={styles.card} style={{ height: '600px', display: 'flex', flexDirection: 'column' }}>
            <div className={styles.cardHeader}>
                <Mic size={32} className="text-primary" />
                <h2 className={styles.cardTitle}>Smart Agri-Bot</h2>
            </div>

            {/* Chat Window */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '0.5rem', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {messages.map((msg, idx) => (
                    <div key={idx} style={{
                        alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                        background: msg.role === 'user' ? 'var(--primary)' : 'var(--card)',
                        color: msg.role === 'user' ? 'white' : 'var(--foreground)',
                        border: msg.role === 'bot' ? '1px solid var(--border)' : 'none',
                        padding: '0.75rem 1rem',
                        borderRadius: '1rem',
                        maxWidth: '80%',
                    }}>
                        {msg.text}
                        {msg.role === 'bot' && (
                            <button onClick={() => speak(msg.text, lang)} style={{ marginLeft: '1rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted-foreground)' }}>
                                <Volume2 size={16} />
                            </button>
                        )}
                    </div>
                ))}
                {isListening && <div style={{ alignSelf: 'flex-end', color: 'var(--muted-foreground)', fontStyle: 'italic' }}>Listening...</div>}
            </div>

            {/* Controls with Keyboard Input */}
            <form onSubmit={handleTextSubmit} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <button
                    type="button"
                    onClick={handleVoiceQuery}
                    style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: isListening ? '#ef4444' : 'var(--primary)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
                >
                    <Mic color="#fff" size={24} />
                </button>
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={lang === 'en' ? "Type your query..." : (lang === 'hi' ? "अपना प्रश्न लिखें..." : "तुमचा प्रश्न टाइप करा...")}
                    className={styles.input}
                    style={{ flex: 1, margin: 0 }}
                />
                <button type="submit" className={styles.analyzeBtn} style={{ width: 'auto', padding: '0 1.5rem', margin: 0, height: '50px' }}>Send</button>
            </form>
        </div>
    );
}
