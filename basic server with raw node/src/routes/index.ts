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


addRoutes("GET", '/api/users', async (req, res) => {
  try {
    const users = readUsers();
    if (users.length > 0) {
      sendJson(res, 200, {
        success: true,
        message: "users found",
        users
      })
    } else {
      sendJson(res, 404, {
        success: false,
        message: "no user found",
        users: []
      })
    }
  }
  catch (err) {
    console.error('error getting users', err);
    sendJson(res, 500, {
      success: false,
      message: 'internal server error'
    })
  }
})


addRoutes("POST", "/api/users", async (req, res) => {
  const body = await parseBody(req);

  // user json read
  const users = readUsers();

  const newUser = {
    id: crypto.randomUUID(),
    created_at: new Date(Date.now()).toISOString(),
    ...body,
  };

  users?.push(newUser);

  writeUsers(users);

  sendJson(res, 201, { success: true, data: body });
});


addRoutes('PUT', '/api/users/:id', async (req, res) => {
  const { id } = (req as any).params;
  const body = await parseBody(req);

  const users = readUsers();

  const index = users.findIndex((user: any) => user.id == id);

  if (index === -1) {
    sendJson(res, 400, {
      message: 'no user found with this id'
    })
  }

  users[index] = {
    ...users[index], ...body, updated_at: new Date(Date.now()).toISOString()
  };

  writeUsers(users);

  sendJson(res, 202, {
    success: true,
    user: users[index]
  })

})


addRoutes("GET", "/api/users/:id", async (req, res) => {
  const { id } = (req as any).params;

  try {
    const users = readUsers();

    const index = users.findIndex((index: any) => index.id === id);

    const user = users[index];

    if (!user) {
      sendJson(res, 404, {
        success: false,
        message: "no user found"
      })
    };

    sendJson(res, 200, {
      success: true,
      message: "user found",
      user
    })
  }

  catch (err) {
    console.error("error getting specific user", err);
    sendJson(res, 500, {
      success: false,
      message: "internal server error"
    })
  }

})