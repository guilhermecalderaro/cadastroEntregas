import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import MapForm from '../../components/MapForm';
import deliveriesRepository from '../../repositories/deliveries';

import './styles.css';

function ListDelivery() {
  const [deliveries, setDeliveries] = useState(null);

  // Modal Controller
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Form Controller
  const handleSubmit = (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-console
    console.log(e);
    setShow(false);
  };

  useEffect(() => {
    deliveriesRepository.getAll()
      .then((resposta) => {
        setDeliveries(resposta);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.warn(err);
      });
  }, []);

  return (
    <div className="listDelivery">
      <header className="ListDelivery-header">
        DeliveryList
      </header>
      <Button
        variant="primary"
        onClick={handleShow}
        type="submit"
        className="btn"
      >
        Adicionar Entrega
      </Button>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Cliente</th>
            <th>Data de entrega</th>
            <th>Ponto de partida</th>
            <th>Ponto de destino</th>
            <th>Mapa</th>
          </tr>
        </thead>
        <tbody>
          {
            deliveries !== null
              ? deliveries.map((delivery, index) => (
                <tr key={`${delivery.name}_${delivery.date}_${delivery.id}`}>
                  <td
                    key={`${delivery.name}_${delivery.date}`}
                  >
                    {index}
                  </td>
                  <td key={`${delivery.name}_name`}>{delivery.name}</td>
                  <td key={`${delivery.date}_date`}>{delivery.date}</td>
                  <td key={`${delivery.origin}_origin`}>{delivery.origin}</td>
                  <td key={`${delivery.name}_${delivery.date}_${delivery.id}_link`}>{delivery.destination}</td>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <td key={delivery.destination}>
                    <Link to={`delivery/map/${delivery.id}`}>&gt;</Link>
                  </td>
                </tr>
              ))
              : (
                <tr>
                  <td colSpan="6">
                    Não existe nenhuma entrega
                  </td>
                </tr>
              )
          }
        </tbody>
      </Table>

      {
        // Modal - add Delivery
      }
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastro de entrega</Modal.Title>
        </Modal.Header>
        <MapForm
          onSubmit={handleSubmit}
          handleClose={handleClose}
        />
      </Modal>

    </div>
  );
}

export default ListDelivery;
