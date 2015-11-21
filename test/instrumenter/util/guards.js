var esprima = require('esprima');

function tryThis(str /*, feature */) {
    try {
        /*jshint evil: true */
        eval(str);
    } catch (ex) {
        //console.error('ES6 feature [' + feature + '] is not available in this environment');
        return false;
    }

    try {
        esprima.parse(str);
    } catch (ex) {
        //console.error('ES6 feature [' + feature + '] is not yet supported by esprima mainline');
        return false;
    }

    return true;
}

module.exports = {
    isYieldAvailable: function () {
        return tryThis('function *foo() { yield 1; }', 'yield');
    },

    isForOfAvailable: function () {
        return tryThis('function *foo() { yield 1; }\n' +
            'for (var k of foo()) {}', 'for-of');
    },

    isArrowFnAvailable: function () {
        return tryThis('[1 ,2, 3].map(x => x * x)', 'arrow function');
    },
    isObjectFreezeAvailable: function () {
        "use strict";
        if (!Object.freeze) {
            return false;
        }
        var foo = Object.freeze({});
        try {
            foo.bar = 1;
            return false;
        } catch (ex) {
            return true;
        }
    },
    isImportAvailable: function () {
        return tryThis('import fs from "fs"', 'import');
    },
    isExportAvailable: function () {
        return tryThis('export default function foo() {}', 'export');
    }
};
