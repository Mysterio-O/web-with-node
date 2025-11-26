import http, { IncomingMessage, Server, ServerResponse } from 'http';
import config from './config';

const server: Server = http.createServer(
    (req: IncomingMessage, res: ServerResponse) => {
        console.log('server is running...');

        if (req.url == '/' && req.method == 'GET') {
            res.writeHead(200, { 'content-type': 'application/json' });
            res.end(
                JSON.stringify({
                    message: 'hello',
                    path: req.url
                })
            )
        };

        if (req.url == '/api' && req.method == 'GET') {
            res.writeHead(200, { 'content-type': "application/json" });
            res.end(
                JSON.stringify({
                    message: "api route",
                    path: req.url
                })
            )
        }

        if (req.url == '/api/user' && req.method == "POST") {

            let body = '';

            // listen for data chunk
            req.on('data', chunk => {
                body += chunk.toString();
            });

            req.on('end', () => {
                try {
                    const parsedBody = JSON.parse(body);
                    console.log('data parsed', parsedBody);
                    res.end(
                        JSON.stringify({
                            ...parsedBody,
                            path:req.url
                        })
                    )
                }
                catch(err:any){
                    console.error(err.message);
                }
            });


        }

    }
);

server.listen(config.port, () => {
    console.log(`server is running on ${config.port}`);
})