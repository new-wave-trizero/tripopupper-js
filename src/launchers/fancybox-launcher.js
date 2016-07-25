const $ = require('jquery');

// Match the launcher?
const match = (logger, config) => true;

// Make launcher
const makeLauncher = (logger, config) => {
  // Require fancybox dependencies...
  require('fancybox')($);
  require('fancybox/dist/css/jquery.fancybox.css');

  const {
    title,
    imageUrl,
    padding,
    overlay,
  } = config;

  // Make the fancy conf...
  const fancyConf = {
    href: imageUrl,
    padding: undefined,
    title,
    helpers: {},
  };

  if (padding !== null && typeof padding !== 'undefined') {
    fancyConf.padding = padding;
  }

  // Just remove the overlay
  if (!overlay) {
    fancyConf.helpers.overlay = null;
  }

  // Fancybox launcher fn
  return () => $.fancybox(fancyConf);
};

export default {
  makeLauncher,
  match,
};
