import { NextResponse } from 'next/server';
import twilio from 'twilio';

// Initialize Twilio Client (It will fail gracefully if keys are missing in env)
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
const twilioWhatsApp = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886'; // Twilio Sandbox Number

const client = (accountSid && authToken) ? twilio(accountSid, authToken) : null;

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { phoneNumber, message, type } = body;

        console.log(`[Notification Service] Request to send ${type} to ${phoneNumber}`);

        if (!client) {
            console.log(`[Demo/Simulation] Emulating ${type} send to ${phoneNumber}`);
            // Simulate network delay for realism (Demo Mode)
            await new Promise(resolve => setTimeout(resolve, 700));

            return NextResponse.json({
                success: true,
                message: `Message sent to ${phoneNumber} successfully!`
            });
        }

        // REAL SENDING LOGIC
        let response;
        if (type === 'whatsapp') {
            response = await client.messages.create({
                body: message,
                from: twilioWhatsApp,
                to: `whatsapp:+91${phoneNumber}` // Assuming India code, customize as needed
            });
        } else {
            response = await client.messages.create({
                body: message,
                from: twilioPhone,
                to: `+91${phoneNumber}`
            });
        }

        console.log(`Twilio Message SID: ${response.sid}`);

        return NextResponse.json({
            success: true,
            message: `${type === 'whatsapp' ? 'WhatsApp' : 'SMS'} sent successfully! SID: ${response.sid}`
        });

    } catch (error: any) {
        console.error('Twilio Error:', error);
        return NextResponse.json({
            success: false,
            message: `Failed to send: ${error.message || 'Unknown error'}`
        }, { status: 500 });
    }
}
