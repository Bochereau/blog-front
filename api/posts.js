import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = 'blog';

if (!uri) {
  throw new Error('❌ MONGODB_URI non définie dans les variables d’environnement');
}

let client;
let clientPromise;

async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri, {
      serverApi: { version: '1' },
    });
    clientPromise = client.connect();
  }
  await clientPromise;
  return client.db(dbName);
}

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      const db = await connectToDatabase();

      const posts = await db.collection('posts').aggregate([
        {
          $lookup: {
            from: 'themes',
            localField: 'themes',
            foreignField: '_id',
            as: 'themes'
          }
        },
        {
          $lookup: {
            from: 'comments',
            localField: 'comments',
            foreignField: '_id',
            as: 'comments'
          }
        }
      ]).toArray();

      res.status(200).json({ data: posts });
    } catch (error) {
      console.error('❌ Erreur MongoDB:', error);
      res.status(500).json({ error: 'Failed to fetch posts', message: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
