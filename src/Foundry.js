var Foundry = (function () {
    "use strict";

    function Foundry () {}

    Foundry.create = function (options) {
        function Constructor (properties) {
            for (var prop in properties) {
                if (properties.hasOwnProperty(prop)) {
                    this[prop](properties[prop]);
                    this[prop].hash = null;
                }
            }
        }

        function getterSetter (prop) {
            return function (value) {
                if (arguments.length) {
                    for (var i = 0; i < this.__validators[prop].length; i++) {
                        var validator = this.__validators[prop][i],
                            result = validator(value);
                        if (typeof result === 'string') {
                            throw new Constructor.ValidationError(result);
                        }
                    }
                    this.__values[prop] = value;
                    this[prop].hash = +(new Date());
                }

                return this.__values[prop];
            };
        }

        var __values = {}, __validators = {};

        for (var i = 0; i < options.properties.length; i++) {
            var prop = options.properties[i];

            if (typeof prop === 'object') {
                var obj = prop;
                prop = obj.name;

                var validators = obj.validators || (obj.validator && [obj.validator]) || [];
                __validators[prop] = validators;
            }

            __validators[prop] = __validators[prop] || [];
            Constructor.prototype[prop] = getterSetter(prop);
            Constructor.prototype[prop].hash = null;
        }

        Constructor.prototype.__values = __values;
        Constructor.prototype.__validators = __validators;

        function ValidationError (message) {
            this.name = 'ValidationError';
            this.message = message;
        }
        ValidationError.prototype = new Error();
        ValidationError.prototype.constructor = ValidationError;
        Constructor.ValidationError = ValidationError;

        return Constructor;
    };

    return Foundry;
}());
