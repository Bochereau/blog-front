import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = 'blog';

if (!uri) {
  throw new Error('❌ MONGODB_URI non définie dans les variables d\'environnement');
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
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  console.log("Request method:", req.method);
  console.log("Request URL:", req.url);
  console.log("Request body:", req.body);

  const db = await connectToDatabase();
  
  // GET - Récupérer tous les posts
  if (req.method === 'GET') {
    try {
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
        },
        {
          $sort: { createdAt: -1 }
        }
      ]).toArray();

      res.status(200).json({ data: posts });
    } catch (error) {
      console.error('❌ Erreur MongoDB:', error);
      res.status(500).json({ error: 'Failed to fetch posts', message: error.message });
    }
  } 
  // POST - Ajouter un post
  else if (req.method === 'POST') {
    try {
      const post = req.body;

      // 💡 cast les ObjectId si besoin
      if (post.themes && post.themes.length > 0) {
        post.themes = post.themes.map((id) => new ObjectId(id));
      }

      if (!post.createdAt) {
        post.createdAt = new Date().toISOString();
      }

      const result = await db.collection("posts").insertOne(post);
      res.status(201).json({ success: true, id: result.insertedId });
    } catch (error) {
      console.error("Erreur API POST /posts :", error);
      res.status(500).json({ success: false, message: "Erreur serveur" });
    }
  } 
  // PUT - Modifier un post
  else if (req.method === 'PUT') {
    try {
      const { _id } = req.query;
      if (!_id) {
        return res.status(400).json({ error: 'ID manquant' });
      }
      
      const postData = req.body;
      
      // 💡 cast les ObjectId si besoin
      if (postData.themes && postData.themes.length > 0) {
        postData.themes = postData.themes.map((id) => new ObjectId(id));
      }
      
      const result = await db.collection('posts').updateOne(
        { _id: new ObjectId(_id) },
        { $set: postData }
      );
      
      if (result.matchedCount === 0) {
        return res.status(404).json({ error: 'Post non trouvé' });
      }
      
      res.status(200).json({ success: true, message: 'Post mis à jour' });
    } catch (error) {
      console.error("Erreur API PUT /posts :", error);
      res.status(500).json({ success: false, message: "Erreur serveur" });
    }
  } 
  // DELETE - Supprimer un post
  else if (req.method === 'DELETE') {
    try {
      const { _id } = req.query;
      if (!_id) {
        return res.status(400).json({ error: 'ID manquant' });
      }
      
      const result = await db.collection('posts').deleteOne({
        _id: new ObjectId(_id)
      });
      
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Post non trouvé' });
      }
      
      res.status(200).json({ success: true, message: 'Post supprimé' });
    } catch (error) {
      console.error("Erreur API DELETE /posts :", error);
      res.status(500).json({ success: false, message: "Erreur serveur" });
    }
  } 
  // Autres méthodes non autorisées
  else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}