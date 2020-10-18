console.log('Client side javascript file is loaded!')

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const pLocation = document.querySelector('#pLocation')
const pTime = document.querySelector('#pTime')
const pTemperature = document.querySelector('#pTemperature')
const pForcast = document.querySelector('#pForcast')
const pPrecip = document.querySelector('#pPrecip')
const pHumidity = document.querySelector('#pHumidity')
const weatherContent = document.querySelector('#weatherContent')
const locationContent = document.querySelector('#locationContent')
const weatherIcon = document.querySelector('#weatherIcon')
const img = document.createElement("IMG");

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    pLocation.textContent = 'Loading...'
    pForcast.textContent = ''
    pTime.textContent = ''
    pTemperature.textContent = ''
    pPrecip.textContent = ''
    pHumidity.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                pLocation.textContent = data.location
                pTime.textContent = data.time
                pTemperature.textContent = data.temperature + '\u00B0'
                pForcast.textContent = data.forcast
                pPrecip.textContent = data.precip + ' precipitation'
                pHumidity.textContent = data.humidity + ' humidity'
                setDecoration(data)
                locationContent.style.fontWeight = "bold"
            }
        })
    })
})

const setDecoration = (data) => {
    
    if (data.is_day == 'yes') {    
        document.body.style.background = "linear-gradient(to bottom, #FDC76F, #FFDA9E, #ffffff)"
        weatherContent.style.background = "#D18201"
        pTemperature.style.color = "#056AB6"
        if (data.forcast.includes("cloud")) {
            img.src = "/img/sunny_cloudy.png";
        } else if (data.forcast.includes("rain")) {
            img.src = "/img/sunny_rainy.png";
        } else if (data.forcast.includes("snow")) {
            img.src = "/img/snowy.png";
        } else if (data.forcast.includes("fog")) {
            img.src = "/img/foggy.png";
        } else {
            img.src = "/img/sunny.png";
        }
    } else {
        document.body.style.background = "linear-gradient(to bottom, #78C9FF, #CAEAFF, #ffffff)"
        weatherContent.style.background = "#045A93"
        pTemperature.style.color = "#EB9407"
        if (data.forcast.includes("cloud")) {
            img.src = "/img/night_cloudy.png";
        } else if (data.forcast.includes("rain")) {
            img.src = "/img/night_rainy.png";
        } else if (data.forcast.includes("snow")) {
            img.src = "/img/snowy.png";
        } else if (data.forcast.includes("fog")) {
            img.src = "/img/foggy.png";
        } else {
            img.src = "/img/night.png";
        }
    }
    
    
    document.getElementById('weatherIcon').appendChild(img);
    // document.getElementById('weatherIcon').style.backgroundImage = "url(/img/sunny.png)"
    document.body.style.color = '#ffffff'
    
}