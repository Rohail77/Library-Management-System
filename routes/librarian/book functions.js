const router_bookFunctions = require('express').Router()
const path = require('path')
const createConnection = require('../../database/connection')
const query = require('../../database/query')

router_bookFunctions.get('/add_book', (req, res) => {
  // if (req.session.loggedin && req.session.isLibrarian) {
    res.render('add book', {
      layout: 'librarian layout',
      title: 'Add Book',
      script: 'librarian_add_book_script.js',
    })
  // } else {
    // res.status(404).send('You are not logged in.')
  // }
})

router_bookFunctions.post('/add_book', (req, res) => {
  // if (req.session.loggedin && req.session.isLibrarian) {
    const member = req.session.member
    const book = req.body
    const connection = createConnection('localhost', 'root', '9mm16Ak44%1312')
    connection.connect(err => {
      if (err) {
        res.send('Error connecting to database.')
      } else {
        query.addBook(book, connection, (err, result) => {
          if (err) {
            res.status(500).send('Error adding the book.')
          } else {
            res.end()
          }
          connection.end()
        })
      }
    })
  // } else {
    // res.status(404).send('You are not logged in.')
  // }
})

router_bookFunctions.get('/edit_book', (req, res) => {
  // if (req.session.loggedin && req.session.isLibrarian) {
    res.render('edit book', {
      layout: 'librarian layout',
      title: 'Edit Book',
    })
  // } else {
    // res.status(404).send('You are not logged in.')
  // }
})

router_bookFunctions.get('/issue_book', (req, res) => {
  // if (req.session.loggedin && req.session.isLibrarian) {
    res.render('issue book', {
      layout: 'librarian layout',
      title: 'Issue Book',
      script: 'librarian_issue_book_script.js',
    })
  // } else {
    // res.status(404).send('You are not logged in.')
  // }
})

router_bookFunctions.post('/issue_book', (req, res) => {
  // if (req.session.loggedin && req.session.isLibrarian) {
    const member = req.session.member
    const data = req.body
    const connection = createConnection('localhost', 'root', '9mm16Ak44%1312')
    connection.connect(err => {
      if (err) {
        res.send('Error connecting to database.')
      } else {
        query.issueBook(data, connection, (err, result) => {
          if (err) {
            res.status(500).send('Error issuing the book.')
          } else {
            res.end()
          }
          connection.end()
        })
      }
    })
  // } else {
    // res.status(404).send('You are not logged in.')
  // }
})

router_bookFunctions.get('/remove_book', (req, res) => {
  // if (req.session.loggedin && req.session.isLibrarian) {
    res.render('remove book', {
      layout: 'librarian layout',
      title: 'Remove Book',
      script: 'librarian_remove_book_script.js',
    })
  // } else {
    // res.status(404).send('You are not logged in.')
  // }
})

router_bookFunctions.post('/remove_book', (req, res) => {
  // if (req.session.loggedin && req.session.isLibrarian) {
    const member = req.session.member
    const connection = createConnection('localhost', 'root', '9mm16Ak44%1312')
    connection.connect(err => {
      if (err) {
        res.send('Error connecting to database.')
      } else {
        query.removeBook(req.body.isbn, connection, (err, result) => {
          if (err) {
            res.status(500).send('Error removing the book.')
          } else {
            res.end()
          }
          connection.end()
        })
      }
    })
  // } else {
    // res.status(404).send('You are not logged in.')
  // }
})

router_bookFunctions.get('/book_returned', (req, res) => {
  // if (req.session.loggedin && req.session.isLibrarian) {
    res.render('book returned', {
      layout: 'librarian layout',
      title: 'Book Returned',
      script: 'librarian_book_returned_script.js',
    })
  // } else {
    // res.status(404).send('You are not logged in.')
  // }
})

router_bookFunctions.post('/book_returned', (req, res) => {
  // if (req.session.loggedin && req.session.isLibrarian) {
    const member = req.session.member
    const connection = createConnection('localhost', 'root', '9mm16Ak44%1312')
    connection.connect(err => {
      if (err) {
        res.send('Error connecting to database.')
      } else {
        query.acceptBook(req.body, connection, (err, result) => {
          if (err) {
            res.status(500).send('Error accepting the book.')
          } else {
            res.end()
          }
          connection.end()
        })
      }
    })
  // } else {
    // res.status(404).send('You are not logged in.')
  // }
})

router_bookFunctions.get('/librarian_books_borrowed', (req, res) => {
  // if (req.session.loggedin && req.session.isLibrarian) {
    const member = req.session.member
    const connection = createConnection('localhost', 'root', '9mm16Ak44%1312')
    connection.connect(err => {
      if (err) {
        res.send('Error connecting to database.')
      } else {
        query.getBorrowedBooks_Librarian(connection, (err, result) => {
          if (err) {
            res.status(500).send('Error getting the books.')
          } else {
            res.render('librarian_books borrowed', {
              layout: 'librarian layout',
              title: 'Books Held',
              result,
            })
          }
          connection.end()
        })
      }
    })
  // } else {
  //   res.status(404).send('You are not logged in.')
  // }
})

router_bookFunctions.get('/librarian_books_held', (req, res) => {
  // if (req.session.loggedin && req.session.isLibrarian) {
    const member = req.session.member
    const connection = createConnection('localhost', 'root', '9mm16Ak44%1312')
    connection.connect(err => {
      if (err) {
        res.send('Error connecting to database.')
      } else {
        query.getHeldBooks_Librarian(connection, (err, result) => {
          if (err) {
            res.status(500).send('Error getting the books.')
          } else {
            res.render('librarian_books held', {
              layout: 'librarian layout',
              title: 'Books Held',
              result,
            })
          }
          connection.end()
        })
      }
    })
  // } else {
  //   res.status(404).send('You are not logged in.')
  // }
})

router_bookFunctions.get('/librarian_books_overdue', (req, res) => {
  // if (req.session.loggedin && req.session.isLibrarian) {
    const member = req.session.member
    const connection = createConnection('localhost', 'root', '9mm16Ak44%1312')
    connection.connect(err => {
      if (err) {
        res.send('Error connecting to database.')
      } else {
        query.getOverdueBooks_Librarian(connection, (err, result) => {
          if (err) {
            res.status(500).send('Error getting the books.')
          } else {
            console.log(result[0])
            res.render('librarian_books overdue', {
              layout: 'librarian layout',
              title: 'Books Held',
              result,
            })
          }
          connection.end()
        })
      }
    })
  // } else {
  //   res.status(404).send('You are not logged in.')
  // }
})

module.exports = router_bookFunctions
