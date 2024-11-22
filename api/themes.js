export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

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
  