function displayDate(){

   
   
   let now = new Date()

   let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
   let day = days[now.getDay()]
   let hour = now.getHours()
   let min  = now.getMinutes()

   document.querySelector('#date').innerHTML =`${day}`
   document.querySelector('#hour').innerHTML =`${hour}:${min}`



}
displayDate()



function displayTemperature(response){
    console.log(response.data.main.temp)
    document.querySelector('#temp').innerHTML = Math.round(response.data.main.temp)
    document.querySelector('#description').innerHTML = response.data.weather[0].description
    document.querySelector('#humidity').innerHTML= 'humidity: '+response.data.main.humidity + '%'
    document.querySelector('#wind').innerHTML= 'wind: ' +response.data.wind.speed +'km/h'
    document.querySelector('#precipitation').innerHTML = 'Precipitation:'
    console.log(response.data)
}






function displayDate(){
   let city = 'New York'
   let apiKey = '08b30899ed0fccd0945fbcd0779a8eac';
   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
   axios.get(apiUrl).then(displayTemperature)
}

