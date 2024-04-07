// import { ClerkAPI } from "@clerk/clerk-sdk-node";
// import type { NextApiRequest, NextApiResponse } from "next";

// const clerk = ClerkAPI.fromApiKey(process.env.CLERK_API_KEY);

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     await clerk.apiProxy.webhooks.verifyRequestAuthenticity(req);
//     return clerk.apiProxy.webhooks.handleRequest(req, res);
//   } catch (error) {
//     console.error("Failed to proxy request to Clerk:", error);
//     res.status(500).end("Internal Server Error");
//   }
// }