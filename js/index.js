//Get & Display current time
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

//Updating daily weather using Shecodes weather API
function displayForecast(response){
    
    let forecast = getForecast()
    let forecastElement = document.querySelector('#forecast');

    let forecastHtml = `<div class="row">`
    let days = ['Thu','Fri','Sat','Sun','Mon','Tue','Wed']
    days.forEach(function(day){

         forecastHtml = forecastHtml + `
      
                    <div class="col-2">
                        <div class="weather-forecast-date">
                         ${day}
                        </div>
                       <img src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png" alt="" width="36">
                       <div class="weather-forecast-temp">
                          <span class="weather-forecast-temp-max">
                            18°
                          </span>
                          <span class="weather-forecast-temp-min">
                            12°
                          </span>
                        </div>
                    </div> 
     `;

    })
   
    
    forecastElement.innerHTML = forecastHtml

    
}

//Calling another API
function getForecast(coordinates){
    let city = 'New york'
    let apiKey = '244a93ab1a7fc45d4c80b97bta5af4bo';
    let apiUrl = fetch(`https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`)
    .then(res => res.json())
    .then(data => console.log(data))
    axios.get(apiUrl).then(displayForecast)


   
    
}

//Change the innerHtml to the respective weather details in the weather API
function displayTemperature(response){
    let dateElement =  document.querySelector('#time');
    let iconElement = document.querySelector('#icon');
    let tempElement = document.querySelector('#temp');

    

    dateElement.innerHTML = formatDate(response.data.dt * 1000); //converts timestamp into milliseconds
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description); 
    tempElement.innerHTML = Math.round(response.data.main.temp);


    celsiusTemp = response.data.main.temp


    document.querySelector('#description').innerHTML = response.data.weather[0].description;
    document.querySelector('#humidity').innerHTML= 'humidity: '+response.data.main.humidity + '%';
    document.querySelector('#wind').innerHTML= 'wind: ' +response.data.wind.speed +'km/h';
    document.querySelector('#precipitation').innerHTML = ' ';
   

    getForecast(response.data.coord);


    console.log(response.data)
}

//call weather API
function search(city){
    let apiKey = '08b30899ed0fccd0945fbcd0779a8eac';
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    
  axios.get(apiUrl).then(displayTemperature);

}



//change the inner HTML of h1 into the input value
function handleSubmit(event){
    event.preventDefault();
    cityInputElement = document.querySelector('#city-input');
    search(cityInputElement.value);
    document.querySelector('h1').innerHTML = cityInputElement.value;
}

//Displays Fahrenheit temperature
function diaplayFahrenheitTemp(event){
    event.preventDefault();
    let tempElement = document.querySelector('#temp');

    celsiusLink.classList.remove("active")
    fahrenheitLink.classList.add('active')

    let fahrenheitTemp = (celsiusTemp  * 9) / 5 + 32;
    tempElement.innerHTML = Math.round(fahrenheitTemp);
    
}

//Dispays Celcius temperature
function displayCelsiusTemp(event){
    event.preventDefault();
    celsiusLink.classList.add("active")
     fahrenheitLink.classList.remove('active')

    let tempElement = document.querySelector('#temp');
    tempElement.innerHTML = Math.round(celsiusTemp);
}
 
let celsiusTemp = null;

displayForecast()

let form = document.querySelector('#search-form');
form.addEventListener('submit', handleSubmit);

let fahrenheitLink = document.querySelector('#fahrenheit-link');
fahrenheitLink.addEventListener('click', diaplayFahrenheitTemp);

let celsiusLink = document.querySelector('#celsius-link');
celsiusLink.addEventListener('click', displayCelsiusTemp);

search('London');