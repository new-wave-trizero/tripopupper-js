const $ = require('jquery');

const match = (logger, config) => true;

const makeLauncher = (logger, config) => {
  $('body').html(`<h1>${config.title}</h1>`);
};

export default {
  match,
  makeLauncher,
};
