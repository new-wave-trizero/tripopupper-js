// Run popup with given config and launchers makers
export const run = launchersMakers => key => logger => config => {
  logger.info('Running configuration', config);

  if (!key) {
    logger.warn(
      'Without a valid popup key persistent features like ' +
      'show one time per day or similar have no effect.'
    );
  }

  // Update last run time...
  key && updateLocalPopupData(key, {
    lastRunTime: new Date().getTime()
  });

  // Check if popup should run...
  if (!shouldRun(logger, config, (key && getLocalPopupData(key)))) {
    return;
  }

  const launcher = makeLauncher(logger, launchersMakers, config);

  if (typeof launcher === 'undefined') {
    logger.error('Cannot find a suitable launcher for this configuration', config);
    return;
  }

  // Invoke launcher after config delay
  setTimeout(() => {
    // Go, Go, launcher!
    launcher();

    // Update last launch time...
    key && updateLocalPopupData(key, {
      lastLaunchTime: new Date().getTime()
    });
  }, (config.delay || 0) * 1000);
};

// Check if popup should run based on config
const shouldRun = (logger, config, localPopupData) => {
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

  if (localPopupData) {
    const { showAt } = config;

    if (showAt === 'once-per-day') {
      const shouldRunning = parseInt((now - (+localPopupData.lastLaunchTime || null)) / 1000) >= (3600 * 24);
      if (!shouldRunning) {
        logger.debug('Popup alredy showed this day :P');
      }
      return shouldRunning;
    }
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

// Get local browser popup data
const getLocalPopupData = (key) =>
  JSON.parse(localStorage.getItem(`tripopup:popup:${key}`));

// Remove local browser popup data
const removeLocalPopupData = (key) =>
  localStorage.removeItem(`tripopup:popup:${key}`);

// Set local browser popup data
const setLocalPopupData = (key, data) =>
  localStorage.setItem(`tripopup:popup:${key}`, JSON.stringify(data));

// Update local browser popup data
const updateLocalPopupData = (key, data) =>
  setLocalPopupData(key, { ...getLocalPopupData(key) || {}, ...data });
