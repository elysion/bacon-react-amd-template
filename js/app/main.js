define(function(require) {
  var $ = require('jquery')
  var bjq = require('bjq')
  var Bacon = require('bacon')
  var React = require('react')
  var Div = React.createFactory('div')
  var Transition = require('./transition')
  var transitionDelay = 500

  var heightTransition = {
    transition: 'height ease-in-out ' + transitionDelay + 'ms'
  }

  var AnimatedBox = React.createClass({
    getInitialState: function() {
      return {
        height: 'auto'
      }
    },
    handleClick: function() {
      var setHeight = function(height) {
        var deferred = $.Deferred()
        Transition(this, 'height', height).start()
        setTimeout(deferred.resolve, transitionDelay)
        return deferred.promise()
      }.bind(this)

      var close = function() {
        return setHeight(0)
      }

      var open = function() {
        setHeight('auto')
      }

      close().then(open)
    },

    render: function() {
      return Div({
            onClick: this.handleClick,
            style: _.extend({}, {overflow: 'hidden', height: this.state.height}, heightTransition)},
          Div({
            style: {height: 200, backgroundColor: this.props.color}}))
    }
  })

  var box = React.createElement(AnimatedBox, {color: 'red'})

  return {
    init: function() {
      React.render(
          Div({},box),
          document.body
      )
    }
  }
})
