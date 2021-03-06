var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
var xhr_1 = require('angular2/src/services/xhr');
var collection_1 = require('angular2/src/facade/collection');
var lang_1 = require('angular2/src/facade/lang');
var async_1 = require('angular2/src/facade/async');
var MockXHR = (function (_super) {
    __extends(MockXHR, _super);
    function MockXHR() {
        _super.call(this);
        this._expectations = [];
        this._definitions = collection_1.MapWrapper.create();
        this._requests = [];
    }
    MockXHR.prototype.get = function (url) {
        var request = new _PendingRequest(url);
        collection_1.ListWrapper.push(this._requests, request);
        return request.getPromise();
    };
    MockXHR.prototype.expect = function (url, response) {
        var expectation = new _Expectation(url, response);
        collection_1.ListWrapper.push(this._expectations, expectation);
    };
    MockXHR.prototype.when = function (url, response) {
        collection_1.MapWrapper.set(this._definitions, url, response);
    };
    MockXHR.prototype.flush = function () {
        if (this._requests.length === 0) {
            throw new lang_1.BaseException('No pending requests to flush');
        }
        do {
            var request = collection_1.ListWrapper.removeAt(this._requests, 0);
            this._processRequest(request);
        } while (this._requests.length > 0);
        this.verifyNoOustandingExpectations();
    };
    MockXHR.prototype.verifyNoOustandingExpectations = function () {
        if (this._expectations.length === 0)
            return;
        var urls = [];
        for (var i = 0; i < this._expectations.length; i++) {
            var expectation = this._expectations[i];
            collection_1.ListWrapper.push(urls, expectation.url);
        }
        throw new lang_1.BaseException("Unsatisfied requests: " + collection_1.ListWrapper.join(urls, ', '));
    };
    MockXHR.prototype._processRequest = function (request) {
        var url = request.url;
        if (this._expectations.length > 0) {
            var expectation = this._expectations[0];
            if (expectation.url == url) {
                collection_1.ListWrapper.remove(this._expectations, expectation);
                request.complete(expectation.response);
                return;
            }
        }
        if (collection_1.MapWrapper.contains(this._definitions, url)) {
            var response = collection_1.MapWrapper.get(this._definitions, url);
            request.complete(lang_1.normalizeBlank(response));
            return;
        }
        throw new lang_1.BaseException("Unexpected request " + url);
    };
    return MockXHR;
})(xhr_1.XHR);
exports.MockXHR = MockXHR;
Object.defineProperty(MockXHR.prototype.get, "parameters", { get: function () {
        return [[assert.type.string]];
    } });
Object.defineProperty(MockXHR.prototype.expect, "parameters", { get: function () {
        return [[assert.type.string], [assert.type.string]];
    } });
Object.defineProperty(MockXHR.prototype.when, "parameters", { get: function () {
        return [[assert.type.string], [assert.type.string]];
    } });
Object.defineProperty(MockXHR.prototype._processRequest, "parameters", { get: function () {
        return [[_PendingRequest]];
    } });
var _PendingRequest = (function () {
    function _PendingRequest(url) {
        this.url = url;
        this.completer = async_1.PromiseWrapper.completer();
    }
    _PendingRequest.prototype.complete = function (response) {
        if (lang_1.isBlank(response)) {
            this.completer.reject("Failed to load " + this.url);
        }
        else {
            this.completer.resolve(response);
        }
    };
    _PendingRequest.prototype.getPromise = function () {
        return this.completer.promise;
    };
    return _PendingRequest;
})();
Object.defineProperty(_PendingRequest.prototype.complete, "parameters", { get: function () {
        return [[assert.type.string]];
    } });
var _Expectation = (function () {
    function _Expectation(url, response) {
        this.url = url;
        this.response = response;
    }
    return _Expectation;
})();
Object.defineProperty(_Expectation, "parameters", { get: function () {
        return [[assert.type.string], [assert.type.string]];
    } });
