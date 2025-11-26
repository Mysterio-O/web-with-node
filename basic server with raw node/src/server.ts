import http, { IncomingMessage, Server, ServerResponse } from 'http';
import config from './config';

const server:Server = http.createServer(
    (req:IncomingMessage,res:ServerResponse)=> {
        console.log('server is running...');

        if(req.url== '/' && req.method == 'GET'){
            res.writeHead(200,{'content-type':'application/json'});
            res.end(
                JSON.stringify({
                    message:'hello',
                    path:req.url
                })
            )
        }
    }
);

server.listen(config.port,()=> {
    console.log(`server is running on ${config.port}`);
})