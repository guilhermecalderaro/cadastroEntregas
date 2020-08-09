import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

import config from '../../config';
import './styles.css';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

function MapDelivery() {
  return (
    <div className="map">
      <LoadScript
        googleMapsApiKey={config.GOOGLE_MAPS_API_KEY}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        />
      </LoadScript>
    </div>
  );
}

export default MapDelivery;
