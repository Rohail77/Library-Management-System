const router_memberFunctions = require('express').Router()
const path = require('path')
const createConnection = require('../../database/connection')
const query = require('../../database/query')

router_memberFunctions.get('/books_borrowed', (req, res) => {
  if (req.session.loggedin) {
    const member = req.session.member
    const connection = createConnection(
      req.hostname,
      member.username,
      member.password
    )
    connection.connect(err => {
      if (err) {
        res.status(404).send('Error connecting to database.')
      } else {
        query.getBorrowedBooks_Member(
          member.username,
          connection,
          (err, result) => {
            if (err) {
              res.status(500).send('Error fetching the books from database.')
            } else {
              // hold_date has format: 2020-12-21T19:00:00.000Z, so get date out using following:
              result.forEach(data => {
                const issue_date = new Date(data.issue_date)
                const due_date = new Date(data.due_date)
                data.issue_date = issue_date.toLocaleDateString()
                data.due_date = due_date.toLocaleDateString()
                console.log(data)
              })
              res.render('books borrowed', {
                title: 'Books Borrowed',
                books: result,
              })
            }
            connection.end()
          }
        )
      }
    })
  } else {
    res.status(404).send('You are not logged in.')
  }
})

router_memberFunctions.get('/books_held', (req, res) => {
  if (req.session.loggedin) {
    const member = req.session.member
    const connection = createConnection(
      req.hostname,
      member.username,
      member.password
    )
    connection.connect(err => {
      if (err) {
        res.status(404).send('Error connecting to database.')
      } else {
        query.getHeldBooks_Member(
          member.username,
          connection,
          (err, result) => {
            if (err) {
              res.status(500).send('Error fetching the books from database.')
            } else {
              // hold_date has format: 2020-12-21T19:00:00.000Z, so get date out using following:
              result.forEach(data => {
                const date = new Date(data.hold_date)
                data.hold_date = date.toLocaleDateString()
              })
              res.render('books held', {
                title: 'Books Held',
                books: result,
                script: 'member_held_books_script.js',
              })
            }
            connection.end()
          }
        )
      }
    })
  } else {
    res.status(404).send('You are not logged in.')
  }
})

router_memberFunctions.post('/books_held', (req, res) => {
  if (req.session.loggedin) {
    const member = req.session.member
    const connection = createConnection(
      req.hostname,
      member.username,
      member.password
    )
    connection.connect(err => {
      if (err) {
        res.status(404).send('Error connecting to database.')
      } else {
        query.removeHeldBook(
          { username: member.username, isbn: req.body.isbn },
          connection,
          (err, result) => {
            if (err) {
              res.status(500).send('Error removing the books from database.')
            } else {
              res.end()
            }
            connection.end()
          }
        )
      }
    })
  } else {
    res.status(404).send('You are not logged in.')
  }
})

router_memberFunctions.get('/books_overdue', (req, res) => {
  if (req.session.loggedin) {
    const member = req.session.member
    const connection = createConnection(
      req.hostname,
      member.username,
      member.password
    )
    connection.connect(err => {
      if (err) {
        res.status(404).send('Error connecting to database.')
      } else {
        query.getOverdueBooks_Member(
          member.username,
          connection,
          (err, result) => {
            if (err) {
              res.status(500).send('Error fetching the books from database.')
            } else {
              // hold_date has format: 2020-12-21T19:00:00.000Z, so get date out using following:
              result.forEach(book => {
                let moment = new Date(book.issue_date)
                let date = moment.toLocaleDateString()
                let time = `${moment.getHours()}:${moment.getMinutes()}:${moment.getSeconds()}`
                moment = `${date} ${time}`
                book.issue_date = moment

                moment = new Date(book.due_date)
                date = moment.toLocaleDateString()
                time = `${moment.getHours()}:${moment.getMinutes()}:${moment.getSeconds()}`
                moment = `${date} ${time}`
                book.due_date = moment
              })
              res.render('books overdue', {
                title: 'Books Overdue',
                books: result,
              })
            }
            connection.end()
          }
        )
      }
    })
  } else {
    res.status(404).send('You are not logged in.')
  }
})

module.exports = router_memberFunctions
