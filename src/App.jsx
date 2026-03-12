import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState, useEffect } from 'react';

import 'leaflet/dist/leaflet.css';
import { useMap } from 'react-leaflet';


function RecenterMap({ latitude, longitude }) {
  const map = useMap();

  useEffect(() => {
    map.setView([latitude, longitude]);
  }, [latitude, longitude, map]);

  return null;
}



function OperationContainer() {

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
  }, [actualcity]);
    
  return (
    <div className='container'>
     
        <h2>Enter any city to search for it's weather.</h2>
      <div className='input-ctn' >
        <input defaultValue={""} value={city} placeholder='Enter a city...' onChange={(e) => setCity(e.target.value)} type='text'/>
        <button className="btn" onClick={handlesearch}>Search</button>
      </div> 

      { info? (
        <div className='result' >
          <div className='data'>City:{weatherdata.name} in {weatherdata.sys.country}</div>
          <div className='data'>temperature: {weatherdata.main.temp}°C</div>
          <div className='data'>wind speed: {weatherdata.wind.speed}Km/h</div>
          <div className='data'><img src={`http://openweathermap.org/img/wn/${weatherdata.weather[0].icon}@2x.png`} alt={weatherdata.weather[0].description} style={{width : "50px",height:"50px"}} />
          condition : {weatherdata.weather[0].main}</div>
          <div className='data'>description : {weatherdata.weather[0].description}</div>
          <div className='data'>💧Humidity: {weatherdata.main.humidity}%</div>
        
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
      ) : <p> Sorry, we can't get the weather of {actualcity} right now</p>
      }
    </div>
  )
}




function App() {
  return (
       <>
        <header>Hello there.<br/> Want to know about the weather, today?</header>
        <OperationContainer />
      </>
  )
}

export default App
