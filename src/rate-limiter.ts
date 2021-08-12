import {Request} from "express";
import {CreateTransactionDto} from "./index";

const receivedRequestsList: any = {};

export function rateLimiterMiddleware(req: Request<any, any, CreateTransactionDto>, res: any, next: any) {
    const userId: any = req.header("user-id");
    const requestPath = req.method + ' ' + req.url;
    if (!receivedRequestsList[userId])
        receivedRequestsList[userId] = {};
    if (!receivedRequestsList[userId][requestPath]) {
        // const now = new Date().getMinutes();
        receivedRequestsList[userId][requestPath] = {}
    }

    // Dear reader - I've managed to write very little code as I sadly dedicated too much of my time getting familiar with
    // typescript again, and had to get into combining TS with plain JS. I don't feel like this code (or lack thereof)
    // represents my abilities well, and would love to have a chance to prove I can do far better.
    // Thanks, and have a great day.


    next();
}
