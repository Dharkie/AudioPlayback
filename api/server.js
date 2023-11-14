const express = require('express')
const app = express()
const port = 6001

app.get('/api', (req, res) => {
  res.send('Hello World!!iii')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})