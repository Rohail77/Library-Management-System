const router_memberForms = require('express').Router()
const createConnection = require('../../../database/connection')
const query = require('../../../database/query')

router_memberForms.post('/place_hold', (req, res) => {
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
        query.placeHold(
          { isbn: req.body.isbn, username: member.username },
          connection,
          (err, result) => {
            if (err) {
              res
                .status(500)
                .send('Error while performing the query in database.')
            } else {
              res.json(result) // here
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

module.exports = router_memberForms
