import { IncomingMessage, ServerResponse } from "http";

export type RouteHandler = (req:IncomingMessage,res:ServerResponse) => void;

export const routes: Map<string,Map<string,RouteHandler>> = new Map();

function addRoutes(method:string,path:string,handler:RouteHandler){
    console.log('entered handler')
    if(!routes.has(method)) routes.set(method,new Map());

    routes.get(method)!.set(path,handler);
}

export default addRoutes;