const express = require('express')
const morgan = require('morgan')

const app = express()

const apps = require('./app-data.js')

app.use(morgan('dev'))

app.get('/apps', (req, res) => {
  const { genres = "", sort } = req.query

  if (sort) {
    if (!['Rating', 'App'].includes(sort))
    return res
      .status(400)
      .send('Sort must be one of rating or app')
  }

  let results = apps
    .filter(googleApp => 
        googleApp
          .Genres
          .toLowerCase()
          .includes(genres.toLowerCase()))

  if (sort) {
    results.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0
    })
  }

  res
    .json(results)
})

app.listen(9000, () => {
  console.log('Server started on PORT 9000')
})