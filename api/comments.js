import { MongoClient, ObjectId } from 'mongodb';

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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const db = await connectToDatabase();

    // GET - Récupérer les commentaires (tous ou par postId)
    if (req.method === 'GET') {
      const { postId } = req.query;

      let query = {};
      if (postId && postId !== 'undefined') {
        query.postId = new ObjectId(postId);
      }

      const comments = await db.collection('comments')
        .find(query)
        .sort({ createdAt: -1 })
        .toArray();

      return res.status(200).json(comments);
    }

    // POST - Ajouter un commentaire
    if (req.method === 'POST') {
      const { postId, pseudo, content, replyTo } = req.body;

      // Vérification des champs obligatoires
      if (!postId || !pseudo || !content) {
        return res.status(400).json({ error: 'PostId, pseudo and content are required' });
      }

      // Vérifier si `replyTo` est valide (optionnel)
      if (replyTo) {
        const parentComment = await db.collection('comments').findOne({ _id: new ObjectId(replyTo) });
        if (!parentComment) {
          return res.status(400).json({ error: "Parent comment not found" });
        }
      }

      const newComment = {
        postId: new ObjectId(postId),
        pseudo,
        content,
        replyTo: replyTo ? new ObjectId(replyTo) : null,
        createdAt: new Date().toISOString(),
      };

      const result = await db.collection('comments').insertOne(newComment);

      // Récupérer le commentaire complet avec l'ID pour le retourner
      const insertedComment = {
        ...newComment,
        _id: result.insertedId.toString()
      };

      res.status(201).json({
        message: 'Comment added successfully',
        comment: insertedComment
      });
    }

    // PUT - Mettre à jour un commentaire
    if (req.method === 'PUT') {
      const { id } = req.query;
      const { content } = req.body;

      if (!id || !content) {
        return res.status(400).json({ error: 'Comment ID and content are required' });
      }

      const result = await db.collection('comments').updateOne(
        { _id: new ObjectId(id) },
        { $set: { content, updatedAt: new Date().toISOString() } }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ error: 'Comment not found' });
      }

      res.status(200).json({
        message: 'Comment updated successfully',
        id: id
      });
    }

    // DELETE - Supprimer un commentaire
    if (req.method === 'DELETE') {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: 'Comment ID is required' });
      }

      const result = await db.collection('comments').deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Comment not found' });
      }

      res.status(200).json({
        message: 'Comment deleted successfully',
        id: id
      });
    }

    // Method not allowed
    else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
}