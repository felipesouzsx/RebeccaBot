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
  let result = {status: 503, data: {}};
  const request = {
    method: method,
    headers: { 'Content-Type': 'application/json' },
  };
  if (body != null) { request.body = body }

  try {
    await fetch(`${process.env.DATABASE_URL}${url}`, request)
    .then(async (response) => {
      console.log(`DBS_FCH: Response ${response.status}`) 
      result.status = response.status;
      if (response.headers.has('Content-Type') && response.headers.get('Content-Type').startsWith('application/json')) {
        result.data = await response.json();
      }
      if (method == 'GET') { Cache.set(requestUrl, result) }
    })
  } catch (error) {
    console.log(`DBS_FCH: Error ${error}`)
  }
  return result;
}


module.exports = { fetchDatabase };