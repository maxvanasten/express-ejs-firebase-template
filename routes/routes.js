/** @format */

import { getData, putData, db, admin } from "../helpers/database.js";
import { isLoggedIn } from "../helpers/isloggedin.js";
import fs from "fs";

import express from "express";
const routes = express.Router();

routes.get("/", async (req, res) => {
  const logged_in = await isLoggedIn(req.cookies.session);

  res.render("pages/index", {
    logged_in: logged_in,
  });
});

routes.get("/hidden", async (req, res) => {
  const logged_in = await isLoggedIn(req.cookies.session);
  if (!logged_in.status) {
    res.render("pages/accessdenied", { logged_in: logged_in });
  } else {
    res.render("hidden/index", {
      logged_in: logged_in,
    });
  }
});

routes.get("/:page", async (req, res) => {
  const logged_in = await isLoggedIn(req.cookies.session);

  if (fs.existsSync(`./views/pages/${req.params.page}.ejs`)) {
    res.render(`pages/${req.params.page}`, {
      logged_in: logged_in,
    });
  } else {
    res.render("pages/pagenotfound", { logged_in: logged_in });
  }
});

routes.get("/hidden/:page", async (req, res) => {
  const logged_in = await isLoggedIn(req.cookies.session);
  if (!logged_in.status) {
    res.render("pages/accessdenied", { logged_in: logged_in });
  } else {
    if (fs.existsSync(`./views/hidden/${req.params.page}.ejs`)) {
      res.render(`hidden/${req.params.page}`, {
        logged_in: logged_in,
      });
    } else {
      res.render("pages/pagenotfound", { logged_in: logged_in });
    }
  }
});

export { routes };
