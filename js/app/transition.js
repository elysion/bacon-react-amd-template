define(function(require) {
  var $ = require('jquery')
  var _ = require('underscore')

  return function (reactObject, property, endState) {
    var getter = function() {
      return $(this.getDOMNode())[property]()
    }.bind(reactObject)

    var setter = function(property, value) {
      this.setState(_.object([property], [value]))
    }.bind(reactObject, property)

    return {
      start: function() {
        if (endState === 'auto') {
          return getAutoState().then(function(autoState) {
            getCurrentState().then(setImplicitState).then(setImplicitState.bind(this, autoState))//.then(setImplicitState.bind(this, endState))
          })
        } else {
          return getCurrentState().then(setImplicitState).then(setImplicitState.bind(this, endState))
        }
      }
    }

    function makeArray(obj) {
      return Array.prototype.slice.call(obj);
    }

    function defer(scope, func /*, arguments */) {
      var args = makeArray(arguments).slice(2);
      setTimeout(function() {
        func.apply(scope, args)
      }.bind(scope), 0)
    }

    function getAutoState() {
      var deferred = $.Deferred()
      getCurrentState().then(function(current) {
        return setImplicitState('auto').then(getCurrentState).then(function(autoState){
          return setImplicitState(current).then(deferred.resolve.bind(this, autoState))
        })
      })
      return deferred.promise()
    }

    function getCurrentState() {
      var deferred = $.Deferred()
      deferred.resolve(getter())
      return deferred.promise()
    }

    function setImplicitState(state) {
      var deferred = $.Deferred()
      defer(this, function() {
        setter(state)
        deferred.resolve()
      })
      return deferred.promise()
    }
  }
})