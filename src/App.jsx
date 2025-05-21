import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState, useEffect } from 'react';
import './App.css'
import 'leaflet/dist/leaflet.css';
import { useMap } from 'react-leaflet';


function RecenterMap({ lat, lon }) {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lon]);
  }, [lat, lon, map]);

  return null;
}



function Heading() {

  const [city, setCity] = useState("");
  const [actualcity, setActualCity] = useState("london");
  const [weatherdata, setWeatherdata] = useState(null);
  const [info, setinfo] = useState(false);




  const handlesearch = () => {
    if (city.trim() !== "") {
      setActualCity(city.trim().toLowerCase());
    };

    setCity("");
  };





  const API_KEY = "cc96991c65d52b2632585e7ffb3fb345";





  useEffect(() => {
    console.log(actualcity);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${actualcity}&appid=${API_KEY}&units=metric`;



    fetch(url)
      .then((res) => res.json())
      .then((data) => {setWeatherdata(data); setinfo(true)})
      .catch((err) => console.error("API error:", err));

   
  }

    , [actualcity]);


    
  return (
    <div className='container'>
     
        <h2>Weather in your City</h2>
      <div className='header' >
        <input defaultValue={""} value={city} placeholder='Enter a city to search for weather condition in it' onChange={(e) => setCity(e.target.value)} />
        <button onClick={handlesearch}>Search</button>
      </div> 

      { info? (
        <div className='result' >
          <div className='coolstuff'>City:{weatherdata.name} in {weatherdata.sys.country}</div>
          <div className='coolstuff'>temperature: {weatherdata.main.temp}°C</div>
          <div className='coolstuff'>wind speed: {weatherdata.wind.speed}Km/h</div>
          <div className='coolstuff'><img src={`http://openweathermap.org/img/wn/${weatherdata.weather[0].icon}@2x.png`} alt={weatherdata.weather[0].description} style={{width : "50px",height:"50px"}} />
          condition : {weatherdata.weather[0].main}</div>
          <div className='coolstuff'>description : {weatherdata.weather[0].description}</div>
          <div className='coolstuff'>💧Humidity: {weatherdata.main.humidity}%</div>
        
          <div style={{borderRadius:"10px"}}>
            <MapContainer center={[weatherdata.coord.lat, weatherdata.coord.lon]} zoom={13} style={{ height: "300px", width: "100%" , borderRadius: "15px" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[weatherdata.coord.lat, weatherdata.coord.lon]}>
                <Popup>{actualcity}</Popup>
              </Marker>
              <RecenterMap lat={weatherdata.coord.lat} lon={weatherdata.coord.lon} />
            </MapContainer>

          </div>

        </div>
      ) : null
      }
    </div>
  )
}

function Container() {

  return (
    <div >
      <Heading />

      {/* */}
    </div>
  )
}


function App() {


  return (
    <>
      <div className='app'>
        <Container />
      </div>
    </>
  )
}

export default App
