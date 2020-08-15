/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import deliveriesRepository from '../../repositories/deliveries';

import MapRoute from '../../components/MapRoute';
import './styles.css';

function MapDelivery(props) {
  const [delivery, setDelivery] = useState('');

  useEffect(() => {
    const { id } = props.match.params;
    deliveriesRepository.getDelivery(id)
      .then((resposta) => setDelivery(resposta))
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.warn(err);
      });
  }, []);

  return (
    <main>
      <div className="container">
        <h1>
          <storng>Destinatário:</storng>
          {' '}
          {delivery.name}
        </h1>
        <h2>
          Data de entrega:
          {' '}
          {delivery.date}
        </h2>
        <p>
          Ponto de origem:
          {' '}
          {delivery.origin}
        </p>
        <p>
          Ponto de Destino:
          {' '}
          {delivery.destination}
        </p>
        <Link className="btn btn-secondary m-3" to="/">&lt;&lt; Voltar</Link>
      </div>
      {

        delivery.destinationLatLng !== ''
        && delivery.originLatLng !== ''
        && (
        // console.log(delivery.destinationLatLng, delivery.originLatLng);
        <MapRoute directionsServiceOptions={
            {
              destination: delivery.destinationLatLng,
              origin: delivery.originLatLng,
              travelMode: 'DRIVING',
            }
          }
        />
        )
      }
    </main>
  );
}

export default MapDelivery;
