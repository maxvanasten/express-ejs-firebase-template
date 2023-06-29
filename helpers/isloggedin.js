/** @format */

import { debugLog } from "./debuglog.js";
import { admin } from "./database.js";

const isLoggedIn = async (sessionCookie) => {
  debugLog(`isLoggedIn(): sessionCookie = ${sessionCookie}`);

  let response = {
    status: false,
    error: "",
    email: "",
  };

  if (sessionCookie != undefined) {
    await admin
      .auth()
      .verifySessionCookie(sessionCookie, true /** checkRevoked */)
      .then(async (userData) => {
        console.log("Logged in:", userData.email);
        response.status = true;
        response.email = userData.email;
      })
      .catch((error) => {
        response.error = error;
      });
  }

  debugLog(`isLoggedIn(): returning status ${response.status}`);

  return response;
};

export { isLoggedIn };
