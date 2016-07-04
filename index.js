var $ = require('jquery');
require('fancybox')($);
require('./node_modules/fancybox/dist/css/jquery.fancybox.css');

var popupper = function(popupID) {

  function showPopup(remoteConfig) {
    $(document).ready(function() {
      // Simply launch fancybox
      $.fancybox(remoteConfig);
    });
  }

  // Retrieve remote config
  $.getJSON('https://tripopupper.firebaseio.com/' + popupID + '.json')
    .done(showPopup)
    .fail(function(error) {
      console.error('Tripopupper failed to retrieve remote config', error);
    });
};

module.exports = popupper;
