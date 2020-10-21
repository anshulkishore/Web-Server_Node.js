const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')

console.log(__dirname)

const app = express()
const port = process.env.PORT || 3000 //port for Heroku

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Anshul'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Anshul'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'For any help, please send an email at anshulkishore310@gmail.com',
        title: 'Help',
        name: 'Anshul'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }
    
        forcast(latitude, longitude, (error, weatherDescription, temperature, feelslike, humidity, precip, localtime, timezone_id, is_day) => {
            if (error) {
                return res.send({ error })
            }

            const time = (localtime.split(" "))[1]
            res.send({
                forcast: weatherDescription,
                location,
                address: req.query.address,
                localtime,
                time,
                temperature,
                feelslike,
                humidity,
                precip,
                timezone_id,
                is_day
            })
        })
    })
})

// app.get('/products', (req, res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: 'You must provide a search term'
//         })
//     }
//     console.log(req.query.search)
//     res.send({
//         products: []
//     })
// })

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Anshul',
        errorMessage: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Anshul',
        errorMessage: 'Page not found!'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})