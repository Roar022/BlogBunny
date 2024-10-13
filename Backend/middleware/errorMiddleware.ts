import { NextFunction, Request, Response} from "express";
export const errorHandler = (err:any, req:Request, res:Response, next:NextFunction) =>{
    const statusCode = res.statusCode ? res.statusCode : 500;

    res.status(statusCode)
    res.json({

        message: err.message,
        status:"fail"
        // error stack is where the error occur. path of file where error encountered

    })
}
