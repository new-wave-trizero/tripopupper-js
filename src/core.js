// Run popup with given config and launchers makers
export const run = launchersMakers => key => logger => config => {
  logger.info('Running configuration', config);

  if (!key) {
    logger.warn(
      'Without a valid popup key persistent features like ' +
      'show one time per day or similar have no effect.'
    );
  }

  // Check if popup should run...
  if (!shouldRun(logger, config)) {
    return;
  }

  const launcher = makeLauncher(logger, launchersMakers, config);

  if (typeof launcher === 'undefined') {
    logger.error('Cannot find a suitable launcher for this configuration', config);
    return;
  }

  // Invoke launcher after config delay
  setTimeout(() => {
    launcher();
  }, (config.delay || 0) * 1000);
};

// Check if popup should run based on config
const shouldRun = (logger, config) => {
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

// Make the launcher
const makeLauncher = (logger, launchersMakers, config) => {
  for (const launcherMaker of launchersMakers) {
    if (launcherMaker.match(logger, config)) {
      return launcherMaker.makeLauncher(logger, config);
    }
  }
};
