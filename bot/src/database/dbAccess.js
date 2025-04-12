require('dotenv').config();
const NodeCache = require('node-cache');

const CACHE_LIFETIME_SEC = 30;
const Cache = new NodeCache({stdTTL: CACHE_LIFETIME_SEC});


async function fetchDatabase(url, method='GET', body=null) {
  const requestUrl = `${url}:${method}`;

  if (Cache.has(requestUrl)) {
    console.log(`DBS_FCH: Cache ${requestUrl}`);
    return Cache.get(requestUrl);
  }

  console.log(`DBS_FCH: Database ${requestUrl}`);
  let result = {status: 500, data: {}};
  const request = {
    method: method,
    headers: { 'Content-Type': 'application/json' },
  };
  if (body != null) { request.body = body }

  await fetch(`${process.env.DATABASE_URL}${url}`, request)
  .then(async (response) => {
    try {
      console.log(`DBS_FCH: Response ${response.status}`) 
      result.status = response.status;
      result.data = response.headers.get('Content-Type').startsWith('application/json') ? (await response.json()) : {};
      if (method == 'GET') { Cache.set(requestUrl, result) }
    } catch(error) { 
      console.log(`DBS_FCH: Error ${error} ${error.stack}`) 
    }
  })
  return result;
}


module.exports = { fetchDatabase };