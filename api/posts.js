import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
console.log('MongoDB URI exists?', !!uri); // Debug 1

let client;
let connectionAttempts = 0;

async function connectToDatabase() {
  if (!client && connectionAttempts < 3) {
    try {
      connectionAttempts++;
      console.log(`Connecting to MongoDB (attempt ${connectionAttempts})...`);
      
      client = new MongoClient(uri, {
        connectTimeoutMS: 10000,
        socketTimeoutMS: 30000,
        serverSelectionTimeoutMS: 10000,
      });
      
      await client.connect();
      console.log('MongoDB connected successfully!');
      return client.db();
      
    } catch (error) {
      console.error('MongoDB connection FAILED:', error);
      client = null;
      throw error;
    }
  }
  return client?.db();
}

export default async function handler(req, res) {
  console.log('\nNew request to /api/posts');
  
  try {
    const db = await connectToDatabase();
    console.log('Fetching posts...');
    
    const posts = await db.collection('posts')
      .find({})
      .maxTimeMS(5000)
      .toArray();
    
    console.log(`Success: Found ${posts.length} posts`);
    return res.status(200).json({ data: posts });
    
  } catch (error) {
    console.error('FULL ERROR:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    
    return res.status(500).json({
      error: 'Database operation failed',
      internalError: error.name // Renvoie le type d'erreur au front
    });
  }
}