import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

let client;
async function connectToDatabase() {
    if (!client) {
        client = new MongoClient(uri);
        await client.connect();
    }
    return client.db();
}

export default async function handler(req, res) {
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
