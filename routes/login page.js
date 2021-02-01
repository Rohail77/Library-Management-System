const router_loginPage = require('express').Router()
const path = require('path');

router_loginPage.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'public', 'index.html'))
})

module.exports = router_loginPage
