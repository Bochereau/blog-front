import { MongoClient, ObjectId } from 'mongodb';

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
        const { postId, pseudo, content, replyTo } = req.body;

        // Vérifier si `replyTo` est valide (optionnel)
        if (replyTo) {
            const parentComment = await db.collection('comments').findOne({ _id: new ObjectId(replyTo) });
            if (!parentComment) {
            return res.status(400).json({ error: "Parent comment not found" });
            }
        }

        const newComment = {
            postId,
            pseudo,
            content,
            replyTo: replyTo ? new ObjectId(replyTo) : null,
            createdAt: new Date(),
        };

        const result = await db.collection('comments').insertOne(newComment);
        res.status(201).json({ message: 'Comment added successfully', id: result.insertedId });
        } catch (error) {
        res.status(500).json({ error: 'Failed to add comment' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
