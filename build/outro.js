    if (typeof define === 'function' && define.amd === 'object' && define.amd) {
        define(function () {
            return Foundry;
        });
    } else if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = Foundry;
        }
        exports = Foundry;
    } else {
        var global = window || global;
        global.Foundry = Foundry;
    }
}());
