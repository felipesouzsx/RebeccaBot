require('dotenv').config();
const NodeCache = require('node-cache');

const CACHE_LIFETIME_SEC = 10;
const Cache = new NodeCache({stdTTL: CACHE_LIFETIME_SEC});


async function fetchDatabase(url, method='GET', body=null, cache=true) {
  const requestUrl = `${url}:${method}`;

  // Cache only saves GET requests
  if (Cache.has(requestUrl) && cache) {
    return Cache.get(requestUrl);
  }

  let result = {status: 503, data: {}};
  const request = {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store' // I have my own caching solution
  };
  if (body != null) { request.body = body }

  try {
    await fetch(`${process.env.DATABASE_URL}${url}`, request)
    .then(async (response) => {
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