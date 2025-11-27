import { readUsers, writeUsers } from "../helpers/fileDB";
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

// addRoutes('POST', '/api/users', async (req, res) => {
//     try {
//         const body = await parseBody(req);

//         const users = readUsers();

//         const newUser = {
//             id: Date.now(),
//             ...body
//         };

//         users?.push(newUser);

//         writeUsers(newUser)

//         sendJson(res, 200, body);
//     } catch (err) {
//         console.error("error", err);
//         sendJson(res, 400, {
//             message: "failed",
//             status: 400
//         })
//     }
// })

addRoutes("POST", "/api/users", async (req, res) => {
  const body = await parseBody(req);

  // user json read
  const users = readUsers();

  const newUser = {
    ...body,
  };

  users?.push(newUser);

  writeUsers(users);

  sendJson(res, 201, { success: true, data: body });
});