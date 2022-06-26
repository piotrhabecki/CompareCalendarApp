import type { NextApiRequest, NextApiResponse } from "next";
import mongoClient from "../../src/mongodb/clientApp";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {

    const calendarId = req.query['calendarId']
    const client = await mongoClient();
    const db = client.db();

    var calendarsReference = db.collection("calendars");

    calendarsReference.find({"id": {$eq: calendarId}}).toArray(function (err, result) {
      if (err) {
        res.send(err);
      } else {
        result = result;
        res.send(JSON.stringify(result));
      }
    });
  }
}

export default handler;
