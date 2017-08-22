var tempC;
var tempF;
var unit = 'c'; // 'c' or 'f'

$(window).ready(function () {

  // Get user position
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      getWeather(lat, lon);
    });
  }

  function getWeather(lat, lon) {
    // Get weather from api
    $.ajax({
      type: 'GET',
      url: 'https://fcc-weather-api.glitch.me/api/current?lat=' + lat + '&lon=' + lon,
    })

    .done(function (data) {
      // Set HTML
      $('#position').text(data.name + ', ' + data.sys.country);
      tempC = data.main.temp;
      tempF = tempC * 1.8 + 32;
      $('#temp').text(Math.floor(tempC) + ' °C');
      $('#weather').text(data.weather[0].main);

      // Generate icon and background
      var icon;
      var background;
      switch (data.weather[0].main.toLowerCase()) {
        case 'clouds':
          icon = 'fa-cloud';
          background = 'pictures/cloud.jpg';
          break;
        case 'rain':
          icon = 'fa-tint';
          background = 'pictures/rain.jpg';
          break;
        case 'snow':
          icon = 'fa-snowflake-o';
          background = 'pictures/snow.jpg';
          break;
        case 'clear':
          icon = 'fa-sun-o';
          background = 'pictures/sun.jpg';
          break;
        default:
          icon = 'fa-thermometer-full';
          background = 'pictures/medium.jpg';
      }
      $('#weather-icon').addClass(icon);
      $('body').css('background', 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("' + background +  '")');

    });
  }

  $('#temp').click(function () {
    if (unit == 'c') {
      $('#temp').text(Math.floor(tempF) + ' °F');
      unit = 'f';
    } else {
      $('#temp').text(Math.floor(tempC) + ' °C');
      unit = 'c';
    }
  });

});
