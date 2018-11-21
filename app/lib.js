/*
* Functions to be tested
*
*/

// Dependencies
const assert = require('assert')
const http = require('http')
const url = require('url')

// Container for test functions
const lib = {}

// Function that returns sum of two integers
lib.addTwoNumbers = (a, b) => parseInt(a) + parseInt(b)

// Function that returns square of a given number
lib.squareNumber = number => number * number

// Create http server that returns Hello World when / path is requests
lib.server = http.createServer((req, res) => {
  const parsedURL = url.parse(req.url, true);
  if (req.method === 'GET' && parsedURL.path === '/') {
    res.statusCode = 200
    res.end('Hello World');
  } else {
    res.statusCode = 404
    res.end()
  }
})

// Export module
module.exports = lib;