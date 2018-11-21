/*
* Unit tests
*
*/

// Dependencies
const assert = require('assert')
const http = require('http')
const lib = require('./lib.js')

// Container object
const unit = {}

//lib.addTwoNumbers should return sum of any two integers
unit['lib.addTwoNumbers should return sum of any two integers'] = done => {
  let a = Math.floor(Math.random()*100)
  let b = Math.floor(Math.random()*100)
  assert.equal(lib.addTwoNumbers(a,b), a+b)
  done()
}


//lib.addTwoNumbers should fail on invalid parameters
unit['lib.addTwoNumbers should fail on invalid parameters'] = done => {
  let a = Math.floor(Math.random()*100)
  let b = 'b'
  assert.strictEqual(lib.addTwoNumbers(a,b), a+b)
  done()
}

//lib.squareNumber should return number given multiplied by itself
unit['lib.squareNumber should return number given multiplied by itself'] = done => {
  let number = Math.floor(Math.random()*100)
  assert.equal(lib.squareNumber(number), number*number)
  done()
}


// lib.server should return 200 on GET to /
unit['lib.server should return 200 on GET to /'] = done => {
   // request options
   const options = {
    port: 3000,
    protocol: 'http:',
    host: 'localhost',
    pathname: '/',
    method: 'GET'
  }
  const req = http.request(options, res => {
    // Assert that headers - 'Content-Type': 'text/plain
    assert.equal(res.statusCode,200)
    done()
  })
  req.end()
}

// lib.server should return 404 on any other path or method
unit['lib.server should return 404 on any other path or method'] = done => {
  // request options
  const options = {
   port: 3000,
   protocol: 'http:',
   host: 'localhost',
   pathname: '/random/path',
   method: 'POST'
 }
 const req = http.request(options, res => {
   // Assert that headers - 'Content-Type': 'text/plain
   assert.equal(res.statusCode,404)
   done()
 })
 req.end()
}


// export module
module.exports = unit

