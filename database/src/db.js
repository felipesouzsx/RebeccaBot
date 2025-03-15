const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
require('dotenv').config();


const serviceAccount = require(process.env.FIRESTORE_KEY_PATH);
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();


module.exports.db = db;