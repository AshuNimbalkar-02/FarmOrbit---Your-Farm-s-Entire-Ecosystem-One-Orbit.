import mysql from 'mysql2/promise';

export const dbRequest = async (query: string, values: any[] = []) => {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',

        // 👇 ENTER YOUR MYSQL PASSWORD HERE IF YOU ARE RUNNING LOCALLY
        password: process.env.DB_PASSWORD || 'Ashutosh@02', // e.g., '1234'

        database: process.env.DB_NAME || 'smart_crop_db',
    });

    try {
        const [results] = await connection.execute(query, values);
        return results;
    } finally {
        await connection.end();
    }
};
