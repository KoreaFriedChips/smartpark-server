import { cors, runMiddleware } from "@/utils";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
    message: string;
};

type RequestData = {
    token: string;
};

export const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) => {
    await runMiddleware(req, res, cors);
    const data = JSON.parse(req.body) as RequestData;

    
    res.status(200).json({ message: "Hello from Next.js!" });
}

export default handler;