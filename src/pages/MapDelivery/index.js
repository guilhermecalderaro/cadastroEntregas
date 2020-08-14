import React from 'react';

import MapRoute from '../../components/MapRoute';
import './styles.css';

function MapDelivery() {
  return (
    <MapRoute directionsServiceOptions={
      {
        destination: { lat: -29.6979826, lng: -52.4406202 },
        origin: { lat: -29.7216174, lng: -52.4329495 },
        travelMode: 'DRIVING',
      }
    }
    />
  );
}

export default MapDelivery;
