import { verifyToken } from '@clerk/backend';
import { NextRequest } from 'next/server';

export const getUser = async (request: any) => {
    try {
        return await verifyToken(request.token, { jwtKey: process.env.CLERK_PUBLIC ?? "", issuer: null });
    } catch {
        return null;
    }
}

export const searchParamsToJSON = (searchParams: URLSearchParams) => {
    let searchParamsJSON: any = {};
    searchParams.forEach((val, key) => {
        searchParamsJSON[key] = val;
    });
    return searchParamsJSON;
}