# react-weather-app

1. npm init
2. npm i express body-parser jsonwebtoken
3. npm i -D nodemon
4. Basic server setup

```js
const express = require("express");
const app = express();
app.get("/", (req, res) => res.send("hello"));
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on ${port}`));
app.listen(port, () => console.log(`Server running on ${port}`));
```

5. node server to test localhost:5000
6. added package.json script for nodemon- "server": "nodemon server.js"
7. Now the terminal script to start the server is just- npm run server
