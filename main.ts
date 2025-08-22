import express from 'express';



const app = express();
const port = 3000;




// 配置中间件
import { Request, Response, NextFunction } from 'express';


// 中间件：打印访客信息
const logUrlAccessInfoMiddleware = (req:Request, res:Response, next:NextFunction) => {
    const { method, url } = req;
    console.log(`Request received: Method=${method}, URL=${url}`);
    next(); // 继续处理请求
}
app.use(logUrlAccessInfoMiddleware);




// 配置路由

// 用来测试的路由
app.get('/api/hello', (req: Request, res: Response) => {
    res.send('Hello World!');
});




// 配置 socket 服务
import { createServer } from "http";
const httpServer = createServer(app);

import { initSocket } from "@/socket";
initSocket(httpServer)




httpServer.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
