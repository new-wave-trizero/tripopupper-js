import makeLogger from './logger';
import { run as coreRun } from './core';
import { renderTripopupHello } from './art';
import { fetchPopupConfig } from './api';

// Launchers...
//import qandoFancyboxLauncher from './launchers/qando-fancybox-launcher';
import fancyboxLauncher from './launchers/fancybox-launcher';
//import bodyLauncher from './launchers/body-launcher';

// Curried run popup fn
const crun = coreRun([
  //bodyLauncher,
  //qandoFancyboxLauncher,
  fancyboxLauncher,
]);

// noop
const noop = () => {};

// Launch popup: Fetch remote remote config and run!
function launchPopup(name, debug, next) {
  const logger = makeLogger(debug);
  const err = handleApiError(name)(logger)(next);

  renderTripopupHello(logger.log.bind(logger));
  logger.info('Launching popup', name);

  fetchPopupConfig(name, crun(name)(logger)(next), err);
}

// Log specific tip of tripopupper errors...
const handleApiError = name => logger => next => error => {
  if (typeof error.responseJSON === 'object' && typeof error.responseJSON.message === 'string') {
    logger.error(error.responseJSON.message); // Good API has good error messages
  }
  next();
};

// Directly run popup with config,
// tipically used in Tripopup dashboard
function runPopup(config, debug, next) {
  const logger = makeLogger(debug);

  renderTripopupHello(logger.log.bind(logger));
  crun(null)(logger)(next)(config);
}

// Launch name(s)
function launch(chain, debug = false) {
  if (typeof chain === 'string') {
    launchPopup(chain, debug, noop);
  } else if (Array.isArray(chain) && chain.length > 0) {
    launchPopup(chain[0], debug, () => launch(chain.slice(1, chain.length), debug));
  }
}

// Run config(s)
function run(chain, debug = true) {
  if (Array.isArray(chain) && chain.length > 0) {
    runPopup(chain[0], debug, () => run(chain.slice(1, chain.length), debug));
  } else if (typeof chain === 'object' && !Array.isArray(chain)) {
    runPopup(chain, debug, noop);
  }
}

// Expose lib methods
const popupper = {
  launch,
  // TODO: Make a specific build with or without the run method
  run,
};

module.exports = popupper;
