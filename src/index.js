import makeLogger from './logger';
import { run } from './core';
import { renderTripopupHello } from './art';
import { fetchPopupConfig } from './api';

// Launchers...
import qandoFancyboxLauncher from './launchers/qando-fancybox-launcher';
import fancyboxLauncher from './launchers/fancybox-launcher';

// Curried run popup fn
const crun = run([
  qandoFancyboxLauncher,
  fancyboxLauncher,
]);

// Launch popup: Fetch remote remote config and run!
function launchPopup(name, debug = false) {
  const logger = makeLogger(debug);
  const err = handleApiError(name);

  renderTripopupHello(logger.log.bind(logger));
  logger.info('Launching popup', name);

  fetchPopupConfig(name, crun(name)(logger), err(logger));
}

// Directly run popup with config,
// tipically used in Tripopup dashboard
function runPopup(config, debug = true) {
  const logger = makeLogger(debug);

  renderTripopupHello(logger.log.bind(logger));
  crun(null)(logger)(config);
}

// Log specific tip of tripopupper errors...
const handleApiError = name => logger => error => {
  if (typeof error.responseJSON === 'object' && typeof error.responseJSON.message === 'string') {
    logger.error(error.responseJSON.message); // Good API has good error messages
  }
};

// Expose lib methods
const popupper = {
  launch: launchPopup,
  // TODO: Make a specific build with or without the run method
  run: runPopup,
};

module.exports = popupper;
