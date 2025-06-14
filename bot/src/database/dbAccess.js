require('dotenv').config();
const NodeCache = require('node-cache');

const CACHE_LIFETIME_SEC = 10;
const Cache = new NodeCache({stdTTL: CACHE_LIFETIME_SEC});


async function fetchDatabase(url, method='GET', body=null) {
  // PUT requests erase cached data
  if (method === 'PUT') {
    Cache.del(url);
  }

  // Cache only saves GET requests
  if (Cache.has(url)) {
    return Cache.get(url);
  }

  let result = {status: 503, data: {}};
  const request = {
    method: method,
    headers: { 'Content-Type': 'application/json', 'Token': process.env.DATABASE_AUTH_TOKEN },
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
      if (method == 'GET') { Cache.set(url, result) }
    })
  } catch (error) {
    console.log(`DBS_FCH: Error ${error}`)
  }
  return result;
}


function deleteFromCache(url) {
  Cache.del(url);
}


module.exports = { fetchDatabase, deleteFromCache };