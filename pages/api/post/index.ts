// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../utils/client";
import { allPostsQuery } from "../../../utils/queries";

//using typescript so mentioning the type of each req and res
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const query = allPostsQuery();
    //now we come to the point in which we need to have client setup
    //we are referring to the sanity client
    //setting up the sanity client so that we can actually make api
    // requests we do this in utils client.ts
    const data = await client.fetch(query);
    res.status(200).json(data);
  } else if (req.method === "POST") {
    const document = await req.body;

    return client
      .create(document)
      .then(() => res.status(201).json("Video Created"));
  }
}
