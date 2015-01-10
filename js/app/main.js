define(function(require) {
  var $ = require('jquery')
  var bjq = require('bjq')
  var Bacon = require('bacon')
  var React = require('react')

  return {
    init: init
  }

  function init() {
    var clickBus = new Bacon.Bus().log('click')

    React.render(
        React.createElement('button',
            {
              id: 'button',
              onClick: function(event) {
                clickBus.push(event)
              }
            },
            'Click mich!'),
        document.body
    )
  }
})
