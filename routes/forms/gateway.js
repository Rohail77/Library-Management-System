const router_gateway = require('express').Router()
const path = require('path')
const mysql = require('mysql')
const createConnection = require('../../database/connection')
const query = require('../../database/query')

router_gateway.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../../', 'public', 'signup.html'))
})

// Sign Up Route
router_gateway.post('/signup', (req, res) => {
  const member = req.body
  const connection = createConnection('localhost', 'root', '9mm16Ak44%1312')
  connection.connect(err => {
    if (err) res.send('Error connecting to database.')
    else {
      query.createUser(member, connection, (err, result) => {
        if (err) {
          throw err;
          res.status(500).send('Cannot add you.')
        } else {
          res.end();
        }
        connection.end()
      })
    }
  })
})

const checkLibrarian = (req, res, next) => {
  const user = req.body
  const connection = createConnection('localhost', 'root', '9mm16Ak44%1312')
  connection.connect(err => {
    if (err) {
      throw err;
    } else {
      query.selectLibrarianByUsername(user, connection, (err, result) => {
        if (err) res.status(500).send('Error occurred.')
        else {
          if(result[0]){
            // Make a session
            req.session.loggedin = true
            req.session.member = user
            req.session.isLibrarian = true
            // Redirect to the home page
            res.redirect('/librarian_home')
          } else {
            next();
          }
        }
        connection.end()
      })
    }
  })
}

// Login Route
router_gateway.post('/login', checkLibrarian, (req, res) => {
  const member = req.body
  const connection = createConnection(
    req.hostname,
    member.username,
    member.password
  )
  connection.connect(err => {
    if (err)
      res.status(404).send('You are not a member! Sign up first to log in.')
    else {
      query.selectMemberByUsername(member, connection, (err, result) => {
        if (err) res.status(500).send('Error occurred.')
        else {
          // Make a session
          req.session.loggedin = true
          req.session.member = member
          // Redirect to the home page
          res.redirect('/home')
        }
        connection.end()
      })
    }
  })
})

router_gateway.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

module.exports = router_gateway
