import parseBody from "../helpers/parseBody";
import addRoutes from "../helpers/RouteHandler"
import sendJson from "../helpers/sendJson"

addRoutes("GET", "/", (req, res) => {
    sendJson(res, 200, {
        message: "url found",
        path: req.url
    })
});


addRoutes("GET", '/api', (req, res) => {
    sendJson(res, 200, {
        message: 'api route found',
        path: req.url
    })
})

addRoutes('POST', '/api/users', async (req, res) => {
    try {
        const body = await parseBody(req);
        sendJson(res, 200, body);
    } catch (err) {
        console.error("error", err);
        sendJson(res, 400, {
            message: "failed",
            status: 400
        })
    }
})