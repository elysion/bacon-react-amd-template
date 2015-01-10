define(function(require) {
    var Bacon = require('bacon')
    var _ = require('underscore')
    var math = require('./math')
    var functional = require('./functional')

    return function(streams, weights) {
        return _.map(streams, function (stream, streamIndex) {
            var weightForStream = weights[streamIndex]

            combined = Bacon.combineAsArray(_.map(weights, function (weight, weightIndex) {
                var multiplier = weightIndex === streamIndex ? 1 : -1
                return functional.map(_.partial(math.mul, multiplier), combine(math.div, weight, weightForStream))
            }))

            return combined.combine(stream, function(combined, stream) {
                return _.map(combined, functional.lift(math.mul, stream))
            })
        })
    }

    function combine(transformer, stream1, stream2) {
        if (_.isFunction(stream1.combine)) {
            return stream1.combine(stream2, transformer)
        } else {
            return Bacon.constant(stream1).combine(stream2, transformer)
        }
    }
})