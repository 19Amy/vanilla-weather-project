function formatDate(timestamp){
    //catculate the date 
    let date = new Date (timestamp);
    let hours = date.getHours()
    if (hours < 10){
        hours = `0${hours}`
    }
    let minutes = date.getMinutes()
    if (minutes < 10){
        minutes = `0${minutes}`
    }
    let days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
    let day = days[date.getDay()]
    return `${day}: ${hours}:${minutes}`;
}



function displayTemperature(response){
    let dateElement =  document.querySelector('#time')
    let iconElement = document.querySelector('#icon')
    iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}10d@2x.png`) 
    iconElement.setAttribute("alt", response.data.weather[0].description); 
    document.querySelector('#temp').innerHTML = Math.round(response.data.main.temp);
    document.querySelector('#description').innerHTML = response.data.weather[0].description;
    document.querySelector('#humidity').innerHTML= 'humidity: '+response.data.main.humidity + '%';
    document.querySelector('#wind').innerHTML= 'wind: ' +response.data.wind.speed +'km/h';
    document.querySelector('#precipitation').innerHTML = 'Precipitation:';
    dateElement.innerHTML = formatDate(response.data.dt * 1000); //converts timestamp into milliseconds
    console.log(response.data)
}







let city = 'New York';
let apiKey = '08b30899ed0fccd0945fbcd0779a8eac';
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
   
axios.get(apiUrl).then(displayTemperature);

