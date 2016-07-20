// Set up FancyBox
const $ = require('jquery');
require('fancybox')($);
require('./node_modules/fancybox/dist/css/jquery.fancybox.css');

// Urls
const API_URL = process.env.NODE_ENV === 'production'
  ? 'http://popup.trizero.eu/api'
  : 'http://tripopupper.app/api';
const APP_URL = process.env.NODE_ENV === 'production'
  ? 'http://popup.trizero.eu'
  : 'http://tripopupper.app';

// Launch popup with remote config
function launch(name, debug = false) {

  const logger = makeLogger(debug);

  logTripopupHello(logger);
  logger.info(`Launching popup '${name}'`);

  const err = handleApiError(name);
  fetchPopupConfig(name, run(logger), err(logger));
}

// noop
const noop = () => {};

// Simply console wrapper or object with empty console methods...
const makeLogger = log => log ? console : {
  log: () => {},
  info: () => {},
  error: () => {},
};

// Run popup with manual config
const run = logger => config => {
  $(document).ready(() => {
    const {
      title,
      imageUrl,
      padding,
      overlay,
    } = config;

    // Make fancybox config...
    const fancyConf = {
      padding: undefined,
      title,
      href: imageUrl,
      helpers: {},
    };

    if (padding !== null && typeof padding !== 'undefined') {
      fancyConf.padding = padding;
    }

    // Just remove the overlay
    if (!overlay) {
      fancyConf.helpers.overlay = null;
    }

    const delay = 0;
    setTimeout(() => $.fancybox(fancyConf), delay);
  });
};

// Log specific tip of tripopupper errors...
const handleApiError = name => logger => error => {
  if (typeof error.responseJSON === 'object' && typeof error.responseJSON.message === 'string') {
    logger.error(error.responseJSON.message); // Good API has good error messages
  }
};

// Fetch config from Tripopup API
const fetchPopupConfig = (name, success = noop, fail = noop, always = noop) => (
  $.getJSON(`${API_URL}/popup/${name}`)
    .done(success)
    .fail(fail)
    .always(always)
);

// Show Tripopup hello to the entire world wide web
const logTripopupHello = logger => {
  logger.log(`
   /$$$$$$$$        /$$
  |__  $$__/       |__/
     | $$  /$$$$$$  /$$  /$$$$$$   /$$$$$$   /$$$$$$  /$$   /$$  /$$$$$$
     | $$ /$$__  $$| $$ /$$__  $$ /$$__  $$ /$$__  $$| $$  | $$ /$$__  $$
     | $$| $$  \__/| $$| $$  \ $$| $$  \ $$| $$  \ $$| $$  | $$| $$  \ $$
     | $$| $$      | $$| $$  | $$| $$  | $$| $$  | $$| $$  | $$| $$  | $$
     | $$| $$      | $$| $$$$$$$/|  $$$$$$/| $$$$$$$/|  $$$$$$/| $$$$$$$/
     |__/|__/      |__/| $$____/  \______/ | $$____/  \______/ | $$____/
                       | $$                | $$                | $$
                       | $$                | $$                | $$
                       |__/                |__/                |__/
  `);
  logger.log('Powered by Trizero http://trizero.eu');
};

// Expose lib methods
const popupper = {
  launch,
  // TODO: Make a specific build with or without the run method
  run: run(makeLogger(true)),
};

module.exports = popupper;
