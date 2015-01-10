define(function(require) {
  var $ = require('jquery');
  var bjq = require('bjq')

  return {
    init: init
  };

  function init() {
    $button = $('<button/>', {id: 'button', text: 'Click mich!'});
    $('body').append($button);

    $button.asEventStream('click').flatMap(function(event) {
      return event.target;
    }).log()
  }
});
