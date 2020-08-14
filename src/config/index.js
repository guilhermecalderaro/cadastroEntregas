const GOOGLE_MAPS_API_KEY = 'AIzaSyBcLwqDOS_mRoglMYXbxoxqyBbs-2kWMB0';

const URL_BACKEND_TOP = window.location.hostname.includes('localhost')
  ? 'http://localhost:8080'
  : 'https://cadastroentrega.herokuapp.com';

export default {
  GOOGLE_MAPS_API_KEY,
  URL_BACKEND_TOP,
};
