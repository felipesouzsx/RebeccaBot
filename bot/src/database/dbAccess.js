require('dotenv').config();
const discordUtil = require('../util/discordUtil.js');


async function fetchDatabase(url, method='GET', body=null) {
  console.log(`DBS_FCH: ${url} : ${method}`);
  let request = {
    method: method,
    headers: { 'Content-Type': 'application/json' },
  };
  if (body != null) {
    request.body = body;
  };
  let response = await fetch(`${process.env.DATABASE_URL}${url}`, request);
  return response;
}


module.exports = { fetchDatabase };