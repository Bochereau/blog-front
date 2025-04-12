export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  console.log("POST DATA:", req.body);

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
  } else if (req.method === 'POST') {
    try {
      const db = await connectToDatabase();
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
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
