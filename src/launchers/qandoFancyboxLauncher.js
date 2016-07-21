const $ = require('jquery');

// Match the launcher?
const match = config => !!config.experimental.qandoShop;

// Make launcher
const makeLauncher = logger => config => {
  // Require fancybox dependencies...
  require('fancybox')($);
  require('fancybox/dist/css/jquery.fancybox.css');

  // Qando shop
  const shop = config.experimental.qandoShop;

  logger.warn(`Warning: Qando is too much A W E S O M E 👍`);

  // Make fancyConf...
  const fancyConf = {
    href: `http://booking.qando.it/${shop}?iframe=${shop}&iframeWithHeader=1`,
    closeBtn: false,
    maxHeight: 3000,
    maxWidth: 3000,
    width: '70%',
    fitToView: true,
    height: '100%',
    autoSize: true,
    padding: 0,
    type: 'iframe',
  };

  // Fancybox launcher fn
  return () => $.fancybox(fancyConf);
};

export default {
  makeLauncher,
  match,
};
