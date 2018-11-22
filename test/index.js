/*
* Test Runner
*
*/


// Dependencies
const unit = require('../app/unit')
const lib = require('../app/lib')

// start http server
lib.server.listen(3000, () => {
})

// Container to hold test runner objects
const app = {}

app.tests = {
  unit
}

// Get total number of tests to execute
app.getNumberOfTests = () => {
  // counter - initialize to zero
  let counter = 0
  // loop through the top level object holding the test collections
  for (let key in app.tests) {
    if (app.tests.hasOwnProperty(key)) {
      // create a variable to hold an object whose properties are specific tests
      const subTest = app.tests[key]
      // Iterate over the object properties and excute tests
      for (let testName in subTest) {
        // filter only those properties that belong to the object as opposed to the prototype
        if (subTest.hasOwnProperty(testName)) {
          // icrement counter
          counter++
        }
      }
    }
  }

  // once done return counter
  return counter
}

// Utility function to print test results
app.printTestResults = (maxTests, successfulTests, failedTests) => {
  console.log('')
  console.log('-------------------------------------------------------')
  console.log('------------------BEGIN TEST RESULTS-------------------')
  console.log('-------------------------------------------------------')
  console.log(`\t Total no. of tests: ${maxTests}`)
  console.log(`\t No. of successful tests: ${successfulTests}`)
  console.log(`\t No. of failed tests: ${failedTests.length}`)
  console.log('-------------------------------------------------------')

  if (failedTests.length > 0) {
    console.log('----------------SUMMARY - FAILED TESTS-----------------')
    console.log('-------------------------------------------------------')
    failedTests.forEach(test => {
      console.log('\x1b[31m%s\x1b[0m', `\t Test Name: ${test.testName}`)
      console.log('\x1b[31m%s\x1b[0m', `\t Error Details: ${test.testError}`)
    })
    console.log('-------------------------------------------------------')
  }

  console.log('-------------------END TEST RESULTS--------------------')
}

// Test runner function
app.runTests = () => {
  console.log('Running tests.....')
  // Get number of tests
  const maxTests = app.getNumberOfTests()
  let counter = 0 // counter to keep track of number of tests executed
  let sucessfulTests = 0 // Counter for successful tests
  let failedTests = [] // Array to hold failed test details

  // Iterate over top level object that holds all the tests
  for (let key in app.tests) {
    if (app.tests.hasOwnProperty(key)) {
      // create a variable to hold an object whose properties are specific tests
      const subTests = app.tests[key]
      // Iterate over the object properties and excute tests
      for (let testName in subTests) {
        // filter only those properties that belong to the object as opposed to the prototype
        if (subTests.hasOwnProperty(testName)) {
          // Use IIFE to execute test and contain variables in a closue to avoid in clobbering/cluttering
          ((tempFuncName, testFunction) => {
            // const tempFuncName = testName
            // const testFunction = subTests[testName]
            // use try/catch to evaluate the test safely
            try {
              // excute test
              testFunction(() => {
                // If code executes to this point, then the test succeeded
                // Print test name to screen
                console.log('\x1b[32m%s\x1b[0m', `${tempFuncName}`)
                // Increment number of tests executed successfully
                sucessfulTests++
                // increment number of tests executed
                counter++
                // check if all tests have been done in which case print test summary
                if (counter === maxTests) {
                  // Print test results
                  app.printTestResults(maxTests, sucessfulTests, failedTests)
                  // Shutdown lib.server
                  lib.server.close()
                }
              })

            } catch (testError) {
              // Print test name to screen
              console.log('\x1b[31m%s\x1b[0m', `${tempFuncName}`)
              // collect details of failed tests
              failedTests.push({
                testName,
                testError
              })

              // increment number of tests executed 
              counter++
              // check if all tests have been done in which case print test summary
              if (counter === maxTests) {
                // Print test results
                app.printTestResults(maxTests, sucessfulTests, failedTests)
                // Shutdown lib.server
                lib.server.close()
              }
            }
          })(testName, subTests[testName])
        }
      }
    }
  }
}

// Run test runner
app.runTests()