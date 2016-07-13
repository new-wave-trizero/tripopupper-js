// Set up FancyBox
const $ = require('jquery');
require('fancybox')($);
require('./node_modules/fancybox/dist/css/jquery.fancybox.css');

// Run popup with manual config
function run(config) {
  $(document).ready(() => {
    const { title, imageUrl } = config;

    //// Simply launch fancybox
    //setTimeout(function() {
      //$.fancybox(fancyConfig);
    //}, extraConfig.timeout);

    // Make fancybox config...
    const fancyConf = {
      title,
      href: imageUrl,
    };

    $.fancybox(fancyConf);
  });
}

// Launch popup with remote config
function launch(name) {
  run({ title: name, imageUrl: 'http://trizero.eu/public/immagini/slides/trizero-bkg-slider.jpg' });
}

//const x = () => alert('ES6 IS COOL!!! Giova');

//x();
//var popupper = function(popupID) {

  //function showPopup(remoteConfig) {
    //var fancyConfig = remoteConfig.fancy;
    //var extraConfig = $.extend({}, {
      //timeout: 0,
      //period: {
        //start: null,
        //end: null
      //}
    //}, remoteConfig.extra || {});

  //}

  //function processRemoteConfig(remoteConfig) {
    //// Wait until DOM is loaded...
      //// Check for valid remote config...
      //if (typeof remoteConfig !== 'object') {
        //console.error('Tripopupper remote config is invalid');
        //return;
      //}
      //// Show popup!
      //showPopup(remoteConfig);
    //});
  //}

  //// Retrieve remote config
  //$.getJSON('https://tripopupper.firebaseio.com/' + popupID + '.json')
    //.done(processRemoteConfig)
    //.fail(function(error) {
      //console.error('Tripopupper failed to retrieve remote config', error);
    //});
//};


// Expose libs method
const popupper = {
  launch,
  run,
};

module.exports = popupper;
