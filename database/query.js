const query = {
  createUser: function (member, connection, cb) {
    const sql = ` CREATE USER '${member.username}'@'%' IDENTIFIED WITH mysql_native_password BY '${member.password}';
    GRANT SELECT,UPDATE,DELETE,INSERT ON library_system.member TO '${member.username}'@'%';
    GRANT SELECT,UPDATE,DELETE,INSERT ON library_system.hold TO '${member.username}'@'%';
    GRANT SELECT,UPDATE,DELETE,INSERT ON library_system.book TO '${member.username}'@'%';
    GRANT SELECT,UPDATE,DELETE,INSERT ON library_system.publisher TO '${member.username}'@'%';
    GRANT SELECT,UPDATE,DELETE,INSERT ON library_system.report TO '${member.username}'@'%';
    FLUSH PRIVILEGES;
    INSERT INTO member(first_name, last_name, username, password, phone_number, email, address) 
    VALUES
    ('${member.fname}', '${member.lname}', '${member.username}', '${member.password}', 
    '${member.phone_number}' ,'${member.email}', '${member.address}'); `

    connection.query(sql, (err, result) => {
      if (err) cb(err, null)
      else cb(null, result)
    })
  },

  selectMemberByUsername: function (member, connection, cb) {
    const sql = ` SELECT * FROM member WHERE username = '${member.username}' `
    connection.query(sql, (err, result) => {
      if (err) cb(err, null)
      else cb(null, result)
    })
  },

  selectLibrarianByUsername: function (user, connection, cb) {
    const sql = ` SELECT * FROM Librarian WHERE username = '${user.username}' `
    connection.query(sql, (err, result) => {
      if (err) cb(err, null)
      else cb(null, result)
    })
  },

  selectMemberByName: function (memberName, connection, cb) {
    const sql = `SELECT concat(first_name, ' ', last_name) as name, username, email, phone_number, address FROM member WHERE concat(first_name, ' ',last_name) LIKE 
    '%${memberName}%' ORDER BY name
    `
    connection.query(sql, (err, result) => {
      if (err) cb(err, null)
      else cb(null, result)
    })
  },

  removeMember: function (member, connection, cb) {
    const sql = `DELETE FROM member WHERE email='${member.email}' AND first_name='${member.first_name}' AND last_name='${member.last_name}'`
    connection.query(sql, (err, result) => {
      console.log(member)
      if (err) cb(err, null)
      else cb(null, result)
    })
  },

  getPublisherID: function (name, connection, cb) {
    const sql = `SELECT publisher_id FROM publisher WHERE publisher_name = '${name}'`
    connection.query(sql, (err, result) => {
      if (err) cb(err, null)
      else cb(null, result)
    })
  },

  addBook: function (book, connection, cb) {
    const sql = `INSERT INTO book() 
    VALUES ('${book.isbn}', '${book.title}', '${book.edition}', '${book.author}', '${book.category}', (SELECT publisher_id FROM publisher WHERE publisher_name = '${book.publisher}'), ${book.quantity})`
    connection.query(sql, (err, result) => {
      if (err) cb(err, null)
      else cb(null, result)
    })
  },

  removeBook: function (isbn, connection, cb) {
    const sql = `DELETE FROM book WHERE isbn = '${isbn}'`
    connection.query(sql, (err, result) => {
      if (err) cb(err, null)
      else cb(null, result)
    })
  },

  placeHold: function (info, connection, cb) {
    const sql = ` 
    INSERT INTO hold(book_isbn, username) VALUES('${info.isbn}', '${info.username}') 
    `
    connection.query(sql, (err, result) => {
      if (err) cb(err, null)
      else cb(null, result)
    })
  },

  getHeldBooks_Librarian: function (connection, cb) {
    const sql = ` SELECT book.title, CONCAT(member.first_name, '  ', member.last_name) AS member_name, member.email, member.phone_number, 
    hold.hold_date, hold.hold_date FROM book 
    JOIN hold ON book.isbn = hold.book_isbn
    JOIN member ON hold.username = member.username`
    connection.query(sql, (err, result) => {
      if (err) cb(err, null)
      else cb(null, result)
    })
  },

  getHeldBooks_Member: function (username, connection, cb) {
    const sql = `
    SELECT isbn, title, edition, date(hold_date) AS hold_date FROM book 
    JOIN hold ON book.isbn = hold.book_isbn JOIN
    member ON hold.username = member.username 
    WHERE member.username = '${username}'`
    connection.query(sql, (err, result) => {
      if (err) cb(err, null)
      else cb(null, result)
    })
  },

  removeHeldBook: function (info, connection, cb) {
    const sql = `
    DELETE FROM hold WHERE username='${info.username}' 
    AND book_isbn = '${info.isbn}'`
    connection.query(sql, (err, result) => {
      if (err) cb(err, null)
      else cb(null, result)
    })
  },

  getOverdueBooks_Librarian: function (connection, cb) {
    const sql = ` 
    SELECT book.title, report.issue_date, report.due_date, DATEDIFF(NOW(), report.due_date) AS overdue_by_days,CONCAT(member.first_name, ' ', member.last_name) AS member_name, member.email, member.phone_number FROM book 
    JOIN report ON book.isbn = report.book_isbn 
    JOIN member ON report.username = member.username
    WHERE DATEDIFF(NOW(), report.due_date) > 0 `
    connection.query(sql, (err, result) => {
      if (err) cb(err, null)
      else cb(null, result)
    })
  },

  getOverdueBooks_Member: function (username, connection, cb) {
    const sql = ` 
    SELECT book.title, book.edition, report.issue_date, report.due_date, DATEDIFF(NOW(), report.due_date) AS overdue_by_days FROM book 
    JOIN report ON book.isbn = report.book_isbn 
    JOIN member ON report.username = member.username
    WHERE TIMEDIFF(NOW(), report.due_date) > 0 AND member.username = '${username}'`
    connection.query(sql, (err, result) => {
      if (err) cb(err, null)
      else cb(null, result)
    })
  },

  getBorrowedBooks_Librarian: function (connection, cb) {
    const sql = ` 
    SELECT book.title, report.issue_date, report.due_date, CONCAT(member.first_name, ' ', member.last_name) AS member_name, member.email, member.phone_number FROM book 
    JOIN report ON book.isbn = report.book_isbn 
    JOIN member ON report.username = member.username`
    connection.query(sql, (err, result) => {
      if (err) cb(err, null)
      else cb(null, result)
    })
  },

  getBorrowedBooks_Member: function (username, connection, cb) {
    const sql = ` 
    SELECT book.title, book.edition, date(report.issue_date) AS issue_date, date(report.due_date) AS due_date FROM book 
    JOIN report ON book.isbn = report.book_isbn 
    JOIN member ON report.username = member.username
    WHERE member.username = '${username}'
    `
    connection.query(sql, (err, result) => {
      if (err) cb(err, null)
      else cb(null, result)
    })
  },

  issueBook: function (data, connection, cb) {
    const sql = ` 
    INSERT INTO report(book_isbn, username, due_date)
    VALUES ('${data.isbn}', (SELECT username FROM member WHERE first_name='${data.first_name}' AND last_name='${data.last_name}' AND email = '${data.email}'), '${data.due_date}');`
    connection.query(sql, (err, result) => {
      if (err) cb(err, null)
      else cb(null, result)
    })
  },

  acceptBook: function (data, connection, cb) {
    const sql = ` 
    DELETE FROM report WHERE book_isbn = '${data.isbn}' AND username='${data.username}';`
    connection.query(sql, (err, result) => {
      if (err) cb(err, null)
      else cb(null, result)
    })
  },

  findBooks: function (title, connection, cb) {
    const sql = ` 
    SELECT isbn, title, edition, author, publisher_name, category FROM book 
    JOIN publisher ON book.publisher_id = publisher.publisher_id 
    WHERE title LIKE '%${title}%' 
    `
    connection.query(sql, (err, result) => {
      if (err) cb(err, null)
      else cb(null, result)
    })
  },
}
module.exports = query
