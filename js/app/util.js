define(function(require) {
    var functional = require('./functional')

    return {
        nthArgument: function(n) {
            return function() {
                return arguments[n + 1]
            }
        },
        mapValues: function(obj, func) {
            return _.chain(obj).pairs().map(_.partial(this.mapNth, 2, func)).object().value()
        },
        mapNth: function(n, func, list) {
            return _.map(list, function(value, index) {
                return index+1 === n ? func(value) : value
            })
        }
    }
})