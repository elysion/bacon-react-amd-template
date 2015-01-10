define(function() {
    return {
        pow: function (exponent) {
            return function (value) {
                return Math.pow(value, exponent)
            }
        },
        div: function (deniminator, numerator) {
            return numerator / deniminator
        },
        mul: function(val1, val2) {
            return val1 * val2
        }
    }
})