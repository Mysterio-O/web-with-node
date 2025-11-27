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