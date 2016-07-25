const $ = require('jquery');
import fancyboxLauncher from './launchers/fancyboxLauncher';
import qandoFancyboxLauncher from './launchers/qandoFancyboxLauncher';

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
  logger.info('Launching popup', name);

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
  debug: () => {},
  warn: () => {},
};

// Check if popup should run based on config
const shouldRun = logger => config => {
  const now = new Date().getTime();
  const { start, end } = config;

  if (start && now < new Date(`${start} 00:00:00`).getTime()) {
    logger.debug('To early to show popup');
    return false;
  }

  if (end && now > new Date(`${end} 23:59:59`).getTime()) {
    logger.debug('To late to show popup');
    return false;
  }

  return true;
};

// Make a launcher
const makeLauncher = logger => launchersFactory => config => {
  for (const launcherFactory of launchersFactory) {
    if (launcherFactory.match(config)) {
      return launcherFactory.makeLauncher(logger)(config);
    }
  }
};

// Run popup with manual config
const run = logger => config => {
  logger.info('Running configuration', config);

  // Check if popup should run...
  if (!shouldRun(logger)(config)) {
    return;
  }

  const launcher = makeLauncher(logger)([
    qandoFancyboxLauncher,
    fancyboxLauncher,
  ])(config);

  if (typeof launcher === 'undefined') {
    logger.error('Cannto find a suitable launcher for this configuration', config);
    return;
  }

  // Invoke launcher after config delay
  setTimeout(() => launcher(), (config.delay || 0) * 1000);
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
  // Tiplically used in Tripoup dashboard to locally test popup behaviour
  run: (config, debug = true) => {
    const logger = makeLogger(debug);
    logTripopupHello(logger);
    run(logger)(config);
  },
};

module.exports = popupper;
