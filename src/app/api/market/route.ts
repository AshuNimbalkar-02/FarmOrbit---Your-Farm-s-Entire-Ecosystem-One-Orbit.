import { NextRequest, NextResponse } from 'next/server';

// Expanded Mock Data mimicking real Agmarknet data
const ALL_MARKET_DATA = [
    { id: 1, crop: "Wheat (Sharbati)", category: "Cereals", location: "Azadpur Mandi, Delhi", price: "₹2,650 / Qtl", change: "+2.5%", isUp: true },
    { id: 2, crop: "Rice (Basmati 1121)", category: "Cereals", location: "Karnal Mandi, Haryana", price: "₹3,900 / Qtl", change: "+1.2%", isUp: true },
    { id: 3, crop: "Tomato (Hybrid)", category: "Vegetables", location: "Nashik Mandi, Maharashtra", price: "₹1,200 / Qtl", change: "-5.0%", isUp: false },
    { id: 4, crop: "Onion (Red)", category: "Vegetables", location: "Lasalgaon, Maharashtra", price: "₹1,850 / Qtl", change: "+0.8%", isUp: true },
    { id: 5, crop: "Cotton (Medium)", category: "Oilseeds", location: "Rajkot, Gujarat", price: "₹5,800 / Qtl", change: "-1.5%", isUp: false },
    { id: 6, crop: "Mustard", category: "Oilseeds", location: "Jaipur, Rajasthan", price: "₹5,200 / Qtl", change: "+3.1%", isUp: true },
    { id: 7, crop: "Potato (Desi)", category: "Vegetables", location: "Agra, UP", price: "₹950 / Qtl", change: "-0.5%", isUp: false },
    { id: 8, crop: "Maize", category: "Cereals", location: "Khanna, Punjab", price: "₹2,100 / Qtl", change: "+0.5%", isUp: true },
    { id: 9, crop: "Soybean", category: "Oilseeds", location: "Indore, MP", price: "₹4,600 / Qtl", change: "-1.2%", isUp: false },
    { id: 10, crop: "Banana", category: "Vegetables", location: "Jalgaon, Maharashtra", price: "₹1,500 / Qtl", change: "+1.0%", isUp: true },
];

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const cropFilter = searchParams.get('crop'); // 'All Crops', 'Cereals', etc.
    const locFilter = searchParams.get('location'); // 'All Locations', 'Delhi', etc.

    // NOTE: To fetch real data, you would use fetch() here to call data.gov.in API
    // Example: const response = await fetch(`https://api.data.gov.in/resource/...?api-key=YOUR_KEY&format=json`);

    let filteredData = ALL_MARKET_DATA;

    if (cropFilter && cropFilter !== 'All Crops') {
        filteredData = filteredData.filter(item => item.category === cropFilter);
    }

    if (locFilter && locFilter !== 'All Locations') {
        filteredData = filteredData.filter(item => item.location.includes(locFilter));
    }

    return NextResponse.json(filteredData);
}
