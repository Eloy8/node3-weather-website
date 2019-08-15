const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for Express config
const app = express()
const port = process.env.PORT || 3000

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Eloy'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Eloy'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Eloy',
    message: 'ERROR: The magic smoke escaped!'
  })
})

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'You must provide a address'
    })
  }
  // res.send({
  //   forecast: 'It is snowing',
  //   location: 'Philadelphia',
  //   address: req.query.address
  // })
  geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
    if (error) {
      return res.send({error})
    }
    forecast(latitude, longitude, (error, forecast) => {
      if (error) {
        return console.log(error)
      }
      res.send({
        forecast,
        location,
        address: req.query.address
      })
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help article not found!',
    error: 'Article not found',
    name: 'Not me!'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: 'My 404 page',
    error: 'Page not found',
    name: 'Not me!'
  })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})
