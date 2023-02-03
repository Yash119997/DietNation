import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import { useSelector } from 'react-redux';

const NearBy = ({ history }) => {
  const [resultss, setresultss] = useState([]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  if (!userInfo) {
    history.push('/login');
  }
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
    function showPosition(position) {
      fetch(
        `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?f=json&category=hospital&location=${position.coords.longitude},${position.coords.latitude}&outFields=Place_addr,%20PlaceName,Phone,%20Type&maxLocations=15
`,
        requestOptions
      )
        .then((response) => response.json())
        .then((results) => {
          setresultss([...results.candidates]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className='table-responsive'>
      <h3>HOSPITALS NEAR YOU ARE:</h3>

      <MapContainer
        center={[22.3084544, 73.1742208]}
        zoom={10}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {resultss.map((result, index) => (
          <Marker position={[result.location.y, result.location.x]} key={index}>
            <Popup>{result.attributes.PlaceName}</Popup>
          </Marker>
        ))}
      </MapContainer>
      <table
        className='table table-bordered table-striped'
        style={{ width: '90%', margin: 'auto' }}
      >
        <thead className='thead-dark'>
          <tr>
            <th>PLACE NAME</th>
            <th>PLACE ADDRESS</th>
            <th>TYPE</th>
            <th>PHONE</th>
          </tr>
        </thead>
        <tbody>
          {resultss.map((result, index) => (
            <tr key={index}>
              <td>{result.attributes.PlaceName}</td>
              <td>{result.attributes.Place_addr}</td>
              <td>{result.attributes.Type}</td>
              <td>{result.attributes.Phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NearBy;
