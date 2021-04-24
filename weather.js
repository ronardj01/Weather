//Parte 1.
//1.2 Consultar el tiempo usando la api Weatherbit.io  con latitude y longitude como parametros.
let apikey = '2d84c821e1ab4563b168e4d981912515';
//URL de los recursos.
let requestUrl = new URL('https://api.weatherbit.io/v2.0/current');
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
  getWeatherByCoords(requestUrl)
}

function success(geolocationPosition) {
  latitude = geolocationPosition.coords.latitude;
  longitude = geolocationPosition.coords.longitude;
  getWeatherByCoords(requestUrl)
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
//loadingH2.style.display = 'none'
let iconCode = result.data[0].weather.icon;
cityName.innerText = result.data[0].city_name;
tempetureImg.src = `https://www.weatherbit.io/static/img/icons/${iconCode}.png`;
mensureTemp.innerText = `${result.data[0].temp} Centigrade`;
weatherDescription.innerText = result.data[0].weather.description; 
}

//1.4 y 1.5 funcion para realizar request.
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
//3.1 Crear array con diferentes ciudades.
const cities =[ 
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

