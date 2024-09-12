import { Request, Response, NextFunction } from 'express';



// 中间件：打印访客信息
const logVisitorInfoMiddleware = (req:Request, res:Response, next:NextFunction) => {
    const { method, url, headers } = req;
    console.log(`Request received: Method=${method}, URL=${url}, User-Agent=${headers['user-agent']}`);

    next(); // 继续处理请求
}


const logUrlAccessInfoMiddleware = (req:Request, res:Response, next:NextFunction) => {
    const { method, url } = req;
    console.log(`Request received: Method=${method}, URL=${url}`);
    next(); // 继续处理请求
}



export { logVisitorInfoMiddleware, logUrlAccessInfoMiddleware };