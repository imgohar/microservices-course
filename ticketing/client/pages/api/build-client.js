import axios from 'axios';

export default ({ req }) => {
  if (typeof window === 'undefined') {
    // we are on server

    return axios.create({
      baseURL: 'http://10.96.155.0',
      headers: req.headers,
    });
  } else {
    // we are on browser
    return axios.create({
      baseURL: '/',
    });
  }
};
