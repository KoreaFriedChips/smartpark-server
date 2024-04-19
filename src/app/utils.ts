import { verifyToken } from '@clerk/backend';

export const getUser = async (request: any) => {
    try {
        return await verifyToken(request.token, { jwtKey: process.env.CLERK_PUBLIC ?? "", issuer: null });
    } catch {
        return null;
    }
}