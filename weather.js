//Parte 1.
//1.2 Consultar el tiempo usando la api Weatherbit.io  con latitude y longitude como parametros.
let apikey = '2d84c821e1ab4563b168e4d981912515';
//URL de los recursos.
let requestUrlCoords = new URL('https://api.weatherbit.io/v2.0/current');
//Coordenadas de Barcelona
let latitude = 41.390205;
let longitude = 2.154007;

//Esconder el contenedor del clima.
let divWeather = document.getElementById('weather');
divWeather.style.display = 'none';

//Verificar si el navegador soporta geolocalización.
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success, error);
} else {
  //En caso de no usar geolocalizacion usar coordenadas de Barcelona.
  getWeatherByCoords(requestUrlCoords);
}

function success(geolocationPosition) {
  latitude = geolocationPosition.coords.latitude;
  longitude = geolocationPosition.coords.longitude;
  getWeatherByCoords(requestUrlCoords);
}

//En caso de que ocurra algo con el geolocalizador.
function error(err) {
  alert(err.message)
}
//1.3 Manipular el DOM
function render(result) {
  //Crear varialbes
  let loadingH2 = document.getElementById('loadingH2')
  let cityName = document.getElementById('cityName');
  let tempetureImg = document.getElementById('tempetureImg');
  let mensureTemp = document.getElementById('mensureTemp');
  let weatherDescription = document.getElementById('weatherDescription');

  //Renderizar las variables
  divWeather.style.display = 'flex';
  loadingH2.style.display = 'none'
  let iconCode = result.data[0].weather.icon;
  cityName.innerText = result.data[0].city_name;
  tempetureImg.src = `https://www.weatherbit.io/static/img/icons/${iconCode}.png`;
  mensureTemp.innerText = `${result.data[0].temp} Centigrade`;
  weatherDescription.innerText = result.data[0].weather.description;

  //Parte 4.
  //Agregar mapa.
  document.querySelectorAll(`#map`).forEach(element => element.remove())// Eliminar renderizados anteriores.
  let divMap = document.createElement('div'); // crear contenedor del mapa segun documentacion.
  divMap.id = 'map'
  document.body.appendChild(divMap);
  //Estrutura basica mapa segun documentacion api mapbox.
  mapboxgl.accessToken = 'pk.eyJ1Ijoicm9uYXJkajAxIiwiYSI6ImNrbnlnYzh3ODA2bGgyeHJqbmFjdmY5bWwifQ.0ANXFEkI9Ska2GuRNNrqaQ';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [result.data[0].lon, result.data[0].lat],
    zoom: 6
  });

  //Crear un marcador en el mapa con la api de mapbox.
  var marker1 = new mapboxgl.Marker()
    .setLngLat([result.data[0].lon, result.data[0].lat])
    .addTo(map);
}

//1.4 y 1.5 funcion para realizar request por coordenadas.
function getWeatherByCoords(url) {
  url.searchParams.set("lat", latitude);
  url.searchParams.set("lon", longitude);
  url.searchParams.set('key', apikey)

  fetch(url)
    .then(response => response.json())
    .then(result => {
      render(result)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

//Parte 3
/* //3.1 Crear array con diferentes ciudades. Realmente se utilizara la api este paso es solo para probar.
const cities = [
  {
    name: 'Madrid',
    latitude: 40.41,
    longitude: -3.70,
  },

  {
    name: 'Valencia',
    latitude: 39.466667,
    longitude: -0.375000,
  },

  {
    name: 'Zaragoza',
    latitude: 41.649693,
    longitude: -3.70,
  },

  {
    name: 'Palma de Mallorca',
    latitude: 39.571625,
    longitude: 2.650544,
  }
]

//3.2 Crear input para selecionar ciudades del array. 

//Variables para manipular el DOM.
let citiesList = document.getElementById('citiesList');

//Buscar en la lista.
let inputCities = document.getElementById('inputCities');
inputCities.addEventListener('keyup', (evento) => {
  document.querySelectorAll(`#citiesList li`).forEach(li => li.remove()); //Filtrar segun incremente el numero de los digitos.
  const search = evento.target.value.toLowerCase();   //Buscar en minuscula para evitar el caseSensitive.

  createCitySearchingFromArray (cities, search);
})

//
function createCitySearchingFromArray (arr, searchValue) {
  arr.forEach((city, index) => {
    if (city.name.toLowerCase().indexOf(searchValue) != -1 && searchValue.length > 0) { //Buscar en minusculas
      let li = document.createElement('li');
      li.id = `searchCity${index}`;
      li.innerText = city.name;
      citiesList.appendChild(li);
    } else {
      document.querySelectorAll(`#inputCities li`).forEach(li => li.remove());
    }
  })
} */

//3.3 Consultar el tiempo usando el nombre de la ciudad como parametros en el input.
//URL de los recursos.
let requestUrlCity = new URL('https://api.weatherbit.io/v2.0/current');
//Variables del input.
let inputCities = document.getElementById('inputCities');
let inputBnt = document.getElementById('inputBnt');

//Valores de las ciudad y el pais.
//let serachOptionArr = inputCities.value.split(',') 
let city = "";
let country = "";

//Funcionalidad del inputBnt.
inputBnt.addEventListener('click', () => {
  let serachOptionArr = inputCities.value.split(',');
  city = serachOptionArr[0].trim();
  country = serachOptionArr[1].trim();
  getWeatherByCity(requestUrlCity)
});

//funcion para realizar request por ciudad.
function getWeatherByCity(url) {
  url.searchParams.set("city", city);
  url.searchParams.set("country", country);
  url.searchParams.set('key', apikey)

  fetch(url)
    .then(response => response.json())
    .then(result => {
      render(result)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}


