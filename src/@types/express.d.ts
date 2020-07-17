//new interface for Request: we add user.id

declare namespace Express {
    export interface Request {
        user: {
            id: string;
        };
    }
}
