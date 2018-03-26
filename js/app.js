var latitude,longitude;

var getPosition = function (options) {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
    console.log('get position');
  });
}

getPosition()
  .then((position) => {
    
    latitude = position.coords.latitude;
    longitude=position.coords.longitude;

    var url = "http://api.openweathermap.org/data/2.5/weather?appid=6132cc4e490351bbf1d1a1fc030dd290&lat="+latitude+"&lon="+longitude+"&units=metric";

    fetch(url)
    .then(res => res.json())
    .then((out) => {
        // out.main.pressure out.main.humidity  out.wind.speed  out.wind.deg out.weather.main
        document.getElementById('load').innerHTML = "";
        document.getElementById('temperature').innerHTML = "Temperatura: "+ out.main.temp + " ˚C";
        document.getElementById('pressure').innerHTML = "Pressão: "+ out.main.pressure + " hPa";
        document.getElementById('humidity').innerHTML = "Umidade: "+ out.main.humidity + " %";
        document.getElementById('windspeed').innerHTML = "Velocidade do vento: "+ out.wind.speed + " meter/sec";
        if (typeof out.wind.deg  != undefined) { document.getElementById('winddeg').innerHTML = "Direção do vento: "+ out.wind.deg + " ˚"};
        document.getElementById('condition').innerHTML = "Condição geral: "+ out.weather[0].main;
        var t = out.main.temp;
        var bg = "";

        if ((t > -30) && (t < 0)){
            bg = "#84d4f6";
        } 
        else if ((t>0 ) && (t< 15)){
            bg = "#ffedae";
        }
        else if ((t>15 ) && (t< 25)){
            bg = "#ffd14d";
        } else if ((t>25 ) && (t< 30)){ 
            bg = "#ff8659"; 
        }
        document.body.style.backgroundColor = bg;
        
        url = "http://api.openweathermap.org/data/2.5/uvi?appid=6132cc4e490351bbf1d1a1fc030dd290&lat="+latitude+"&lon="+longitude+"&units=metric";
        

        fetch(url)
        .then(res => res.json())
        .then((out) => {
            var uv = out.value;
            var uvindex;

            if (uv<2.9){
                uvidex = "Baixo";
            }
            else if ((uv>3.0) && (uv<5.9)){
                uvindex = "Moderado";
            }
            else if ((uv>6.0) && (uv<7.9)){
                uvindex = "Alto";
            }
            else if ((uv>6.0) && (uv<7.9)){
                uvindex = "Muito Alto";
            } 
            else {
                uvindex = "Extremo";
            }
            document.getElementById('uvindex').innerHTML = "Radiação infravermelho (<a href='https://en.wikipedia.org/wiki/Ultraviolet_index'>UV Index</a>): " + uvindex ;

        })
        .catch(err => { throw err}); 

        console.log(out);
    })
    .catch(err => { throw err}); 

  })
  .catch((err) => {
    console.error(err.message);
  });
