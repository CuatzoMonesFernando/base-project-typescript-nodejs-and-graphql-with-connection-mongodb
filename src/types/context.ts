import { Response, Request, NextFunction } from "express";
import { User } from "../schema/user.schema";


interface Context {
    req: Request,
    res: Response,
    next: NextFunction,
    User: User | null
}

export default Context