import type { NextApiRequest, NextApiResponse } from "next";
import { Message } from "../../typings";
import redis from "../../redis";

type Data = {
  messages: Message[];
};
type ErrorData = {
  body: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
  if (req.method !== "GET") {
    res.status(405).json({ body: "Method not allowed" });
    return;
  }
  try {
    const messagesRes = await redis.hvals("message");
    const messages: Message[] = messagesRes
      .map((message) => JSON.parse(message))
      .sort((a, b) => b.created_at - a.created_at);
    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ body: "Ha ocurrido algo" });
  }
}
