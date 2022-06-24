import type { NextApiRequest, NextApiResponse } from "next";
import mongoClient from '../../src/mongodb/clientApp'


async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await mongoClient();
    const db = client.db();
    
    const calendarsCollection = db.collection("calendars");

    const result = await calendarsCollection.insertOne(data);

    console.log(result);

    client.close()
    
    res.status(201).json({ id: data.id });
  }
}

export default handler;
