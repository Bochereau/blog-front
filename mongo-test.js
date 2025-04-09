import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://Boboch:Agathe%402018!@limitbreak.a9oq4.mongodb.net/?retryWrites=true&w=majority&appName=LimitBreak";

async function main() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db("blog");
  const posts = await db.collection('posts').find({}).toArray();
  console.log(posts);
  client.close();
}

main().catch(console.error);
