import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

let client;
async function connectToDatabase() {
    if (!client) {
        client = new MongoClient(uri);
        console.log(client)
        await client.connect();
    }
    return client.db();
}

export default async function handler(req, res) {
    // Ajoute les en-têtes CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');

    // Si c'est une requête OPTIONS (pré-requête CORS), on répond immédiatement
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'POST') {
        try {
            const db = await connectToDatabase();
            const { title, body, context, firstContact, conclusion, author, readingTime } = req.body;

            const newPost = {
                title,
                body,
                context,
                firstContact,
                conclusion,
                author,
                createdAt: new Date(),
                readingTime,
            };

            const result = await db.collection('posts').insertOne(newPost);
            res.status(201).json({ message: 'Post created successfully', id: result.insertedId });
        } catch (error) {
            res.status(500).json({ error: 'Failed to create post' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
