"use client";

import { useState } from 'react';
import styles from './page.module.css';
import {
    Phone, Mail, MessageCircle, PlayCircle, MapPin,
    Search, Star, Navigation, Store, Tractor, Sprout,
    ShieldCheck, ShoppingBag
} from 'lucide-react';

interface Shop {
    id: string;
    name: string;
    distance: string;
    rating: number;
    address: string;
    phone: string;
    inventory: string[];
    type: 'General' | 'Machinery' | 'Livestock' | 'Nursery' | 'Pesticides';
}

const mockShops: Shop[] = [
    {
        id: 's1',
        name: 'Kisan Seva Kendra',
        distance: '2.5 km',
        rating: 4.5,
        address: 'Main Market, Near Bus Stand',
        phone: '+91 98765 43210',
        inventory: ['Fertilizers', 'Seeds', 'Pesticides', 'Sprayers'],
        type: 'General'
    },
    {
        id: 's2',
        name: 'Laxmi Feeds & Pharma',
        distance: '4.0 km',
        rating: 4.8,
        address: 'Industrial Area, Plot 45',
        phone: '+91 99887 76655',
        inventory: ['Poultry Feed', 'Cattle Feed', 'Fish Feed', 'Vaccines'],
        type: 'Livestock'
    },
    {
        id: 's3',
        name: 'Agro Tech Solutions',
        distance: '12 km',
        rating: 4.2,
        address: 'Highway Rd, Opp. Petrol Pump',
        phone: '+91 88776 65544',
        inventory: ['Milking Machines', 'Chaff Cutters', 'Solar Dryers'],
        type: 'Machinery'
    },
    {
        id: 's4',
        name: 'Green Leaf Nursery',
        distance: '6.5 km',
        rating: 4.6,
        address: 'Village Road, Green Valley',
        phone: '+91 77665 54433',
        inventory: ['Fruit Grafts', 'Flower Saplings', 'Vegetable Seedlings'],
        type: 'Nursery'
    },
    {
        id: 's5',
        name: 'Crop Guard Pesticides',
        distance: '3.2 km',
        rating: 4.1,
        address: 'Near Railway Station',
        phone: '+91 66554 43322',
        inventory: ['Herbicides', 'Fungicides', 'Insecticides'],
        type: 'Pesticides'
    }
];

export default function Support() {
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('All');

    const filteredShops = mockShops.filter(shop => {
        const matchesSearch = shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            shop.inventory.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesCategory = category === 'All' || shop.type === category;
        return matchesSearch && matchesCategory;
    });

    const openGoogleMapsSearch = (term: string) => {
        window.open(`https://www.google.com/maps/search/${encodeURIComponent(term + ' near me')}`, '_blank');
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Unified Farmer Support</h1>

            {/* Helpline Section */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Emergency Support</h2>
                <div className={styles.contactGrid}>
                    <div className={styles.contactCard}>
                        <div className={styles.contactIcon}><Phone size={24} /></div>
                        <h3>Kisan Call Center</h3>
                        <p style={{ margin: '0.5rem 0', color: 'var(--muted-foreground)' }}>24/7 Expert Advisory</p>
                        <a href="tel:18001801551" style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '1.2rem' }}>1800-180-1551</a>
                    </div>
                </div>
            </div>

            {/* Local Services Section - NEW */}
            <div className={styles.section}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h2 className={styles.sectionTitle} style={{ marginBottom: '0.5rem' }}>
                            Nearby Agri-Services
                        </h2>
                        <p style={{ color: 'var(--muted-foreground)' }}>Locate verified shops, nurseries, and machinery centers.</p>
                    </div>

                    <button
                        onClick={() => openGoogleMapsSearch('Agriculture Shops')}
                        style={{
                            background: '#ea4335',
                            color: 'white',
                            border: 'none',
                            padding: '0.75rem 1.25rem',
                            borderRadius: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            cursor: 'pointer',
                            fontWeight: 600,
                            boxShadow: '0 4px 6px rgba(234, 67, 53, 0.2)'
                        }}
                    >
                        <MapPin size={18} /> View All on Map
                    </button>
                </div>

                {/* Search and Filter */}
                <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <div style={{ position: 'relative', flexGrow: 1, minWidth: '280px' }}>
                        <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }} />
                        <input
                            type="text"
                            placeholder="Search shops or items (e.g., Urea, Seeds)..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '1rem 1rem 1rem 3rem',
                                borderRadius: '0.75rem',
                                border: '1px solid var(--border)',
                                background: 'var(--background)',
                                color: 'var(--foreground)',
                                outline: 'none'
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                        {['All', 'General', 'Machinery', 'Livestock', 'Nursery', 'Pesticides'].map(cat => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                style={{
                                    padding: '0.75rem 1.25rem',
                                    borderRadius: '99px',
                                    border: '1px solid var(--border)',
                                    background: category === cat ? 'var(--primary)' : 'var(--card)',
                                    color: category === cat ? 'white' : 'var(--muted-foreground)',
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Shop Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {filteredShops.map((shop) => (
                        <div key={shop.id} style={{
                            padding: '1.5rem',
                            border: '1px solid var(--border)',
                            borderRadius: '1rem',
                            background: 'var(--card)',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <div style={{
                                        width: '48px', height: '48px',
                                        borderRadius: '10px',
                                        background: 'rgba(16, 185, 129, 0.1)',
                                        color: 'var(--primary)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        {shop.type === 'Machinery' ? <Tractor size={24} /> :
                                            shop.type === 'Nursery' ? <Sprout size={24} /> :
                                                shop.type === 'Pesticides' ? <ShieldCheck size={24} /> :
                                                    shop.type === 'Livestock' ? <Store size={24} /> :
                                                        <ShoppingBag size={24} />}
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.25rem' }}>{shop.name}</h3>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)' }}>{shop.type}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: '#ecfdf5', color: '#059669', padding: '0.25rem 0.6rem', borderRadius: '6px', fontSize: '0.9rem', fontWeight: 'bold' }}>
                                    {shop.rating} <Star size={14} fill="#059669" />
                                </div>
                            </div>

                            <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--foreground)', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                                <MapPin size={16} className="text-primary" /> {shop.address}
                            </p>
                            <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--muted-foreground)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                                <Navigation size={16} /> {shop.distance} from your location
                            </p>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                                {shop.inventory.map(item => (
                                    <span key={item} style={{
                                        fontSize: '0.8rem',
                                        padding: '0.25rem 0.6rem',
                                        borderRadius: '6px',
                                        background: 'var(--background)',
                                        border: '1px solid var(--border)',
                                        color: 'var(--muted-foreground)'
                                    }}>
                                        {item}
                                    </span>
                                ))}
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button style={{
                                    flex: 1,
                                    padding: '0.75rem',
                                    borderRadius: '0.5rem',
                                    background: 'var(--primary)',
                                    color: 'white',
                                    border: 'none',
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
                                }}>
                                    <Phone size={18} /> Call
                                </button>
                                <button
                                    onClick={() => openGoogleMapsSearch(shop.name + ' ' + shop.address)}
                                    style={{
                                        flex: 1,
                                        padding: '0.75rem',
                                        borderRadius: '0.5rem',
                                        background: 'transparent',
                                        color: 'var(--foreground)',
                                        border: '1px solid var(--border)',
                                        fontWeight: 500,
                                        cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
                                    }}
                                >
                                    <Navigation size={18} /> Directions
                                </button>
                            </div>
                        </div>
                    ))}
                    {filteredShops.length === 0 && (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--muted-foreground)' }}>
                            <p>No shops found matching your search. Try "All" category or verify the location.</p>
                            <button
                                onClick={() => openGoogleMapsSearch(searchQuery + ' agriculture shop')}
                                style={{ marginTop: '1rem', color: 'var(--primary)', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
                            >
                                Search "{searchQuery}" on Google Maps instead
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>

                <div className={styles.faqItem}>
                    <div className={styles.question}>How do I upload a crop image?</div>
                    <div className={styles.answer}>
                        Go to the Advisory section, click on "Crop Doctor", and select "Upload Image". You can take a photo directly or choose from your gallery.
                    </div>
                </div>

                <div className={styles.faqItem}>
                    <div className={styles.question}>Is the market data accurate?</div>
                    <div className={styles.answer}>
                        Yes, we source our data directly from government APMC mandi records, updated every 4 hours.
                    </div>
                </div>

                <div className={styles.faqItem}>
                    <div className={styles.question}>Can I get soil testing done here?</div>
                    <div className={styles.answer}>
                        Currently, you can input your soil health card data for recommendations. We are partnering with labs for direct sample collection soon.
                    </div>
                </div>
            </div>
        </div>
    );
}
