import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import styles from "../styles/Map.module.css";
const Map = ({lat,lng,setLat,setLng})=>{
  const REACT_APP_MAPBOX_APIKEY = process.env.REACT_APP_MAPBOX_APIKEY;
//   mapboxgl.accessToken = REACT_APP_MAPBOX_APIKEY;
  mapboxgl.accessToken = 'pk.eyJ1IjoiYWx5OGkiLCJhIjoiY2w1enZnYm5iMGlxbTNibmFsYjg4czg5NyJ9.U3wzTlct7RKu1FcGihfDeg';
  const mapContainer = useRef(null);
  const marker = useRef(null);
  const map = useRef(null);
//   const [lng, setLng] = useState(35.4776);
//   const [lat, setLat] = useState(33.8956);
  const [userLng, setUserLng] = useState(null);
  const [userLat, setUserLat] = useState(null);
  const [zoom, setZoom] = useState(9);
  
  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    function success(pos) {
      setUserLng(pos.coords.longitude);
      setUserLat(pos.coords.latitude);
      map.current.flyTo({center:[userLng, userLat],zoom:15});
    }
    
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success,error,options);
  },[userLat,userLng]);
  
  useEffect(() => {
      if (map.current) return; // initialize map only once
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: zoom,
      });
      if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
      });
      marker.current = new mapboxgl.Marker().setLngLat([-70.9, 42.35]);

      // map.current.on('click', handleClick);
   });
    return (
        <div className={styles.box}>
        <div className={styles.mapWrapper}>
            <div ref={mapContainer} className={styles.mapContainer}>
                <div ref={marker} className={styles.marker}></div>
            </div>
        </div>
        </div> 
    )
}

export default Map