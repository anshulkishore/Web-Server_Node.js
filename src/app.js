const path = require('path')
const express = require('express')

console.log(__dirname)

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')

app.set('view engine', 'hbs')
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
        helpText: 'This is an example help message'
    })
})

app.get('/weather', (req, res) => {
    res.send({
        forcast: 'Cloudy',
        location: 'Noida'
    })
})

//app.com
//app.com/help
//app.com/about

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})