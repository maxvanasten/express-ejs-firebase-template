/** @format */

import { config } from "../config/config.js";

const debugLog = (text) => {
  if (config.debug) {
    console.log("------[START_DEBUG]------");
    console.log(text);
    console.log("------[DEBUG_END]------");
  }
};

export { debugLog };
