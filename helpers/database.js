/** @format */

import { debugLog } from "./debuglog.js";

import admin from "firebase-admin";
import {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} from "firebase-admin/firestore";
import { serviceAccount } from "../config/serviceAccountKey.js";
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://playproductions-af234.firebaseio.com",
});

const db = getFirestore();

const getData = async (db, collection, options) => {
  let response = false;
  const data = [];
  const snapshot = await db.collection(collection).get();

  snapshot.forEach((doc) => {
    let dd = doc.data();
    data.push(dd);
  });

  if (!options) {
    // Return entire collection
    response = data;
  } else {
    if (options.key != undefined && options.value != undefined) {
      data.forEach((entry) => {
        if (entry[options.key] == options.value) {
          response = entry;
        }
      });
    }
  }

  debugLog(
    `getData() has been called.\nCollection: ${collection}\nOptions: ${options}\n\nResponse: ${response}`
  );

  return response;
};

const putData = async (db, collection, entry, identifier) => {
  const newDoc = db.collection(collection).doc(identifier.toString());
  await newDoc.set(entry);

  debugLog(
    `putData() has been called.\nCollection: ${collection}\nIdentifier: ${identifier}`
  );
};

export { getData, putData, db, admin };
