import type { NextApiRequest, NextApiResponse } from "next";
import { CalendarEvent } from "../../src/components/models/dayEvent";
import mongoClient from "../../src/mongodb/clientApp";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    const data = req.body;
    const query = { id: data.id };

    const client = await mongoClient();
    const db = client.db();

    const calendarsColletion = db.collection("calendars");
    const calendarEvent = await calendarsColletion.findOne(query);
    if (!calendarEvent) {
      res.status(404).json({ message: "calendar not found" });
      client.close();
      return;
    }

    const index = calendarEvent.events.findIndex((object: CalendarEvent) => {
      return object.id === data.eventId;
    });

    if (index > -1) {
      calendarEvent.events.splice(index, 1); // 2nd parameter means remove one item only
    }

    await calendarsColletion.replaceOne(query, calendarEvent);

    client.close();

    res.status(201).json({ message: "result" });
  }
}

export default handler;
