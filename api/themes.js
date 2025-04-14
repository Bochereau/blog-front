import { MongoClient } from 'mongodb';

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

    if (req.method === 'OPTIONS') return res.status(200).end();

    if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
        try {
            req.body = JSON.parse(req.body);
        } catch (err) {
            return res.status(400).json({ error: 'Requête mal formée' });
        }
    }

    console.log(req.body);

    const db = await connectToDatabase();
    const collection = db.collection('themes');

    try {
        if (req.method === 'GET') {
            const themes = await collection.find({}).toArray();
            return res.status(200).json({ data: themes });
        }

        if (req.method === 'POST') {
            const { name, color } = req.body;
            const result = await collection.insertOne({ name, color });
            return res.status(201).json({ message: 'Thème ajouté', id: result.insertedId });
        }

        if (req.method === 'PUT') {
            const { _id, name, color } = req.body;
            const { ObjectId } = require('mongodb');
            await collection.updateOne(
                { _id: new ObjectId(_id) },
                { $set: { name, color } }
            );
            return res.status(200).json({ message: 'Thème modifié' });
        }

        if (req.method === 'DELETE') {
            const { _id } = req.body;
            const { ObjectId } = require('mongodb');
            await collection.deleteOne({ _id: new ObjectId(_id) });
            return res.status(200).json({ message: 'Thème supprimé' });
        }

        res.status(405).json({ error: 'Méthode non autorisée' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
}

