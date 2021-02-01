const mysql = require('mysql');

const createConnection = (host, user, password) => {
  return (connection = mysql.createConnection({
    host,
    user,
    password,
    database: 'library_system',
    // allow mutiple statements to be executed in a single sql query
    multipleStatements: true,
  }))
}

module.exports = createConnection;