const $ = require('jquery');

const match = (logger, config) => true;

const makeLauncher = (logger, config) => next => {
  $('body').html(`<h1>${config.title}</h1>`);
  next();
};

export default {
  match,
  makeLauncher,
};
