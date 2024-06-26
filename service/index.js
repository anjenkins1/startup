const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const express = require('express');
const app = express();
const DB = require('./database.js')
const { peerProxy } = require('./peerProxy.js');

const authCookieName = 'token';

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set('trust proxy', true);

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.email, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  console.log("Unauthorized")
  res.status(401).send({ msg: 'Unauthorized' });
});

var secureApiRouter = express.Router()
apiRouter.use(secureApiRouter)

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// GetUser returns information about a user
apiRouter.get('/user/:email', async (req, res) => {
  const user = await DB.getUser(req.params.email);
  if (user) {
    const token = req?.cookies.token;
    res.send({ email: user.email, authenticated: token === user.token });
    return;
  }
  res.status(404).send({ msg: 'Unknown' });
});

secureApiRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    req.user = user
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// GetReactions
secureApiRouter.get('/reactions', async (req, res) => {
  const user = req.user.email
  console.log(user)
  const rxns = await DB.getReactions(user);
  res.send(rxns);
});

// SubmitReaction
secureApiRouter.post('/reaction', async (req, res) => {
  const rxn = { ...req.body, ip: req.ip };
  await DB.addReaction(rxn);
  const userName = req.body.user;
  const rxns = await DB.getReactions(userName);
  res.send(rxns);
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

peerProxy(httpService);


// // GetReactions
// apiRouter.get('/reactions', (_req, res) => {
//     res.send(reactions);
// });
  
// // SaveReaction
// apiRouter.post('/reaction', (req, res) => {
//     reactions = updateReactions(req.body, reactions);
//     res.send(reactions);
// });

// // Return the application's default page if the path is unknown
// app.use((_req, res) => {
//   res.sendFile('index.html', { root: 'public' });
// });

// app.listen(port, () => {
//   console.log(`Listening on port ${port}`);
// });

// let reactions = [];
// function updateReactions(newReaction, reactions) {
//     reactions.push(newReaction);
//     return reactions;
// }