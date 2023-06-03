
const searchButton = document.querySelector('button');
const searchBox = document.getElementById('searchBox');
const currentForecastBox = document.getElementById('currentForecast');
const fiveDayForecastBox = document.getElementById('fiveDayForecast');

async function getWeatherData(searchRequest) {
  let apiKey = "3c7baa62a4ecfa83ed87560be3d550f3";
  let weatherData = `https://api.openweathermap.org/data/2.5/forecast?q=${searchRequest}&appid=${apiKey}`
  try {
    const response = await fetch(weatherData);
    const data = await response.json();
    console.log("response: ", data);
    if (data.cod != '404') {
      return data;
    } else {
      console.log("No city found.");
      return '';
    }
  }
  catch (error) {
    console.log(error);
    return '';
  }
}

function getWeatherIcon(id) {
  console.log(id);
  switch (id) {
    case '01d':
      return 'wi wi-day-sunny';
    case '01n':
      return 'wi wi-night-clear';
    case '02d':
      return 'wi wi-day-cloudy';
    case '02n':
      return 'wi wi-night-cloudy';
    default:
      //if no match found
      return 'wi wi-day-cloudy';
  }
}

function renderWeatherData(data) {
  //get current hour
  let day = parseInt(dayjs().format("H"));
  console.log(day);
  //display current forecast
  console.log("added to html");
  //set an icon based on forecast
  currentForecastBox.innerHTML += `<div>
    <h2>${searchBox.value} (${dayjs().format("M/D/YYYY")}) <i class = "${getWeatherIcon(data.list[2].weather[0].icon)}"></i></h2>
    <p> 
    Temp: ${data.list[0].main.temp}
    Wind: ${data.list[0].wind.speed} MPH
    Humidity: ${data.list[0].main.humidity}
    </p>
    </div>`;



  //display 5 day forecast
  for (x = 0; x < 5; x++) {

  }

}


searchButton.addEventListener('click', async function () {
  const data = await getWeatherData(searchBox.value);
  if (data != '') {
    renderWeatherData(data);
  }
});

