
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { crop, area, soil, irrigation } = body;

        // Base yields in Quintals per Acre (Mock Data)
        const baseYields: Record<string, number> = {
            Rice: 20,
            Wheat: 18,
            Corn: 25,
            Soybean: 15,
            Cotton: 12,
            Tomato: 200,
            Onion: 120,
            Potato: 150,
            Sugarcane: 400
        };

        // Modifiers
        const soilModifiers: Record<string, number> = {
            Alluvial: 1.1,
            Black: 1.2,
            Red: 0.9,
            Clay: 0.85,
            Loamy: 1.15,
            Sandy: 0.8
        };

        const irrigationModifiers: Record<string, number> = {
            Irrigated: 1.3,
            Rainfed: 0.9,
        };

        let predictedYieldPerAcre = baseYields[crop] || 15;

        // Apply modifiers
        if (soil && soilModifiers[soil]) {
            predictedYieldPerAcre *= soilModifiers[soil];
        }

        if (irrigation && irrigationModifiers[irrigation]) {
            predictedYieldPerAcre *= irrigationModifiers[irrigation];
        }

        const areaNum = Number(area) || 1;
        const totalYield = predictedYieldPerAcre * areaNum;

        // Simple revenue estimation (Mock Prices)
        const prices: Record<string, number> = {
            Rice: 2500, Wheat: 2200, Corn: 1800, Soybean: 4000,
            Cotton: 6000, Tomato: 1500, Onion: 1800, Potato: 1200, Sugarcane: 300
        };

        const price = prices[crop] || 2000;
        const revenue = totalYield * price;

        return NextResponse.json({
            success: true,
            predictedYield: totalYield.toFixed(2),
            unit: 'Quintals',
            estimatedRevenue: revenue.toFixed(2),
            currency: 'INR',
            message: `Successfully predicted yield for ${crop}`,
        });

    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Failed to process request' },
            { status: 500 }
        );
    }
}
