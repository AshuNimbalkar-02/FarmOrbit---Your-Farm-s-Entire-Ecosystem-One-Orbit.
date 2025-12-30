import { NextRequest, NextResponse } from 'next/server';
import { dbRequest } from '@/lib/db';

export async function POST(request: NextRequest) {
    try {
        const { name, email, password } = await request.json();

        // 1. Ensure Table Exists (For quick setup)
        await dbRequest(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255),
                email VARCHAR(255) UNIQUE,
                password VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // 2. Check if user exists
        const existingUsers: any = await dbRequest('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUsers.length > 0) {
            return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }

        // 3. Insert User
        await dbRequest('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);

        return NextResponse.json({ message: 'User created successfully' });

    } catch (error: any) {
        console.error('Registration Error:', error);
        return NextResponse.json({ message: 'Database error: ' + error.message }, { status: 500 });
    }
}
