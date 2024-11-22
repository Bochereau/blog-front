export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const db = await connectToDatabase();
            const themes = await db.collection('themes').find({}).toArray();
            const themesList = themes.map((theme) => theme.name);
            res.status(200).json({ data: themesList });
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch themes' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
  