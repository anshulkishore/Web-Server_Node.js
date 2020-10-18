const request = require('postman-request')

const forcast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=166e3027b4d07ae8a47207559cb6c2cc&query=' 
                            + latitude + ',' + longitude + '&units=m'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service !', undefined)
        } else if (body.error) {
            callback('Unable to find location !', undefined)
        } else {
            console.log(body)
            callback(undefined, body.current.weather_descriptions[0]
                    , body.current.temperature
                    , body.current.feelslike
                    , body.current.humidity + "%"
                    , body.current.precip + "%"
                    , body.location.localtime
                    , body.location.timezone_id
                    , body.current.is_day)    
        }
    })
}

module.exports = forcast