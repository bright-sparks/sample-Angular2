var __decorate = this.__decorate || function (decorators, target, key, value) {
    var kind = typeof (arguments.length == 2 ? value = target : value);
    for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];
        switch (kind) {
            case "function": value = decorator(value) || value; break;
            case "number": decorator(target, key, value); break;
            case "undefined": decorator(target, key); break;
            case "object": value = decorator(target, key, value) || value; break;
        }
    }
    return value;
};
var lang_1 = require('angular2/src/facade/lang');
var collection_1 = require('angular2/src/facade/collection');
var types_1 = require('./types');
exports.SetterFn = types_1.SetterFn;
exports.GetterFn = types_1.GetterFn;
exports.MethodFn = types_1.MethodFn;
var Reflector = (function () {
    function Reflector(reflectionCapabilities) {
        this._typeInfo = collection_1.MapWrapper.create();
        this._getters = collection_1.MapWrapper.create();
        this._setters = collection_1.MapWrapper.create();
        this._methods = collection_1.MapWrapper.create();
        this.reflectionCapabilities = reflectionCapabilities;
    }
    Reflector.prototype.registerType = function (type, typeInfo) {
        collection_1.MapWrapper.set(this._typeInfo, type, typeInfo);
    };
    Reflector.prototype.registerGetters = function (getters) {
        _mergeMaps(this._getters, getters);
    };
    Reflector.prototype.registerSetters = function (setters) {
        _mergeMaps(this._setters, setters);
    };
    Reflector.prototype.registerMethods = function (methods) {
        _mergeMaps(this._methods, methods);
    };
    Reflector.prototype.factory = function (type) {
        if (collection_1.MapWrapper.contains(this._typeInfo, type)) {
            return collection_1.MapWrapper.get(this._typeInfo, type)["factory"];
        }
        else {
            return this.reflectionCapabilities.factory(type);
        }
    };
    Reflector.prototype.parameters = function (typeOfFunc) {
        if (collection_1.MapWrapper.contains(this._typeInfo, typeOfFunc)) {
            return collection_1.MapWrapper.get(this._typeInfo, typeOfFunc)["parameters"];
        }
        else {
            return this.reflectionCapabilities.parameters(typeOfFunc);
        }
    };
    Reflector.prototype.annotations = function (typeOfFunc) {
        if (collection_1.MapWrapper.contains(this._typeInfo, typeOfFunc)) {
            return collection_1.MapWrapper.get(this._typeInfo, typeOfFunc)["annotations"];
        }
        else {
            return this.reflectionCapabilities.annotations(typeOfFunc);
        }
    };
    Reflector.prototype.getter = function (name) {
        if (collection_1.MapWrapper.contains(this._getters, name)) {
            return collection_1.MapWrapper.get(this._getters, name);
        }
        else {
            return this.reflectionCapabilities.getter(name);
        }
    };
    Reflector.prototype.setter = function (name) {
        if (collection_1.MapWrapper.contains(this._setters, name)) {
            return collection_1.MapWrapper.get(this._setters, name);
        }
        else {
            return this.reflectionCapabilities.setter(name);
        }
    };
    Reflector.prototype.method = function (name) {
        if (collection_1.MapWrapper.contains(this._methods, name)) {
            return collection_1.MapWrapper.get(this._methods, name);
        }
        else {
            return this.reflectionCapabilities.method(name);
        }
    };
    return Reflector;
})();
exports.Reflector = Reflector;
Object.defineProperty(Reflector.prototype.factory, "parameters", { get: function () {
        return [[lang_1.Type]];
    } });
Object.defineProperty(Reflector.prototype.getter, "parameters", { get: function () {
        return [[assert.type.string]];
    } });
Object.defineProperty(Reflector.prototype.setter, "parameters", { get: function () {
        return [[assert.type.string]];
    } });
Object.defineProperty(Reflector.prototype.method, "parameters", { get: function () {
        return [[assert.type.string]];
    } });
function _mergeMaps(target, config) {
    collection_1.StringMapWrapper.forEach(config, function (v, k) { return collection_1.MapWrapper.set(target, k, v); });
}
Object.defineProperty(_mergeMaps, "parameters", { get: function () {
        return [[collection_1.Map], []];
    } });
