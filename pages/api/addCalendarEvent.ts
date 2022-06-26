import type { NextApiRequest, NextApiResponse } from "next";
import mongoClient from "../../src/mongodb/clientApp";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    const data = req.body;
    const query = { id: data.id };

    const updateDocument = {
      $addToSet: { events: data.event },
    };

    const client = await mongoClient();
    const db = client.db();

    const calendarsColletion = db.collection("calendars");
    const checkExisting = await calendarsColletion.findOne(query);
    if (!checkExisting) {
      res.status(404).json({ message: "calendar not found" });
      client.close();
      return;
    }

    await calendarsColletion.updateOne(query, updateDocument);

    client.close();

    res.status(201).json({ message: "result" });
  }
}

export default handler;
