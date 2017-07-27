// employees.js
var faker = require('faker')
function generateEmployees () {
  var employees = []
  for (var id = 1; id <= 100; id++) {
    var firstName = faker.name.firstName()
    var lastName = faker.name.lastName()
    var email = faker.internet.email()
    employees.push({
      /*"id": id,
      "first_name": firstName,
      "last_name": lastName,
      "name": firstName +" "+lastName,
      "email": email,*/
      "id": firstName,
      "name": firstName +" "+lastName,
      "progress": '22',
      "color": email,
    })
  }
  return { "employees": employees }
}

module.exports = generateEmployees;