const router_librarianHome = require('express').Router()
const path = require('path')
const createConnection = require('../../database/connection')
const getConnection = require('../../database/connection')
const query = require('../../database/query')

router_librarianHome.get('/librarian_home', (req, res) => {
  // if (req.session.loggedin) {
    res.render('discover member', {
      layout: 'librarian layout',
      title: 'Librarian Home',
      script: 'librarian_home_script.js',
    })
  // } else {
    // res.status(404).send('You are not logged in.')
  // }
})

router_librarianHome.post('/librarian_home', (req, res) => {
  // if (req.session.loggedin && req.session.isLibrarian) {
    const member = req.session.member
    const connection = createConnection('localhost', 'root', '9mm16Ak44%1312')
    connection.connect(err => {
      if (err) {
        res.send('Error connecting to database.')
      } else {
        query.selectMemberByName(
          req.body.memberName,
          connection,
          (err, result) => {
            if (err) {
              res.status(500).send('Error fetching the members from database.')
            } else {
              res.json(result) // here
            }
            connection.end()
          }
        )
      }
    })
  // } else {
  //   res.status(404).send('You are not logged in.')
  // }
})

module.exports = router_librarianHome
