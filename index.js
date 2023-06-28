/** @format */

import cookieParser from "cookie-parser";
import csrf from "csurf";
import bodyParser from "body-parser";
import { config } from "./config/config.js";
import express from "express";
import { admin } from "./helpers/database.js";
import { routes } from "./routes/routes.js";

const app = express();
app.set("view engine", "ejs");
// app.set("views", "./views");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(cookieParser());
const csrfMiddleware = csrf({ cookie: true });
app.use(csrfMiddleware);

app.all("*", (req, res, next) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  next();
});

app.post("/sessionLogin", (req, res) => {
  const idToken = req.body.idToken.toString();

  const expiresIn = 60 * 60 * 24 * 7 * 1000;

  admin
    .auth()
    .createSessionCookie(idToken, { expiresIn })
    .then(
      (sessionCookie) => {
        const options = { maxAge: expiresIn, httpOnly: true };
        res.cookie("session", sessionCookie, options);
        res.end(JSON.stringify({ status: "success" }));
      },
      (error) => {
        res.status(401).send("UNAUTHORIZED REQUEST!");
      }
    );
});

app.get("/sessionLogout", (req, res) => {
  res.clearCookie("session");
  res.redirect("/");
});

app.use("/", routes);

app.listen(config.port, async () => {
  console.log(`server listening on port ${config.port}!`);
});
