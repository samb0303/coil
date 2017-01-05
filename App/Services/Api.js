// a library to wrap and simplify api calls
import apisauce from 'apisauce'

// SAMS TEST

// our 'constructor'
const create = (baseURL = 'https://api.staging-sm.com/v2/analytics/bc6f2a88-5dd8-40d2-845b-ea44df9c27aa') => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Content-Type': 'application/vnd.api+json;charset=UTF-8',
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InNicmVuZGVyQHNpbXBseW1lYXN1cmVkLmNvbSIsImFwcF9tZXRhZGF0YSI6eyJpc19zbV9hZG1pbiI6dHJ1ZSwiYXBpX2FjY2VzcyI6dHJ1ZX0sInVzZXJfbWV0YWRhdGEiOnsicHJvZmlsZV9pbWFnZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20vYXZhdGFyLzMyYWVjN2UxNTVjNjU4YmQ0MTkxZGFiZTFmOTE5NmY0P3M9NDgwJnI9cGcmZD1odHRwcyUzQSUyRiUyRmNkbi5hdXRoMC5jb20lMkZhdmF0YXJzJTJGc2IucG5nIiwiZW1haWwiOiJzYnJlbmRlckBzaW1wbHltZWFzdXJlZC5jb20iLCJmaXJzdF9uYW1lIjoiU2FtYW50aGEg8J-QmSIsImxhc3RfbmFtZSI6IkJyZW5kZXIifSwiZW1haWxfdmVyaWZpZWQiOnRydWUsImNsaWVudElEIjoiWXdEWTlENDMzdmVNSENyZWQ3ajBCRVNqbG53RjdyeTgiLCJ1cGRhdGVkX2F0IjoiMjAxNy0wMS0wM1QxOTo1Mjo0Mi4wODdaIiwidXNlcl9pZCI6ImF1dGgwfGM1MzYxYmQ3LTFiZGEtNGY1Yi05YzI5LTRmOTA2ZTIzZjJmNyIsImlkZW50aXRpZXMiOlt7InVzZXJfaWQiOiJjNTM2MWJkNy0xYmRhLTRmNWItOWMyOS00ZjkwNmUyM2YyZjciLCJwcm92aWRlciI6ImF1dGgwIiwiY29ubmVjdGlvbiI6IlVBTURCIiwiaXNTb2NpYWwiOmZhbHNlfV0sImNyZWF0ZWRfYXQiOiIyMDE2LTAzLTI5VDIwOjU3OjIyLjAyMFoiLCJpc3MiOiJodHRwczovL3NpbXBseW1lYXN1cmVkLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHxjNTM2MWJkNy0xYmRhLTRmNWItOWMyOS00ZjkwNmUyM2YyZjciLCJhdWQiOiJZd0RZOUQ0MzN2ZU1IQ3JlZDdqMEJFU2psbndGN3J5OCIsImV4cCI6MTQ4Mzk3MzE2MywiaWF0IjoxNDgzNDczMTYzfQ.B-2mk_VI3zDsZA3rfjD3KOemCAHPUb1ELFG8qnETyDc'
    },
    // 10 second timeout...
    timeout: 10000
  })

  const getData = (filters) => api.post('/sessions/metrics', filters)

  // Force OpenWeather API Key on all requests
  // api.addRequestTransform((request) => {
  //   request.params['APPID'] = '0e44183e8d1018fc92eb3307d885379c'
  // })

  // Wrap api's addMonitor to allow the calling code to attach
  // additional monitors in the future.  But only in __DEV__ and only
  // if we've attached Reactotron to console (it isn't during unit tests).
  if (__DEV__ && console.tron) {
    api.addMonitor(console.tron.apisauce)
  }

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than 'get', 'post' and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  // const getCity = (city) => api.get('weather', {q: city})

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    // getCity
    getData
  }
}

// let's return back our create method as the default.
export default {
  create
}
