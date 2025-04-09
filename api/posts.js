import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('MONGODB_URI is not defined');
}

let client;
let connectionAttempts = 0;

async function connectToDatabase() {
  if (!client) {
    try {
      console.log('Attempting MongoDB connection...');
      client = new MongoClient(uri, {
        connectTimeoutMS: 5000,
        socketTimeoutMS: 30000,
        serverSelectionTimeoutMS: 5000,
      });
      await client.connect();
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('MongoDB connection failed:', error);
      throw error;
    }
  }
  return client.db();
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');

  if (req.method === 'GET') {
    try {
      console.log('Fetching posts...');
      const db = await connectToDatabase();
      const posts = await db.collection('posts').find({}).toArray();
      console.log(`Found ${posts.length} posts`);
      res.status(200).json({ data: posts });
    } catch (error) {
      console.error('Full error:', error);
      res.status(500).json({ 
        error: 'Failed to fetch posts',
        details: error.message 
      });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}