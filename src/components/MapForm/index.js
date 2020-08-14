/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

const initialValues = {
  name: '',
  date: '',
  origin: '',
  destination: '',
  originLatLng: '',
  destinationLatLng: '',
};

const googleInput = ({
  getInputProps, suggestions, getSuggestionItemProps, loading,
}) => (
  <div>
    <input
      {...getInputProps({
        placeholder: 'Search Places ...',
        className: 'form-control form-control-lg',
      })}
    />
    <div>
      {loading && <div>Loading...</div>}
      {suggestions.map((suggestion) => {
        const className = suggestion.active
          ? 'suggestion-item--active'
          : 'suggestion-item';
        // inline style for demonstration purpose
        const style = suggestion.active
          ? { backgroundColor: '#fafafa', cursor: 'pointer' }
          : { backgroundColor: '#ffffff', cursor: 'pointer' };
        return (
          <div
            {...getSuggestionItemProps(suggestion, {
              className,
              style,
            })}
          >
            <span key={`${suggestion.description}`}>{suggestion.description}</span>
          </div>
        );
      })}
    </div>
  </div>
);

const MapForm = ({ onSubmit }) => {
  const [delivery, setDelivery] = useState(initialValues);

  function setValue(key, value) {
    setDelivery({
      ...delivery,
      [key]: value,
    });
  }

  const handleChange = (event) => {
    setValue(
      event.target.getAttribute('name'),
      event.target.value,
    );
  };

  const handleSelectOrigin = (address) => {
    geocodeByAddress(address)
      .then((results) => {
        const originName = results[0].formatted_address;
        setDelivery({
          ...delivery,
          origin: originName,
        });
        return getLatLng(results[0]);
      })
      .then((originLatLng) => {
        setDelivery({ ...delivery, originLatLng });
      })
      .catch((error) => console.error('Error', error));
  };

  const handleSelectDestination = (address) => {
    geocodeByAddress(address)
      .then((results) => {
        const destination = results[0].formatted_address;
        setDelivery({ ...delivery, destination });
        return getLatLng(results[0]);
      })
      .then((destinationLatLng) => {
        setDelivery({ ...delivery, destinationLatLng });
      })
      .catch((error) => console.error('Error', error));
  };

  return (
    <div className="m-2">
      <form
        onSubmit={onSubmit}
        // onSubmit={(e) => {
        //   e.preventDefault();
        //   console.log(e.target[0].value, e.target[1].value, e.target[2].value, e.target[3].value, e.target[4].value);
        // }}
      >
        <div className="form-row">
          <div className="form-group col">
            <label htmlFor="name"> Nome: </label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-control form-control-lg"
              placeholder="João da Silva"
              value={delivery.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group col">
            <label htmlFor="date"> Data de entrega: </label>
            <input
              id="date"
              name="date"
              type="date"
              className="form-control form-control-lg"
              value={delivery.date}
              onChange={handleChange}
            />
          </div>

        </div>

        <div className="form-group">
          <label htmlFor="origin"> Ponto de origem: </label>
          <PlacesAutocomplete
            value={delivery.origin}
            name="origin"
            onChange={(origin) => setDelivery({ ...delivery, origin })}
            onSelect={handleSelectOrigin}
          >
            {googleInput}
          </PlacesAutocomplete>
        </div>

        {
          delivery.originLatLng.lat !== undefined
          && delivery.originLatLng.lng !== undefined
          && (
          <div className="form-group">
            <input
              id="originLatLng"
              name="originLatLng"
              type="text"
              className="form-control"
              value={`${delivery.originLatLng.lat}, ${delivery.originLatLng.lng}`}
              onChange={handleChange}
              readOnly
            />
          </div>
          )
        }

        <div className="form-group">
          <label htmlFor="destination"> Ponto de destino: </label>
          <PlacesAutocomplete
            value={delivery.destination}
            name="destination"
            onChange={(destination) => setDelivery({ ...delivery, destination })}
            onSelect={handleSelectDestination}
          >
            {googleInput}
          </PlacesAutocomplete>
        </div>

        {
          delivery.destinationLatLng.lat !== undefined
          && delivery.destinationLatLng.lng !== undefined
          && (
          <div className="form-group">
            <input
              id="destinationLatLng"
              name="destinationLatLng"
              type="text"
              className="form-control"
              value={`${delivery.destinationLatLng.lat}, ${delivery.destinationLatLng.lng}`}
              onChange={handleChange}
              readOnly
            />
          </div>
          )
        }

        <button className="btn btn-primary btn-lg btn-block" type="submit">Submit</button>

      </form>
    </div>
  );
};

MapForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default MapForm;
