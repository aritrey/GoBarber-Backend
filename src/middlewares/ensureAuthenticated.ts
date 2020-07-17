import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "../config/auth";

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
): void {
    //we get: "base_url/appointments/Bearer [token]"
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new Error("JWT token is missing");
    }

    const [_, token] = authHeader.split(" ");
    try {
        const decoder = verify(token, authConfig.jwt.secret);
        const { sub } = decoder as TokenPayload;
        request.user = { id: sub };
    } catch (e) {
        throw new Error("invalid JWT token");
    }

    return next();
}
