define(function(require) {
    var $ = require('jquery')
    var bjq = require('bjq')
    var Bacon = require('bacon')
    var React = require('react')
    var math = require('./math')
    var util = require('./util')

    var busses = {
        e: new Bacon.Bus(),
        p: new Bacon.Bus(),
        t: new Bacon.Bus()
    }

    var values = util.mapValues(busses, inputEventToValue)

    function inputEventToValue(stream) {
        return stream.map('.target.value')
    }

    var euros = values.e
    var percent = values.p.map(_.partial(math.div, 100))
    var total = values.t

    var results = require('./calculate')([euros, percent], [total.map(math.pow(-1)), -1])

    Bacon.mergeAll(results).assign(render)

    return {
        init: init
    }

    function init() {
        render([0,0])
    }

    function render(values) {
        React.render(
            React.createElement('div', null,
                [
                    React.createElement('input',
                        {
                            type: "text",
                            onChange: pushToBus(busses.e)
                        }
                    ),
                    React.createElement('input',
                        {
                            type: "text",
                            onChange: pushToBus(busses.p)
                        }
                    ),
                    React.createElement('input',
                        {
                            type: "text",
                            onChange: pushToBus(busses.t)
                        }
                    ),
                    React.createElement('br'),
                    React.createElement('span',
                        null,
                        Math.round(values[0], 2) + "€"
                    ),
                    React.createElement('br'),
                    React.createElement('span',
                        null,
                        Math.round(values[1]*100, 2) + "%"
                    )
                ]),
            document.body
        )
    }

    function pushToBus(bus) {
        return function (value) {
            bus.push(value)
        }
    }
})
