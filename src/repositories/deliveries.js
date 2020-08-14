import config from '../config';

const URL_DELIVERIES = `${config.URL_BACKEND_TOP}/deliveries`;

function getAll() {
  return fetch(URL_DELIVERIES)
    .then(async (respostaDoServer) => {
      if (respostaDoServer.ok) {
        const resposta = await respostaDoServer.json();
        return resposta;
      }
      throw new Error('Não foi possível pegar as entregas');
    });
}

function getDelivery(id) {
  return fetch(`${URL_DELIVERIES}/${id}`)
    .then(async (respostaDoServer) => {
      if (respostaDoServer.ok) {
        const resposta = await respostaDoServer.json();
        return resposta;
      }
      throw new Error('Entrega não encontrada');
    });
}

function create(delivery) {
  return fetch(URL_DELIVERIES, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(delivery),
  })
    .then(async (res) => {
      if (res.ok) {
        const resposta = await res.json();
        return resposta;
      }
      throw new Error('Não foi possível adicionar a entrega :(');
    });
}

export default {
  getAll,
  getDelivery,
  create,
};
