import React, { useState, useCallback } from 'react';
import {
  GoogleMap,
  useLoadScript,
  DirectionsService,
  DirectionsRenderer,
} from '@react-google-maps/api';

import PropTypes from 'prop-types';

import config from '../../config';
import './styles.css';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: -29.715666,
  lng: -52.4306986,
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const libraries = ['places'];

// eslint-disable-next-line react/prop-types
function MapRoute({ directionsServiceOptions }) {
  const [response, setResponse] = useState(null);
  //  const [directionsServiceOptions, setDirectionsServiceOptions] = useState({
  //    destination: { lat: -29.6979826, lng: -52.4406202 },
  //    origin: { lat: -29.7216174, lng: -52.4329495 },
  //    travelMode: 'DRIVING',
  //  });
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: config.GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const directionsCallback = useCallback((event) => {
    if (event !== null) {
      if (event.status === 'OK') {
        setResponse(event);
        // eslint-disable-next-line no-console
        console.log('response ok: ', event);
      } else {
        // eslint-disable-next-line no-console
        console.log('response error: ', event);
      }
    }
  }, []);

  if (loadError) return 'Error';
  if (!isLoaded) return 'Loading...';

  return (
    <div className="map">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        options={options}
      >

        {
          (directionsServiceOptions.destination.lat !== ''
            && directionsServiceOptions.destination.lng !== '') && (
              <DirectionsService
                options={directionsServiceOptions}
                callback={directionsCallback}
                onLoad={(directionsService) => {
                  // eslint-disable-next-line no-console
                  console.log('DirectionsService onLoad directionsService: ', directionsService);
                }}
                onUnmount={(directionsService) => {
                  // eslint-disable-next-line no-console
                  console.log('DirectionsService onUnmount directionsService: ', directionsService);
                }}
              />
          )
        }

        {
            response !== null && (
              <DirectionsRenderer
                options={{
                  directions: response,
                }}
              />
            )
          }

      </GoogleMap>
    </div>
  );
}

MapRoute.propTypes = {
  directionsServiceOptions: PropTypes.shape({
    destination: PropTypes.objectOf(PropTypes.number),
    origin: PropTypes.objectOf(PropTypes.number),
    travelMode: PropTypes.string,
  }).isRequired,
};

export default MapRoute;
