var Foundry = (function () {
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
                    for (var i = 0; i < this.__transformers[prop].length; i++) {
                        var transformer = this.__transformers[prop][i];
                        value = transformer.call(this, value);
                    }
                    for (i = 0; i < this.__validators[prop].length; i++) {
                        var validator = this.__validators[prop][i],
                            result = validator.call(this, value);
                        if (typeof result === 'string') {
                            throw new Constructor.ValidationError(result);
                        }
                    }
                    this.__values[prop] = value;

                    if (this[prop].hashFn) {
                        this[prop].hash = this[prop].hashFn(value);
                    } else {
                        this[prop].hash = +(new Date());
                    }

                }

                return this.__values[prop];
            };
        }

        var __values = {}, __validators = {}, __transformers = {};

        for (var i = 0; i < options.properties.length; i++) {
            var prop = options.properties[i];
            if (typeof prop === 'string') {
                prop = { name: prop };
            }
            var name = prop.name;

            Constructor.prototype[name] = getterSetter(name);
            Constructor.prototype[name].hash = null;

            __validators[name] = prop.validators || [];
            __transformers[name] = prop.transformers || [];
            Constructor.prototype[name].validators = __validators[name];
            Constructor.prototype[name].transformers = __transformers[name];

            Constructor.prototype[name].hashFn = prop.hashFn;
        }

        Constructor.prototype.__values = __values;
        Constructor.prototype.__validators = __validators;
        Constructor.prototype.__transformers = __transformers;

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
