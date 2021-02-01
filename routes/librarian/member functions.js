const router_memberFunctions = require('express').Router()
const path = require('path')
const createConnection = require('../../database/connection')
const query = require('../../database/query')

router_memberFunctions.get('/add_member', (req, res) => {
  // if (req.session.loggedin && req.session.isLibrarian) {
    res.render('add member', {
      layout: 'librarian layout',
      title: 'Add Member',
    })
  // } else {
  //   res.status(404).send('You are not logged in.')
  // }
})

router_memberFunctions.get('/remove_member', (req, res) => {
  // if (req.session.loggedin && req.session.isLibrarian) {
    res.render('remove member', {
      layout: 'librarian layout',
      title: 'Remove Member',
      script: 'librarian_remove_member_script.js',
    })
  // } else {
  //   res.status(404).send('You are not logged in.')
  // }
})

router_memberFunctions.post('/remove_member', (req, res) => {
  // if (req.session.loggedin && req.session.isLibrarian) {
    const member = req.body
    const connection = createConnection('localhost', 'root', '9mm16Ak44%1312')
    console.log('reached remove_member')
    connection.connect(err => {
      if (err) {
        res.send('Error connecting to database.')
      } else {
        query.removeMember(member, connection, (err, result) => {
          if (err) {
            res.status(500).send('Error removing the members from database.')
          } else {
            res.end()
          }
          connection.end()
        })
      }
    })
  // } else {
  //   res.status(404).send('You are not logged in.')
  // }
})

module.exports = router_memberFunctions
