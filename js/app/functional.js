define(function(require) {
    var _ = require('underscore')

    return {
        lift: function (func) {
            return _.partial.apply(null, _.union([func], _.rest(arguments)))
        },
        map: function (func, value) {
            if (_.isFunction(value.map)) {
                return value.map(func)
            } else {
                return _.map(value, func)
            }
        }
    }
})