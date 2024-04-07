import type { NextApiRequest, NextApiResponse } from "next";

async function queryListings(limit: number, skip: number) {
  const listings = new Array(50).fill(null).map((_, index) => ({
    id: String(index + 1),
  }));

  return listings.slice(skip, skip + limit);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const limit = parseInt(req.query.limit as string) || 5;
    const page = parseInt(req.query.page as string) || 1;
    const skip = (page - 1) * limit;

    try {
      const results = await queryListings(limit, skip);
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ message: "Error fetching data" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}