import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

let client;
async function connectToDatabase() {
    if (!client) {
        client = new MongoClient(uri);
        await client.connect();
    }
    return client.db("blog");
}

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'GET') {
        try {
            const db = await connectToDatabase();
            const themes = await db.collection('themes').find({}).toArray();
            console.log('Themes from DB:', themes);
            res.status(200).json({ data: themes });
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch themes' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
  