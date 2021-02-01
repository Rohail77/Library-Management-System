const router_memberHome = require('express').Router()
const path = require('path')
const createConnection = require('../../database/connection')
const query = require('../../database/query')

// Get member home page
router_memberHome.get('/home', (req, res) => {
  const member = req.session.member
  // Check if the user is loggedd in.
  if (req.session.loggedin) { 
    res.render('member home', {
      title: 'Home',
      username: member.username,
      script: '/member_home_script.js',
    })
  } else {
    res.status(404).send('You are not logged in.')
  }
})

// Post book title to member home page to fetch books
router_memberHome.post('/home', (req, res) => {
  if (req.session.loggedin) {
    const member = req.session.member
    const connection = createConnection(
      req.hostname,
      member.username,
      member.password
    )
    connection.connect(err => {
      if (err) {
        res.send('Error connecting to database.')
      } else {
        query.findBooks(req.body.title, connection, (err, result) => {
          if (err) {
            res.status(500).send('Error fetching the books from database.')
          } else {
            res.json(result) // here
          }
          connection.end();
        })
      }
    })
  } else {
    res.status(404).send('You are not logged in.')
  }
})

module.exports = router_memberHome
