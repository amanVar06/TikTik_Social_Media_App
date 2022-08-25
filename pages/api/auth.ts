import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../utils/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const user = await req.body;
    //this will able to create a new user inside sanity database
    return client
      .createIfNotExists(user)
      .then(() => res.status(200).json("Login Success"));
  }
}

//use return statement and await in above to solve issue regarding
//https://stackoverflow.com/questions/60684227/api-resolved-without-sending-a-response-in-nextjs
// API resolved without sending a response for /api/auth, this may result in stalled requests
