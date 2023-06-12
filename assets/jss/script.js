
const searchButton = document.querySelector('button');
const searchBox = document.getElementById('searchBox');
const currentForecastBox = document.getElementById('currentForecast');
const fiveDayForecastBox = document.getElementById('fiveDayForecast');
const forecastTitle = document.getElementById('forecastTitle');
const searchHistory = document.getElementById('searchHistory');

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
  forecastTitle.style.display = "block";
  //data.list[2] is where the next day's forecast starts. every 8 indexes is where the next date is
  for (x = 2; x < 35; x+= 8) {
    fiveDayForecastBox.innerHTML +=
     `<div class = "forecastTile">
     <h4>(${(data.list[x].dt_txt).split(" ")[0]})</h4>
     <i class = "${getWeatherIcon(data.list[x].weather[0].icon)}"></i>
     <p> 
    Temp: ${data.list[x].main.temp}
    Wind: ${data.list[x].wind.speed} MPH
    Humidity: ${data.list[x].main.humidity}
    </p>
     </div>`;
  }

}
function renderSearchBar(){

}
function renderSearchHistory(){
  //get search history from local storage
  let currentData = localStorage.getItem("history");
  if(currentData){
    let dataArray = currentData.split("-");
    dataArray.forEach(x => {
      searchHistory.innerHTML + `<p>${x}</p>`
    });
  
  }
 
}
function addToSearchHistory(){
    //
  localStorage.setItem("history", searchBox.value + "-");
}

searchButton.addEventListener('click', async function () {
  const data = await getWeatherData(searchBox.value);
  if (data != '') {
    renderWeatherData(data);
    addToSearchHistory();
  }
});

//on startup get search history
getSearchHistory();

