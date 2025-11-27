import http, { IncomingMessage, Server, ServerResponse } from 'http';
import config from './config';
import { RouteHandler, routes } from './helpers/RouteHandler';
import './routes'


const server: Server = http.createServer(
    (req: IncomingMessage, res: ServerResponse) => {
        console.log('server is running...');

        const method = req.method?.toUpperCase() || '';
        const path = req.url || '';

        const methodMap = routes.get(method)
        const handler: RouteHandler | undefined = methodMap?.get(path);

        console.log(`
            method: ${method},
            path: ${path},
            methodMap: ${methodMap},
            handler: ${handler}
            `)

        if (handler) {
            handler(req, res)
        } else {
            res.writeHead(404, { 'content-type': "application/json" });
            res.end(JSON.stringify({
                message: "not found",
                success: false,
                path
            }))
        }



        // RAW WAY TO HANDLE

        // if (req.url == '/' && req.method == 'GET') {
        //     res.writeHead(200, { 'content-type': 'application/json' });
        //     res.end(
        //         JSON.stringify({
        //             message: 'hello',
        //             path: req.url
        //         })
        //     )
        // };

        // if (req.url == '/api' && req.method == 'GET') {
        //     res.writeHead(200, { 'content-type': "application/json" });
        //     res.end(
        //         JSON.stringify({
        //             message: "api route",
        //             path: req.url
        //         })
        //     )
        // }

        // if (req.url == '/api/user' && req.method == "POST") {

        //     let body = '';

        //     // listen for data chunk
        //     req.on('data', chunk => {
        //         body += chunk.toString();
        //     });

        //     req.on('end', () => {
        //         try {
        //             const parsedBody = JSON.parse(body);
        //             console.log('data parsed', parsedBody);
        //             res.end(
        //                 JSON.stringify({
        //                     ...parsedBody,
        //                     path: req.url
        //                 })
        //             )
        //         }
        //         catch (err: any) {
        //             console.error(err.message);
        //         }
        //     });


        // }

    }
);

server.listen(config.port, () => {
    console.log(`server is running on ${config.port}`);
})